import React from 'react';
import '../index.css';
import { Providers } from './providers';
import PublicLayoutWrapper from '../components/layout/PublicLayoutWrapper';

export const metadata = {
  title: 'DAHAB PERFUMES | Luxury Fragrance Boutique',
  description: 'Hand-blended luxury niche fragrances and hair mists with unmatched longevity and projection. Downtown Amman, Jordan.',
  metadataBase: new URL('https://dahabperfume.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DAHAB PERFUMES | Luxury Fragrance Boutique',
    description: 'Let your scent spread your influence. Hand-blended luxury niche fragrances and hair mists.',
    url: 'https://dahabperfume.com',
    siteName: 'DAHAB PERFUMES',
    images: [
      {
        url: '/images/background.jpg',
        width: 1200,
        height: 630,
        alt: 'DAHAB PERFUMES Luxury Boutique',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAHAB PERFUMES | Luxury Fragrance Boutique',
    description: 'Hand-blended luxury niche fragrances and hair mists. Let your scent spread your influence.',
    images: ['/images/background.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex flex-col min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] text-center transition-colors duration-300">
        <Providers>
          <PublicLayoutWrapper>
            {children}
          </PublicLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
