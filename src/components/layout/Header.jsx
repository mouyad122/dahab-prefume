'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Heart, List, MapPin, ShoppingBag, WhatsappLogo, X } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import { brandConfig } from '../../config/brand';
import LuxuryButton from '../ui/LuxuryButton';

export default function Header() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const cartItems = useCartStore((state) => state.cartItems);
  const wishlist = useCartStore((state) => state.wishlist);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/en/, '') || '/';
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
  ];

  const whatsappText = isAr
    ? 'مرحبًا، أريد الاستفسار عن عطور DAHAB PERFUMES.'
    : 'Hello, I would like to ask about DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="site-topbar">
          <div className="premium-container flex items-center justify-between gap-4 text-[0.72rem]">
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
          <LuxuryButton 
            variant="whatsapp" 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:inline-flex h-10 min-h-[40px] px-4 text-xs"
            iconLeft={WhatsappLogo}
          >
            {isAr ? 'اطلب عبر واتساب' : 'WhatsApp'}
          </LuxuryButton>
          <LuxuryButton 
            variant="icon" 
            onClick={toggleLanguage} 
            aria-label={isAr ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe size={17} />
          </LuxuryButton>
          <Link href="/wishlist" className="relative group p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/10 text-[var(--color-text-primary)] hover:text-[var(--color-gold-light)] transition-colors active:scale-[0.95]" aria-label={isAr ? 'المفضلة' : 'Wishlist'}>
            <Heart size={17} />
            {wishlist.length > 0 && <span className="counter-badge">{wishlist.length}</span>}
          </Link>
          <LuxuryButton 
            variant="icon" 
            onClick={toggleCart} 
            aria-label={isAr ? 'السلة' : 'Cart'}
            className="relative"
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && <span className="counter-badge">{cartCount}</span>}
          </LuxuryButton>
          <LuxuryButton 
            variant="icon" 
            onClick={() => setOpen((value) => !value)} 
            className="lg:hidden" 
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </LuxuryButton>
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
            <LuxuryButton 
              variant="whatsapp" 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 w-full"
              iconLeft={WhatsappLogo}
            >
              {isAr ? 'تواصل مع الخبير' : 'Talk to a specialist'}
            </LuxuryButton>
          </div>
        </nav>
      )}
    </header>
  );
}
