import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Returns & Exchange Policy | DAHAB PERFUMES',
  description: 'Read the DAHAB PERFUMES returns and replacement policies. Inspect your order directly with the courier before pay-upon-delivery.',
  alternates: {
    canonical: '/returns',
  },
  openGraph: {
    title: 'Returns & Exchange Policy | DAHAB PERFUMES',
    description: 'Inspect products directly with the delivery agent prior to paying. Exchange terms and rules.',
    url: 'https://dahabperfume.com/returns',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Returns & Exchange Policy | DAHAB PERFUMES',
    description: 'Inspect products directly with the delivery agent prior to paying.',
  }
};

export default function ReturnsPolicyPage() {
  return <StaticPages />;
}
