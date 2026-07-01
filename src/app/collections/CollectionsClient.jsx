'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { initialProducts } from '../../data/initialProducts';
import Link from 'next/link';

export default function CollectionsClient() {
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
    'middle-eastern': {
      title: { ar: 'العطور الشرقية', en: 'Middle Eastern Collection' },
      desc: { ar: 'أشهر عطور دور العطور الشرقية المميزة بالثبات والفوحان العالي.', en: 'Famous Middle Eastern scents renowned for high longevity and projection.' }
    }
  };

  const getProductCount = (categoryKey) => {
    return initialProducts.filter(p => p.category === categoryKey).length;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center gap-16">
      <div className="text-center flex flex-col items-center gap-4">
        <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
          {t('collections')}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {isAr ? 'مجموعات عطور دهب' : 'Dahab Perfume Collections'}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {isAr ? 'اكتشف خطوطنا المتنوعة من معطرات الشعر الفخمة والعطور الملكية.' : 'Explore our diverse lines of elegant hair mists and royal fragrances.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {Object.entries(collectionsData).map(([key, col]) => {
          const count = getProductCount(key);
          return (
            <div key={key} className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]">
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 shadow-main text-center flex flex-col gap-5 items-center h-full justify-between">
                <div className="flex flex-col gap-4 items-center">
                  <span className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold bg-[var(--color-gold-dim)] px-3 py-1 rounded-full border border-[var(--color-gold)]/10">
                    {count} {isAr ? 'عطور' : 'Scents'}
                  </span>
                  
                  <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
                    {t(col.title)}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-light">
                    {t(col.desc)}
                  </p>
                </div>
                
                <Link href={`/collections/${key}`} className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-wider hover:text-[var(--color-gold-light)] transition-colors mt-2">
                  {isAr ? 'عرض المجموعة ──' : 'View Collection ──'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
