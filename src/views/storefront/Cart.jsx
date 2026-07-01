'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import Link from 'next/link';
import { Trash, Plus, Minus, WhatsappLogo, ArrowUpRight, ShoppingBag, ArrowLeft } from '@phosphor-icons/react';

export default function Cart() {
  const { language, t } = useContext(LanguageContext);
  const cartItems = useCartStore(state => state.cartItems);
  const updateQty = useCartStore(state => state.updateQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const isAr = language === 'ar';

  // Subtotal Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery fee note (calculated at checkout — not displayed as a fixed total here)
  // The actual fee ranges: Amman=2 JOD, Most cities=3 JOD, Remote=4 JOD

  const whatsappMessage = isAr 
    ? 'مرحباً، أحتاج إلى مساعدة بخصوص طلبي من DAHAB PERFUMES.' 
    : 'Hello, I would like to get assistance regarding my DAHAB PERFUMES order.';
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
          {t('cart')}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {isAr ? 'سلة المشتريات' : 'Shopping Cart'}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {isAr ? 'راجع عطورك المختارة وتابع تأكيد طلبك لتوصيله لك مباشرة.' : 'Review your selected niche fragrances and proceed to checkout.'}
        </p>
        {cartItems.length > 0 && (
          <span className="text-[10px] text-[var(--color-text-muted)] font-light">
            {isAr ? `${itemCount} منتجات في السلة` : `${itemCount} items in cart`}
          </span>
        )}
      </div>

      {/* Cart Grid Layout */}
      {cartItems.length === 0 ? (
        <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-lg mx-auto">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-12 text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center">
              <ShoppingBag size={28} className="text-[var(--color-text-muted)]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
              {isAr ? 'سلة التسوق فارغة حالياً.' : 'Your cart is currently empty.'}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-[280px]">
              {isAr ? 'اكتشف عطورنا الفخمة والخلطات النادرة وأضفها إلى السلة لبدء رحلتك.' : 'Explore our collection of fine fragrances to start your journey.'}
            </p>
            <Link href="/shop" className="btn-primary py-3 px-8 mt-2">
              {t('backToShop')}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map(item => (
              <div 
                key={item.id} 
                className="rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 hover:scale-[1.005]"
              >
                <div className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-main">
                  
                  {/* Item Image and Title */}
                  <div className="flex items-center gap-4 text-start w-full sm:w-auto">
                    <Link href={`/products/${item.slug}`} className="shrink-0">
                      <img 
                        src={item.thumbnail} 
                        alt={t(item.title)} 
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]" 
                      />
                    </Link>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-[8px] uppercase tracking-widest text-[var(--color-gold)] font-bold">{item.category}</span>
                      <Link href={`/products/${item.slug}`}>
                        <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] leading-tight hover:text-[var(--color-gold)] transition-colors">
                          {t(item.title)}
                        </h4>
                      </Link>
                      <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider">
                        {isAr ? 'الحجم:' : 'Volume:'} {item.volume}
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full px-3 py-2">
                    <button 
                      onClick={() => updateQty(item.id, item.quantity - 1, item.stock)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:hover:text-zinc-500 transition-colors cursor-pointer"
                      aria-label={isAr ? 'إنقاص الكمية' : 'Decrease quantity'}
                    >
                      <Minus size={11} weight="bold" />
                    </button>
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] w-6 text-center select-none">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQty(item.id, item.quantity + 1, item.stock)}
                      disabled={item.quantity >= item.stock}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:hover:text-zinc-500 transition-colors cursor-pointer"
                      aria-label={isAr ? 'زيادة الكمية' : 'Increase quantity'}
                    >
                      <Plus size={11} weight="bold" />
                    </button>
                  </div>

                  {/* Pricing info */}
                  <div className="flex flex-col text-center sm:text-end">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                      {(item.price * item.quantity).toFixed(2)} JOD
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)]">
                      {item.price.toFixed(2)} JOD / {isAr ? 'للقطعة' : 'each'}
                    </span>
                  </div>

                  {/* Remove action */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2.5 rounded-full border border-red-500/10 text-red-500 hover:bg-red-500/5 hover:border-red-500/30 transition-all active:scale-95 cursor-pointer"
                    aria-label={isAr ? 'حذف المنتج' : 'Remove item'}
                  >
                    <Trash size={14} />
                  </button>

                </div>
              </div>
            ))}

            {/* Cart Actions row */}
            <div className="flex flex-wrap justify-between items-center px-2 mt-2 gap-4">
              <button 
                onClick={clearCart}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash size={14} />
                <span>{isAr ? 'تفريغ السلة بالكامل' : 'Clear All Items'}</span>
              </button>
              <Link href="/shop" className="text-[10px] font-bold text-[var(--color-gold)] hover:text-[var(--color-gold-light)] uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                <ArrowLeft size={12} weight="bold" />
                <span>{isAr ? 'متابعة التسوق' : 'Continue Shopping'}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Cart Summary - Double Bezel Card */}
          <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 w-full lg:sticky lg:top-32">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 shadow-main flex flex-col gap-6">
              
              <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 text-start">
                {isAr ? 'ملخص الحساب' : 'Order Summary'}
              </h3>

              {/* Summary calculation parameters */}
              <div className="flex flex-col gap-3.5 text-xs text-[var(--color-text-secondary)] font-light">
                <div className="flex justify-between">
                  <span>{isAr ? `المجموع الفرعي (${itemCount} منتجات)` : `Subtotal (${itemCount} items)`}</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">{subtotal.toFixed(2)} JOD</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{isAr ? 'رسوم التوصيل' : 'Delivery fee'}</span>
                  <span className="font-semibold text-amber-500 text-[10px]">{isAr ? 'يُحسب عند الطلب' : 'Calculated at checkout'}</span>
                </div>
                
                <div className="border-t border-[var(--color-border)] pt-4 flex justify-between text-sm font-bold text-[var(--color-text-primary)]">
                  <span>{isAr ? 'المجموع الإجمالي' : 'Grand Total'}</span>
                  <span className="text-[var(--color-gold)]">{subtotal.toFixed(2)}+ JOD</span>
                </div>
              </div>

              {/* Shipping notes banner */}
              <div className="bg-[var(--color-bg-primary)] p-3 rounded-lg border border-[var(--color-border)] text-[9px] text-[var(--color-text-muted)] text-start leading-relaxed">
                {isAr 
                  ? 'الشحن متوفر حالياً فقط داخل المملكة الأردنية الهاشمية. رسوم التوصيل تُحسب بشكل نهائي حسب المدينة عند إتمام الطلب.'
                  : 'Shipping is currently limited to Jordan only. Final delivery fees are calculated at checkout based on your city.'
                }
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col gap-3 mt-2">
                <Link 
                  href="/checkout"
                  className="group relative flex items-center justify-center gap-3 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.15em] py-4 rounded-full transition-all duration-300 hover:bg-[var(--color-gold-light)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{isAr ? 'إتمام الطلب وتأكيده' : 'Proceed to Checkout'}</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[var(--color-border-strong)] text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-[0.15em] py-4 rounded-full hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] transition-all duration-300"
                >
                  <WhatsappLogo size={16} className="text-[#25D366]" weight="bold" />
                  <span>{isAr ? 'مساعدة عبر واتساب' : 'WhatsApp Support'}</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
