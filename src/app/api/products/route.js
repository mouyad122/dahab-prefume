import { NextResponse } from 'next/server';
import { ProductDbService } from '@/services/ProductDbService.js';

const ALLOWED_SORTS = new Set([
  'name_asc',
  'name_desc',
  'sku_asc',
  'sku_desc',
  'newest',
  'oldest',
]);

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // --- page ---
    let page = parseInt(searchParams.get('page'), 10);
    if (!Number.isFinite(page) || page < 1) page = 1;

    // --- limit ---
    let limit = parseInt(searchParams.get('limit'), 10);
    if (!Number.isFinite(limit) || limit < 1) limit = 24;
    if (limit > 100) limit = 100;

    // --- q (search) ---
    let q = searchParams.get('q');
    if (typeof q === 'string') {
      q = q.trim().slice(0, 200);
      if (q.length === 0) q = undefined;
    } else {
      q = undefined;
    }

    // --- sort ---
    const sortRaw = searchParams.get('sort');
    const sort = ALLOWED_SORTS.has(sortRaw) ? sortRaw : undefined;

    // --- featured ---
    const featuredRaw = searchParams.get('featured');
    const featured = featuredRaw === 'true' ? true : undefined;

    // --- string filters ---
    const main_category = searchParams.get('main_category') || undefined;
    const gender = searchParams.get('gender') || undefined;
    const season = searchParams.get('season') || undefined;
    const family_tag = searchParams.get('family_tag') || undefined;

    const options = {
      page,
      limit,
      ...(q !== undefined && { q }),
      ...(sort !== undefined && { sort }),
      ...(featured !== undefined && { featured }),
      ...(main_category !== undefined && { main_category }),
      ...(gender !== undefined && { gender }),
      ...(season !== undefined && { season }),
      ...(family_tag !== undefined && { family_tag }),
    };

    const result = await ProductDbService.getPublicProducts(options);

    return NextResponse.json(result, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
