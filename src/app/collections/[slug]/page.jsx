import React from 'react';
import CollectionDetailClient from './CollectionDetailClient';

const collectionsData = {
  'hair-mists': {
    title: { ar: 'معطرات الشعر', en: 'Hair Mists' },
    desc: { ar: 'مجموعة معطرات شعر مغذية وغنية بزيت الأرجان لتمنحك ثباتاً يدوم طويلاً وفوحاناً جذاباً.', en: 'Nourishing hair mists enriched with Argan oil for long lasting scent and alluring sillage.' }
  },
  'private-collection': {
    title: { ar: 'المجموعة الخاصة', en: 'Private Collection' },
    desc: { ar: 'خلطات عطرية حصرية تم تركيبها يدوياً بتركيزات زيتية عالية لتلائم أفخم مناسباتك الخاصة.', en: 'Exclusive hand-blended scents with high oil concentrations tailored for your special occasions.' }
  },
  'middle-eastern': {
    title: { ar: 'العطور الشرقية', en: 'Middle Eastern Collection' },
    desc: { ar: 'أشهر عطور دور العطور الشرقية المتميزة بالثبات الفائق والفوحان العالي بلمسة تراثية.', en: 'Famous Middle Eastern scents renowned for high longevity and sillage.' }
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = collectionsData[slug];

  if (!collection) {
    return {
      title: 'Collection Not Found | DAHAB PERFUMES',
    };
  }

  return {
    title: `DAHAB PERFUMES | ${collection.title.en} - ${collection.title.ar}`,
    description: collection.desc.en,
    alternates: {
      canonical: `/collections/${slug}`,
    },
    openGraph: {
      title: `DAHAB PERFUMES | ${collection.title.en}`,
      description: collection.desc.en,
      url: `https://dahabperfume.com/collections/${slug}`,
      siteName: 'DAHAB PERFUMES',
      type: 'website',
    },
  };
}

export default function CollectionDetailPage() {
  return <CollectionDetailClient />;
}

export async function generateStaticParams() {
  return [
    { slug: 'hair-mists' },
    { slug: 'private-collection' },
    { slug: 'middle-eastern' }
  ];
}
