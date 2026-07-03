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

// ─── GET /api/discounts — Admin only ─────────────────────────────────────────
// Returns all active discounts with associated product info.
export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const discounts = await prisma.discount.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' },
      include: {
        product: {
          select: {
            id: true,
            sku: true,
            slug: true,
            name_ar: true,
            name_en: true,
            image_filename: true,
            variants: {
              select: {
                id: true,
                volume: true,
                price: true,
                stock: true
              }
            },
          },
        },
      },
    });

    return Response.json({ discounts }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/discounts]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/discounts — Admin only ────────────────────────────────────────
// Body: {
//   productId, discount_type, discount_value, original_price,
//   starts_at?, ends_at?, label_ar?, label_en?
// }
// original_price must be in fils.
// discount_value: percentage (0-100) or JOD amount for fixed.
// discounted_price is computed automatically.
export async function POST(request) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── Parse body ───────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      productId,
      discount_type,
      discount_value,
      original_price,
      starts_at,
      ends_at,
      label_ar,
      label_en,
    } = body;

    // ── Validate required fields ──────────────────────────────────────────────
    if (!productId || typeof productId !== 'string') {
      return Response.json({ error: 'productId is required' }, { status: 400 });
    }

    if (!discount_type || !['percentage', 'fixed'].includes(discount_type)) {
      return Response.json(
        { error: 'discount_type must be "percentage" or "fixed"' },
        { status: 400 },
      );
    }

    const discountValue = parseFloat(discount_value);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      return Response.json(
        { error: 'discount_value must be a non-negative number' },
        { status: 400 },
      );
    }

    const originalPrice = parseInt(original_price, 10);
    if (!Number.isInteger(originalPrice) || originalPrice < 0) {
      return Response.json(
        { error: 'original_price must be a non-negative integer (fils)' },
        { status: 400 },
      );
    }

    // ── Validate product exists ───────────────────────────────────────────────
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name_ar: true },
    });
    if (!product) {
      return Response.json({ error: `Product with id "${productId}" not found` }, { status: 404 });
    }

    // ── Compute discounted_price ──────────────────────────────────────────────
    let discountedPrice;
    try {
      discountedPrice = computeDiscountedPrice(discount_type, discountValue, originalPrice);
    } catch (calcError) {
      return Response.json({ error: calcError.message }, { status: 400 });
    }

    // ── Validate date range ───────────────────────────────────────────────────
    let startsAt = null;
    let endsAt   = null;

    if (starts_at !== undefined && starts_at !== null) {
      startsAt = new Date(starts_at);
      if (isNaN(startsAt.getTime())) {
        return Response.json({ error: 'starts_at is not a valid date' }, { status: 400 });
      }
    }

    if (ends_at !== undefined && ends_at !== null) {
      endsAt = new Date(ends_at);
      if (isNaN(endsAt.getTime())) {
        return Response.json({ error: 'ends_at is not a valid date' }, { status: 400 });
      }
    }

    if (startsAt && endsAt && endsAt <= startsAt) {
      return Response.json({ error: 'ends_at must be after starts_at' }, { status: 400 });
    }

    // ── Create discount ───────────────────────────────────────────────────────
    const discount = await prisma.discount.create({
      data: {
        productId,
        discount_type,
        discount_value: discountValue,
        original_price: originalPrice,
        discounted_price: discountedPrice,
        starts_at: startsAt,
        ends_at: endsAt,
        label_ar: label_ar ? String(label_ar).trim() : null,
        label_en: label_en ? String(label_en).trim() : null,
        is_active: true,
      },
      include: {
        product: {
          select: { id: true, sku: true, slug: true, name_ar: true, name_en: true },
        },
      },
    });

    return Response.json({ discount }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/discounts]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
