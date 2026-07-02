'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Star } from '@phosphor-icons/react';
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

const REVIEWS = [
  {
    id: 1,
    name: 'أحمد الزعبي',
    text: {
      ar: 'رائحة خيالية وتدوم طويلاً! عطر مسك الفانيليا من أفضل ما شممته.',
      en: 'Incredible scent and very long lasting! Musk Vanilla is one of the best I have smelled.'
    }
  },
  {
    id: 2,
    name: 'رنا العمري',
    text: {
      ar: 'المحل ممتاز والموظفين محترفين جداً، سعر ممتاز للجودة.',
      en: 'Excellent store and very professional staff, amazing price for the quality.'
    }
  },
  {
    id: 3,
    name: 'Sara M.',
    text: {
      ar: 'عطر أديب لطافة رائع جداً، ثابت ومميز للغاية.',
      en: 'Lattafa Adeeb is absolutely stunning, long lasting and very unique scent.'
    }
  }
];

export default function ReviewsPreview() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();

  return (
    <section className="luxury-section bg-[var(--color-bg-secondary)]" ref={ref}>
      <div className="premium-container">
        <div className={`text-center mb-14 ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <span className="section-kicker mb-4 inline-block">
            {isAr ? 'آراء العملاء' : 'Customer Reviews'}
          </span>
          <h2 className="font-display text-display-sm text-[var(--color-text-primary)]">
            {isAr ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div 
              key={review.id}
              className={`glass-card p-8 flex flex-col items-center text-center ${visible ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="flex items-center gap-1 text-[var(--color-gold)] mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} weight="fill" />
                ))}
              </div>
              <p className={`text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-8 flex-1 ${isAr ? 'dir-ar' : 'dir-en'}`}>
                "{review.text[language]}"
              </p>
              <div className="font-display text-[var(--color-gold-light)] font-semibold text-lg">
                {review.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
