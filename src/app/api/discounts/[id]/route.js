import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

// ─── Discount Price Calculator ────────────────────────────────────────────────
/**
 * Compute discounted_price in fils.
 *
 * @param {'percentage'|'fixed'} type
 * @param {number} discountValue   - percentage (0-100) OR JOD amount for fixed
 * @param {number} originalPrice   - always in fils
 * @returns {number} discounted_price in fils (rounded to nearest fils)
 */
function computeDiscountedPrice(type, discountValue, originalPrice) {
  if (type === 'percentage') {
    if (discountValue < 0 || discountValue > 100) {
      throw new Error('discount_value for percentage type must be between 0 and 100');
    }
    return Math.round(originalPrice * (1 - discountValue / 100));
  }

  if (type === 'fixed') {
    // discount_value is in JOD → convert to fils (× 1000)
    const discountFils = Math.round(discountValue * 1000);
    const result = originalPrice - discountFils;
    if (result < 0) {
      throw new Error('discount_value exceeds original_price — discounted_price would be negative');
    }
    return result;
  }

  throw new Error(`Unknown discount_type "${type}". Allowed: "percentage", "fixed"`);
}

// ─── PUT /api/discounts/[id] — Admin only ────────────────────────────────────
// Update any discount fields; recalculates discounted_price automatically
// if discount_type, discount_value, or original_price change.
export async function PUT(request, { params }) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // ── Verify discount exists ────────────────────────────────────────────────
    const existing = await prisma.discount.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: 'Discount not found' }, { status: 404 });
    }

    // ── Parse body ───────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      discount_type,
      discount_value,
      original_price,
      starts_at,
      ends_at,
      label_ar,
      label_en,
      is_active,
    } = body;

    // ── Build update data ─────────────────────────────────────────────────────
    const data = {};

    // Determine effective values for recalculation
    let effectiveType         = existing.discount_type;
    let effectiveDiscountValue = existing.discount_value;
    let effectiveOriginalPrice = existing.original_price;
    let needsRecalculation    = false;

    if (discount_type !== undefined) {
      if (!['percentage', 'fixed'].includes(discount_type)) {
        return Response.json(
          { error: 'discount_type must be "percentage" or "fixed"' },
          { status: 400 },
        );
      }
      data.discount_type = discount_type;
      effectiveType      = discount_type;
      needsRecalculation = true;
    }

    if (discount_value !== undefined) {
      const dv = parseFloat(discount_value);
      if (!Number.isFinite(dv) || dv < 0) {
        return Response.json(
          { error: 'discount_value must be a non-negative number' },
          { status: 400 },
        );
      }
      data.discount_value        = dv;
      effectiveDiscountValue     = dv;
      needsRecalculation         = true;
    }

    if (original_price !== undefined) {
      const op = parseInt(original_price, 10);
      if (!Number.isInteger(op) || op < 0) {
        return Response.json(
          { error: 'original_price must be a non-negative integer (fils)' },
          { status: 400 },
        );
      }
      data.original_price    = op;
      effectiveOriginalPrice = op;
      needsRecalculation     = true;
    }

    // ── Recalculate discounted_price ──────────────────────────────────────────
    if (needsRecalculation) {
      try {
        data.discounted_price = computeDiscountedPrice(
          effectiveType,
          effectiveDiscountValue,
          effectiveOriginalPrice,
        );
      } catch (calcError) {
        return Response.json({ error: calcError.message }, { status: 400 });
      }
    }

    // ── Date fields ───────────────────────────────────────────────────────────
    if (starts_at !== undefined) {
      if (starts_at === null) {
        data.starts_at = null;
      } else {
        const d = new Date(starts_at);
        if (isNaN(d.getTime())) {
          return Response.json({ error: 'starts_at is not a valid date' }, { status: 400 });
        }
        data.starts_at = d;
      }
    }

    if (ends_at !== undefined) {
      if (ends_at === null) {
        data.ends_at = null;
      } else {
        const d = new Date(ends_at);
        if (isNaN(d.getTime())) {
          return Response.json({ error: 'ends_at is not a valid date' }, { status: 400 });
        }
        data.ends_at = d;
      }
    }

    // Validate date range after resolving values
    const finalStartsAt = data.starts_at !== undefined ? data.starts_at : existing.starts_at;
    const finalEndsAt   = data.ends_at   !== undefined ? data.ends_at   : existing.ends_at;
    if (finalStartsAt && finalEndsAt && finalEndsAt <= finalStartsAt) {
      return Response.json({ error: 'ends_at must be after starts_at' }, { status: 400 });
    }

    // ── Label / is_active fields ──────────────────────────────────────────────
    if (label_ar  !== undefined) data.label_ar  = label_ar  ? String(label_ar).trim()  : null;
    if (label_en  !== undefined) data.label_en  = label_en  ? String(label_en).trim()  : null;
    if (is_active !== undefined) {
      if (typeof is_active !== 'boolean') {
        return Response.json({ error: 'is_active must be a boolean' }, { status: 400 });
      }
      data.is_active = is_active;
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    // ── Update ────────────────────────────────────────────────────────────────
    const discount = await prisma.discount.update({
      where: { id },
      data,
      include: {
        product: {
          select: { id: true, sku: true, slug: true, name_ar: true, name_en: true },
        },
      },
    });

    return Response.json({ discount }, { status: 200 });
  } catch (error) {
    console.error('[PUT /api/discounts/[id]]', error);
    if (error.code === 'P2025') {
      return Response.json({ error: 'Discount not found' }, { status: 404 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── DELETE /api/discounts/[id] — Admin only ─────────────────────────────────
// Hard-deletes the discount record.
export async function DELETE(request, { params }) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // ── Verify discount exists ────────────────────────────────────────────────
    const existing = await prisma.discount.findUnique({
      where: { id },
      select: { id: true, productId: true },
    });
    if (!existing) {
      return Response.json({ error: 'Discount not found' }, { status: 404 });
    }

    // ── Delete ────────────────────────────────────────────────────────────────
    await prisma.discount.delete({ where: { id } });

    return Response.json({ message: 'Discount deleted successfully', id }, { status: 200 });
  } catch (error) {
    console.error('[DELETE /api/discounts/[id]]', error);
    if (error.code === 'P2025') {
      return Response.json({ error: 'Discount not found' }, { status: 404 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
