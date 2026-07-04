import { NextResponse } from 'next/server';
import { ProductDbService } from '@/services/ProductDbService.js';


export const dynamic = 'force-dynamic';
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    let limit = parseInt(searchParams.get('limit'), 10);
    if (!Number.isFinite(limit) || limit < 1) limit = 12;
    if (limit > 50) limit = 50;

    const products = await ProductDbService.getFeaturedPublicProducts(limit);

    return NextResponse.json({ products }, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('[GET /api/products/featured]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
