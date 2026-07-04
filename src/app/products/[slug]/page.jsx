import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { ALLOWED_CATEGORY_SLUGS, ALLOWED_SEASON_SLUGS } from '../../../lib/productClassification';

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

  if (
    !product ||
    !product.visible ||
    !product.ready_for_storefront ||
    !ALLOWED_CATEGORY_SLUGS.includes(product.category_slug) ||
    !ALLOWED_SEASON_SLUGS.includes(product.season_slug)
  ) {
    notFound();
  }

  // Fetch some related products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      visible: true,
      ready_for_storefront: true,
      category_slug: { in: ALLOWED_CATEGORY_SLUGS },
      season_slug: { in: ALLOWED_SEASON_SLUGS },
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
