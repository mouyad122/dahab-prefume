'use client';

import React, { useContext, useEffect } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useProductStore } from '../../stores/useProductStore';
import Link from 'next/link';

export default function Shop() {
  const { language, t } = useContext(LanguageContext);
  const products = useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const isAr = language === 'ar';

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center gap-12">
      <div className="text-center flex flex-col items-center gap-3">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          {t('collections')}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider">
          {isAr ? 'معرض العطور الفاخرة' : 'Luxury Fragrance Gallery'}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {isAr ? 'تصفح واكتشف تشكيلتنا الكاملة من عطور الشعر والخلطات الشرقية الخاصة.' : 'Browse and discover our full range of hair mists and private oriental blends.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {products.map(product => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`} 
            className="card-luxury flex flex-col gap-4 text-center items-center"
          >
            <div className="w-full aspect-square overflow-hidden rounded bg-[var(--color-bg-primary)]">
              <img src={product.thumbnail} alt={t(product.title)} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[var(--color-gold)]">
              {product.category}
            </span>
            <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
              {t(product.title)}
            </h3>
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              {product.price.toFixed(2)} JOD
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
