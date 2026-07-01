'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function FeaturedCollections() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const collections = [
    {
      slug: 'hair-mists',
      titleAr: 'مجموعة معطرات الشعر',
      titleEn: 'Hair Mists Collection',
      descAr: 'معطرات شعر مغذية بزيت الأرجان الطبيعي، تمنح خصلاتك ثباتاً يدوم لأكثر من 48 ساعة.',
      descEn: 'Nourishing mists enriched with Argan oil, offering 48+ hours of exceptional hair fragrance.',
      image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600',
    },
    {
      slug: 'private-collection',
      titleAr: 'المجموعة الخاصة',
      titleEn: 'Private Collection',
      descAr: 'صيغ عطرية فريدة تم تركيبها يدوياً بتركيزات زيتية ملكية للمناسبات الفخمة.',
      descEn: 'Exclusive custom formulations blended with high oil concentrations for grand presence.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
    },
    {
      slug: 'middle-eastern',
      titleAr: 'العطور الشرقية',
      titleEn: 'Middle Eastern Collection',
      descAr: 'أعرق خلطات العود والتوابل والجلود من كبرى دور العطور العربية بفوحان استثنائي.',
      descEn: 'Timeless blends of oud, amber, and spices from prominent Middle Eastern fragrance houses.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    }
  ];

  return (
    <section className="w-full bg-[var(--color-bg-primary)] py-32 px-6 border-b border-[var(--color-border)]">
      <div className="premium-container flex flex-col items-center gap-20">
        {/* Section Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
            {isAr ? 'التشكيلات الحصرية' : 'Exclusive Curations'}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {isAr ? 'مجموعات دهب للعطور' : 'Dahab Fragrance Collections'}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-gold)]" />
        </div>

        {/* Collections Grid - Double Bezel Card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full justify-center justify-items-center">
          {collections.map((col, idx) => (
            <div 
              key={idx} 
              className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(201,155,54,0.04)]"
            >
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden p-6 flex flex-col justify-between h-full min-h-[480px]">
                
                {/* Visual Image container */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] mb-6 relative group">
                  <img 
                    src={col.image} 
                    alt={isAr ? col.titleAr : col.titleEn} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>

                {/* Text Context */}
                <div className="flex flex-col gap-4 flex-grow text-center items-center px-2">
                  <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] tracking-wide">
                    {isAr ? col.titleAr : col.titleEn}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-light leading-relaxed max-w-xs">
                    {isAr ? col.descAr : col.descEn}
                  </p>
                </div>

                {/* Trailing action link */}
                <div className="mt-8 text-center">
                  <Link 
                    href={`/collections/${col.slug}`} 
                    className="inline-flex items-center text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-[0.2em] border-b border-[var(--color-gold)]/20 pb-1 hover:text-[var(--color-gold-light)] hover:border-[var(--color-gold-light)] transition-all duration-300"
                  >
                    {isAr ? 'عرض المجموعة ──' : 'View Collection ──'}
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
