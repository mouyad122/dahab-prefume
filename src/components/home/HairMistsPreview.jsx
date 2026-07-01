'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { initialProducts } from '../../data/initialProducts';
import ProductPreviewCard from './ProductPreviewCard';

export default function HairMistsPreview() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  // Filter the 5 hair mists
  const hairMists = initialProducts.filter(p => p.category === 'hair-mists');

  return (
    <section className="w-full bg-[var(--color-bg-primary)] py-32 px-6 border-b border-[var(--color-border)]">
      <div className="premium-container flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)] w-max">
            {isAr ? 'روائح غنية للشعر' : 'Nourishing Fragrance'}
          </span>
          <div className="flex flex-col gap-2 items-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              {isAr ? 'تشكيلة معطرات الشعر' : 'Hair Mists Collection'}
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-lg leading-relaxed">
              {isAr 
                ? 'خمسة معطرات شعر حصرية ومغذية بزيت الأرجان وجوز الهند، تمنحك فوحاناً طبيعياً ونعومة لا تقاوم طوال اليوم.'
                : 'Five signature hair mists enriched with natural nourishing oils, providing captivating scent and silky texture all day.'
              }
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full justify-center justify-items-center">
          {hairMists.map(product => (
            <ProductPreviewCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
