'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { Clock, InstagramLogo, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';
import { SettingsContext } from '../../contexts/SettingsContext';

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const { settings } = useContext(SettingsContext);
  const isAr = language === 'ar';
  
  const whatsappText = isAr
    ? 'مرحبًا، أريد الاستفسار عن عطور DAHAB PERFUMES.'
    : 'Hello, I would like to ask about DAHAB PERFUMES.';
  
  const wpNumberClean = (settings.contact_phone || brandConfig.whatsappNumber).replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${wpNumberClean}?text=${encodeURIComponent(whatsappText)}`;
  
  const instagramUrl = settings.social_instagram || brandConfig.instagram;
  const storeAddressAr = settings.store_address || brandConfig.address.ar;
  const storeAddressEn = settings.store_address_en || brandConfig.address.en;
  const workingHoursAr = settings.working_hours || brandConfig.workingHours.weekdays.ar;
  const workingHoursEn = settings.working_hours_en || brandConfig.workingHours.weekdays.en;
  const contactPhone = settings.contact_phone || brandConfig.phoneFormatted;

  const links = [
    { label: isAr ? 'المتجر' : 'Shop', href: '/shop' },
    { label: isAr ? 'المجموعات' : 'Collections', href: '/collections' },
    { label: isAr ? 'عن دهب' : 'About', href: '/about' },
    { label: isAr ? 'سياسة الإرجاع' : 'Returns', href: '/returns' },
    { label: isAr ? 'الشحن' : 'Shipping', href: '/shipping' },

  ];

  return (
    <footer className={`site-footer ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <div className="premium-container py-14 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_1fr]">
          <div>
            <Link href="/" className="brand-lockup inline-flex items-center gap-3">
              <img src="/brand/dahab-logo.png" alt="" aria-hidden="true" className="brand-logo-image brand-logo-image-footer" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-3xl tracking-[0.18em] text-[var(--color-gold-pale)]">DAHAB</span>
                <span className="text-[0.62rem] font-bold tracking-[0.32em] text-[var(--color-text-muted)]">PERFUMES</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
              {isAr
                ? 'دار عطور في قلب عمّان، تختار الخامات بعناية وتقدّم تركيبات شرقية وعالمية بثبات وفوحان يناسب حضورك.'
                : 'A fragrance house in the heart of Amman, curating Eastern and international blends with presence, longevity, and polish.'}
            </p>
            <div className="mt-6 flex gap-3">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Instagram">
                <InstagramLogo size={18} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="icon-btn text-[#71d79a]" aria-label="WhatsApp">
                <WhatsappLogo size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">{isAr ? 'روابط سريعة' : 'Explore'}</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-title">{isAr ? 'زيارة المعرض' : 'Visit The Store'}</h3>
            <div className="mt-5 space-y-4 text-sm text-[var(--color-text-secondary)]">
              <a href={brandConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-[var(--color-gold-light)]">
                <MapPin size={17} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                <span>{brandConfig.address[language]}</span>
              </a>
              <a href={`tel:${brandConfig.whatsappNumber}`} className="flex items-center gap-3 hover:text-[var(--color-gold-light)]">
                <Phone size={17} className="text-[var(--color-gold)]" />
                <span dir="ltr">{brandConfig.phoneFormatted}</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock size={17} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                <span>{brandConfig.workingHours.weekdays[language]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DAHAB PERFUMES</span>
          <span>{isAr ? 'تصميم وتجربة رقمية بمعايير متجر فاخر' : 'A refined digital storefront for luxury fragrance'}</span>
        </div>
      </div>
    </footer>
  );
}
