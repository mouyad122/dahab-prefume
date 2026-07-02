'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { WhatsappLogo, ArrowUpRight } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function FinalCTA() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();

  const whatsappMsg = isAr
    ? 'مرحبا، أريد الاستفسار عن عطور DAHAB PERFUMES.'
    : 'Hello, I have an inquiry for DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section className="luxury-section relative overflow-hidden bg-[#040302] py-24 md:py-32" ref={ref}>
      {/* Background glow & noise overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,154,68,0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="premium-container relative z-10 text-center">
        <div className={`max-w-2xl mx-auto ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <h2 className={`font-display text-[var(--color-text-primary)] mb-8 ${isAr ? 'dir-ar' : 'dir-en'}`} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
            {isAr ? 'هل أنت مستعد لاكتشاف عطرك المثالي؟' : 'Ready to discover your perfect scent?'}
          </h2>
          <p className={`text-[var(--color-text-secondary)] text-base md:text-lg mb-10 leading-relaxed ${isAr ? 'dir-ar' : 'dir-en'}`}>
            {isAr 
              ? 'دعنا نأخذك في رحلة عطرية لا تُنسى. تسوّق الآن أو تواصل معنا لمساعدتك في اختيار عطرك القادم.'
              : 'Let us take you on an unforgettable fragrant journey. Shop now or contact us to help you choose your next signature scent.'
            }
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/shop" className="btn-primary w-full sm:w-auto px-8 py-3 text-sm">
              <span className={isAr ? 'font-sans-ar' : ''}>{isAr ? 'تسوّق الآن' : 'Shop Now'}</span>
              <ArrowUpRight size={18} weight="bold" />
            </Link>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp w-full sm:w-auto px-8 py-3 text-sm bg-black/40 hover:bg-[#5ddb85]/20 backdrop-blur-sm"
            >
              <WhatsappLogo size={18} weight="bold" />
              <span className={isAr ? 'font-sans-ar' : ''}>{isAr ? 'اطلب عبر واتساب' : 'Order on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
