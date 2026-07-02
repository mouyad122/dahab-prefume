'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';

const HAIR_MISTS = [
  { id: 1, name: { ar: 'مسك فانيليا', en: 'Musk Vanilla' }, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: { ar: 'مسك رمان', en: 'Musk Pomegranate' }, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: { ar: 'مسك ياسمين', en: 'Musk Jasmine' }, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: { ar: 'مسك باودر', en: 'Musk Powder' }, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: { ar: 'مسك دهب', en: 'Musk Dahab' }, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400' },
];

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

export default function HairMistsPreview() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="luxury-section relative overflow-hidden bg-[var(--color-bg-secondary)]" ref={ref}>
      {/* Decorative gold orb */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="premium-container">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isAr ? 'dir-ar' : 'dir-en'}`}>
          
          {/* Text Content */}
          <div className={`lg:col-span-5 ${visible ? 'reveal-up' : 'opacity-0'}`}>
            <span className="section-kicker mb-4 inline-block">
              {isAr ? 'مجموعة حصرية' : 'Exclusive Collection'}
            </span>
            <h2 className="font-display text-display-sm text-[var(--color-text-primary)] mb-6">
              {isAr ? 'بخاخات الشعر الفاخرة' : 'Luxury Hair Mists'}
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-8 max-w-md">
              {isAr
                ? 'خمسة عطور فريدة مصممة خصيصاً لتمنح شعرك نعومة فائقة ورائحة تدوم طويلاً، معززة بفيتامينات مغذية لحماية الشعر.'
                : 'Five unique fragrances specially designed to give your hair extreme softness and a long-lasting scent, enriched with nourishing vitamins.'}
            </p>
            <div className="text-xl font-display font-semibold text-[var(--color-gold-light)] mb-8">
              3.50 JOD <span className="text-sm font-sans font-normal text-[var(--color-text-muted)]">{isAr ? 'للحبة' : 'each'}</span>
            </div>
            <Link href="/collections/hair-mists" className="btn-primary inline-flex">
              <span>{isAr ? 'تصفح المجموعة' : 'Explore Collection'}</span>
              <Arrow size={16} weight="bold" />
            </Link>
          </div>

          {/* Grid of items */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {HAIR_MISTS.map((mist, idx) => (
                <div
                  key={mist.id}
                  className={`group relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] aspect-[3/4] ${visible ? 'reveal-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <img
                    src={mist.image}
                    alt={mist.name[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <span className="font-display font-semibold text-[var(--color-text-primary)] text-sm group-hover:text-[var(--color-gold-light)] transition-colors">
                      {mist.name[language]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
