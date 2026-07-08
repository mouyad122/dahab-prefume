import React from 'react';
import { Cormorant_Garamond, Cairo, Outfit } from 'next/font/google';
import { cookies } from 'next/headers';
import '../index.css';
import { Providers } from './providers';
import PublicLayoutWrapper from '../components/layout/PublicLayoutWrapper';
import SecurityGuard from '../components/security/SecurityGuard';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

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
  const cookieStore = cookies();
  const lang = cookieStore.get('dahab_lang')?.value || 'ar';

  return (
    <html lang={lang} dir="ltr" className={`${cormorant.variable} ${cairo.variable} ${outfit.variable}`}>
      <body className="flex flex-col min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300">
        <SecurityGuard />
        <Providers>
          <PublicLayoutWrapper>
            {children}
          </PublicLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
