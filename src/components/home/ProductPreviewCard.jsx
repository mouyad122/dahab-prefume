'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function ProductPreviewCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  return (
    <Link href={`/products/${product.slug}`} className="group luxury-card flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className="luxury-media aspect-square">
        <img
          src={product.thumbnail}
          alt={t(product.title)}
          className="size-full object-cover opacity-88 transition-transform duration-700 group-hover:scale-105"
        />
        {product.compareAtPrice && (
          <span className="absolute right-3 top-3 z-10 rounded-md bg-[var(--color-gold)] px-2.5 py-1 text-xs font-bold text-black">
            {isAr ? 'عرض' : 'Offer'}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-4 ${isAr ? 'dir-ar' : 'dir-en'}`}>
        <span className="text-xs font-bold text-[var(--color-gold-light)]">
          {product.volume}
        </span>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--color-text-primary)]">
          {t(product.title)}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">
          {t(product.shortDescription)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-bold text-[var(--color-text-primary)] tabular-nums">
            {product.price.toFixed(2)} JOD
          </span>
          <span className="grid size-9 place-items-center rounded-md border border-[var(--color-border)] text-[var(--color-gold-light)] transition-colors group-hover:border-[var(--color-gold)]">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </div>
      </div>
    </Link>
  );
}
