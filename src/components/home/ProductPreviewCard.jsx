'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function ProductPreviewCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  return (
    <div className="rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]">
      <Link 
        href={`/products/${product.slug}`} 
        className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 flex flex-col gap-4 text-center items-center shadow-main h-full justify-between focus-visible:outline-none"
      >
        <div className="w-full flex flex-col items-center gap-3">
          {/* Thumbnail enclosure */}
          <div className="w-full aspect-square overflow-hidden rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] relative">
            <img 
              src={product.thumbnail} 
              alt={t(product.title)} 
              className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
            />
            {product.compareAtPrice && (
              <span className="absolute top-3 right-3 bg-[var(--color-gold-dark)] text-[#FAFAF7] text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {isAr ? 'عرض' : 'Sale'}
              </span>
            )}
          </div>
          
          <span className="text-[8px] uppercase tracking-widest text-[var(--color-gold)] font-bold">
            {product.category}
          </span>
          
          <h3 className="font-display text-md font-bold text-[var(--color-text-primary)] leading-tight">
            {t(product.title)}
          </h3>
        </div>

        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">
              {product.price.toFixed(2)} JOD
            </span>
            {product.compareAtPrice && (
              <span className="text-[10px] line-through text-[var(--color-text-muted)]">
                {product.compareAtPrice.toFixed(2)} JOD
              </span>
            )}
          </div>
          <span className="text-[8px] text-[var(--color-text-muted)] tracking-wider uppercase">
            Volume: {product.volume}
          </span>
        </div>
      </Link>
    </div>
  );
}
