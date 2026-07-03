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
      where: { visible_on_website: true },
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        name_ar: true,
        name_en: true,
        slug: true,
        image_filename: true,
        categoryId: true,
        category: {
          select: { id: true, name_ar: true, name_en: true },
        },
        visible_on_website: true,
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
