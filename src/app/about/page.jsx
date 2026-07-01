import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'About Us | DAHAB PERFUMES',
  description: 'Learn about DAHAB PERFUMES, a luxury fragrance boutique in Downtown Amman, Jordan. Discover our heritage, hand-blended scent oils, and niche perfumes.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | DAHAB PERFUMES',
    description: 'The story and heritage of DAHAB PERFUMES in Downtown Amman, Jordan.',
    url: 'https://dahabperfume.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | DAHAB PERFUMES',
    description: 'The story and heritage of DAHAB PERFUMES in Downtown Amman, Jordan.',
  }
};

export default function AboutPage() {
  return <StaticPages />;
}
