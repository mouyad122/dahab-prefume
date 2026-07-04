'use client';

import React, { useContext } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Collections() {
  const { slug } = useParams();
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const collectionsData = {
    'hair-mists': {
      title: { ar: 'معطرات الشعر', en: 'Hair Mists' },
      desc: { ar: 'مجموعة معطرات شعر مغذية وغنية بزيت الأرجان لتمنحك ثباتاً يدوم طويلاً.', en: 'Nourishing hair mists enriched with Argan oil for long lasting scent.' }
    },
    'private-collection': {
      title: { ar: 'المجموعة الخاصة', en: 'Private Collection' },
      desc: { ar: 'خلطات عطرية حصرية تم تركيبها يدوياً بتركيزات زيتية عالية للمناسبات الخاصة.', en: 'Exclusive hand-blended scents with high oil concentrations for special occasions.' }
    },
    'oud': {
      title: { ar: 'العطور الشرقية (عود)', en: 'Middle Eastern Collection (Oud)' },
      desc: { ar: 'أشهر عطور دور العطور الشرقية المميزة بالثبات والفوحان العالي.', en: 'Famous Middle Eastern scents renowned for high longevity and projection.' }
    }
  };

  const currentCollection = slug ? collectionsData[slug] : null;

  if (slug && !currentCollection) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-xl font-bold">{isAr ? 'المجموعة غير متوفرة' : 'Collection Not Found'}</h2>
        <Link href="/collections" className="btn-primary mt-6">{t('collections')}</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center gap-12">
      <div className="text-center flex flex-col items-center gap-3">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          {t('collections')}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider">
          {currentCollection ? t(currentCollection.title) : (isAr ? 'مجموعات عطور دهب' : 'Dahab Perfume Collections')}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {currentCollection 
            ? t(currentCollection.desc) 
            : (isAr ? 'اكتشف خطوطنا المتنوعة من معطرات الشعر الفخمة والعطور الملكية.' : 'Explore our diverse lines of elegant hair mists and royal fragrances.')
          }
        </p>
      </div>

      {!slug && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {Object.entries(collectionsData).map(([key, col]) => (
            <Link key={key} href={`/collections/${key}`} className="card-luxury text-center flex flex-col gap-4 items-center">
              <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
                {t(col.title)}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-light">
                {t(col.desc)}
              </p>
              <span className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-wider">
                {isAr ? 'عرض المجموعة ──' : 'View Collection ──'}
              </span>
            </Link>
          ))}
        </div>
      )}

      {slug && (
        <div className="text-center">
          <Link href="/shop" className="btn-primary">
            {isAr ? 'تصفح كل المنتجات في المتجر' : 'Browse All Products in Shop'}
          </Link>
        </div>
      )}
    </div>
  );
}
