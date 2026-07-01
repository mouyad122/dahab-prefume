'use client';

import React, { useContext } from 'react';
import { useParams } from 'next/navigation';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { initialProducts } from '../../../data/initialProducts';
import ProductCard from '../../../components/product/ProductCard';
import Link from 'next/link';

export default function CollectionDetailClient() {
  const { slug } = useParams();
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const collectionsData = {
    'hair-mists': {
      title: { ar: 'معطرات الشعر', en: 'Hair Mists' },
      desc: { ar: 'مجموعة معطرات شعر مغذية وغنية بزيت الأرجان لتمنحك ثباتاً يدوم طويلاً وفوحاناً جذاباً.', en: 'Nourishing hair mists enriched with Argan oil for long lasting scent and alluring projection.' },
      vibeClass: 'bg-gradient-to-b from-[#FAF7F2] to-[#F7F5F1] dark:from-[#0B0B0B] dark:to-[#050505]',
      badgeColor: 'border-pink-500/20 bg-pink-500/5 text-pink-500',
      glowOrb: 'bg-pink-500/3'
    },
    'private-collection': {
      title: { ar: 'المجموعة الخاصة', en: 'Private Collection' },
      desc: { ar: 'خلطات عطرية حصرية تم تركيبها يدوياً بتركيزات زيتية عالية لتلائم أفخم مناسباتك الخاصة.', en: 'Exclusive hand-blended scents with high oil concentrations tailored for your special occasions.' },
      vibeClass: 'bg-gradient-to-b from-[#0B0B0B] to-[#030303]',
      badgeColor: 'border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)] text-[var(--color-gold)]',
      glowOrb: 'bg-[var(--color-gold)]/3'
    },
    'middle-eastern': {
      title: { ar: 'العطور الشرقية', en: 'Middle Eastern Collection' },
      desc: { ar: 'أشهر عطور دور العطور الشرقية المتميزة بالثبات الفائق والفوحان العالي بلمسة تراثية.', en: 'Famous Middle Eastern scents renowned for high longevity and projection with a heritage touch.' },
      vibeClass: 'bg-gradient-to-b from-[#140e05] to-[#050505] dark:from-[#0c0803] dark:to-[#030303]',
      badgeColor: 'border-amber-500/20 bg-amber-500/5 text-amber-500',
      glowOrb: 'bg-amber-500/3'
    }
  };

  const currentCollection = collectionsData[slug];

  if (!currentCollection) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-28 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {isAr ? 'المجموعة غير متوفرة' : 'Collection Not Found'}
        </h2>
        <Link href="/collections" className="btn-primary mt-6">{t('collections')}</Link>
      </div>
    );
  }

  const filteredProducts = initialProducts.filter(p => p.category === slug);

  return (
    <div className={`w-full py-24 px-6 min-h-[90dvh] relative overflow-hidden ${currentCollection.vibeClass}`}>
      {/* Decorative Glow Orb */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full ${currentCollection.glowOrb} blur-[120px] pointer-events-none`} />

      <div className="premium-container flex flex-col gap-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <Link href="/collections" className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] self-start transition-colors">
            ← {isAr ? 'العودة للمجموعات' : 'Back to Collections'}
          </Link>
          
          <span className={`rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-extrabold border ${currentCollection.badgeColor}`}>
            {t('collections')}
          </span>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {t(currentCollection.title)}
          </h1>
          
          {/* Double-Bezel Premium Enclosure */}
          <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 max-w-2xl w-full mt-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01]">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 shadow-main">
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">
                {t(currentCollection.desc)}
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4 justify-center justify-items-center">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
