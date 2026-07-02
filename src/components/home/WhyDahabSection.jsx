'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Medal, ShieldCheck, Star, Clock } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';

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

export default function WhyDahabSection() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();

  const PILLARS = [
    {
      id: 1,
      icon: Medal,
      title: { ar: 'المنتجات المختارة بعناية', en: 'Handpicked Selection' },
      desc: { ar: 'نختار كل عطر بعناية فائقة لنضمن لك تجربة عطرية لا مثيل لها.', en: 'We carefully select each fragrance to ensure an unparalleled scent experience.' }
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: { ar: 'أصالة ومصداقية', en: 'Authentic & Original' },
      desc: { ar: 'ضمان ١٠٠٪ على أصالة جميع عطورنا ومصدرها الموثوق.', en: '100% guarantee on the authenticity and reliable sourcing of all our perfumes.' }
    },
    {
      id: 3,
      icon: Star,
      title: { ar: 'إرشاد متخصص', en: 'Expert Guidance' },
      desc: { ar: 'فريقنا خبير في مساعدتك لاكتشاف العطر الذي يعبر عن شخصيتك.', en: 'Our team is expert in helping you discover the fragrance that expresses your personality.' }
    },
    {
      id: 4,
      icon: Clock,
      title: { ar: 'منذ 2007', en: 'Since 2007' },
      desc: { ar: 'خبرة تزيد عن 15 عاماً في سوق العطور الأردني.', en: 'Over 15 years of experience in the Jordanian perfume market.' }
    }
  ];

  return (
    <section className="luxury-section relative bg-[#040302]" ref={ref}>
      <div className="premium-container relative z-10">
        <div className={`text-center mb-16 ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <span className="section-kicker mb-4 inline-block">
            {isAr ? 'تميزنا' : 'Our Excellence'}
          </span>
          <h2 className="font-display text-display-md text-[var(--color-text-primary)]">
            {isAr ? 'لماذا دهب للعطور؟' : 'Why DAHAB PERFUMES?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className={`glass-card p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start ${isAr ? 'dir-ar' : 'dir-en'} ${visible ? 'reveal-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="shrink-0 p-4 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-border-strong)] text-[var(--color-gold)]">
                  <Icon size={32} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[var(--color-text-primary)] mb-3 font-semibold">
                    {pillar.title[language]}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
