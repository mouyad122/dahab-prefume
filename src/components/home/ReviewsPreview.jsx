'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Quotes, Star, ArrowUpRight } from '@phosphor-icons/react';

/**
 * ReviewsPreview - Displays real customer reviews from Google Maps.
 * Supports isSubPage prop to hide headers when embedded in static review page.
 */
export default function ReviewsPreview({ isSubPage = false }) {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const reviews = [
    {
      initials: 'AA',
      name: 'abdullah almaredi',
      metaAr: 'مراجعة واحدة · صورة واحدة',
      metaEn: '1 review · 1 photo',
      rating: 5,
      dateAr: 'قبل 4 أسابيع',
      dateEn: '4 weeks ago',
      text: 'بصراحة و بدون مجاملة و مش اي كلام عطورهم اشي سفاااااح و بعطيك نسبة فوحان و ثبات على الملابس حتى بعد الغسيل ، و الشباب محترمين جداً و ذوووق ،  الله يباركلهم في تعبهم و مالهم يارب'
    },
    {
      initials: 'LK',
      name: 'Lujain Khalaileh',
      metaAr: 'مراجعتان · صورة واحدة',
      metaEn: '2 reviews · 1 photo',
      rating: 5,
      dateAr: 'قبل 3 أشهر',
      dateEn: '3 months ago',
      text: 'طبعا محل ذهب بوسط البلد قبال مطعم هاشم شو مااحكي ما بقدر اوصف الروائح يلي عندهم والثبات يلي بصنعوا فيه العطور شغلهم سفاح والزيوت والعطور يلي عندهم سفاحه واصليه وبعملوهم بصدق صراحه أنا بجيب منهم يلي اكثر من ٣ سنين من وقت ما اول مره جربت من عندهم'
    },
    {
      initials: 'LS',
      name: 'Layan Sbeitan',
      metaAr: '3 مراجعات · صورتان',
      metaEn: '3 reviews · 2 photos',
      rating: 5,
      dateAr: 'قبل 3 أشهر',
      dateEn: '3 months ago',
      text: 'العطور بتجنّن وثباتها ممتاز، وخدمة العملاء أكثر من رائعة تعامل راقي واهتمام بكل التفاصيل'
    }
  ];

  return (
    <section className={`w-full ${isSubPage ? 'bg-transparent py-10' : 'bg-[var(--color-bg-secondary)] py-32'} px-6 border-b border-[var(--color-border)] relative`}>
      <div className="premium-container flex flex-col gap-20">
        
        {/* Section Header (Only visible if not subpage) */}
        {!isSubPage && (
          <div className="text-center flex flex-col items-center gap-4">
            <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
              {isAr ? 'آراء وتجارب' : 'Google Reviews'}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              {isAr ? 'ماذا يقول عملاؤنا؟' : 'Client Testimonials'}
            </h2>
            <div className="w-12 h-[1px] bg-[var(--color-gold)]" />
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-center justify-items-center">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] h-full w-full max-w-sm"
            >
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 shadow-main flex flex-col justify-between h-full min-h-[300px] relative">
                
                {/* Quote Icon watermark */}
                <Quotes size={48} weight="fill" className="absolute top-6 right-6 text-zinc-900/10 pointer-events-none" />

                {/* Rating stars & Google Maps tag */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, sIdx) => (
                      <Star key={sIdx} size={14} weight="fill" className="text-[var(--color-gold)]" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-[var(--color-gold)] uppercase tracking-wider">
                    {isAr ? 'مراجعة من Google Maps' : 'Google Maps Review'}
                  </span>
                </div>

                {/* Content - Keep original Arabic review text as requested */}
                <p className="text-xs text-[var(--color-text-secondary)] font-light leading-relaxed mb-6 flex-grow dir-auto text-start">
                  "{rev.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 w-full text-xs text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-gold)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--color-gold)]">
                      {rev.initials}
                    </div>
                    <div className="flex flex-col text-start">
                      <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                        {rev.name}
                      </span>
                      <span className="text-[9px] font-light">
                        {isAr ? rev.metaAr : rev.metaEn}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-light italic whitespace-nowrap">
                    {isAr ? rev.dateAr : rev.dateEn}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View on Google Maps Link Button */}
        <div className="w-full flex justify-center mt-4">
          <a 
            href="https://maps.app.goo.gl/WcHGzHu9WbFpwTAQ8"
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center justify-center gap-2.5 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98] shadow-md cursor-pointer"
          >
            <span>{isAr ? 'عرض التقييمات على Google Maps' : 'View on Google Maps'}</span>
            <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
