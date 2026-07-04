import { NextResponse } from 'next/server';
import { ProductDbService } from '@/services/ProductDbService.js';


export const dynamic = 'force-dynamic';
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
};

export async function GET() {
  try {
    const filters = await ProductDbService.getPublicFilters();

    return NextResponse.json(filters, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('[GET /api/products/filters]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
