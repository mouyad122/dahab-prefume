import React from 'react';
import ShopClient from './ShopClient';
import { prisma } from '../../lib/prisma';
import { ALLOWED_CATEGORY_SLUGS, ALLOWED_SEASON_SLUGS } from '../../lib/productClassification';

export const metadata = {
  title: 'تسوق عطور رجالية ونسائية وعود في الأردن | DAHAB PERFUMES',
  description: 'تسوق عطور دهب الفاخرة أونلاين في الأردن. تشكيلة مميزة من عطور رجالية ونسائية، عود، وخلطات عطرية مع توصيل سريع لجميع المحافظات.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'تسوق عطور رجالية ونسائية وعود في الأردن | DAHAB PERFUMES',
    description: 'تسوق عطور دهب الفاخرة أونلاين في الأردن. تشكيلة مميزة من عطور رجالية ونسائية، عود، وخلطات عطرية مع توصيل سريع لجميع المحافظات.',
    url: 'https://dahabperfume.com/shop',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تسوق عطور رجالية ونسائية وعود في الأردن | DAHAB PERFUMES',
    description: 'تسوق عطور دهب الفاخرة أونلاين في الأردن.',
  }
};

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  let initialProducts = [];

  try {
    initialProducts = await prisma.product.findMany({
      where: {
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
        gender: true,
        season: true,
        season_slug: true,
        category_slug: true,
        fragrance_family: true,
        short_description: true,
        featured: true,
        categoryId: true,
        category: {
          select: { id: true, slug: true, name_ar: true, name_en: true },
        },
        visible: true,
        accords: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            name_ar: true,
            strength: true,
            position: true,
          },
        },
        variants: {
          select: {
            id: true,
            volume: true,
            price: true,
            stock: true
          }
        }
      },
    });
  } catch (error) {
    console.error('Failed to fetch initial products for Shop', error);
  }

  return <ShopClient initialProducts={initialProducts} />;
}
