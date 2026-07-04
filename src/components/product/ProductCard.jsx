'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Heart, WhatsappLogo, Eye, ShoppingBag, Check, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import LuxuryButton from '../ui/LuxuryButton';
import { brandConfig } from '../../config/brand';
import {
  buildCartProduct,
  getDefaultVariant,
  getPriceJod,
  getProductImageSrc,
  getTotalStock,
} from '../../lib/productDisplay';

export default function ProductCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);
  const isAr = language === 'ar';

  const [imageError, setImageError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const defaultVariant = getDefaultVariant(product);
  const rawPrice = getPriceJod(product, defaultVariant);
  const isPriceValid = rawPrice > 0;
  const stockCount = getTotalStock(product);
  const isUnavailable = product.inStock === false || !isPriceValid;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUnavailable) return;

    addToCart(buildCartProduct(product, defaultVariant), 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const titleText = t(product.title) || product.title || product.name_ar || (isAr ? 'عطر دهب الفاخر' : 'DAHAB Luxury Fragrance');

  const whatsappMessage = isAr 
    ? `مرحباً دهب للعطور ✨%0Aأود الاستفسار عن عطر: ${encodeURIComponent(titleText)}${isPriceValid ? ` بسعر ${rawPrice.toFixed(2)} دينار أردني` : ''}.` 
    : `Hello DAHAB Perfumes ✨%0AI would like to ask about fragrance: ${encodeURIComponent(titleText)}${isPriceValid ? ` priced at ${rawPrice.toFixed(2)} JOD` : ''}.`;
    
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean || '962785050655'}?text=${whatsappMessage}`;

  const imageSource = getProductImageSrc(product);
  const hasImage = Boolean(imageSource) && !imageError;

  return (
    <div className="rounded-3xl bg-[#121216]/90 backdrop-blur-xl border border-[#c5a25d]/20 p-4 sm:p-5 flex flex-col justify-between h-full relative group hover:border-[#c5a25d]/50 hover:shadow-[0_12px_35px_rgba(197,162,93,0.12)] transition-all duration-300">
      
      {/* Top Section: Badges & Wishlist */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 z-10">
          {/* Availability / Offer Badge */}
          {isUnavailable ? (
            <span className="bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? 'غير متوفر' : 'Out of Stock'}
            </span>
          ) : product.compareAtPrice ? (
            <span className="bg-[#c5a25d]/20 border border-[#c5a25d]/40 text-[#f3e5c8] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? 'عرض خاص' : 'Special Offer'}
            </span>
          ) : stockCount <= 4 ? (
            <span className="bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {stockCount > 0 ? (isAr ? `باقي ${stockCount} قطع` : `Only ${stockCount} left`) : (isAr ? 'متوفر للطلب' : 'Available to order')}
            </span>
          ) : (
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? 'متوفر' : 'In Stock'}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full bg-[#16161c] border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-400 hover:border-red-400/40 transition-all cursor-pointer ${isWishlisted ? '!text-red-500 !border-red-500/40 bg-red-500/10' : ''}`}
            aria-label={isAr ? 'إضافة للمفضلة' : 'Add to Wishlist'}
          >
            <Heart size={15} weight={isWishlisted ? 'fill' : 'regular'} />
          </button>
        </div>

        {/* Product Visual Container */}
        <Link 
          href={`/products/${product.slug}`} 
          className="block w-full aspect-square rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 mb-4 relative group/img focus:outline-none"
        >
          {hasImage ? (
            <img 
              src={imageSource} 
              alt={titleText} 
              onError={() => setImageError(true)}
              className="w-full h-full object-cover opacity-90 group-hover/img:scale-105 group-hover/img:opacity-100 transition-all duration-500"
            />
          ) : (
            /* Luxury DAHAB Placeholder for missing/broken images */
            <div className="w-full h-full bg-gradient-to-b from-[#1c1a16] via-[#12110e] to-[#0a0a08] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group-hover/img:scale-105 transition-transform duration-500">
              <div className="w-11 h-11 rounded-2xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d] mb-2 shadow-[0_0_15px_rgba(197,162,93,0.15)]">
                <Sparkle size={20} weight="fill" className="animate-pulse text-[#d4af37]" />
              </div>
              <span className="text-[11px] font-serif font-bold text-[#f3e5c8] tracking-widest uppercase">
                DAHAB PERFUMES
              </span>
              <span className="text-[9px] text-[#c5a25d]/70 font-light mt-1">
                {isAr ? 'صورة المنتج قريبًا' : 'Product Image Coming Soon'}
              </span>
            </div>
          )}

          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-[#c5a25d] text-black flex items-center justify-center shadow-lg font-bold">
              <Eye size={18} weight="bold" />
            </div>
          </div>
        </Link>

        {/* Category & Title */}
        <div className="flex flex-col gap-1 text-center items-center">
          <span className="text-[10px] uppercase tracking-widest text-[#c5a25d] font-bold">
            {product.category?.name_ar || product.category?.name_en || (isAr ? 'عطور نيش' : 'Niche Fragrance')}
          </span>
          <Link href={`/products/${product.slug}`} className="focus:outline-none">
            <h3 className="font-serif text-base sm:text-lg font-bold text-white hover:text-[#c5a25d] transition-colors leading-snug line-clamp-2">
              {titleText}
            </h3>
          </Link>
          <span className="text-[11px] text-gray-400 font-light mt-0.5">
            {isAr ? 'الحجم:' : 'Volume:'} {product.volume || '100ml'}
          </span>
        </div>
      </div>

      {/* Bottom Section: Price & Action Buttons */}
      <div className="mt-4 pt-4 border-t border-white/10 w-full flex flex-col items-center gap-3">
        {/* Price Display */}
        <div className="text-center">
          {isPriceValid ? (
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white">
                {rawPrice.toFixed(2)}
              </span>
              <span className="text-xs text-[#c5a25d] font-semibold">JOD</span>
              {product.compareAtPrice && (
                <span className="text-xs line-through text-gray-500 font-light mr-1">
                  {Number(product.compareAtPrice).toFixed(2)} JOD
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-semibold text-[#c5a25d] bg-[#c5a25d]/10 px-3 py-1 rounded-full border border-[#c5a25d]/20">
              {isAr ? 'السعر غير متوفر' : 'Price on Request'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full">
          {isUnavailable ? (
            /* Out of Stock or Price Invalid: Only WhatsApp Inquiry Button */
            <LuxuryButton 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              variant="whatsapp"
              size="sm"
              fullWidth
              className="!py-2.5 !text-xs font-semibold"
              iconLeft={WhatsappLogo}
            >
              {isAr ? 'استفسار عبر واتساب' : 'WhatsApp Inquiry'}
            </LuxuryButton>
          ) : (
            /* In Stock & Valid Price: Add to Cart + View Scent Buttons */
            <div className="grid grid-cols-2 gap-2 w-full">
              <LuxuryButton
                onClick={handleAddToCart}
                variant={addedToCart ? 'success' : 'primary'}
                size="sm"
                className="!py-2.5 !text-xs font-semibold"
                aria-label={isAr ? 'أضف للسلة' : 'Add to Cart'}
                iconLeft={() => addedToCart ? <Check size={14} weight="bold" /> : <ShoppingBag size={14} weight="bold" />}
              >
                {addedToCart ? (isAr ? 'تمت' : 'Added') : (isAr ? 'إضافة للسلة' : 'Cart')}
              </LuxuryButton>

              <LuxuryButton 
                href={`/products/${product.slug}`}
                variant="outline"
                size="sm"
                className="!py-2.5 !text-xs font-semibold"
              >
                {isAr ? 'عرض العطر' : 'View Scent'}
              </LuxuryButton>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
