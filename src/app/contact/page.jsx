import React from 'react';
import LuxuryContactView from '../../components/contact/LuxuryContactView';

export const metadata = {
  title: 'اتصل بنا | DAHAB PERFUMES',
  description: 'تواصل مع دهب للعطور (DAHAB PERFUMES) في عمان، الأردن. نسعد بخدمتكم والرد على استفساراتكم واقتراحاتكم وتلقي طلباتكم الفورية.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'اتصل بنا | DAHAB PERFUMES',
    description: 'تواصل مع دهب للعطور في عمان، الأردن. نسعد بخدمتكم وتلقي طلباتكم الفورية.',
    url: 'https://dahabperfume.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اتصل بنا | DAHAB PERFUMES',
    description: 'تواصل مع دهب للعطور في عمان، الأردن.',
  }
};

export default function ContactPage() {
  return <LuxuryContactView />;
}
