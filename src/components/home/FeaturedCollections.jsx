'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';

const COLLECTIONS = [
  {
    id: 'hair-mists',
    slug: 'hair-mists',
    name: { ar: 'مجموعة بخاخات الشعر', en: 'Hair Mists Collection' },
    desc: { ar: 'خمسة عطور حصرية لشعر ناعم وعبق يدوم طوال اليوم', en: 'Five exclusive scents for soft, fragrant hair that lasts all day' },
    count: 5,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600',
    accent: 'rgba(196,154,68,0.12)',
    tag: { ar: 'الأكثر مبيعاً', en: 'Best Seller' },
  },
  {
    id: 'oud',
    slug: 'oud',
    name: { ar: 'دور الشرق الأوسط', en: 'Middle Eastern Houses' },
    desc: { ar: 'أجمل العطور من دور الشرق الأوسط المرموقة', en: 'The finest scents from prestigious Middle Eastern fragrance houses' },
    count: 8,
    image: 'https://images.unsplash.com/photo-1526253038957-4f4673a87d77?auto=format&fit=crop&q=80&w=600',
    accent: 'rgba(77,22,24,0.16)',
    tag: { ar: 'تراث شرقي', en: 'Eastern Heritage' },
  },
];

// Intersection Observer hook
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

export default function FeaturedCollections() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="luxury-section" ref={ref}>
      <div className="premium-container">
        {/* Header */}
        <div className={`mb-12 flex flex-col items-center text-center gap-4 ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <span className="section-kicker">
            {isAr ? 'تصفح مجموعاتنا' : 'Browse Our Collections'}
          </span>
          <h2 className="font-display text-display-md text-[var(--color-text-primary)]">
            {isAr ? 'اكتشف عالم دهب للعطور' : 'Discover the World of Dahab'}
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {isAr
              ? 'ثلاث مجموعات فاخرة، كل واحدة حكاية عطرية متكاملة'
              : 'Three luxury collections, each a complete fragrance story'}
          </p>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className={`group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-500 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-gold)] ${
                visible ? 'reveal-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 0.12}s` }}
              id={`collection-card-${col.slug}`}
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 z-0 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 100%, ${col.accent} 0%, transparent 70%)` }}
              />

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={col.image}
                  alt={col.name[language]}
                  className="w-full h-full object-cover opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />

                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge-gold text-[0.62rem]">{col.tag[language]}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`relative z-10 p-5 ${isAr ? 'dir-ar' : 'dir-en'}`}>
                <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  {col.name[language]}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-4">
                  {col.desc[language]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] text-[var(--color-text-muted)]">
                    {col.count} {isAr ? 'منتج' : 'products'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[var(--color-gold)] text-sm font-bold transition-all duration-300 group-hover:gap-2.5">
                    <span>{isAr ? 'استعرض' : 'Browse'}</span>
                    <Arrow size={15} weight="bold" />
                  </div>
                </div>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-[var(--radius-xl)] border border-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-20 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
