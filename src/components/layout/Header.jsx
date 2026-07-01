'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart,
  Globe, 
  Sun, 
  Moon, 
  List, 
  X,
  InstagramLogo,
  FacebookLogo
} from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useCartStore } from '../../stores/useCartStore';
import { brandConfig } from '../../config/brand';

export default function Header() {
  const { language, toggleLanguage, t } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const cartItems = useCartStore(state => state.cartItems);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleCart = useCartStore(state => state.toggleCart);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Nav items definition
  const navItems = [
    { labelAr: 'الرئيسية', labelEn: 'Home', path: '/' },
    { labelAr: 'المتجر', labelEn: 'Shop', path: '/shop' },
    { labelAr: 'المجموعات', labelEn: 'Collections', path: '/collections' },
    { labelAr: 'من نحن', labelEn: 'About Us', path: '/about' },
    { labelAr: 'التقييمات', labelEn: 'Reviews', path: '/reviews' },
    { labelAr: 'موقع المعرض', labelEn: 'Store Location', path: '/store-location' },
    { labelAr: 'اتصل بنا', labelEn: 'Contact', path: '/contact' }
  ];

  return (
    <header className="w-full flex flex-col bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)] z-40 sticky top-0 transition-colors duration-300">
      {/* ── TOP UTILITY BAR ── */}
      <div className="w-full bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 py-2 flex items-center justify-between text-xs">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a 
            href={brandConfig.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors py-1 px-1"
            aria-label="Instagram"
          >
            <InstagramLogo size={16} />
          </a>
          <a 
            href={brandConfig.facebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors py-1 px-1"
            aria-label="Facebook"
          >
            <FacebookLogo size={16} />
          </a>
        </div>

        {/* Info & Lang Switcher */}
        <div className="flex items-center gap-5">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-1.5 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors py-1 focus-visible:outline-none"
            aria-label={isAr ? 'Switch to English' : 'تغيير للغة العربية'}
          >
            <Globe size={14} />
            <span className={isAr ? 'font-sans-en text-[10px] uppercase font-bold tracking-wider' : 'font-sans-ar text-[11px]'}>
              {isAr ? 'English' : 'العربية'}
            </span>
          </button>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div className="w-full max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand Name Logo (English Only) */}
        <Link href="/" className="flex flex-col items-center focus-visible:outline-none">
          <span className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] text-[var(--color-gold)] leading-none transition-colors hover:text-[var(--color-gold-light)]">
            DAHAB PERFUMES
          </span>
          <span className="text-[7px] uppercase tracking-[0.35em] text-[var(--color-text-secondary)] mt-1.5">
            Downtown Amman
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.2em] justify-center flex-grow">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={idx} 
                href={item.path} 
                className={`transition-colors py-2 px-1 focus-visible:outline-none hover:text-[var(--color-gold)] ${
                  isActive ? 'text-[var(--color-gold)] border-b border-[var(--color-gold)]' : 'text-[var(--color-text-primary)]'
                } ${isAr ? 'font-sans-ar text-[13px] tracking-normal font-medium' : 'font-sans-en'}`}
              >
                {isAr ? item.labelAr : item.labelEn}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Theme, Wishlist, Cart, Mobile Menu trigger) */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme} 
            className="p-2 cursor-pointer text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors active:scale-95 focus-visible:outline-none"
            aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Wishlist Link */}
          <Link 
            href="/wishlist" 
            className="p-2 relative text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors active:scale-95 focus-visible:outline-none"
            aria-label={t('wishlist')}
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--color-gold-dark)] text-[#FAFAF7] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[var(--color-bg-primary)]">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon trigger */}
          <button 
            onClick={toggleCart} 
            className="p-2 relative cursor-pointer text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors active:scale-95 focus-visible:outline-none"
            aria-label={t('cart')}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--color-gold)] text-[#000000] text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[var(--color-bg-primary)]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburguer Toggle */}
          <button 
            onClick={toggleMobileMenu} 
            className="lg:hidden p-2 cursor-pointer text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors active:scale-95 focus-visible:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[90px] z-50 bg-[var(--color-bg-primary)]/98 backdrop-blur-lg flex flex-col items-center justify-start py-12 px-6 overflow-y-auto transition-all duration-300">
          <nav className="flex flex-col gap-6 text-center w-full max-w-sm">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={idx}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg transition-transform duration-300 hover:scale-105 active:scale-95 block py-3 border-b border-[var(--color-border)] ${
                    isActive ? 'text-[var(--color-gold)] font-bold' : 'text-[var(--color-text-primary)]'
                  } ${isAr ? 'font-sans-ar text-xl' : 'font-sans-en uppercase tracking-wider text-sm font-semibold'}`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </Link>
              );
            })}
          </nav>
          
          {/* Quick utility stats inside mobile drawer */}
          <div className="mt-12 flex items-center gap-6 border-t border-[var(--color-border)] pt-8 w-full max-w-sm justify-center text-xs text-[var(--color-text-secondary)]">
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-gold)] transition-colors">
              {t('wishlist')} ({wishlistCount})
            </Link>
            <span className="text-zinc-800">|</span>
            <button onClick={() => { setMobileMenuOpen(false); toggleCart(); }} className="hover:text-[var(--color-gold)] transition-colors">
              {t('cart')} ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
