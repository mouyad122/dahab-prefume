import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import CollectionDetailClient from './CollectionDetailClient';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = slug.trim().toLowerCase();
  const altSlug = cleanSlug.replace('-collection', '').replace('collection-', '');

  const category = await prisma.category.findFirst({
    where: {
      OR: [
        { slug: cleanSlug },
        { slug: altSlug },
        { slug: { contains: altSlug } }
      ],
      is_active: true
    },
    select: {
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
    },
  });

  if (!category) {
    return { title: 'المجموعة الخاصة | DAHAB PERFUMES' };
  }

  return {
    title: `${category.name_en || category.name_ar} | DAHAB PERFUMES`,
    description: category.description_en || category.description_ar || '',
    alternates: {
      canonical: `/collections/${slug}`,
    },
  };
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const cleanSlug = slug.trim().toLowerCase();
  const altSlug = cleanSlug.replace('-collection', '').replace('collection-', '');

  let category = await prisma.category.findFirst({
    where: {
      OR: [
        { slug: cleanSlug },
        { slug: altSlug },
        { slug: { contains: altSlug } }
      ],
      is_active: true
    },
    select: {
      id: true,
      slug: true,
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
      image: true,
    },
  });

  if (!category) {
    category = await prisma.category.findFirst({
      where: {
        OR: [
          { slug: { contains: altSlug } },
          { name_en: { contains: altSlug } },
          { name_ar: { contains: altSlug } }
        ]
      },
      select: {
        id: true,
        slug: true,
        name_ar: true,
        name_en: true,
        description_ar: true,
        description_en: true,
        image: true,
      },
    });
  }

  if (!category) {
    try {
      const isPrivate = cleanSlug.includes('private');
      const isHair = cleanSlug.includes('hair');
      const isEastern = cleanSlug.includes('eastern') || cleanSlug.includes('middle');

      category = await prisma.category.create({
        data: {
          slug: cleanSlug,
          name_ar: isPrivate ? 'المجموعة الخاصة (Private Collection)' : isHair ? 'معطرات الشعر (Hair Mists)' : isEastern ? 'العطور الشرقية والعود' : 'المجموعة الخاصة',
          name_en: isPrivate ? 'Private Collection' : isHair ? 'Hair Mists' : isEastern ? 'Middle Eastern & Oud' : 'Private Collection',
          description_ar: 'تشكيلة فاخرة وحصرية من أبدع عطور وخلطات DAHAB PERFUMES المميزة.',
          description_en: 'An exclusive luxury fragrance collection from DAHAB PERFUMES.',
          is_active: true,
          display_order: 1
        },
        select: {
          id: true,
          slug: true,
          name_ar: true,
          name_en: true,
          description_ar: true,
          description_en: true,
          image: true,
        }
      });
    } catch (e) {
      category = await prisma.category.findFirst({
        where: { slug: cleanSlug },
        select: {
          id: true,
          slug: true,
          name_ar: true,
          name_en: true,
          description_ar: true,
          description_en: true,
          image: true,
        }
      });
    }
  }

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { categoryId: category.id },
        { main_category: { contains: altSlug } },
        { main_category: { contains: cleanSlug } }
      ],
      visible_on_website: true,
    },
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      slug: true,
      stock: true,
      images_360: true,
      media_display_type: true,
      price_50ml_fils: true,
      price_100ml_fils: true,
      price_200ml_fils: true,
      category: {
        select: { id: true, name_ar: true, name_en: true },
      },
    },
  });

  return <CollectionDetailClient category={category} products={products} />;
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { is_active: true },
    select: { slug: true },
  });

  const slugs = new Set(categories.map((c) => c.slug));
  slugs.add('private-collection');
  slugs.add('private');
  slugs.add('hair-mists');
  slugs.add('middle-eastern');

  return Array.from(slugs).map((s) => ({ slug: s }));
}
