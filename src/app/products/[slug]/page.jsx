import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import ProductDetailClient from './ProductDetailClient';

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

  if (!product || !product.visible) {
    notFound();
  }

  // Fetch some related products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      visible: true
    },
    take: 4,
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      slug: true,
      image_name: true,
      image_url: true,
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
