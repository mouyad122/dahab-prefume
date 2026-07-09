import React from 'react';
import HomeExperience from '../components/home/HomeExperience';

export const metadata = {
  title: 'DAHAB PERFUMES | عطور فاخرة في عمّان',
  description: 'اكتشف عطور دهب الفاخرة في عمّان، عطور رجالية ونسائية وعود وخلطات عطرية مختارة مع طلب سريع عبر واتساب.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DAHAB PERFUMES | عطور فاخرة في عمّان',
    description: 'اكتشف عطور دهب الفاخرة في عمّان، عطور رجالية ونسائية وعود وخلطات عطرية مختارة مع طلب سريع عبر واتساب.',
    url: 'https://dahabperfume.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAHAB PERFUMES | عطور فاخرة في عمّان',
    description: 'اكتشف عطور دهب الفاخرة في عمّان، عطور رجالية ونسائية وعود وخلطات عطرية مختارة مع طلب سريع عبر واتساب.',
  }
};

export default function Home() {
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
      <HomeExperience />
    </>
  );
}
