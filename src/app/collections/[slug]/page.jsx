import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import CollectionDetailClient from './CollectionDetailClient';
import { ALLOWED_CATEGORY_SLUGS, ALLOWED_SEASON_SLUGS } from '../../../lib/productClassification';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

const categorySelect = {
  id: true,
  slug: true,
  name_ar: true,
  name_en: true,
  description_ar: true,
  description_en: true,
  image: true,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

  const category = await prisma.category.findFirst({
    where: {
      slug: cleanSlug,
      is_active: true,
      AND: [{ slug: { in: ALLOWED_CATEGORY_SLUGS } }],
    },
    select: {
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
    },
  });

  if (!category) {
    return { title: 'Collection Not Found | DAHAB PERFUMES' };
  }

  return {
    title: `${category.name_en || category.name_ar} | DAHAB PERFUMES`,
    description: category.description_en || category.description_ar || '',
    alternates: {
      canonical: `/collections/${cleanSlug}`,
    },
  };
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

  const category = await prisma.category.findFirst({
    where: {
      slug: cleanSlug,
      is_active: true,
      AND: [{ slug: { in: ALLOWED_CATEGORY_SLUGS } }],
    },
    select: categorySelect,
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      visible: true,
      ready_for_storefront: true,
      category_slug: { in: ALLOWED_CATEGORY_SLUGS },
      season_slug: { in: ALLOWED_SEASON_SLUGS },
    },
    orderBy: { created_at: 'desc' },
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
          stock: true,
        },
      },
    },
  });

  return <CollectionDetailClient category={category} products={products} />;
}

export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({
      where: { is_active: true, slug: { in: ALLOWED_CATEGORY_SLUGS } },
      select: { slug: true },
    });

    return categories.map((category) => ({ slug: category.slug }));
  } catch {
    return [];
  }
}
