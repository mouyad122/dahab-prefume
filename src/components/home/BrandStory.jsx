'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
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

export default function BrandStory() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();

  return (
    <section className="luxury-section relative bg-[var(--color-bg-primary)] overflow-hidden" ref={ref}>
      <div className="premium-container">
        
        {/* Divider above story */}
        <div className={`flex items-center justify-center gap-4 mb-16 ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
          <div className="text-[var(--color-gold)] text-[0.65rem] tracking-widest">•◆•</div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className={`flex flex-col ${isAr ? 'dir-ar' : 'dir-en'} ${visible ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <h2 className="font-display text-display-lg text-[var(--color-text-primary)] mb-6 text-gold-gradient">
              {isAr ? 'منذ ٢٠٠٧' : 'Since 2007'}
            </h2>
            
            <blockquote className="font-display text-xl md:text-2xl text-[var(--color-gold-light)] italic mb-8 border-s-2 border-[var(--color-gold)] ps-6">
              {isAr 
                ? 'العطر ليس مجرد رائحة، بل هو توقيع يتركه الإنسان خلفه ليحكي قصة حضوره.'
                : 'Perfume is not just a scent, it is a signature one leaves behind to tell the story of their presence.'
              }
            </blockquote>
            
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-6">
              {isAr
                ? 'بدأت رحلتنا من قلب العاصمة عمّان، حيث جمعنا الشغف بالعطور الأصيلة وحب التفرد. في دهب للعطور، نؤمن بأن العطر هو الترجمة الصامتة لشخصيتك وأسلوبك.'
                : 'Our journey began in the heart of Amman, where a passion for authentic fragrances and a love for uniqueness brought us together. At DAHAB PERFUMES, we believe that fragrance is the silent translation of your personality and style.'}
            </p>
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
              {isAr
                ? 'ننتقي لكم بعناية فائقة أفضل المكونات من العود النادر، المسك الصافي، والعنبر الفاخر لنقدم لكم تجربة عطرية لا تُنسى.'
                : 'We meticulously select the finest ingredients from rare oud, pure musk, and luxurious amber to offer you an unforgettable aromatic experience.'}
            </p>
          </div>

          {/* Image */}
          <div className={`relative h-[400px] md:h-[600px] rounded-t-full rounded-b-xl overflow-hidden border-2 border-[var(--color-border)] p-2 ${visible ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="w-full h-full rounded-t-full rounded-b-lg overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800" 
                alt="Brand Heritage" 
                className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040302] via-[#040302]/20 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
