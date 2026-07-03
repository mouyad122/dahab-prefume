import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyAdminSession } from '../../../../lib/session';

/**
 * GET /api/admin/products
 * Admin-only product list with server-side pagination, filtering, and CSV export.
 *
 * Query params:
 *   search      – string search on name_ar | name_en | sku | barcode
 *   category    – category id
 *   gender      – male | female | unisex
 *   visible     – true | false | '' (all)
 *   stock       – low (stock <= threshold) | out (stock = 0) | '' (all)
 *   sort        – name_asc | name_desc | price_asc | price_desc | stock_asc | stock_desc | newest | oldest
 *   limit       – default 20, max 100
 *   offset      – default 0
 *   format      – 'csv' → returns downloadable CSV
 */
export async function GET(request) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const format = searchParams.get('format'); // 'csv' for export
  const limit  = format === 'csv' ? 10000 : Math.min(parseInt(searchParams.get('limit')  ?? '20', 10), 100);
  const offset = format === 'csv' ? 0     : Math.max(parseInt(searchParams.get('offset') ?? '0',  10), 0);

  // ── Filters ────────────────────────────────────────────────────────────────
  const search     = searchParams.get('search')?.trim()?.slice(0, 200) ?? '';
  const categoryId = searchParams.get('category')?.trim();
  const gender     = searchParams.get('gender')?.trim();
  const visible    = searchParams.get('visible')?.trim();
  const stockFilter= searchParams.get('stock')?.trim();
  const sort       = searchParams.get('sort') ?? 'newest';

  // ── Build where ────────────────────────────────────────────────────────────
  const where = {};

  if (search) {
    where.OR = [
      { name_ar:    { contains: search } },
      { name_en:    { contains: search } },
      { sku:        { contains: search, mode: 'insensitive' } },
      { barcode:    { contains: search } },
      { inspired_by:{ contains: search } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (gender && ['male','female','unisex'].includes(gender)) {
    where.gender = gender;
  }

  if (visible === 'true')  where.visible_on_website = true;
  if (visible === 'false') where.visible_on_website = false;

  if (stockFilter === 'low') {
    where.variants = { some: { stock: { lte: 5 } } };
  } else if (stockFilter === 'out') {
    where.variants = { some: { stock: 0 } };
  }

  // ── Sort ────────────────────────────────────────────────────────────────────
  let orderBy;
  switch (sort) {
    case 'name_asc':   orderBy = { name_ar: 'asc' };    break;
    case 'name_desc':  orderBy = { name_ar: 'desc' };   break;
    case 'oldest':     orderBy = { created_at: 'asc' }; break;
    default:           orderBy = { created_at: 'desc' }; // newest
  }

  // ── Select ─────────────────────────────────────────────────────────────────
  const select = {
    id: true,
    sku: true,
    barcode: true,
    slug: true,
    name_ar: true,
    name_en: true,
    inspired_by: true,
    main_category: true,
    gender: true,
    visible_on_website: true,
    featured_on_frontend: true,
    low_stock_threshold: true,
    image_filename: true,
    created_at: true,
    updated_at: true,
    category: { select: { id: true, name_ar: true } },
    variants: {
      select: { id: true, volume: true, price: true, stock: true },
      orderBy: { volume: 'asc' },
    },
    _count: { select: { variants: true } },
  };

  // ── Execute ────────────────────────────────────────────────────────────────
  const t0 = Date.now();
  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({ where, orderBy, skip: offset, take: limit, select }),
    prisma.product.count({ where }),
  ]);
  const queryMs = Date.now() - t0;

  // ── CSV Export ─────────────────────────────────────────────────────────────
  if (format === 'csv') {
    const rows = [
      // Header row
      ['SKU','الاسم بالعربية','الاسم بالإنجليزية','الفئة','النوع','مرئي','إجمالي المخزون','أصغر سعر (فلس)','أكبر سعر (فلس)','تاريخ الإنشاء'],
    ];

    for (const p of products) {
      const totalStock = p.variants.reduce((s, v) => s + (v.stock ?? 0), 0);
      const prices     = p.variants.map(v => v.price ?? 0);
      const minPrice   = prices.length > 0 ? Math.min(...prices) : 0;
      const maxPrice   = prices.length > 0 ? Math.max(...prices) : 0;
      rows.push([
        p.sku ?? '',
        p.name_ar ?? '',
        p.name_en ?? '',
        p.category?.name_ar ?? p.main_category ?? '',
        p.gender === 'male' ? 'رجالي' : p.gender === 'female' ? 'نسائي' : 'للجميع',
        p.visible_on_website ? 'نعم' : 'لا',
        totalStock,
        minPrice,
        maxPrice,
        new Date(p.created_at).toLocaleDateString('ar-JO'),
      ]);
    }

    // Encode: add BOM for Excel Arabic support
    const csvContent = '\uFEFF' + rows.map(r => r.map(cell =>
      `"${String(cell ?? '').replace(/"/g, '""')}"`
    ).join(',')).join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="dahab-products-${new Date().toISOString().slice(0,10)}.csv"`,
      },
    });
  }

  // ── JSON response ──────────────────────────────────────────────────────────
  return NextResponse.json({
    products,
    total,
    limit,
    offset,
    pages: Math.ceil(total / limit),
    _meta: { query_ms: queryMs },
  });
}
