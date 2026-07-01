'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { initialProducts } from '../../data/initialProducts';
import ProductPreviewCard from './ProductPreviewCard';

export default function MiddleEasternPreview() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  // Filter Middle Eastern blends
  const easternProducts = initialProducts.filter(p => p.category === 'middle-eastern');

  return (
    <section className="w-full bg-[var(--color-bg-secondary)] py-32 px-6 border-b border-[var(--color-border)] relative overflow-hidden">
      {/* Warm Amber Glow Overlay */}
      <div className="absolute right-[-10%] top-1/4 w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-[var(--color-gold-dark)]/5 blur-[120px] pointer-events-none" />

      <div className="premium-container flex flex-col gap-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 w-full">
          <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)] w-max">
            {isAr ? 'روائح التراث الشرقي' : 'Heritage Blends'}
          </span>
          <div className="flex flex-col gap-2 items-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              {isAr ? 'العطور الشرقية وعطور العود' : 'Middle Eastern Collection'}
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-lg leading-relaxed">
              {isAr 
                ? 'خلطات عطور مميزة تم اختيارها بعناية لتعكس فخامة العود ودفء الهيل والجلود للمناسبات الملكية الشرقية.'
                : 'Warm, oriental masterpieces blended with oud wood, saffron, and dry amber, designed to make a commanding statement.'
              }
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto justify-center justify-items-center">
          {easternProducts.map(product => (
            <ProductPreviewCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
