import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { ALLOWED_CATEGORY_SLUGS, ALLOWED_SEASON_SLUGS, getCategoryLabel } from '../../../lib/productClassification';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = await prisma.product.findUnique({
    where: { slug: decodedSlug }
  });

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name_ar} | DAHAB PERFUMES`,
    description: product.short_description,
  };
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const product = await prisma.product.findUnique({
    where: { slug: decodedSlug },
    include: {
      category: true,
      variants: true,
      accords: {
        orderBy: { position: 'asc' }
      },
      family_tags: true
    }
  });

  const categorySlug = product?.category_slug || getCategoryLabel(product, 'en')?.toLowerCase();
  const seasonSlug = product?.season_slug || (product?.season === 'كل المواسم' ? 'both' : null);

  if (!product || !product.visible) {
    notFound();
  }

  // Fetch some related products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId || undefined,
      id: { not: product.id },
      visible: true,
      ready_for_storefront: true,
    },
    take: 4,
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      slug: true,
      image_name: true,
      image_url: true,
      category_slug: true,
      season_slug: true,
      season: true,
      category: {
        select: { id: true, slug: true, name_ar: true, name_en: true },
      },
      variants: {
        select: {
          id: true,
          volume: true,
          price: true,
          stock: true
        }
      }
    }
  });

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
