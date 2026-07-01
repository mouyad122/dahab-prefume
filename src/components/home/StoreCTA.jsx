'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';
import { MapTrifold, WhatsappLogo, Clock } from '@phosphor-icons/react';

export default function StoreCTA() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const whatsappMessage = isAr 
    ? 'مرحباً، أود معرفة موقع المعرض وكيفية الوصول إليكم في وسط البلد.' 
    : 'Hello, I would like to get directions to your Downtown Amman showroom.';
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="w-full bg-[var(--color-bg-primary)] py-32 px-6 border-b border-[var(--color-border)] relative">
      <div className="premium-container flex flex-col items-center gap-20">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
            {isAr ? 'حضور ملموس' : 'Boutique Presence'}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {isAr ? 'تفضّل بزيارة معرضنا' : 'Visit Our Showroom'}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-gold)]" />
        </div>

        {/* Double-Bezel Nested Card Enclosure */}
        <div className="rounded-[3rem] bg-black/5 dark:bg-white/5 p-2.5 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-4xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01]">
          <div className="rounded-[calc(3rem-0.625rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-12 shadow-main grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Left Box: Directions details */}
            <div className="flex flex-col gap-6 text-start">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)]">
                {isAr ? 'وسط البلد ── عمّان' : 'Downtown Amman'}
              </span>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] leading-tight">
                {isAr ? 'شارع الأمير محمد' : 'Prince Mohammad Street'}
              </h3>

              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
                {isAr 
                  ? 'زورونا في وسط البلد، شارع الأمير محمد، عمّان. المعرض يقع في منطقة حيوية وتاريخية تجسّد كرم الضيافة الأردنية.'
                  : 'Visit us in Downtown Amman, Prince Mohammad Street. Experience our scents first-hand in a space designed with luxury perfumery principles.'
                }
              </p>

              {/* Working hours box */}
              <div className="flex items-start gap-3 bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-light">
                <Clock size={18} className="text-[var(--color-gold)] mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-[10px] text-zinc-500 uppercase tracking-wider">{isAr ? 'أوقات العمل والمعاينة' : 'Showroom Hours'}</span>
                  <span>{brandConfig.workingHours.weekdays[language]}</span>
                  <span>{brandConfig.workingHours.weekend[language]}</span>
                </div>
              </div>
            </div>

            {/* Right Box: Google Maps image card + contact actions */}
            <div className="flex flex-col gap-6 w-full">
              {/* Styled Maps Image Card */}
              <a 
                href="https://maps.app.goo.gl/WcHGzHu9WbFpwTAQ8"
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-border)] relative cursor-pointer shadow-md transition-all duration-500 hover:scale-[1.02] hover:border-[var(--color-gold)]/30"
              >
                <img 
                  src="/images/showroom_map.png" 
                  alt={isAr ? 'موقع معرض دهب للعطور' : 'DAHAB PERFUMES Showroom Location Map'} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Floating Red/Gold Pin Marker Overlay */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                  {/* Subtle hover overlay badge */}
                  <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {isAr ? 'اضغط لعرض الخريطة ↗' : 'Click to View Map ↗'}
                  </span>
                </div>
              </a>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {/* Google Maps directions */}
                <a 
                  href="https://maps.app.goo.gl/WcHGzHu9WbFpwTAQ8"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex-1 flex items-center justify-center gap-3 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.15em] px-6 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98] shadow-md"
                >
                  <MapTrifold size={18} weight="bold" />
                  <span>{isAr ? 'خرائط جوجل والاتجاهات' : 'Google Maps Directions'}</span>
                </a>

                {/* WhatsApp direct guide */}
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex-1 flex items-center justify-center gap-3 border border-[var(--color-border-strong)] text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-[0.15em] px-6 py-4 rounded-full transition-all duration-300 hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] hover:scale-105 active:scale-[0.98]"
                >
                  <WhatsappLogo size={18} className="text-[#25D366]" weight="bold" />
                  <span>{isAr ? 'استفسر عن الموقع' : 'Inquire Location'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
