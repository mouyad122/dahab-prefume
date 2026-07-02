import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function activeDiscountWhere() {
  const now = new Date();
  return {
    is_active: true,
    OR: [{ starts_at: null }, { starts_at: { lte: now } }],
    AND: [
      {
        OR: [{ ends_at: null }, { ends_at: { gte: now } }],
      },
    ],
  };
}

const fullProductInclude = {
  category: {
    select: { id: true, slug: true, name_ar: true, name_en: true },
  },
  accords: { orderBy: { position: 'asc' } },
  family_tags: true,
  discounts: {
    where: activeDiscountWhere(),
    orderBy: { created_at: 'desc' },
    take: 1,
  },
};

// ─── GET /api/products/[id] — Public ─────────────────────────────────────────
// Looks up by `id` (UUID) or by `slug`. Returns 404 for invisible products.
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Try as UUID first, then as slug
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        visible_on_website: true,
      },
      include: fullProductInclude,
    });

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ product }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/products/[id]]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── PUT /api/products/[id] — Admin only ─────────────────────────────────────
// Full update — only provided fields are changed.
export async function PUT(request, { params }) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // ── Verify product exists ─────────────────────────────────────────────────
    const existing = await prisma.product.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // ── Parse body ───────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      sku,
      slug,
      name_ar,
      name_en,
      inspired_by,
      main_category,
      gender,
      season,
      fragrance_family_raw,
      short_description_ar,
      short_description_en,
      long_description_ar,
      long_description_en,
      keywords_ar,
      image_filename,
      images_360,
      media_display_type,
      ai360_status,
      ai360_quality,
      ai360_background,
      ai360_lighting,
      ai360_source_image,
      ai360_reference_image,
      needs_image,
      visible_on_website,
      featured_on_frontend,
      uses_general_pricing,
      price_50ml_fils,
      price_100ml_fils,
      price_200ml_fils,
      stock,
      low_stock_threshold,
      notes_top,
      notes_heart,
      notes_base,
      notes,
      research_confidence,
      needs_review,
      source_excel_row,
      categoryId,
    } = body;

    const data = {};

    // ── String / text fields ───────────────────────────────────────────────────
    if (sku !== undefined) {
      if (typeof sku !== 'string' || sku.trim() === '') {
        return Response.json({ error: 'sku cannot be empty' }, { status: 400 });
      }
      const skuConflict = await prisma.product.findFirst({
        where: { sku: sku.trim(), NOT: { id } },
        select: { id: true },
      });
      if (skuConflict) {
        return Response.json({ error: `SKU "${sku.trim()}" already exists` }, { status: 409 });
      }
      data.sku = sku.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string' || slug.trim() === '') {
        return Response.json({ error: 'slug cannot be empty' }, { status: 400 });
      }
      const slugConflict = await prisma.product.findFirst({
        where: { slug: slug.trim(), NOT: { id } },
        select: { id: true },
      });
      if (slugConflict) {
        return Response.json({ error: `Slug "${slug.trim()}" already exists` }, { status: 409 });
      }
      data.slug = slug.trim();
    }

    if (name_ar !== undefined) {
      if (typeof name_ar !== 'string' || name_ar.trim() === '') {
        return Response.json({ error: 'name_ar cannot be empty' }, { status: 400 });
      }
      data.name_ar = name_ar.trim();
    }

    if (name_en             !== undefined) data.name_en             = name_en ? String(name_en).trim() : null;
    if (inspired_by         !== undefined) data.inspired_by         = inspired_by ? String(inspired_by).trim() : null;
    if (main_category       !== undefined) data.main_category       = String(main_category).trim();
    if (gender              !== undefined) data.gender              = String(gender).trim();
    if (season              !== undefined) data.season              = String(season).trim();
    if (fragrance_family_raw !== undefined) data.fragrance_family_raw = String(fragrance_family_raw);
    if (short_description_ar !== undefined) data.short_description_ar = String(short_description_ar);
    if (short_description_en !== undefined) data.short_description_en = short_description_en ? String(short_description_en) : null;
    if (long_description_ar  !== undefined) data.long_description_ar  = long_description_ar ? String(long_description_ar) : null;
    if (long_description_en  !== undefined) data.long_description_en  = long_description_en ? String(long_description_en) : null;
    if (keywords_ar          !== undefined) data.keywords_ar          = String(keywords_ar);
    if (image_filename       !== undefined) data.image_filename       = String(image_filename);
    if (media_display_type   !== undefined) {
      if (!['normal', 'gallery', 'ai_360', 'real_3d'].includes(media_display_type)) {
        return Response.json({ error: 'media_display_type is invalid' }, { status: 400 });
      }
      data.media_display_type = media_display_type;
    }
    if (ai360_status         !== undefined) {
      if (!['idle', 'draft', 'generating', 'ready', 'approved', 'failed'].includes(ai360_status)) {
        return Response.json({ error: 'ai360_status is invalid' }, { status: 400 });
      }
      data.ai360_status = ai360_status;
    }
    if (ai360_quality        !== undefined) {
      const q = parseInt(ai360_quality, 10);
      if (![12, 24, 36].includes(q)) {
        return Response.json({ error: 'ai360_quality must be 12, 24, or 36' }, { status: 400 });
      }
      data.ai360_quality = q;
    }
    if (ai360_background     !== undefined) data.ai360_background     = String(ai360_background);
    if (ai360_lighting       !== undefined) data.ai360_lighting       = String(ai360_lighting);
    if (ai360_source_image   !== undefined) data.ai360_source_image   = ai360_source_image ? String(ai360_source_image) : null;
    if (ai360_reference_image !== undefined) data.ai360_reference_image = ai360_reference_image ? String(ai360_reference_image) : null;
    if (notes_top            !== undefined) data.notes_top            = notes_top ? String(notes_top) : null;
    if (notes_heart          !== undefined) data.notes_heart          = notes_heart ? String(notes_heart) : null;
    if (notes_base           !== undefined) data.notes_base           = notes_base ? String(notes_base) : null;
    if (notes                !== undefined) data.notes                = notes ? String(notes) : null;
    if (research_confidence  !== undefined) data.research_confidence  = String(research_confidence);

    // ── Boolean fields ────────────────────────────────────────────────────────
    if (needs_image          !== undefined) data.needs_image          = Boolean(needs_image);
    if (visible_on_website   !== undefined) data.visible_on_website   = Boolean(visible_on_website);
    if (featured_on_frontend !== undefined) data.featured_on_frontend = Boolean(featured_on_frontend);
    if (uses_general_pricing !== undefined) data.uses_general_pricing = Boolean(uses_general_pricing);
    if (needs_review         !== undefined) data.needs_review         = Boolean(needs_review);

    // ── Integer / fils fields ─────────────────────────────────────────────────
    const setFils = (val, fieldName) => {
      if (val === undefined) return;
      if (val === null) { data[fieldName] = null; return; }
      const n = parseInt(val, 10);
      if (!Number.isInteger(n) || n < 0) {
        throw new Error(`${fieldName} must be a non-negative integer (fils)`);
      }
      data[fieldName] = n;
    };

    try {
      setFils(price_50ml_fils,  'price_50ml_fils');
      setFils(price_100ml_fils, 'price_100ml_fils');
      setFils(price_200ml_fils, 'price_200ml_fils');
    } catch (e) {
      return Response.json({ error: e.message }, { status: 400 });
    }

    if (stock              !== undefined) data.stock              = Math.max(0, parseInt(stock, 10) || 0);
    if (low_stock_threshold !== undefined) data.low_stock_threshold = Math.max(0, parseInt(low_stock_threshold, 10) || 5);
    if (source_excel_row   !== undefined) data.source_excel_row   = source_excel_row !== null ? parseInt(source_excel_row, 10) : null;

    // ── images_360 (array → JSON string) ──────────────────────────────────────
    if (images_360 !== undefined) {
      if (images_360 === null) {
        data.images_360 = null;
      } else if (Array.isArray(images_360)) {
        data.images_360 = JSON.stringify(images_360);
      } else if (typeof images_360 === 'string') {
        try { JSON.parse(images_360); data.images_360 = images_360; }
        catch { return Response.json({ error: 'images_360 must be an array or valid JSON string' }, { status: 400 }); }
      } else {
        return Response.json({ error: 'images_360 must be an array or JSON string' }, { status: 400 });
      }
    }

    // ── categoryId ────────────────────────────────────────────────────────────
    if (categoryId !== undefined) {
      if (categoryId === null) {
        data.categoryId = null;
      } else {
        const cat = await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } });
        if (!cat) {
          return Response.json({ error: `Category with id "${categoryId}" not found` }, { status: 400 });
        }
        data.categoryId = categoryId;
      }
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    // ── Update ────────────────────────────────────────────────────────────────
    const product = await prisma.product.update({
      where: { id },
      data,
      include: fullProductInclude,
    });

    return Response.json({ product }, { status: 200 });
  } catch (error) {
    console.error('[PUT /api/products/[id]]', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.join(', ') ?? 'field';
      return Response.json({ error: `Duplicate value for ${field}` }, { status: 409 });
    }
    if (error.code === 'P2025') {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── DELETE /api/products/[id] — Admin only ───────────────────────────────────
// Soft delete: sets visible_on_website = false (product stays in DB).
export async function DELETE(request, { params }) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // ── Verify product exists ─────────────────────────────────────────────────
    const existing = await prisma.product.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // ── Soft delete ───────────────────────────────────────────────────────────
    const product = await prisma.product.update({
      where: { id },
      data: { visible_on_website: false },
      select: { id: true, sku: true, slug: true, name_ar: true, visible_on_website: true },
    });

    return Response.json(
      { message: 'Product hidden from website (soft-deleted)', product },
      { status: 200 },
    );
  } catch (error) {
    console.error('[DELETE /api/products/[id]]', error);
    if (error.code === 'P2025') {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
