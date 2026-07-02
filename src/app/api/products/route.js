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
  fragrance_family_raw: true,
  short_description_ar: true,
  short_description_en: true,
  image_filename: true,
  images_360: true,
  media_display_type: true,
  ai360_status: true,
  ai360_quality: true,
  ai360_background: true,
  ai360_lighting: true,
  ai360_source_image: true,
  ai360_reference_image: true,
  featured_on_frontend: true,
  uses_general_pricing: true,
  price_50ml_fils: true,
  price_100ml_fils: true,
  price_200ml_fils: true,
  stock: true,
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
  created_at: true,
  updated_at: true,
};

// ─── GET /api/products — Public (storefront) ─────────────────────────────────
// Only returns visible_on_website=true products.
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
    const where = { visible_on_website: true };

    if (genderParam && ['male', 'female', 'unisex'].includes(genderParam)) {
      where.gender = genderParam;
    }

    if (featuredParam === 'true') {
      where.featured_on_frontend = true;
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
        { keywords_ar: { contains: q } },
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

// ─── POST /api/products — Admin only ─────────────────────────────────────────
// Full product creation matching schema fields.
// images_360 is stored as a JSON string of a filename array.
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
      fragrance_family_raw,
      short_description_ar,
      short_description_en,
      long_description_ar,
      long_description_en,
      keywords_ar,
      image_filename,
      images_360,          // array of filenames OR already a JSON string
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

    // ── Validate price fields (must be non-negative integers if provided) ──────
    const validateFils = (val, fieldName) => {
      if (val === undefined || val === null) return null;
      const n = parseInt(val, 10);
      if (!Number.isInteger(n) || n < 0) {
        throw new Error(`${fieldName} must be a non-negative integer (fils)`);
      }
      return n;
    };

    let p50, p100, p200;
    try {
      p50  = validateFils(price_50ml_fils,  'price_50ml_fils');
      p100 = validateFils(price_100ml_fils, 'price_100ml_fils');
      p200 = validateFils(price_200ml_fils, 'price_200ml_fils');
    } catch (validationError) {
      return Response.json({ error: validationError.message }, { status: 400 });
    }

    // ── Serialize images_360 ───────────────────────────────────────────────────
    let images360Str = null;
    if (images_360 !== undefined && images_360 !== null) {
      if (Array.isArray(images_360)) {
        images360Str = JSON.stringify(images_360);
      } else if (typeof images_360 === 'string') {
        // Validate it's valid JSON
        try {
          JSON.parse(images_360);
          images360Str = images_360;
        } catch {
          return Response.json({ error: 'images_360 must be an array or valid JSON string' }, { status: 400 });
        }
      } else {
        return Response.json({ error: 'images_360 must be an array or JSON string' }, { status: 400 });
      }
    }

    const mediaType = ['normal', 'gallery', 'ai_360', 'real_3d'].includes(media_display_type)
      ? media_display_type
      : undefined;
    const aiStatus = ['idle', 'draft', 'generating', 'ready', 'approved', 'failed'].includes(ai360_status)
      ? ai360_status
      : undefined;
    const aiQuality = [12, 24, 36].includes(parseInt(ai360_quality, 10))
      ? parseInt(ai360_quality, 10)
      : undefined;

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
      ...(fragrance_family_raw   !== undefined && { fragrance_family_raw: String(fragrance_family_raw) }),
      ...(short_description_ar   !== undefined && { short_description_ar: String(short_description_ar) }),
      ...(short_description_en   !== undefined && { short_description_en: short_description_en ? String(short_description_en) : null }),
      ...(long_description_ar    !== undefined && { long_description_ar: long_description_ar ? String(long_description_ar) : null }),
      ...(long_description_en    !== undefined && { long_description_en: long_description_en ? String(long_description_en) : null }),
      ...(keywords_ar            !== undefined && { keywords_ar: String(keywords_ar) }),
      ...(image_filename         !== undefined && { image_filename: String(image_filename) }),
      ...(images360Str           !== null      && { images_360: images360Str }),
      ...(mediaType              !== undefined && { media_display_type: mediaType }),
      ...(aiStatus               !== undefined && { ai360_status: aiStatus }),
      ...(aiQuality              !== undefined && { ai360_quality: aiQuality }),
      ...(ai360_background       !== undefined && { ai360_background: String(ai360_background) }),
      ...(ai360_lighting         !== undefined && { ai360_lighting: String(ai360_lighting) }),
      ...(ai360_source_image     !== undefined && { ai360_source_image: ai360_source_image ? String(ai360_source_image) : null }),
      ...(ai360_reference_image  !== undefined && { ai360_reference_image: ai360_reference_image ? String(ai360_reference_image) : null }),
      ...(needs_image            !== undefined && { needs_image: Boolean(needs_image) }),
      ...(visible_on_website     !== undefined && { visible_on_website: Boolean(visible_on_website) }),
      ...(featured_on_frontend   !== undefined && { featured_on_frontend: Boolean(featured_on_frontend) }),
      ...(uses_general_pricing   !== undefined && { uses_general_pricing: Boolean(uses_general_pricing) }),
      ...(p50  !== null && { price_50ml_fils: p50 }),
      ...(p100 !== null && { price_100ml_fils: p100 }),
      ...(p200 !== null && { price_200ml_fils: p200 }),
      ...(stock                  !== undefined && { stock: parseInt(stock, 10) || 0 }),
      ...(low_stock_threshold    !== undefined && { low_stock_threshold: parseInt(low_stock_threshold, 10) || 5 }),
      ...(notes_top              !== undefined && { notes_top: notes_top ? String(notes_top) : null }),
      ...(notes_heart            !== undefined && { notes_heart: notes_heart ? String(notes_heart) : null }),
      ...(notes_base             !== undefined && { notes_base: notes_base ? String(notes_base) : null }),
      ...(notes                  !== undefined && { notes: notes ? String(notes) : null }),
      ...(research_confidence    !== undefined && { research_confidence: String(research_confidence) }),
      ...(needs_review           !== undefined && { needs_review: Boolean(needs_review) }),
      ...(source_excel_row       !== undefined && source_excel_row !== null && { source_excel_row: parseInt(source_excel_row, 10) }),
      ...(categoryId             !== undefined && categoryId !== null && { categoryId }),
    };

    // ── Create product ────────────────────────────────────────────────────────
    const product = await prisma.product.create({
      data,
      include: {
        category: { select: { id: true, slug: true, name_ar: true, name_en: true } },
        accords: true,
        family_tags: true,
        discounts: { where: { is_active: true }, take: 1 },
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
