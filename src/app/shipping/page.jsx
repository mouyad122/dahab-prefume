import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Shipping and Delivery | DAHAB PERFUMES',
  description: 'Understand local shipping fees and delivery timelines for Jordan. Amman 2.00 JOD, other governorates 3.00-4.00 JOD.',
  alternates: {
    canonical: '/shipping',
  },
  openGraph: {
    title: 'Shipping and Delivery | DAHAB PERFUMES',
    description: 'Boutique delivery rates and timelines across Jordan. Amman, Zarqa, Irbid, Aqaba, and other areas.',
    url: 'https://dahabperfume.com/shipping',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping and Delivery | DAHAB PERFUMES',
    description: 'Boutique delivery rates and timelines across Jordan.',
  }
};

export default function ShippingInfoPage() {
  return <StaticPages />;
}
