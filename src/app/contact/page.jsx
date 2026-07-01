import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Contact Us | DAHAB PERFUMES',
  description: 'Get in touch with DAHAB PERFUMES in Amman, Jordan. Contact us via phone, WhatsApp, or visit our physical boutique showroom Downtown.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | DAHAB PERFUMES',
    description: 'Reach out to DAHAB PERFUMES in Downtown Amman for queries or custom scent consultations.',
    url: 'https://dahabperfume.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | DAHAB PERFUMES',
    description: 'Reach out to DAHAB PERFUMES in Downtown Amman for queries or custom scent consultations.',
  }
};

export default function ContactPage() {
  return <StaticPages />;
}
