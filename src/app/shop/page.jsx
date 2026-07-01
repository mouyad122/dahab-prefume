import React from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'DAHAB PERFUMES | Shop Luxury Niche Fragrances',
  description: 'Browse the complete DAHAB PERFUMES catalog. Discover hand-blended luxury hair mists, private selections, and Middle Eastern oud perfumes in Jordan.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'DAHAB PERFUMES | Shop Luxury Niche Fragrances',
    description: 'Let your scent spread your influence. Shop the complete gallery of perfumes and hair mists.',
    url: 'https://dahabperfume.com/shop',
    siteName: 'DAHAB PERFUMES',
    type: 'website',
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
