'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import { WhatsappLogo, ShoppingBag, Wind } from '@phosphor-icons/react';

export default function FeaturedProductSection() {
  const { language, t } = useContext(LanguageContext);
  const addToCart = useCartStore(state => state.addToCart);
  
  const isAr = language === 'ar';

  // Signature Eragon Perfume Specs
  const product = {
    id: 'private-eragon',
    slug: 'eragon-100ml',
    sku: 'DAHAB-PC-ER01',
    title: {
      ar: 'عطر إيراغون 100 مل',
      en: 'Eragon Perfume 100ml'
    },
    price: 45.00,
    compareAtPrice: 55.00,
    volume: '100ml',
    category: 'private-collection',
    thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
    fragranceNotes: {
      top: isAr ? ['القرفة', 'الكزبرة', 'الزعفران'] : ['Cinnamon', 'Coriander', 'Saffron'],
      heart: isAr ? ['العسل', 'التبغ', 'الجلود'] : ['Honey', 'Tobacco', 'Leather'],
      base: isAr ? ['العود', 'العنبر', 'الفانيليا', 'الباتشولي'] : ['Oud', 'Amber', 'Vanilla', 'Patchouli']
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const whatsappMessage = isAr 
    ? `مرحباً، أود الاستفسار عن عطر إيراغون من المجموعة الخاصة لدهب للعطور (سعر: 45 دينار أردني).`
    : `Hello, I would like to inquire about Eragon Perfume 100ml from the Private Collection (Price: 45.00 JOD).`;
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="w-full bg-[var(--color-bg-secondary)] py-32 px-6 border-b border-[var(--color-border)] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[var(--color-gold)]/3 blur-[140px] pointer-events-none" />

      <div className="premium-container flex flex-col items-center gap-20">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
            {isAr ? 'عطر التوقيع الخاص' : 'Signature Masterpiece'}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {isAr ? 'عطر إيراغون الملكي' : 'Eragon Perfume'}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-gold)]" />
        </div>

        {/* Double Bezel Nested Layout */}
        <div className="rounded-[3rem] bg-black/5 dark:bg-white/5 p-2.5 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_50px_rgba(201,155,54,0.03)]">
          <div className="rounded-[calc(3rem-0.625rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-14 shadow-main grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Image wrapper with floating badge */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] relative group">
              <img 
                src={product.thumbnail} 
                alt="Eragon Perfume" 
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
              {/* Compare discount label */}
              <div className="absolute top-6 right-6 bg-[var(--color-gold)] text-black text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {isAr ? 'خصم خاص' : 'Special Offer'}
              </div>
            </div>

            {/* Right Column: Narrative detail text */}
            <div className="flex flex-col gap-6 text-start">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)]">
                {isAr ? 'المجموعة الخاصة ── عطور النيش' : 'Private Collection ── Niche Fragrances'}
              </span>
              
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                {isAr ? 'عطر إيراغون 100 مل' : 'Eragon Perfume 100ml'}
              </h3>

              <div className="flex items-center gap-4 py-2 border-y border-[var(--color-border)] w-max">
                <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {product.price.toFixed(2)} JOD
                </span>
                <span className="text-sm line-through text-[var(--color-text-muted)] font-light">
                  {product.compareAtPrice.toFixed(2)} JOD
                </span>
              </div>

              {/* Story/Narrative */}
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
                {isAr 
                  ? 'عطر إيراغون من المجموعة الخاصة لدهب، حضور فاخر ولمسة مميزة لعشّاق العطور ذات الطابع الواضح والثابت. تصميم مستوحى من فخامة عطور النيش الفرنسية بزجاجة مطلية بغطاء معدني لرأس حصان ثقيل.'
                  : 'Eragon from the DAHAB Private Collection is a refined signature fragrance designed for those who appreciate presence, depth, and lasting character. Inspired by French niche heritage, featuring a horse-head heavy metallic cap.'
                }
              </p>

              {/* Olfactory Notes Breakdown */}
              <div className="flex flex-col gap-3 mt-2">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <Wind size={14} className="text-[var(--color-gold)]" />
                  <span>{isAr ? 'الهرم العطري والمكونات' : 'Olfactory Notes'}</span>
                </h4>
                
                <div className="grid grid-cols-3 gap-3 text-[10px] bg-[var(--color-bg-primary)] p-4.5 rounded-xl border border-[var(--color-border)]">
                  <div className="flex flex-col gap-1 border-r border-[var(--color-border)] pr-2">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'القمة' : 'Top'}</span>
                    <span className="text-zinc-300 font-light">{product.fragranceNotes.top.join(', ')}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-r border-[var(--color-border)] px-2">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'القلب' : 'Heart'}</span>
                    <span className="text-zinc-300 font-light">{product.fragranceNotes.heart.join(', ')}</span>
                  </div>
                  <div className="flex flex-col gap-1 pl-2">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'القاعدة' : 'Base'}</span>
                    <span className="text-zinc-300 font-light">{product.fragranceNotes.base.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                <Link 
                  href={`/products/${product.slug}`} 
                  className="btn-primary flex-1 text-center py-3.5 focus-visible:outline-none"
                >
                  {isAr ? 'عرض التفاصيل بالكامل' : 'View Full Details'}
                </Link>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3.5"
                >
                  <WhatsappLogo size={16} className="text-[#25D366]" weight="bold" />
                  <span>{isAr ? 'استفسار سريع واتساب' : 'Quick Inquiry'}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
