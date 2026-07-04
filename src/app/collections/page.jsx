import React from 'react';
import CollectionsClient from './CollectionsClient';
import { prisma } from '../../lib/prisma';
import { ALLOWED_CATEGORY_SLUGS, ALLOWED_SEASON_SLUGS } from '../../lib/productClassification';

export const metadata = {
  title: 'المجموعات | DAHAB PERFUMES',
  description: 'استكشف مجموعات دهب للعطور: العطور الشرقية، المجموعة الخاصة، ومعطرات الشعر.',
  alternates: {
    canonical: '/collections',
  },
};

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const categories = await prisma.category.findMany({
    where: { is_active: true, slug: { in: ALLOWED_CATEGORY_SLUGS } },
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
          products: {
            where: {
              visible: true,
              ready_for_storefront: true,
              category_slug: { in: ALLOWED_CATEGORY_SLUGS },
              season_slug: { in: ALLOWED_SEASON_SLUGS },
            },
          },
        },
      },
    },
  });

  return <CollectionsClient categories={categories} />;
}
