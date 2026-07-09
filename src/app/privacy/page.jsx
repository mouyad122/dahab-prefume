import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'سياسة الخصوصية | DAHAB PERFUMES',
  description: 'سياسة الخصوصية لمتجر دهب للعطور (DAHAB PERFUMES). نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية ولا نقوم بتخزين بيانات الدفع الحساسة.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'سياسة الخصوصية | DAHAB PERFUMES',
    description: 'سياسة الخصوصية لمتجر دهب للعطور. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.',
    url: 'https://dahabperfume.com/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سياسة الخصوصية | DAHAB PERFUMES',
    description: 'سياسة الخصوصية لمتجر دهب للعطور.',
  }
};

export default function PrivacyPage() {
  return <StaticPages />;
}
