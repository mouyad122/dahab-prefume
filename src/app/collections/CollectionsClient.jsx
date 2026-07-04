'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import PageContainer from '../../components/layout/PageContainer';

const fallbackCollections = [
  {
    id: 'hair-mists',
    slug: 'hair-mists',
    name_ar: 'معطرات الشعر',
    name_en: 'Hair Mists',
    description_ar: 'معطرات شعر ناعمة للاستخدام اليومي.',
    description_en: 'Soft daily hair mists.',
    _count: { products: 0 },
  },
  {
    id: 'private-collection',
    slug: 'private-collection',
    name_ar: 'المجموعة الخاصة',
    name_en: 'Private Collection',
    description_ar: 'تركيبات عطرية أكثر تركيزًا للمناسبات.',
    description_en: 'Richer blends for special occasions.',
    _count: { products: 0 },
  },
  {
    id: 'oud',
    slug: 'oud',
    name_ar: 'العطور الشرقية (عود)',
    name_en: 'Middle Eastern (Oud)',
    description_ar: 'عود، عنبر، مسك وتوابل شرقية دافئة.',
    description_en: 'Oud, amber, musk, and warm oriental spices.',
    _count: { products: 0 },
  },
];

export default function CollectionsClient({ categories = [] }) {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const list = categories.length > 0 ? categories : fallbackCollections;

  return (
    <main className={`shop-page ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <section className="shop-hero">
        <PageContainer size="default" className="py-0">
          <div className="shop-hero-inner">
            <div>
              <div className="eyebrow">
                <Sparkle size={15} weight="fill" />
                <span>{isAr ? 'مجموعات دهب' : 'Dahab Collections'}</span>
              </div>
              <h1>{isAr ? 'مجموعات عطرية منظمة حسب حضورك.' : 'Fragrance lines arranged around presence.'}</h1>
              <p>
                {isAr
                  ? 'اختر بين العطور الشرقية، المجموعة الخاصة، ومعطرات الشعر، مع ربط مباشر بالمنتجات الفعلية في قاعدة البيانات.'
                  : 'Explore oriental signatures, private blends, and hair mists, all connected to the live product catalog.'}
              </p>
            </div>
            <div className="shop-count">
              <strong>{list.length}</strong>
              <span>{isAr ? 'مجموعة' : 'collections'}</span>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer as="section" size="default" className="collection-grid pb-20 pt-8">
        {list.map((category) => {
          const title = (isAr ? category.name_ar : category.name_en) || category.name_ar || category.name_en;
          const description = (isAr ? category.description_ar : category.description_en) || category.description_ar || category.description_en;
          return (
            <Link key={category.id} href={`/collections/${category.slug}`} className="collection-tile">
              <img
                src={category.image || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900'}
                alt={title}
              />
              <div>
                <span className="media-pill static inline-flex mb-3">
                  {category._count?.products || 0} {isAr ? 'منتج' : 'products'}
                </span>
                <h3>{title}</h3>
                <p>{description || (isAr ? 'مجموعة مختارة من عطور دهب.' : 'A curated Dahab fragrance line.')}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-gold-light)]">
                  {isAr ? 'عرض المجموعة' : 'View collection'}
                  <ArrowIcon size={16} />
                </span>
              </div>
            </Link>
          );
        })}
      </PageContainer>
    </main>
  );
}
