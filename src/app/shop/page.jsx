import React from 'react';
import ShopClient from './ShopClient';
import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'المتجر | DAHAB PERFUMES',
  description: 'تصفّح مجموعة دهب الكاملة من العطور الشرقية والعالمية ومعطرات الشعر.',
};

export const revalidate = 60;

export default async function ShopPage() {
  let initialProducts = [];

  try {
    initialProducts = await prisma.product.findMany({
      where: { visible: true },
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
        fragrance_family: true,
        short_description: true,
        featured: true,
        categoryId: true,
        category: {
          select: { id: true, name_ar: true, name_en: true },
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
