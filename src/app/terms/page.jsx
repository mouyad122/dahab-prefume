import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'الشروط والأحكام | DAHAB PERFUMES',
  description: 'الشروط والأحكام الخاصة بمتجر دهب للعطور (DAHAB PERFUMES). يرجى مراجعة شروط الخدمة وتأكيد الطلبات والتوصيل لجميع مناطق الأردن.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'الشروط والأحكام | DAHAB PERFUMES',
    description: 'الشروط والأحكام الخاصة بمتجر دهب للعطور. يرجى مراجعة شروط الخدمة والتوصيل داخل الأردن.',
    url: 'https://dahabperfume.com/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الشروط والأحكام | DAHAB PERFUMES',
    description: 'الشروط والأحكام الخاصة بمتجر دهب للعطور.',
  }
};

export default function TermsPage() {
  return <StaticPages />;
}
