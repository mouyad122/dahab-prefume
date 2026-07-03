import React from 'react';
import LuxuryContactView from '../../components/contact/LuxuryContactView';

export const metadata = {
  title: 'تواصل معنا | DAHAB PERFUMES',
  description: 'تواصل مباشرة مع دار دهب للعطور عبر الواتساب أو الهاتف للاستفسار عن العطور، توفر المنتجات، وطلب التوصيات الفاخرة.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'تواصل معنا | DAHAB PERFUMES',
    description: 'استفسارات العطور وتجربة التواصل المباشر مع دهب للعطور.',
    url: 'https://dahabperfume.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تواصل معنا | DAHAB PERFUMES',
    description: 'استفسارات العطور وتجربة التواصل المباشر مع دهب للعطور.',
  }
};

export default function ContactPage() {
  return <LuxuryContactView />;
}
