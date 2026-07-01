'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Crown, Compass, Handshake, MapPin, ShoppingBag } from '@phosphor-icons/react';

export default function WhyDahabSection() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const advantages = [
    {
      icon: <Crown size={24} className="text-[var(--color-gold)]" />,
      titleAr: 'ثبات وفوحان استثنائي',
      titleEn: 'Exceptional Longevity',
      descAr: 'نختار المكونات والزيوت العطرية النقية بعناية لضمان ثبات عطري يدوم لأيام على الملابس والشعر.',
      descEn: 'We curate pure fragrance oils and premium bases, ensuring sillage that lingers beautifully for days.'
    },
    {
      icon: <Compass size={24} className="text-[var(--color-gold)]" />,
      titleAr: 'خيارات ترضي جميع الأذواق',
      titleEn: 'Curated Selections',
      descAr: 'توليفات فريدة تجمع بين أصالة العطور الشرقية المعتدلة ونعومة العطور الفرنسية الباردة.',
      descEn: 'Artfully designed olfactory profiles bridging rich Middle Eastern heritage with French elegance.'
    },
    {
      icon: <Handshake size={24} className="text-[var(--color-gold)]" />,
      titleAr: 'خدمة كونسيرج مباشرة وراقية',
      titleEn: 'Premium Helpline Care',
      descAr: 'متابعة الطلبات وتأكيد الفواتير مباشرة وبشكل شخصي وراقٍ عبر الواتساب مع خبرائنا العطريين.',
      descEn: 'Enjoy direct communication, order updates, and tailored concierge support via official WhatsApp.'
    },
    {
      icon: <MapPin size={24} className="text-[var(--color-gold)]" />,
      titleAr: 'موقعنا العريق في وسط البلد',
      titleEn: 'Boutique Location',
      descAr: 'معرضنا يقع في قلب عمان بوسط البلد، شارع الأمير محمد، لنبقى قريبين من زبائننا.',
      descEn: 'Visit our welcoming physical boutique in the historic heart of Amman, Prince Mohammad Street.'
    },
    {
      icon: <ShoppingBag size={24} className="text-[var(--color-gold)]" />,
      titleAr: 'تجربة شراء سهلة كزائر',
      titleEn: 'Elegant Shopper Experience',
      descAr: 'بساطة مطلقة في الشراء دون الحاجة لإنشاء حساب أو إعلانات بريدية مزعجة.',
      descEn: 'No tedious logins or spam emails. Complete checkout quickly as a guest and send to WhatsApp.'
    }
  ];

  return (
    <section className="w-full bg-[var(--color-bg-primary)] py-32 px-6 border-b border-[var(--color-border)] relative">
      <div className="premium-container flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
            {isAr ? 'لماذا نختلف عن الآخرين' : 'Bespoke Experience'}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {isAr ? 'لماذا تختار دهب للعطور؟' : 'Why DAHAB PERFUMES?'}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-gold)]" />
        </div>

        {/* Advantages Masonry/Grid - Nested Bezel Style */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full justify-center justify-items-center">
          {advantages.map((adv, idx) => (
            <div 
              key={idx} 
              className="rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] h-full"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 flex flex-col gap-4 text-center items-center shadow-main h-full justify-start">
                
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-gold)]/10 flex items-center justify-center mb-2">
                  {adv.icon}
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                  {isAr ? adv.titleAr : adv.titleEn}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] font-light leading-relaxed">
                  {isAr ? adv.descAr : adv.descEn}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
