'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';

const ME_PRODUCTS = [
  { id: 1, name: { ar: 'ايراجون', en: 'Eragon 100ml' }, price: '12.000 JOD' },
  { id: 2, name: { ar: 'أديب لطافة', en: 'Lattafa Adeeb 80ml' }, price: '9.000 JOD' },
  { id: 3, name: { ar: 'قائد لطافة', en: "Lattafa Qa'aed 100ml" }, price: '11.000 JOD' },
  { id: 4, name: { ar: 'كلمات العود العربي', en: 'Arabian Oud Kalemat 100ml' }, price: '15.000 JOD' },
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

export default function MiddleEasternPreview() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="luxury-section relative overflow-hidden bg-[#0a0705]" ref={ref}>
      <div className="premium-container">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isAr ? 'dir-ar' : 'dir-en'}`}>
          
          {/* Large Image Side */}
          <div className={`w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--color-border)] ${visible ? 'reveal-up' : 'opacity-0'}`}>
            <img 
              src="https://images.unsplash.com/photo-1526253038957-4f4673a87d77?auto=format&fit=crop&q=80&w=800" 
              alt="Middle Eastern Perfumes" 
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="glass-card p-6 border-[var(--color-border-strong)]">
                <p className="text-[var(--color-gold-light)] font-display text-xl mb-2">
                  {isAr ? 'نفحات من الشرق' : 'Whispers of the East'}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {isAr ? 'عود، عنبر، ومسك في زجاجات فاخرة.' : 'Oud, amber, and musk in luxury bottles.'}
                </p>
              </div>
            </div>
          </div>

          {/* Text & List Side */}
          <div className={`w-full lg:w-1/2 ${visible ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <span className="section-kicker mb-4 inline-block">
              {isAr ? 'دور الشرق الأوسط' : 'Middle Eastern Houses'}
            </span>
            <h2 className="font-display text-display-sm text-[var(--color-text-primary)] mb-6">
              {isAr ? 'أصالة العطر العربي' : 'Authentic Arabian Scents'}
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-10">
              {isAr
                ? 'نقدم لكم نخبة مختارة من أفضل العطور الشرقية من أعرق دور العطور في الشرق الأوسط. ثبات عالي، فوحان يملأ المكان، وروائح تعكس الفخامة.'
                : 'We bring you a curated selection of the finest oriental perfumes from the most prestigious houses in the Middle East. High longevity, incredible sillage, and scents that reflect luxury.'}
            </p>

            {/* List */}
            <ul className="flex flex-col gap-4 mb-10">
              {ME_PRODUCTS.map((prod, i) => (
                <li key={prod.id} className="flex items-center justify-between py-4 border-b border-[var(--color-border-subtle)] group">
                  <span className="text-lg font-display font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-light)] transition-colors">
                    {prod.name[language]}
                  </span>
                  <span className="text-[var(--color-gold)] font-semibold text-sm">
                    {prod.price}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/collections/oud" className="btn-secondary">
              <span>{isAr ? 'عرض جميع العطور الشرقية' : 'View All Eastern Perfumes'}</span>
              <Arrow size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
