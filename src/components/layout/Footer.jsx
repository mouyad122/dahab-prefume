'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { brandConfig } from '../../config/brand';
import { LanguageContext } from '../../contexts/LanguageContext';
import { InstagramLogo, FacebookLogo, MapPin } from '@phosphor-icons/react';

export default function Footer() {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  return (
    <footer className="w-full bg-[#050505] text-[#A3A3A3] border-t border-zinc-900/60 pt-20 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-[0.25em] text-[var(--color-gold)]">
              DAHAB PERFUMES
            </span>
            <span className="text-[7px] uppercase tracking-[0.4em] text-zinc-600 mt-1">
              Downtown Amman
            </span>
          </div>

          {/* Bilingual Brand Statement */}
          <div className="flex flex-col gap-3 text-xs leading-relaxed font-light text-zinc-400">
            <p className="font-sans-ar leading-relaxed">
              دهب للعطور — عطور وصيغ نيش فاخرة تم تركيبها يدوياً لتمنحك أقصى درجات الثبات والفوحان التي تدوم لأيام.
            </p>
            <p className="font-sans-en italic leading-relaxed text-zinc-500">
              Let your scent spread your influence. Hand-blended luxury niche fragrances with unmatched longevity and sillage.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-2">
            <a 
              href={brandConfig.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
              aria-label="Instagram"
            >
              <InstagramLogo size={16} />
            </a>
            <a 
              href={brandConfig.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
              aria-label="Facebook"
            >
              <FacebookLogo size={16} />
            </a>
            <Link 
              href="/store-location" 
              className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
              aria-label="Store Location"
            >
              <MapPin size={16} />
            </Link>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex flex-col gap-4">
          <h4 className={`text-xs font-bold uppercase tracking-widest text-white ${isAr ? 'font-sans-ar' : 'font-sans-en'}`}>
            {isAr ? 'أوقات العمل' : 'Opening Hours'}
          </h4>
          <ul className="text-xs flex flex-col gap-2 font-light text-zinc-400">
            <li className="flex flex-col">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{isAr ? 'طيلة أيام الأسبوع' : 'Weekdays'}</span>
              <span>{brandConfig.workingHours.weekdays[language]}</span>
            </li>
            <li className="flex flex-col mt-1">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{isAr ? 'عطلة نهاية الأسبوع' : 'Weekend'}</span>
              <span>{brandConfig.workingHours.weekend[language]}</span>
            </li>
          </ul>
        </div>

        {/* Quick & Collection Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className={`text-xs font-bold uppercase tracking-widest text-white ${isAr ? 'font-sans-ar' : 'font-sans-en'}`}>
            {isAr ? 'روابط سريعة' : 'Boutique Directory'}
          </h4>
          <ul className="text-xs flex flex-col gap-2.5 font-light text-zinc-400">
            <li>
              <Link href="/shop" className="hover:text-[var(--color-gold)] transition-colors">{t('shop')}</Link>
            </li>
            <li>
              <Link href="/collections/hair-mists" className="hover:text-[var(--color-gold)] transition-colors">
                {isAr ? 'معطرات الشعر' : 'Hair Mists Collection'}
              </Link>
            </li>
            <li>
              <Link href="/collections/private-collection" className="hover:text-[var(--color-gold)] transition-colors">
                {isAr ? 'المجموعة الخاصة' : 'Private Collection'}
              </Link>
            </li>
            <li>
              <Link href="/collections/middle-eastern" className="hover:text-[var(--color-gold)] transition-colors">
                {isAr ? 'العطور الشرقية' : 'Middle Eastern Blends'}
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-[var(--color-gold)] transition-colors">{t('shipping')}</Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[var(--color-gold)] transition-colors">{t('returns')}</Link>
            </li>
          </ul>
        </div>

        {/* Store Location & Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className={`text-xs font-bold uppercase tracking-widest text-white ${isAr ? 'font-sans-ar' : 'font-sans-en'}`}>
            {isAr ? 'تواصل معنا' : 'Concierge & Info'}
          </h4>
          <p className="text-xs leading-relaxed font-light text-zinc-400">
            {brandConfig.address[language]}
          </p>
          <div className="text-xs flex flex-col gap-2.5 font-light text-zinc-400 mt-2">
            <span className="block">
              <strong className="text-zinc-500 font-medium block text-[9px] uppercase tracking-wider">{isAr ? 'هاتف المحل' : 'Helpline'}</strong>
              {brandConfig.phoneLocal}
            </span>
            <span className="block">
              <strong className="text-zinc-500 font-medium block text-[9px] uppercase tracking-wider">{isAr ? 'الواتساب الرسمي' : 'Official WhatsApp'}</strong>
              {brandConfig.phoneFormatted}
            </span>
            <span className="block">
              <strong className="text-zinc-500 font-medium block text-[9px] uppercase tracking-wider">{isAr ? 'البريد الإلكتروني' : 'Email Inquiry'}</strong>
              {brandConfig.email}
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-900/60 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-600 font-light">
        <span>&copy; {new Date().getFullYear()} DAHAB PERFUMES. All Rights Reserved.</span>
        <span className="mt-2 md:mt-0 uppercase tracking-widest">{isAr ? 'صنع بفخامة في عمان، الأردن' : 'Crafted with luxury in Amman, Jordan'}</span>
      </div>
    </footer>
  );
}
