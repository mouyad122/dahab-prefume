import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Privacy Policy | DAHAB PERFUMES',
  description: 'Understand how DAHAB PERFUMES handles user privacy. We do not store sensitive credit card or permanent customer profile details.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | DAHAB PERFUMES',
    description: 'Boutique privacy terms. Security, safety, and WhatsApp order handoff handling details.',
    url: 'https://dahabperfume.com/privacy-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | DAHAB PERFUMES',
    description: 'Boutique privacy terms. Security, safety, and WhatsApp order handoff handling details.',
  }
};

export default function PrivacyPolicyPage() {
  return <StaticPages />;
}
