'use client';

import React, { useContext } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function WhatsAppButton() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const message = isAr 
    ? 'مرحباً، أريد الاستفسار عن منتجات DAHAB PERFUMES' 
    : 'Hello, I would like to ask about DAHAB PERFUMES products.';

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/962785050655?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 group focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
      aria-label={isAr ? 'تواصل معنا عبر الواتساب' : 'Contact us on WhatsApp'}
    >
      <WhatsappLogo size={32} weight="fill" className="transition-transform duration-300 group-hover:rotate-12" />
      
      {/* Subtle floating label reveal */}
      <span className={`absolute right-16 bg-[var(--color-bg-secondary)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md ${isAr ? 'font-sans-ar' : 'font-sans-en'}`}>
        {isAr ? 'تواصل معنا' : 'Chat with Us'}
      </span>
    </a>
  );
}
