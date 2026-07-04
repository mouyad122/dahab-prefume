'use client';

import React, { useContext, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, Trash, Plus, Minus, ShoppingBag, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import LuxuryButton from '../ui/LuxuryButton';
import { getProductImageSrc } from '../../lib/productDisplay';

export default function CartDrawer() {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const isCartOpen = useCartStore(state => state.isCartOpen);
  const cartItems = useCartStore(state => state.cartItems);
  const updateQty = useCartStore(state => state.updateQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const drawerRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isCartOpen) setCartOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isCartOpen, setCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? 'سلة التسوق' : 'Shopping Cart'}
        className={`fixed top-0 z-[70] h-full w-full max-w-md bg-[var(--color-bg-primary)] border-[var(--color-border)] shadow-2xl flex flex-col ${
          isAr ? 'left-0 border-r cart-drawer-rtl' : 'right-0 border-l cart-drawer-ltr'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[var(--color-gold)]" weight="bold" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              {isAr ? 'سلة التسوق' : 'Your Cart'}
            </h2>
            {cartCount > 0 && (
              <span className="bg-[var(--color-gold)] text-black text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <LuxuryButton 
            variant="icon"
            onClick={() => setCartOpen(false)}
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X size={16} weight="bold" />
          </LuxuryButton>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center gap-5 h-full">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                <ShoppingBag size={28} className="text-[var(--color-text-muted)]" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                {isAr ? 'سلة التسوق فارغة حالياً.' : 'Your cart is currently empty.'}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-[260px]">
                {isAr
                  ? 'اكتشف عطورنا الفخمة ومعطرات الشعر الحصرية وأضفها إلى سلتك.'
                  : 'Explore our luxury fragrances and exclusive hair mists to fill your cart.'}
              </p>
              <LuxuryButton
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="py-3 px-8 text-xs mt-2"
              >
                {t('backToShop')}
              </LuxuryButton>
            </div>
          ) : (
            /* Items List */
            <div className="flex flex-col gap-4">
              {cartItems.map(item => {
                const title = (isAr ? item.title_ar : item.title_en) || item.title || item.name_ar || item.name_en || '';
                const maxStock = Number(item.stock);
                const hasStockCap = Number.isFinite(maxStock) && maxStock > 0;
                return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 flex items-start gap-4 transition-all duration-300 hover:border-[var(--color-gold)]/20"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)]"
                  >
                    <img
                      src={getProductImageSrc(item)}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-2 min-w-0 text-start">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] uppercase tracking-widest text-[var(--color-gold)] font-bold">
                        {item.category?.name_ar || item.category?.name_en || item.main_category || (isAr ? 'عطور نيش' : 'Niche Fragrance')}
                      </span>
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="font-display text-sm font-bold text-[var(--color-text-primary)] leading-tight hover:text-[var(--color-gold)] transition-colors truncate"
                      >
                        {title}
                      </Link>
                      <span className="text-[9px] text-[var(--color-text-muted)] tracking-wider">
                        {item.volume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full px-2.5 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.quantity - 1, item.stock)}
                          disabled={item.quantity <= 1}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-500 hover:text-[var(--color-text-primary)] disabled:opacity-30 transition-colors cursor-pointer"
                          aria-label={isAr ? 'إنقاص الكمية' : 'Decrease quantity'}
                        >
                          <Minus size={10} weight="bold" />
                        </button>
                        <span className="text-[11px] font-semibold text-[var(--color-text-primary)] w-5 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.quantity + 1, item.stock)}
                          disabled={hasStockCap && item.quantity >= maxStock}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-500 hover:text-[var(--color-text-primary)] disabled:opacity-30 transition-colors cursor-pointer"
                          aria-label={isAr ? 'زيادة الكمية' : 'Increase quantity'}
                        >
                          <Plus size={10} weight="bold" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-[var(--color-text-primary)]">
                        {((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)} JOD
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded-full text-zinc-500 hover:text-red-500 hover:bg-red-500/5 transition-all active:scale-90 cursor-pointer shrink-0 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={isAr ? 'حذف المنتج' : 'Remove item'}
                  >
                    <Trash size={14} />
                  </button>
                </div>
              );})}
            </div>
          )}
        </div>

        {/* Drawer Footer (only when items exist) */}
        {cartItems.length > 0 && (
          <div className="border-t border-[var(--color-border)] px-6 py-5 flex flex-col gap-4 bg-[var(--color-bg-secondary)]">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[var(--color-text-secondary)] font-light">
                {isAr ? 'المجموع الفرعي' : 'Subtotal'}
              </span>
              <span className="text-sm font-bold text-[var(--color-gold)]">
                {subtotal.toFixed(2)} JOD
              </span>
            </div>

            <p className="text-[9px] text-[var(--color-text-muted)] leading-relaxed">
              {isAr
                ? 'رسوم التوصيل تُحسب عند إتمام الطلب حسب المدينة.'
                : 'Delivery fees calculated at checkout based on your city.'}
            </p>

            {/* Checkout CTA */}
            <LuxuryButton
              href={`https://wa.me/962785050655?text=${encodeURIComponent(
                (isAr ? 'مرحباً، أود إتمام هذا الطلب من DAHAB PERFUMES:\n\n' : 'Hello, I would like to complete this order from DAHAB PERFUMES:\n\n') +
                cartItems.map(item => `- ${item.quantity}x ${isAr ? item.title_ar || item.title : item.title_en || item.title} (${(item.price * item.quantity).toFixed(2)} JOD)`).join('\n') +
                '\n\n' +
                (isAr ? `الإجمالي الفرعي: ${subtotal.toFixed(2)} JOD` : `Subtotal: ${subtotal.toFixed(2)} JOD`) +
                (isAr ? '\n\nيرجى تزويدي بتفاصيل التوصيل وإجمالي المبلغ النهائي.' : '\n\nPlease provide me with delivery details and the final total.')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              className="w-full font-sans-ar uppercase tracking-[0.1em]"
              iconLeft={WhatsappLogo}
              fullWidth
            >
              {isAr ? 'إتمام الطلب عبر واتساب' : 'Checkout via WhatsApp'}
            </LuxuryButton>

            {/* View Full Cart */}
            <LuxuryButton
              href="/cart"
              onClick={() => setCartOpen(false)}
              variant="ghost"
              className="!py-2 !text-[11px] font-sans-ar"
              fullWidth
            >
              {isAr ? 'عرض السلة الكاملة' : 'View Full Cart'}
            </LuxuryButton>
          </div>
        )}
      </div>

      {/* Animations are defined globally in index.css as .cart-drawer-rtl / .cart-drawer-ltr */}
    </>
  );
}
