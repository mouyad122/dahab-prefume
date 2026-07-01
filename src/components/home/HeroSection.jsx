'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';
import { WhatsappLogo, ArrowUpRight } from '@phosphor-icons/react';

export default function HeroSection() {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const whatsappMessage = isAr 
    ? 'مرحباً، أود الاستفسار عن منتجات وعطور DAHAB PERFUMES' 
    : 'Hello, I would like to inquire about DAHAB PERFUMES fragrances.';
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-[var(--color-bg-primary)] py-24 px-6">
      {/* Cinematic Ambient Background Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] rounded-full bg-[var(--color-gold)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-[#A77A2A]/5 blur-[100px] pointer-events-none" />
      
      {/* Background Texture/Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-bg-primary)_90%)] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 premium-container max-w-5xl flex flex-col items-center text-center gap-8">
        
        {/* Micro Eyebrow Tag */}
        <span className="rounded-full px-4.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)] transition-all duration-300 hover:border-[var(--color-gold)]/40">
          {isAr ? 'دار العطور النيش المستقلة' : 'Independent Niche Perfume House'}
        </span>

        {/* Cinematic Headline */}
        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-wide uppercase leading-[1.1] max-w-4xl text-[var(--color-text-primary)]">
          {isAr ? (
            <>
              اكتشف عالماً من الفخامة مع <span className="text-[var(--color-gold)] block md:inline font-sans-en font-bold tracking-normal">DAHAB PERFUMES</span>
            </>
          ) : (
            <>
              Discover Luxury Through <span className="text-[var(--color-gold)] font-sans-en font-bold">DAHAB PERFUMES</span>
            </>
          )}
        </h1>

        {/* Supporting description */}
        <p className="text-sm md:text-lg text-[var(--color-text-secondary)] font-light max-w-2xl leading-relaxed mt-2">
          {isAr 
            ? 'عطور مختارة بعناية، ثبات يدوم لعدة أيام، وفوحان يترك أثراً لا يُنسى في كل مكان من قلب عمّان.'
            : 'Premium hand-blended fragrances, lasting performance, and an unforgettable scent experience crafted in the heart of Amman.'
          }
        </p>

        {/* Luxury Nested CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-6 w-full sm:w-auto items-center justify-center">
          {/* Shop now - Primary Button with Island structure */}
          <Link 
            href="/shop" 
            className="group relative flex items-center justify-center gap-3 bg-[var(--color-gold)] text-[#000000] text-xs font-bold uppercase tracking-[0.15em] px-7 py-4 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-gold-light)] hover:scale-105 active:scale-[0.98] w-full sm:w-auto shadow-[0_4px_25px_rgba(201,155,54,0.15)]"
          >
            <span>{isAr ? 'تسوّق الآن' : 'Shop Now'}</span>
            <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
              <ArrowUpRight size={12} weight="bold" />
            </div>
          </Link>

          {/* Ask on Whatsapp - Secondary Button */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 border border-[var(--color-border-strong)] text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-[0.15em] px-7 py-4 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] hover:scale-105 active:scale-[0.98] w-full sm:w-auto"
          >
            <WhatsappLogo size={18} weight="bold" className="text-[#25D366]" />
            <span>{isAr ? 'استفسر عبر واتساب' : 'Ask on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
