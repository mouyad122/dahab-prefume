import React from 'react';
import ProductDetailClient from './ProductDetailClient';
import { initialProducts } from '../../../data/initialProducts';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = initialProducts.find(p => p.slug === slug);

  if (!product) {
    return {
      title: 'Fragrance Not Found | DAHAB PERFUMES',
    };
  }

  return {
    title: `DAHAB PERFUMES | ${product.title.en} - ${product.title.ar}`,
    description: product.shortDescription.en,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: `DAHAB PERFUMES | ${product.title.en}`,
      description: product.shortDescription.en,
      url: `https://dahabperfume.com/products/${slug}`,
      siteName: 'DAHAB PERFUMES',
      images: [
        {
          url: product.thumbnail,
          width: 600,
          height: 600,
          alt: product.title.en,
        },
      ],
      type: 'music.song', // Generic custom og type, or website
    },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
export async function generateStaticParams() {
  return initialProducts.map((product) => ({
    slug: product.slug,
  }));
}
