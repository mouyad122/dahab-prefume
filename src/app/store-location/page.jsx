import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Boutique Location | DAHAB PERFUMES',
  description: 'Visit the physical showroom of DAHAB PERFUMES on Prince Muhammad Street, Downtown Amman, Jordan. Experience our niche blends in person.',
  alternates: {
    canonical: '/store-location',
  },
  openGraph: {
    title: 'Boutique Location | DAHAB PERFUMES',
    description: 'Find us in Downtown Amman on Prince Muhammad Street. Experience our niche perfumes in person.',
    url: 'https://dahabperfume.com/store-location',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boutique Location | DAHAB PERFUMES',
    description: 'Find us in Downtown Amman on Prince Muhammad Street. Experience our niche perfumes in person.',
  }
};

export default function StoreLocationPage() {
  return <StaticPages />;
}
