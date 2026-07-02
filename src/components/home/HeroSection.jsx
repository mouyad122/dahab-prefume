'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, WhatsappLogo, Star, MapPin } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';

export default function HeroSection() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMsg = isAr
    ? 'مرحبا، أريد طلب عطر من DAHAB PERFUMES.'
    : 'Hello, I would like to order a fragrance from DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappMsg)}`;

  // Ultra-smooth parallax effects
  const bgParallax = {
    transform: `translate3d(0, ${scrollY * 0.15}px, 0) scale(${1 + scrollY * 0.0002})`,
    willChange: 'transform',
  };
  
  const textParallax = {
    transform: `translate3d(0, ${scrollY * 0.25}px, 0)`,
    opacity: Math.max(0, 1 - scrollY / 700),
    willChange: 'transform, opacity',
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* ─── Luxury Background Layers ─── */}
      <div className="absolute inset-0 z-0 bg-[#070504]" />

      {/* Cinematic Watermark Image (Aesthetic) */}
      <div className="absolute inset-0 z-[1] w-full h-full opacity-30" style={{ ...bgParallax, mixBlendMode: 'overlay' }}>
        <img
          src="/images/background.jpg"
          alt="DAHAB PERFUMES watermark"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Luxury Color Grading Overlay */}
      <div className="absolute inset-0 z-[1] bg-[rgba(7,5,4,0.7)] pointer-events-none mix-blend-multiply" />

      {/* Foreground Hero Bottle */}
      <div className="absolute inset-0 z-[3] w-full h-full pointer-events-none flex items-center justify-center lg:justify-end lg:pr-[10%]" style={textParallax}>
        <img
          src="/hero-bottle.png"
          alt="DAHAB PERFUMES hero product"
          className="h-[60%] lg:h-[85%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(196,154,68,0.25)] transition-transform duration-1000 translate-y-10"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Soft radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--color-bg-primary)_100%)] opacity-70" />
        {/* Gradient from left (dark) to right (transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-[var(--color-bg-primary)] md:via-[#070504]/80 to-transparent" />
        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
      </div>

      {/* Dynamic Lighting Effects (Orbs) */}
      <div
        className="absolute z-[2] rounded-full pointer-events-none mix-blend-screen"
        style={{
          width: '70vw', height: '70vw',
          top: '-35%', left: '-20%',
          background: 'radial-gradient(circle, var(--color-gold-glow) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'pulseGlow 8s ease-in-out infinite alternate',
        }}
      />
      
      {/* Smoke/Fragrance Atmosphere */}
      <div className="smoke-trail smoke-trail-1 z-[2] hidden md:block opacity-40" />
      <div className="smoke-trail smoke-trail-2 z-[2] hidden md:block opacity-30" style={{ animationDelay: '3s', left: '45%' }} />

      {/* ─── Main Content ─── */}
      <div className="premium-container relative z-[10] flex min-h-[100dvh] flex-col justify-between py-10" style={textParallax}>
        
        {/* Top Header Space (Rating) */}
        <div className="flex items-center justify-end pt-4">
          <div className="glass-card flex items-center gap-2 px-4 py-2 border-[var(--color-border-strong)] backdrop-blur-md">
            <Star size={14} weight="fill" className="text-[var(--color-gold-light)] drop-shadow-[0_0_8px_rgba(214,184,120,0.5)]" />
            <span className="text-sm font-bold text-[var(--color-gold-pale)] font-display tracking-widest">
              {brandConfig.rating.score}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] tracking-wider">
              ({brandConfig.rating.reviewsCount} {isAr ? 'تقييم' : 'reviews'})
            </span>
          </div>
        </div>

        {/* Center — Headlines & CTA */}
        <div className={`flex-1 flex items-center ${isAr ? 'dir-ar' : 'dir-en'} mt-10 lg:mt-0`}>
          <div className="max-w-4xl relative">
            
            {/* Subtle decorative line above kicker */}
            <div className="reveal-up w-12 h-[2px] bg-gradient-to-r from-[var(--color-gold)] to-transparent mb-6" />

            {/* Kicker */}
            <div className="reveal-up mb-8">
              <span className="font-sans-ar text-[0.75rem] font-bold tracking-[0.3em] uppercase text-[var(--color-gold)]" dir={isAr ? 'rtl' : 'ltr'}>
                {isAr ? 'دار عطور عربية فاخرة' : 'Luxury Arabic Fragrance House'}
              </span>
            </div>

            {/* Headline (Exactly as requested) */}
            <h1
              className="reveal-up anim-delay-1 font-display mb-8 drop-shadow-2xl"
              style={{ 
                fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
                fontWeight: 600, 
                lineHeight: 1.05, 
                letterSpacing: '-0.01em' 
              }}
            >
              {isAr ? (
                <span className="block font-sans-ar">
                  <span className="block text-[var(--color-text-primary)] transition-colors duration-700 hover:text-[var(--color-gold-pale)]">منذ 2007،</span>
                  <span className="block text-[var(--color-gold)]" style={{ textShadow: '0 4px 32px rgba(184,150,87,0.3)' }}>عطرٌ يحمل</span>
                  <span className="block text-[var(--color-text-primary)] transition-colors duration-700 hover:text-[var(--color-gold-pale)]">أثراً لا يُنسى</span>
                </span>
              ) : (
                <span className="block">
                  <span className="block text-[var(--color-text-primary)] transition-colors duration-700 hover:text-[var(--color-gold-pale)]">Since 2007,</span>
                  <span className="block text-[var(--color-gold)]" style={{ textShadow: '0 4px 32px rgba(184,150,87,0.3)' }}>fragrance that</span>
                  <span className="block text-[var(--color-text-primary)] transition-colors duration-700 hover:text-[var(--color-gold-pale)]">leaves a lasting legacy</span>
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p
              className={`reveal-up anim-delay-2 max-w-xl text-base md:text-lg leading-relaxed text-[var(--color-text-muted)] mb-12 ${isAr ? 'font-sans-ar' : ''}`}
            >
              {isAr
                ? 'في قلب عمّان، نقدم لكم تجربة عطرية راقية تجمع بين فخامة العود النادر، نقاء المسك، وسحر التراث الشرقي الأصيل.'
                : 'In the heart of Amman, we present a refined aromatic experience blending rare oud, pure musk, and authentic Eastern heritage.'}
            </p>

            {/* CTAs */}
            <div className="reveal-up anim-delay-3 flex flex-col sm:flex-row gap-5 mb-14">
              <Link 
                href="/shop" 
                className="btn-primary min-w-[200px] h-[54px] text-[0.9rem] uppercase tracking-widest relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className={`relative z-10 ${isAr ? 'font-sans-ar' : ''}`}>
                  {isAr ? 'تسوّق الآن' : 'Shop Now'}
                </span>
                <ArrowUpRight size={18} weight="bold" className="relative z-10" />
              </Link>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary min-w-[200px] h-[54px] text-[0.9rem] bg-[var(--color-bg-surface)]/50 backdrop-blur-md border-[var(--color-border-strong)] uppercase tracking-widest hover:border-[#5ddb85] hover:text-[#5ddb85]"
              >
                <WhatsappLogo size={20} weight="regular" />
                <span className={isAr ? 'font-sans-ar' : ''}>
                  {isAr ? 'اطلب عبر واتساب' : 'Order on WhatsApp'}
                </span>
              </a>
            </div>

            {/* Stats strip */}
            <div className="reveal-up anim-delay-4 inline-block">
              <div className="flex divide-x divide-x-reverse divide-[var(--color-border-strong)] border-y border-[var(--color-border-strong)] bg-[var(--color-bg-surface)]/30 backdrop-blur-sm">
                {[
                  { value: '2007', label: isAr ? 'سنة التأسيس' : 'EST.' },
                  { value: '+500', label: isAr ? 'عطر فريد' : 'SCENTS' },
                  { value: '4.7★', label: isAr ? 'تقييم العملاء' : 'RATING' },
                ].map((stat) => (
                  <div key={stat.value} className="px-6 py-4 text-center min-w-[110px]">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-gold-pale)] font-display tracking-wider">
                      {stat.value}
                    </div>
                    <div className={`text-[0.65rem] text-[var(--color-text-muted)] mt-1 tracking-widest uppercase ${isAr ? 'font-sans-ar' : ''}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="reveal-up anim-delay-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 mt-10 border-t border-[var(--color-border-strong)]">
          <div className={`flex items-center gap-3 text-[0.8rem] text-[var(--color-text-secondary)] tracking-wider uppercase ${isAr ? 'font-sans-ar dir-ar' : ''}`}>
            <MapPin size={16} className="text-[var(--color-gold)] shrink-0" />
            <span>{brandConfig.address[language]}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[var(--color-gold-dim)] hidden sm:block"></span>
            <div className={`text-[0.7rem] text-[var(--color-text-subtle)] tracking-[0.2em] uppercase ${isAr ? 'font-sans-ar' : ''}`}>
              {brandConfig.tagline[language]}
            </div>
          </div>
        </div>
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }
      `}} />
    </section>
  );
}
