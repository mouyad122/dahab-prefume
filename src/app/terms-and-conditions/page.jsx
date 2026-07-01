import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'Terms & Conditions | DAHAB PERFUMES',
  description: 'Review the terms and conditions governing purchases and orders made on DAHAB PERFUMES boutique in Jordan.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | DAHAB PERFUMES',
    description: 'Terms of service. Review details regarding Jordanian delivery confirmation and guest rules.',
    url: 'https://dahabperfume.com/terms-and-conditions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | DAHAB PERFUMES',
    description: 'Terms of service. Review details regarding Jordanian delivery confirmation and guest rules.',
  }
};

export default function TermsAndConditionsPage() {
  return <StaticPages />;
}
