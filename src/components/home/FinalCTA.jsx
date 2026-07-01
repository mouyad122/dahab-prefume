'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react';

export default function FinalCTA() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const whatsappMessage = isAr 
    ? 'مرحباً، أود استعراض الكتالوج الكامل والطلب مباشرة من دهب للعطور.' 
    : 'Hello, I would like to review the catalog and place an order directly with Dahab.';
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="w-full bg-[var(--color-bg-secondary)] py-36 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[var(--color-gold)]/[0.02] blur-[150px] pointer-events-none" />
      
      <div className="premium-container max-w-4xl flex flex-col items-center text-center gap-12 relative z-10">
        
        {/* Eyebrow badge */}
        <span className="rounded-full px-3.5 py-1.5 text-[9px] uppercase tracking-[0.25em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
          {isAr ? 'دهب للعطور ── الرائحة التي تنشر تأثيرك' : 'DAHAB PERFUMES ── Let your scent spread your influence'}
        </span>

        {/* Title */}
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] leading-tight max-w-2xl">
          {isAr ? 'ابدأ رحلتك مع رائحة تترك أثراً' : 'Begin your journey with a scent that leaves a lasting impression'}
        </h2>

        {/* Supporting description */}
        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-light max-w-md leading-relaxed">
          {isAr 
            ? 'تصفح تشكيلتنا الكاملة الآن أو تواصل مباشرة مع مستشاري عطور دهب عبر الواتساب لتلبية طلباتك الخاصة.'
            : 'Explore our complete curation online, or chat directly with our fragrance concierge on WhatsApp to fulfill custom orders.'
          }
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-6 w-full sm:w-auto items-center justify-center">
          <Link 
            href="/shop" 
            className="group relative flex items-center justify-center gap-3 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-gold-light)] hover:scale-105 active:scale-[0.98] w-full sm:w-auto shadow-md"
          >
            <span>{isAr ? 'المعرض العطري' : 'Shop Gallery'}</span>
            <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
              <ArrowUpRight size={12} weight="bold" />
            </div>
          </Link>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 border border-[var(--color-border-strong)] text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] hover:scale-105 active:scale-[0.98] w-full sm:w-auto"
          >
            <WhatsappLogo size={18} className="text-[#25D366]" weight="bold" />
            <span>{isAr ? 'تحدث مع كونسيرج دهب' : 'Chat with Concierge'}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
