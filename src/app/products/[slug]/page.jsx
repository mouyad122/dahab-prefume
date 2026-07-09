import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { getCategoryLabel } from '../../../lib/productClassification';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = await prisma.product.findUnique({
    where: { slug: decodedSlug }
  });

  if (!product) return { title: 'Product Not Found' };

  const categoryStr = product.category_slug === 'men' ? 'عطر رجالي' : product.category_slug === 'women' ? 'عطر نسائي' : 'عطر شرقي/للجنسين';
  const familyStr = product.fragrance_family ? `من العائلة العطرية ${product.fragrance_family}` : '';
  const seasonStr = product.season ? `مثالي لفصل ${product.season}` : '';
  const shortDesc = product.short_description || product.short_description_ar || '';
  
  const seoDescription = `${product.name_ar} من DAHAB PERFUMES: ${shortDesc} ${categoryStr} فاخر ${familyStr} ${seasonStr}. متوفر الآن لطلبك في عمان والأردن مع توصيل سريع.`.trim();

  return {
    title: `${product.name_ar} | DAHAB PERFUMES`,
    description: seoDescription,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name_ar} | DAHAB PERFUMES`,
      description: seoDescription,
      url: `https://dahabperfume.com/products/${product.slug}`,
      type: 'website',
      images: [
        {
          url: product.image_url || `https://dahabperfume.com/products/${product.image_name || 'placeholder.png'}`,
          width: 800,
          height: 800,
          alt: `${product.name_ar} من DAHAB PERFUMES`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name_ar} | DAHAB PERFUMES`,
      description: seoDescription,
      images: [product.image_url || `https://dahabperfume.com/products/${product.image_name || 'placeholder.png'}`],
    }
  };
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const product = await prisma.product.findUnique({
    where: { slug: decodedSlug },
    include: {
      category: true,
      variants: true,
      accords: {
        orderBy: { position: 'asc' }
      },
      family_tags: true
    }
  });

  if (!product) {
    notFound();
  }

  // Fetch some related products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId || undefined,
      id: { not: product.id },
      visible: true,
      ready_for_storefront: true,
    },
    take: 4,
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      slug: true,
      image_name: true,
      image_url: true,
      category_slug: true,
      season_slug: true,
      season: true,
      category: {
        select: { id: true, slug: true, name_ar: true, name_en: true },
      },
      variants: {
        select: {
          id: true,
          volume: true,
          price: true,
          stock: true
        }
      }
    }
  });

  // Construct Product JSON-LD structured data safely
  const variants = product.variants || [];
  const defaultVariant = variants.find(v => v.price > 0) || variants[0];
  const startingPrice = defaultVariant ? (defaultVariant.price / 1000).toFixed(2) : '0.00';
  const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0);
  const availability = totalStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
  
  const productImage = product.image_url || `https://dahabperfume.com/products/${product.image_name || 'placeholder.png'}`;
  
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name_ar,
    'description': product.short_description || product.short_description_ar || `${product.name_ar} عطر فاخر من دهب للعطور.`,
    'image': [productImage],
    'sku': product.sku,
    'brand': {
      '@type': 'Brand',
      'name': 'DAHAB PERFUMES'
    },
    'category': product.category?.name_ar || 'عطور',
    'offers': {
      '@type': 'Offer',
      'url': `https://dahabperfume.com/products/${product.slug}`,
      'priceCurrency': 'JOD',
      'price': startingPrice,
      'availability': availability,
      'itemCondition': 'https://schema.org/NewCondition'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
