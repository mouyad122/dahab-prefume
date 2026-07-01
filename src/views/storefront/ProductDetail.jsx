'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useProductStore } from '../../stores/useProductStore';
import { useCartStore } from '../../stores/useCartStore';
import Link from 'next/link';

export default function ProductDetail() {
  const { slug } = useParams();
  const { language, t } = useContext(LanguageContext);
  const products = useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const addToCart = useCartStore(state => state.addToCart);

  const product = products.find(p => p.slug === slug);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-xl font-bold">{language === 'ar' ? 'العطر غير متوفر' : 'Product Not Found'}</h2>
        <Link href="/shop" className="btn-primary mt-6">{t('backToShop')}</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isAr = language === 'ar';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center gap-12 text-center">
      {/* Back button */}
      <Link href="/shop" className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] self-start transition-colors">
        ← {t('backToShop')}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Gallery Block */}
        <div className="w-full aspect-square bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg overflow-hidden flex items-center justify-center">
          <img src={product.thumbnail} alt={t(product.title)} className="w-full h-full object-cover opacity-90" />
        </div>

        {/* Right Details Block */}
        <div className="flex flex-col items-center gap-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)]">
            {product.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {t(product.title)}
          </h1>
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase">
            SKU: {product.sku} | Volume: {product.volume}
          </span>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-light max-w-md">
            {t(product.longDescription)}
          </p>

          <div className="flex items-center gap-4 py-4 border-y border-[var(--color-border)] w-full justify-center">
            <span className="text-2xl font-bold text-[var(--color-text-primary)]">
              {product.price.toFixed(2)} JOD
            </span>
            {product.compareAtPrice && (
              <span className="text-sm line-through text-[var(--color-text-muted)]">
                {product.compareAtPrice.toFixed(2)} JOD
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button onClick={handleAdd} className="btn-primary w-full cursor-pointer">
              {added ? (isAr ? 'تمت الإضافة ✓' : 'Added ✓') : t('addToCart')}
            </button>
            
            <a 
              href={`https://wa.me/962785050655?text=${encodeURIComponent(
                isAr 
                  ? `مرحباً، أود الاستفسار عن عطر: ${t(product.title)}` 
                  : `Hello, I would like to inquire about: ${t(product.title)}`
              )}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary w-full text-center"
            >
              {t('whatsappInquiry')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
