import { NextResponse } from 'next/server';
import { ProductDbService } from '@/services/ProductDbService.js';
import { getCache, setCache } from '@/lib/cache';


export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    let limit = parseInt(searchParams.get('limit'), 10);
    if (!Number.isFinite(limit) || limit < 1) limit = 12;
    if (limit > 50) limit = 50;

    const cacheKey = `featured:limit=${limit}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT', 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
      });
    }

    const products = await ProductDbService.getFeaturedPublicProducts(limit);
    const body = { products };

    await setCache(cacheKey, body, 600);

    return NextResponse.json(body, {
      headers: { 'X-Cache': 'MISS', 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch (error) {
    console.error('[GET /api/products/featured]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
