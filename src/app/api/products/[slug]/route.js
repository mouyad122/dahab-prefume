import { NextResponse } from 'next/server';
import { ProductDbService } from '@/services/ProductDbService.js';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
};

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const product = await ProductDbService.getPublicProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('[GET /api/products/[slug]]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
