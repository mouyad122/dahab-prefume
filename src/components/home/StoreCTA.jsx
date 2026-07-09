'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, WhatsappLogo } from '@phosphor-icons/react';
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

export default function StoreCTA() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();

  const whatsappMsg = isAr
    ? 'مرحبا، أريد الاستفسار من DAHAB PERFUMES.'
    : 'Hello, I have an inquiry for DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section className="luxury-section relative bg-[var(--color-bg-primary)] overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold-dim)_0%,_transparent_70%)] opacity-30 pointer-events-none" />

      <div className="premium-container relative z-10">
        <div className={`glass-card p-8 md:p-14 border border-[var(--color-border-strong)] ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Info Side */}
            <div className={isAr ? 'dir-ar' : 'dir-en'}>
              <span className="section-kicker mb-4 inline-block">
                {isAr ? 'تفضل بزيارتنا' : 'Visit Our Store'}
              </span>
              <h2 className="font-display text-display-sm text-[var(--color-text-primary)] mb-8">
                {isAr ? 'موقعنا في قلب عمّان' : 'Located in the Heart of Amman'}
              </h2>
              
              <ul className="flex flex-col gap-6 mb-10">
                <li className="flex items-start gap-4 text-[var(--color-text-secondary)]">
                  <MapPin size={24} className="text-[var(--color-gold)] shrink-0" />
                  <div>
                    <strong className="block text-[var(--color-text-primary)] mb-1 font-display text-lg">
                      {isAr ? 'العنوان' : 'Address'}
                    </strong>
                    <span className="text-sm">{brandConfig.address[language]}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-[var(--color-text-secondary)]">
                  <Clock size={24} className="text-[var(--color-gold)] shrink-0" />
                  <div>
                    <strong className="block text-[var(--color-text-primary)] mb-1 font-display text-lg">
                      {isAr ? 'ساعات العمل' : 'Working Hours'}
                    </strong>
                    <div className="text-sm space-y-1">
                      <p>{brandConfig.workingHours.weekdays[language]}</p>
                      <p>{brandConfig.workingHours.weekend[language]}</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-[var(--color-text-secondary)]">
                  <Phone size={24} className="text-[var(--color-gold)] shrink-0" />
                  <div>
                    <strong className="block text-[var(--color-text-primary)] mb-1 font-display text-lg">
                      {isAr ? 'للتواصل' : 'Contact'}
                    </strong>
                    <span className="text-sm font-mono block mb-2" dir="ltr">{brandConfig.phoneFormatted}</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-1.5 px-3 text-xs inline-flex">
                      <WhatsappLogo size={16} weight="bold" />
                      <span>{isAr ? 'راسلنا على واتساب' : 'WhatsApp Us'}</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Side */}
            <div className={`relative h-[300px] md:h-[400px] rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] flex flex-col ${visible ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Dahab%20Perfumes,%20Prince%20Mohammad%20Street,%20Amman&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                className="w-full flex-grow border-0 min-h-[220px]"
                allowFullScreen="" 
                loading="lazy"
                title="Dahab Perfumes Store Location"
              />
              <div className="p-3 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] text-center no-print">
                <a 
                  href={brandConfig.googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs"
                >
                  <MapPin size={16} weight="fill" />
                  <span>{isAr ? 'افتح الموقع في خرائط Google' : 'Open in Google Maps'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
