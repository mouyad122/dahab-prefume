import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';

export const metadata = {
  title: 'موقع دهب للعطور في وسط البلد عمّان | DAHAB PERFUMES',
  description: 'قم بزيارة معرض دهب للعطور (DAHAB PERFUMES)، أفضل محل عطور في وسط البلد عمان، الأردن. اكتشف عطورنا الفاخرة وخلطاتنا العطرية المميزة في موقعنا بشارع الأمير محمد.',
  alternates: {
    canonical: '/location',
  },
  openGraph: {
    title: 'موقع دهب للعطور في وسط البلد عمّان | DAHAB PERFUMES',
    description: 'قم بزيارة معرض دهب للعطور في وسط البلد عمان، الأردن. جرب عطورنا الشرقية والفرنسية والخلطات العطرية المميزة في موقعنا.',
    url: 'https://dahabperfume.com/location',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'موقع دهب للعطور في وسط البلد عمّان | DAHAB PERFUMES',
    description: 'قم بزيارة معرض دهب للعطور في وسط البلد عمان، الأردن.',
  }
};

export default function LocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    'name': 'DAHAB PERFUMES',
    'alternateName': 'دهب للعطور',
    'telephone': '+962785050655',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'وسط البلد، شارع الأمير محمد',
      'addressLocality': 'عمّان',
      'addressCountry': 'JO'
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Jordan'
    },
    'url': 'https://dahabperfume.com',
    'logo': 'https://dahabperfume.com/brand/dahab-logo.png',
    'priceRange': 'JOD'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StaticPages />
    </>
  );
}
