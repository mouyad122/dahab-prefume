'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Heart, WhatsappLogo, Eye, ShoppingBag, Check } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import Button from '../ui/Button';

export default function ProductCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);
  const isAr = language === 'ar';

  // Derive wishlist status directly from store so it stays in sync
  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock === 0;

  const [addedToCart, setAddedToCart] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const whatsappMessage = isAr 
    ? `مرحباً، أود الاستفسار عن عطر: ${t(product.title)} بسعر ${product.price.toFixed(2)} دينار أردني.` 
    : `Hello, I would like to ask about the fragrance: ${t(product.title)} priced at ${product.price.toFixed(2)} JOD.`;
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(201,155,54,0.03)] h-full">
      <div className="rounded-[calc(2.5rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 flex flex-col justify-between h-full relative">
        
        {/* Top Badges & Actions */}
        <div className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between pointer-events-none">
          {/* Sale badge */}
          {product.compareAtPrice ? (
            <span className="bg-[var(--color-gold-dark)] text-white text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm pointer-events-auto">
              {isAr ? 'عرض خاص' : 'Offer'}
            </span>
          ) : isOutOfStock ? (
            <span className="bg-red-500/90 text-white text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm pointer-events-auto">
              {isAr ? 'نفد المخزون' : 'Sold Out'}
            </span>
          ) : (
            <span />
          )}

          {/* Wishlist Button */}
          <button 
            onClick={handleWishlist}
            className="w-8 h-8 rounded-full bg-[var(--color-bg-primary)]/80 backdrop-blur-sm border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] hover:text-red-500 hover:border-red-500/20 active:scale-90 transition-all duration-300 pointer-events-auto cursor-pointer focus-visible:outline-none"
            aria-label={isAr ? 'إضافة للمفضلة' : 'Add to Wishlist'}
          >
            <Heart size={14} weight={isWishlisted ? 'fill' : 'regular'} className={isWishlisted ? 'text-red-500' : ''} />
          </button>
        </div>

        {/* Product Visual */}
        <Link href={`/products/${product.slug}`} className={`block w-full aspect-square rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] mb-5 relative group focus-visible:outline-none ${isOutOfStock ? 'opacity-60' : ''}`}>
          <img 
            src={product.thumbnail} 
            alt={t(product.title)} 
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
          {/* Eye Quick Reveal Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-[var(--color-gold)] text-black flex items-center justify-center shadow-md">
              <Eye size={18} weight="bold" />
            </div>
          </div>
        </Link>

        {/* Category & Title */}
        <div className="flex flex-col gap-2 text-center items-center flex-grow">
          <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--color-gold)] font-extrabold">
            {product.category}
          </span>
          <Link href={`/products/${product.slug}`} className="focus-visible:outline-none">
            <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors leading-snug">
              {t(product.title)}
            </h3>
          </Link>
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase font-light">
            {isAr ? 'الحجم:' : 'Volume:'} {product.volume}
          </span>
        </div>

        {/* Pricing & Stock indicators */}
        <div className="flex flex-col items-center gap-1.5 mt-4 border-t border-[var(--color-border)] pt-4 w-full">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--color-text-primary)]">
              {product.price.toFixed(2)} JOD
            </span>
            {product.compareAtPrice && (
              <span className="text-xs line-through text-[var(--color-text-muted)] font-light">
                {product.compareAtPrice.toFixed(2)} JOD
              </span>
            )}
          </div>
          
          <span className={`text-[8px] font-bold uppercase tracking-wider ${
            isOutOfStock ? 'text-red-500' : product.stock <= 4 ? 'text-amber-500' : 'text-emerald-500'
          }`}>
            {isOutOfStock 
              ? (isAr ? 'غير متوفر حالياً' : 'Out of Stock')
              : product.stock <= 4 
                ? (isAr ? `باقي ${product.stock} قطع فقط!` : `Only ${product.stock} left!`) 
                : t('available')
            }
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 mt-5 w-full">
          {isOutOfStock ? (
            /* Out of stock: WhatsApp Inquiry only */
            <Button 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              variant="success"
              className="flex-1 !py-2 !px-2 !text-[11px] font-sans-ar"
              icon={WhatsappLogo}
            >
              {isAr ? 'استفسار واتساب' : 'WhatsApp Inquiry'}
            </Button>
          ) : (
            <>
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-[42px] flex items-center justify-center gap-2 rounded-md font-bold uppercase transition-all duration-300 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] text-[11px] font-sans-ar tracking-wider ${
                  addedToCart
                    ? 'bg-emerald-500 text-white border border-emerald-500'
                    : 'bg-[linear-gradient(135deg,#c5a049_0%,#ecd393_50%,#9e7929_100%)] text-[#040302] border border-[rgba(255,223,122,0.4)] shadow-[0_4px_20px_rgba(196,154,68,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(196,154,68,0.42)]'
                }`}
                aria-label={isAr ? 'أضف للسلة' : 'Add to Cart'}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} weight="bold" />
                    <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} weight="bold" />
                    <span>{isAr ? 'إضافة للسلة' : 'Add to Cart'}</span>
                  </>
                )}
              </button>

              {/* View Product */}
              <Button 
                href={`/products/${product.slug}`}
                variant="secondary"
                className="flex-1 !py-2 !px-2 !text-[11px] font-sans-ar"
              >
                {isAr ? 'عرض العطر' : 'View Scent'}
              </Button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
