import { NextResponse } from 'next/server';
import { ProductDbService } from '@/services/ProductDbService.js';
import { getCache, setCache } from '@/lib/cache';


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cacheKey = 'filters:v1';
    const cached = await getCache(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT', 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
      });
    }

    const filters = await ProductDbService.getPublicFilters();

    await setCache(cacheKey, filters, 3600);

    return NextResponse.json(filters, {
      headers: { 'X-Cache': 'MISS', 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    console.error('[GET /api/products/filters]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
