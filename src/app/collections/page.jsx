import React from 'react';
import CollectionsClient from './CollectionsClient';

export const metadata = {
  title: 'DAHAB PERFUMES | Luxury Fragrance Collections',
  description: 'Explore the exclusive DAHAB PERFUMES lines. Discover our nourishing hair mists, high-oil private collection blends, and warm Middle Eastern oud fragrances.',
  alternates: {
    canonical: '/collections',
  },
  openGraph: {
    title: 'DAHAB PERFUMES | Luxury Fragrance Collections',
    description: 'Let your scent spread your influence. Browse our curated fragrance collections.',
    url: 'https://dahabperfume.com/collections',
    siteName: 'DAHAB PERFUMES',
    type: 'website',
  },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
