import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build the Prisma `where` clause for active discounts that fall within date range.
 */
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

/**
 * Standard product select shape used for storefront GET responses.
 */
const publicProductSelect = {
  id: true,
  sku: true,
  slug: true,
  name_ar: true,
  name_en: true,
  inspired_by: true,
  main_category: true,
  gender: true,
  season: true,
  fragrance_family: true,
  short_description: true,
  short_description_en: true,
  image_name: true,
  image_url: true,
  featured: true,
  low_stock_threshold: true,
  notes_top: true,
  notes_heart: true,
  notes_base: true,
  notes: true,
  categoryId: true,
  category: {
    select: { id: true, slug: true, name_ar: true, name_en: true },
  },
  discounts: {
    where: activeDiscountWhere(),
    orderBy: { created_at: 'desc' },
    take: 1,
  },
  accords: {
    orderBy: { position: 'asc' },
  },
  family_tags: true,
  variants: {
    select: {
      id: true,
      volume: true,
      price: true,
      stock: true
    }
  },
  created_at: true,
  updated_at: true,
};

// ─── GET /api/products — Public (storefront) ─────────────────────────────────
// Only returns visible=true products.
// Query params: category, search, gender, featured, visible, limit, offset
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // ── Pagination ────────────────────────────────────────────────────────────
    let limit = parseInt(searchParams.get('limit') ?? '24', 10);
    if (!Number.isFinite(limit) || limit < 1) limit = 24;
    if (limit > 200) limit = 200;

    let offset = parseInt(searchParams.get('offset') ?? '0', 10);
    if (!Number.isFinite(offset) || offset < 0) offset = 0;

    // ── Filters ───────────────────────────────────────────────────────────────
    const categoryParam = searchParams.get('category');  // category slug or id
    const searchParam   = searchParams.get('search');
    const genderParam   = searchParams.get('gender');
    const featuredParam = searchParams.get('featured');

    // Build where clause — always visible on website for public route
    const where = { visible: true };

    if (genderParam && ['male', 'female', 'unisex'].includes(genderParam)) {
      where.gender = genderParam;
    }

    if (featuredParam === 'true') {
      where.featured = true;
    }

    if (categoryParam) {
      // Try matching by slug first, then by id
      const cat = await prisma.category.findFirst({
        where: {
          OR: [{ slug: categoryParam }, { id: categoryParam }],
          is_active: true,
        },
        select: { id: true },
      });
      if (cat) {
        where.categoryId = cat.id;
      } else {
        // No matching active category — return empty
        return Response.json({ products: [], total: 0, limit, offset }, { status: 200 });
      }
    }

    if (searchParam && searchParam.trim() !== '') {
      const q = searchParam.trim().slice(0, 200);
      where.OR = [
        { name_ar: { contains: q } },
        { name_en: { contains: q } },
        { sku: { contains: q } },
        { inspired_by: { contains: q } },
        { keywords: { contains: q } },
      ];
    }

    // ── Query ─────────────────────────────────────────────────────────────────
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy: { name_ar: 'asc' },
        skip: offset,
        take: limit,
        select: publicProductSelect,
      }),
      prisma.product.count({ where }),
    ]);

    return Response.json({ products, total, limit, offset }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Full product creation matching schema fields.
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
      variants, // array of { volume, price, stock }
    } = body;

    // ── Required field validation ─────────────────────────────────────────────
    if (!sku || typeof sku !== 'string' || sku.trim() === '') {
      return Response.json({ error: 'sku is required' }, { status: 400 });
    }
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }
    if (!name_ar || typeof name_ar !== 'string' || name_ar.trim() === '') {
      return Response.json({ error: 'name_ar is required' }, { status: 400 });
    }

    // ── Validate uniqueness ───────────────────────────────────────────────────
    const [skuConflict, slugConflict] = await prisma.$transaction([
      prisma.product.findUnique({ where: { sku: sku.trim() }, select: { id: true } }),
      prisma.product.findUnique({ where: { slug: slug.trim() }, select: { id: true } }),
    ]);

    if (skuConflict) {
      return Response.json({ error: `SKU "${sku.trim()}" already exists` }, { status: 409 });
    }
    if (slugConflict) {
      return Response.json({ error: `Slug "${slug.trim()}" already exists` }, { status: 409 });
    }

    // ── Validate categoryId if provided ───────────────────────────────────────
    if (categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } });
      if (!cat) {
        return Response.json({ error: `Category with id "${categoryId}" not found` }, { status: 400 });
      }
    }

    // ── Validate variants array if provided ───────────────────────────────────
    if (variants && !Array.isArray(variants)) {
      return Response.json({ error: 'variants must be an array' }, { status: 400 });
    }

    // ── Build create data ──────────────────────────────────────────────────────
    const data = {
      sku: sku.trim(),
      slug: slug.trim(),
      name_ar: name_ar.trim(),
      ...(name_en                !== undefined && { name_en: name_en ? String(name_en).trim() : null }),
      ...(inspired_by            !== undefined && { inspired_by: inspired_by ? String(inspired_by).trim() : null }),
      ...(main_category          !== undefined && { main_category: String(main_category).trim() }),
      ...(gender                 !== undefined && { gender: String(gender).trim() }),
      ...(season                 !== undefined && { season: String(season).trim() }),
      ...(fragrance_family   !== undefined && { fragrance_family: String(fragrance_family) }),
      ...(short_description   !== undefined && { short_description: String(short_description) }),
      ...(short_description_en   !== undefined && { short_description_en: short_description_en ? String(short_description_en) : null }),
      ...(long_description_ar    !== undefined && { long_description_ar: long_description_ar ? String(long_description_ar) : null }),
      ...(long_description_en    !== undefined && { long_description_en: long_description_en ? String(long_description_en) : null }),
      ...(keywords            !== undefined && { keywords: String(keywords) }),
      ...(image_name         !== undefined && { image_name: String(image_name) }),
      ...(needs_image            !== undefined && { needs_image: Boolean(needs_image) }),
      ...(visible     !== undefined && { visible: Boolean(visible) }),
      ...(featured   !== undefined && { featured: Boolean(featured) }),
      ...(low_stock_threshold    !== undefined && { low_stock_threshold: parseInt(low_stock_threshold, 10) || 5 }),
      ...(notes_top              !== undefined && { notes_top: notes_top ? String(notes_top) : null }),
      ...(notes_heart            !== undefined && { notes_heart: notes_heart ? String(notes_heart) : null }),
      ...(notes_base             !== undefined && { notes_base: notes_base ? String(notes_base) : null }),
      ...(notes                  !== undefined && { notes: notes ? String(notes) : null }),
      ...(research_confidence    !== undefined && { research_confidence: String(research_confidence) }),
      ...(needs_review           !== undefined && { needs_review: Boolean(needs_review) }),
      ...(source_excel_row       !== undefined && source_excel_row !== null && { source_excel_row: parseInt(source_excel_row, 10) }),
      ...(categoryId             !== undefined && categoryId !== null && { categoryId }),
      variants: {
        create: (variants || []).map(v => ({
          volume: String(v.volume).trim(),
          price: parseInt(v.price, 10) || 0,
          stock: parseInt(v.stock, 10) || 0
        }))
      }
    };

    // ── Create product ────────────────────────────────────────────────────────
    const product = await prisma.product.create({
      data,
      include: {
        category: { select: { id: true, slug: true, name_ar: true, name_en: true } },
        accords: true,
        family_tags: true,
        discounts: { where: { is_active: true }, take: 1 },
        variants: true,
      },
    });

    return Response.json({ product }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/products]', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.join(', ') ?? 'field';
      return Response.json({ error: `Duplicate value for ${field}` }, { status: 409 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
