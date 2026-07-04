import React from 'react';
import CollectionsClient from './CollectionsClient';
import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'المجموعات | DAHAB PERFUMES',
  description: 'استكشف مجموعات دهب للعطور: العطور الشرقية، المجموعة الخاصة، ومعطرات الشعر.',
  alternates: {
    canonical: '/collections',
  },
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const categories = await prisma.category.findMany({
    where: { is_active: true },
    orderBy: [{ display_order: 'asc' }, { name_ar: 'asc' }],
    select: {
      id: true,
      slug: true,
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
      image: true,
      _count: {
        select: {
          products: { where: { visible: true } },
        },
      },
    },
  });

  return <CollectionsClient categories={categories} />;
}
