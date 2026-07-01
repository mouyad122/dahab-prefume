'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Star, HourglassHigh, Truck, WhatsappLogo } from '@phosphor-icons/react';

export default function TrustStrip() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const items = [
    {
      icon: <Star size={16} weight="fill" className="text-[var(--color-gold)]" />,
      textAr: 'تقييم 4.7 من أكثر من 216 مراجعة',
      textEn: '4.7 rating from 216+ reviews'
    },
    {
      icon: <HourglassHigh size={16} className="text-[var(--color-gold)]" />,
      textAr: 'ثبات وفوحان مميز',
      textEn: 'Long-lasting performance'
    },
    {
      icon: <Truck size={16} className="text-[var(--color-gold)]" />,
      textAr: 'توصيل داخل الأردن',
      textEn: 'Delivery across Jordan'
    },
    {
      icon: <WhatsappLogo size={16} className="text-[#25D366]" />,
      textAr: 'خدمة مباشرة عبر واتساب',
      textEn: 'Direct WhatsApp support'
    }
  ];

  return (
    <div className="w-full bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)] py-6 px-6">
      <div className="premium-container flex flex-wrap items-center justify-center lg:justify-between gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)] font-medium">
            {item.icon}
            <span className={isAr ? 'font-sans-ar' : 'font-sans-en uppercase tracking-wider text-[10px]'}>
              {isAr ? item.textAr : item.textEn}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
