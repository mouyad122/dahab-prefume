'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, WhatsappLogo, Star, MapPin, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';

export default function HeroSection() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMsg = isAr
    ? 'مرحبا، أريد طلب عطر من DAHAB PERFUMES.'
    : 'Hello, I would like to order a fragrance from DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappMsg)}`;

  const bgParallax = {
    transform: `translate3d(0, ${scrollY * 0.12}px, 0) scale(${1 + scrollY * 0.0002})`,
    willChange: 'transform',
  };

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] overflow-hidden flex flex-col"
      style={{ backgroundColor: '#070504' }}
    >
      {/* ─── Deep Background ─── */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0905] via-[#070504] to-[#0a0604]" />
        {/* Warm gold glow — top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #c5a25d 0%, transparent 70%)', filter: 'blur(80px)' }} />
        {/* Deep amber glow — bottom left */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8b5e1a 0%, transparent 70%)', filter: 'blur(100px)' }} />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* ─── Main Content: Split Layout ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row min-h-[100dvh] premium-container">

        {/* LEFT / TEXT COLUMN */}
        <div className={`flex-1 flex flex-col justify-center py-20 lg:py-0 ${isAr ? 'lg:pr-0 lg:pl-12' : 'lg:pl-0 lg:pr-12'}`}>
          
          {/* Eyebrow badge */}
          <div className={`reveal-up flex items-center gap-3 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]" />
            <span className="text-[0.7rem] font-bold tracking-[0.4em] uppercase text-[var(--color-gold)] font-sans">
              {isAr ? 'دار عطور عربية منذ ٢٠٠٧' : 'Arabic Fragrance House · Est. 2007'}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`reveal-up anim-delay-1 font-display mb-6 leading-[1.03] ${isAr ? 'font-sans-ar' : ''}`}
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)', fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            {isAr ? (
              <>
                <span className="block text-[var(--color-text-primary)]">كل عطرٍ</span>
                <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1px #c5a25d' }}>قصّةٌ</span>
                <span className="block text-[var(--color-text-primary)]">لا تُنسى</span>
              </>
            ) : (
              <>
                <span className="block text-[var(--color-text-primary)]">Every Scent,</span>
                <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1px #c5a25d' }}>A Story</span>
                <span className="block text-[var(--color-text-primary)]">Untold.</span>
              </>
            )}
          </h1>

          {/* Divider line */}
          <div className="reveal-up anim-delay-1 w-16 h-[2px] bg-gradient-to-r from-[var(--color-gold)] to-transparent mb-8" />

          {/* Subtitle */}
          <p
            className={`reveal-up anim-delay-2 max-w-md text-base md:text-lg leading-relaxed text-[var(--color-text-muted)] mb-10 ${isAr ? 'font-sans-ar' : ''}`}
          >
            {isAr
              ? 'في قلب عمّان، نختار لكم أفخر التركيبات العطرية؛ عود نادر، مسك أبيض، وعنبر أصيل. عطرك شخصيتك.'
              : 'In the heart of Amman, curated rare oud, white musk, and authentic amber — your fragrance is your identity.'}
          </p>

          {/* CTA Buttons */}
          <div className={`reveal-up anim-delay-3 flex flex-col sm:flex-row gap-4 mb-14 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            <Link
              href="/shop"
              className="btn-primary h-[52px] px-8 text-sm uppercase tracking-widest relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className={`relative z-10 ${isAr ? 'font-sans-ar' : ''}`}>
                {isAr ? 'اكتشف العطور' : 'Explore Fragrances'}
              </span>
              <ArrowIcon size={16} weight="bold" className="relative z-10" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-[52px] px-8 text-sm uppercase tracking-widest border-[var(--color-border-strong)] hover:border-[#5ddb85] hover:text-[#5ddb85] transition-colors"
            >
              <WhatsappLogo size={18} weight="regular" />
              <span className={isAr ? 'font-sans-ar' : ''}>
                {isAr ? 'طلب عبر واتساب' : 'WhatsApp Order'}
              </span>
            </a>
          </div>

          {/* Stats strip */}
          <div className="reveal-up anim-delay-4">
            <div className={`flex divide-[var(--color-border-strong)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)]/20 backdrop-blur-sm rounded-xl overflow-hidden ${isAr ? 'divide-x divide-x-reverse' : 'divide-x'}`}>
              {[
                { value: '2007', label: isAr ? 'تأسيس' : 'Est.' },
                { value: '+500', label: isAr ? 'عطر' : 'Scents' },
                { value: '4.7★', label: isAr ? 'تقييم' : 'Rating' },
                { value: 'JO', label: isAr ? 'عمّان' : 'Amman' },
              ].map((stat) => (
                <div key={stat.value} className="flex-1 py-4 text-center">
                  <div className="text-lg md:text-xl font-bold text-[var(--color-gold-pale)] font-display tracking-wider">
                    {stat.value}
                  </div>
                  <div className={`text-[0.6rem] text-[var(--color-text-muted)] mt-0.5 tracking-widest uppercase ${isAr ? 'font-sans-ar' : ''}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT / VISUAL COLUMN */}
        <div className="hidden lg:flex flex-[0.9] flex-col justify-center items-center relative py-12">

          {/* Floating perfume bottle visual (stack of elegant cards) */}
          <div className="relative w-full max-w-[420px] aspect-[3/4]">

            {/* Main image frame */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden border border-[var(--color-border-strong)]"
              style={{ ...bgParallax }}
            >
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=85&w=800"
                alt="Luxury Perfume"
                className="w-full h-full object-cover opacity-80"
                loading="eager"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070504]/80 via-transparent to-[#070504]/20" />
            </div>

            {/* Floating badge — top left */}
            <div className="absolute -left-6 top-12 glass-card px-4 py-3 border border-[var(--color-border-strong)] backdrop-blur-md flex items-center gap-2 shadow-xl animate-float">
              <Star size={14} weight="fill" className="text-[var(--color-gold)]" />
              <div>
                <div className="text-xs font-bold text-white">4.7 / 5.0</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">{isAr ? 'تقييم العملاء' : 'Customer Rating'}</div>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -right-6 bottom-16 glass-card px-4 py-3 border border-[var(--color-border-strong)] backdrop-blur-md shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-2">
                <Sparkle size={14} weight="fill" className="text-[var(--color-gold)]" />
                <div>
                  <div className="text-xs font-bold text-white">{isAr ? '+500 عطر' : '+500 Scents'}</div>
                  <div className="text-[10px] text-[var(--color-text-muted)]">{isAr ? 'متوفرة الآن' : 'In Stock'}</div>
                </div>
              </div>
            </div>

            {/* Corner accent lines */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[var(--color-gold)]/40" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[var(--color-gold)]/40" />
          </div>

          {/* Location strip below image */}
          <div className={`mt-6 flex items-center gap-2 text-xs text-[var(--color-text-muted)] ${isAr ? 'flex-row-reverse font-sans-ar' : ''}`}>
            <MapPin size={14} className="text-[var(--color-gold)] shrink-0" />
            <span>{brandConfig.address[language]}</span>
          </div>
        </div>
      </div>

      {/* ─── Bottom scroll indicator ─── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      ` }} />
    </section>
  );
}
