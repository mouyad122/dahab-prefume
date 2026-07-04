import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';
import {
  ALLOWED_CATEGORY_SLUGS,
  ALLOWED_SEASON_SLUGS,
  normalizeSeason,
} from '@/lib/productClassification';

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  variants: true,
};

// â”€â”€â”€ GET /api/products/[id] â€” Public â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Looks up by `id` (UUID) or by `slug`. Returns 404 for invisible products.
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Try as UUID first, then as slug
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        visible: true,
        ready_for_storefront: true,
        category_slug: { in: ALLOWED_CATEGORY_SLUGS },
        season_slug: { in: ALLOWED_SEASON_SLUGS },
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

// â”€â”€â”€ PUT /api/products/[id] â€” Admin only â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Full update â€” only provided fields are changed.
export async function PUT(request, { params }) {
  try {
    // â”€â”€ Auth â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // â”€â”€ Verify product exists â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const existing = await prisma.product.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // â”€â”€ Parse body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      fragrance_family,
      short_description,
      short_description_en,
      long_description_ar,
      long_description_en,
      keywords,
      image_name,
      needs_image,
      visible,
      featured,
      low_stock_threshold,
      notes_top,
      notes_heart,
      notes_base,
      notes,
      research_confidence,
      needs_review,
      source_excel_row,
      categoryId,
      category_slug,
      season_slug,
      variants, // array of { volume, price, stock }
    } = body;

    const data = {};

    // â”€â”€ String / text fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    if (season !== undefined || season_slug !== undefined) {
      const normalizedSeason = normalizeSeason(season_slug || season);
      if (!normalizedSeason) {
        return Response.json({ error: 'season is required and must be summer, winter, or both' }, { status: 400 });
      }
      data.season = normalizedSeason.name_ar;
      data.season_slug = normalizedSeason.slug;
    }
    if (fragrance_family !== undefined) data.fragrance_family = String(fragrance_family);
    if (short_description !== undefined) data.short_description = String(short_description);
    if (short_description_en !== undefined) data.short_description_en = short_description_en ? String(short_description_en) : null;
    if (long_description_ar  !== undefined) data.long_description_ar  = long_description_ar ? String(long_description_ar) : null;
    if (long_description_en  !== undefined) data.long_description_en  = long_description_en ? String(long_description_en) : null;
    if (keywords          !== undefined) data.keywords          = String(keywords);
    if (image_name       !== undefined) data.image_name       = String(image_name);
    if (notes_top            !== undefined) data.notes_top            = notes_top ? String(notes_top) : null;
    if (notes_heart          !== undefined) data.notes_heart          = notes_heart ? String(notes_heart) : null;
    if (notes_base           !== undefined) data.notes_base           = notes_base ? String(notes_base) : null;
    if (notes                !== undefined) data.notes                = notes ? String(notes) : null;
    if (research_confidence  !== undefined) data.research_confidence  = String(research_confidence);

    // â”€â”€ Boolean fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (needs_image          !== undefined) data.needs_image          = Boolean(needs_image);
    if (visible   !== undefined) data.visible   = Boolean(visible);
    if (featured !== undefined) data.featured = Boolean(featured);
    if (needs_review         !== undefined) data.needs_review         = Boolean(needs_review);

    // â”€â”€ Integer / threshold fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (low_stock_threshold !== undefined) data.low_stock_threshold = Math.max(0, parseInt(low_stock_threshold, 10) || 5);
    if (source_excel_row   !== undefined) data.source_excel_row   = source_excel_row !== null ? parseInt(source_excel_row, 10) : null;

    // â”€â”€ Variants relation update â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (variants !== undefined) {
      if (!Array.isArray(variants)) {
        return Response.json({ error: 'variants must be an array' }, { status: 400 });
      }
      data.variants = {
        deleteMany: {},
        create: variants.map(v => ({
          volume: String(v.volume).trim(),
          price: parseInt(v.price, 10) || 0,
          stock: parseInt(v.stock, 10) || 0
        }))
      };
    }

    // â”€â”€ categoryId â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (categoryId !== undefined || category_slug !== undefined) {
      const cat = categoryId
        ? await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true, slug: true, name_ar: true } })
        : await prisma.category.findFirst({ where: { slug: category_slug, is_active: true }, select: { id: true, slug: true, name_ar: true } });

      if (!cat || !ALLOWED_CATEGORY_SLUGS.includes(cat.slug)) {
        return Response.json({ error: 'category is required and must be men, women, or oud' }, { status: 400 });
      }

      data.categoryId = cat.id;
      data.category_slug = cat.slug;
      data.main_category = cat.name_ar || cat.slug;
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    // â”€â”€ Update â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ DELETE /api/products/[id] â€” Admin only â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Soft delete: sets visible = false (product stays in DB).
export async function DELETE(request, { params }) {
  try {
    // â”€â”€ Auth â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // â”€â”€ Verify product exists â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const existing = await prisma.product.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // â”€â”€ Soft delete â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const product = await prisma.product.update({
      where: { id },
      data: { visible: false },
      select: { id: true, sku: true, slug: true, name_ar: true, visible: true },
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
