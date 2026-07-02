'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const TRUST_ITEMS = [
  { ar: 'أكثر من 15 سنة خبرة', en: '15+ Years Experience' },
  { ar: 'عطور أصيلة وأصلية', en: '100% Authentic Products' },
  { ar: 'أفضل الأسعار في عمّان', en: 'Best Prices in Amman' },
  { ar: 'خدمة عملاء ممتازة', en: 'Premium Customer Service' },
  { ar: 'وسط البلد، عمّان', en: 'Downtown Amman' },
];

export default function TrustStrip() {
  const { language } = useContext(LanguageContext);
  
  return (
    <div className="bg-[#0a0805] border-y border-[var(--color-border-subtle)] py-4 overflow-hidden select-none">
      <div className="flex w-[200%] md:w-full items-center justify-between opacity-80 md:animate-none animate-[shimmer_20s_linear_infinite]">
        <div className="flex flex-nowrap items-center justify-around w-full gap-8 px-4">
          {TRUST_ITEMS.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[0.7rem] font-bold tracking-[0.15em] text-[var(--color-gold-light)] uppercase whitespace-nowrap">
                {item[language]}
              </span>
              {idx < TRUST_ITEMS.length - 1 && (
                <span className="text-[var(--color-border-strong)] hidden md:inline-block">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
