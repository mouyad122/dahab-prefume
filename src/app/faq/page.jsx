import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Frequently Asked Questions | DAHAB PERFUMES',
  description: 'Find answers about DAHAB PERFUMES longevity, hair mist ingredients, local delivery rates, and how cash on delivery works in Jordan.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | DAHAB PERFUMES',
    description: 'Learn about DAHAB PERFUMES longevity, delivery, and testing policy prior to purchasing.',
    url: 'https://dahabperfume.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | DAHAB PERFUMES',
    description: 'Learn about DAHAB PERFUMES longevity, delivery, and testing policy prior to purchasing.',
  }
};

export default function FAQPage() {
  return <StaticPages />;
}
