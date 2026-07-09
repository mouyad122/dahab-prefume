'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, ShoppingBag, Heart, WhatsappLogo, Storefront } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import { brandConfig } from '../../config/brand';

export default function MobileBottomNav() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/en/, '') || '/';

  const cartItems = useCartStore((state) => state.cartItems);
  const wishlist = useCartStore((state) => state.wishlist);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  const whatsappText = isAr
    ? 'مرحبًا، أريد الاستفسار عن عطور DAHAB PERFUMES.'
    : 'Hello, I would like to ask about DAHAB PERFUMES.';
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <nav
      className="mobile-bottom-nav"
      aria-label={isAr ? 'التنقل الرئيسي' : 'Main navigation'}
      role="navigation"
    >
      {/* Home */}
      <Link
        href="/"
        className={`mobile-bottom-nav-item ${pathname === '/' ? 'active' : ''}`}
        aria-label={isAr ? 'الرئيسية' : 'Home'}
        aria-current={pathname === '/' ? 'page' : undefined}
      >
        <House size={23} weight={pathname === '/' ? 'fill' : 'regular'} />
        <span>{isAr ? 'الرئيسية' : 'Home'}</span>
      </Link>

      {/* Shop */}
      <Link
        href="/shop"
        className={`mobile-bottom-nav-item ${pathname === '/shop' ? 'active' : ''}`}
        aria-label={isAr ? 'المتجر' : 'Shop'}
        aria-current={pathname === '/shop' ? 'page' : undefined}
      >
        <Storefront size={23} weight={pathname === '/shop' ? 'fill' : 'regular'} />
        <span>{isAr ? 'المتجر' : 'Shop'}</span>
      </Link>

      {/* Cart */}
      <button
        onClick={toggleCart}
        className="mobile-bottom-nav-item"
        aria-label={isAr ? 'السلة' : 'Cart'}
        type="button"
      >
        {cartCount > 0 && (
          <span className="mobile-bottom-nav-badge" aria-hidden="true">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
        <ShoppingBag size={23} weight={cartCount > 0 ? 'fill' : 'regular'} />
        <span>{isAr ? 'السلة' : 'Cart'}</span>
      </button>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        className={`mobile-bottom-nav-item ${pathname === '/wishlist' ? 'active' : ''}`}
        aria-label={isAr ? 'المفضلة' : 'Wishlist'}
        aria-current={pathname === '/wishlist' ? 'page' : undefined}
      >
        {wishlist.length > 0 && (
          <span className="mobile-bottom-nav-badge" aria-hidden="true">
            {wishlist.length > 9 ? '9+' : wishlist.length}
          </span>
        )}
        <Heart size={23} weight={pathname === '/wishlist' ? 'fill' : 'regular'} />
        <span>{isAr ? 'المفضلة' : 'Wishlist'}</span>
      </Link>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-nav-item"
        aria-label={isAr ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
      >
        <WhatsappLogo size={23} weight="regular" />
        <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
      </a>
    </nav>
  );
}
