'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Heart, List, MapPin, ShoppingBag, WhatsappLogo, X } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import { brandConfig } from '../../config/brand';

export default function Header() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const cartItems = useCartStore((state) => state.cartItems);
  const wishlist = useCartStore((state) => state.wishlist);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAr = language === 'ar';
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const navItems = [
    { label: isAr ? 'الرئيسية' : 'Home', path: '/' },
    { label: isAr ? 'المتجر' : 'Shop', path: '/shop' },
    { label: isAr ? 'المجموعات' : 'Collections', path: '/collections' },
    { label: isAr ? 'عن دهب' : 'About', path: '/about' },
    { label: isAr ? 'موقعنا' : 'Location', path: '/store-location' },
    { label: isAr ? 'تواصل معنا' : 'Contact', path: '/contact' },
  ];

  const whatsappText = isAr
    ? 'مرحبًا، أريد الاستفسار عن عطور DAHAB PERFUMES.'
    : 'Hello, I would like to ask about DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="site-topbar">
        <div className={`premium-container flex items-center justify-between gap-4 text-[0.72rem] ${isAr ? 'dir-ar' : 'dir-en'}`}>
          <a href={brandConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-gold-light)]">
            <MapPin size={13} className="text-[var(--color-gold)]" />
            <span>{brandConfig.address[language]}</span>
          </a>
          <span className="mx-auto sm:mx-0 text-[var(--color-gold-light)] font-semibold">
            {brandConfig.tagline[language]}
          </span>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 text-[#71d79a] hover:text-[#98efba]">
            <WhatsappLogo size={14} weight="bold" />
            <span>{brandConfig.phoneLocal}</span>
          </a>
        </div>
      </div>

      <div className="premium-container flex min-h-[74px] items-center justify-between gap-4">
        <Link href="/" className="brand-lockup group flex items-center gap-3">
          <img src="/brand/dahab-logo.png" alt="" aria-hidden="true" className="brand-logo-image brand-logo-image-header" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.65rem] font-semibold tracking-[0.18em] text-[var(--color-gold-pale)]">DAHAB</span>
            <span className="text-[0.58rem] font-bold tracking-[0.32em] text-[var(--color-text-muted)]">PERFUMES</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`nav-link ${active ? 'nav-link-active' : ''}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex btn-whatsapp h-10 min-h-10 px-4 text-xs">
            <WhatsappLogo size={16} weight="bold" />
            <span>{isAr ? 'اطلب عبر واتساب' : 'WhatsApp'}</span>
          </a>
          <button type="button" onClick={toggleLanguage} className="icon-btn" aria-label={isAr ? 'Switch to English' : 'التبديل للعربية'}>
            <Globe size={17} />
          </button>
          <Link href="/wishlist" className="icon-btn relative" aria-label={isAr ? 'المفضلة' : 'Wishlist'}>
            <Heart size={17} />
            {wishlist.length > 0 && <span className="counter-badge">{wishlist.length}</span>}
          </Link>
          <button type="button" onClick={toggleCart} className="icon-btn relative" aria-label={isAr ? 'السلة' : 'Cart'}>
            <ShoppingBag size={17} />
            {cartCount > 0 && <span className="counter-badge">{cartCount}</span>}
          </button>
          <button type="button" onClick={() => setOpen((value) => !value)} className="icon-btn lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className={`mobile-menu ${isAr ? 'dir-ar' : 'dir-en'}`}>
          <div className="premium-container py-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className={`mobile-nav-link ${pathname === item.path ? 'text-[var(--color-gold-light)]' : ''}`}>
                {item.label}
              </Link>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 w-full">
              <WhatsappLogo size={18} weight="bold" />
              <span>{isAr ? 'تواصل مع الخبير' : 'Talk to a specialist'}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
