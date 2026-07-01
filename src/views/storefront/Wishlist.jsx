'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import { initialProducts } from '../../data/initialProducts';
import Link from 'next/link';
import { Heart, ShoppingBag, WhatsappLogo, Trash, ArrowRight } from '@phosphor-icons/react';

export default function Wishlist() {
  const { language, t } = useContext(LanguageContext);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);
  const isAr = language === 'ar';

  const wishlistProducts = initialProducts.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (product) => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    toggleWishlist(product.id); // Remove from wishlist after adding to cart
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
          {t('wishlist')}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {isAr ? 'عطورك المفضلة' : 'Your Wishlist'}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {isAr ? 'قائمة بالعطور والخلطات التي أثارت اهتمامك لطلبها لاحقاً.' : 'Browse the curated selection of fragrances you have saved for later.'}
        </p>
        {wishlistProducts.length > 0 && (
          <span className="text-[10px] text-[var(--color-text-muted)] font-light">
            {isAr ? `${wishlistProducts.length} عطور محفوظة` : `${wishlistProducts.length} saved items`}
          </span>
        )}
      </div>

      {/* Wishlist Grid */}
      {wishlistProducts.length === 0 ? (
        <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-lg mx-auto">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-12 text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-500/5 border border-red-500/10 flex items-center justify-center">
              <Heart size={28} className="text-red-500/40" />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
              {isAr ? 'قائمة المفضلة فارغة حالياً.' : 'Your wishlist is currently empty.'}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-[280px]">
              {isAr ? 'تصفح تشكيلة العطور الفخمة ومعطرات الشعر وأضف مفضلاتك هنا.' : 'Explore our collection of fine fragrances and save your favorites.'}
            </p>
            <Link href="/shop" className="btn-primary py-3 px-8 mt-2">
              {t('backToShop')}
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {wishlistProducts.map(product => {
            const isOutOfStock = product.stock === 0;
            const whatsappMessage = isAr 
              ? `مرحباً، أود الاستفسار عن عطر: ${t(product.title)} بسعر ${product.price.toFixed(2)} دينار أردني.` 
              : `Hello, I would like to ask about the fragrance: ${t(product.title)} priced at ${product.price.toFixed(2)} JOD.`;
            const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div
                key={product.id}
                className="rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 hover:scale-[1.003]"
              >
                <div className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 md:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-main">
                  
                  {/* Product Thumbnail */}
                  <Link href={`/products/${product.slug}`} className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] ${isOutOfStock ? 'opacity-50' : ''}`}>
                    <img 
                      src={product.thumbnail} 
                      alt={t(product.title)} 
                      className="w-full h-full object-cover" 
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-2 text-start min-w-0">
                    <span className="text-[8px] uppercase tracking-widest text-[var(--color-gold)] font-bold">{product.category}</span>
                    <Link href={`/products/${product.slug}`} className="hover:text-[var(--color-gold)] transition-colors">
                      <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] leading-tight">
                        {t(product.title)}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {product.price.toFixed(2)} JOD
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs line-through text-[var(--color-text-muted)] font-light">
                          {product.compareAtPrice.toFixed(2)} JOD
                        </span>
                      )}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${
                      isOutOfStock ? 'text-red-500' : product.stock <= 4 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {isOutOfStock 
                        ? (isAr ? 'غير متوفر حالياً' : 'Out of Stock')
                        : product.stock <= 4 
                          ? (isAr ? `باقي ${product.stock} قطع فقط!` : `Only ${product.stock} left!`)
                          : (isAr ? 'متوفر' : 'In Stock')
                      }
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center sm:justify-end">
                    {/* Move to Cart */}
                    {!isOutOfStock && (
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex items-center gap-1.5 bg-[var(--color-gold)] text-black text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-full hover:bg-[var(--color-gold-light)] transition-all active:scale-95 cursor-pointer focus-visible:outline-none"
                        aria-label={isAr ? 'نقل إلى السلة' : 'Move to Cart'}
                      >
                        <ShoppingBag size={14} weight="bold" />
                        <span>{isAr ? 'نقل للسلة' : 'Move to Cart'}</span>
                      </button>
                    )}

                    {/* WhatsApp Inquiry */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-full hover:bg-[#25D366]/20 transition-all active:scale-95 focus-visible:outline-none"
                      aria-label={isAr ? 'استفسار واتساب' : 'WhatsApp Inquiry'}
                    >
                      <WhatsappLogo size={14} weight="bold" />
                      <span>{isAr ? 'واتساب' : 'Inquire'}</span>
                    </a>

                    {/* Remove from Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2.5 rounded-full border border-red-500/10 text-red-500 hover:bg-red-500/5 hover:border-red-500/30 transition-all active:scale-95 cursor-pointer focus-visible:outline-none"
                      aria-label={isAr ? 'حذف من المفضلة' : 'Remove from Wishlist'}
                    >
                      <Trash size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Continue Shopping CTA */}
          <div className="flex justify-center mt-4">
            <Link 
              href="/shop" 
              className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] uppercase tracking-wider transition-colors"
            >
              <span>{isAr ? 'متابعة التسوق' : 'Continue Shopping'}</span>
              <ArrowRight size={12} weight="bold" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
