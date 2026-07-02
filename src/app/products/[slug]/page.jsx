import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name_ar} | DAHAB PERFUMES`,
    description: product.short_description_ar,
  };
}

export const revalidate = 60;

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true
    }
  });

  if (!product || !product.visible_on_website) {
    notFound();
  }

  // Fetch some related products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      visible_on_website: true
    },
    take: 4,
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      slug: true,
      price_50ml_fils: true,
      price_100ml_fils: true,
      price_200ml_fils: true,
      images_360: true
    }
  });

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
