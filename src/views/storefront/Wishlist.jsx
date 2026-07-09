'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import Link from 'next/link';
import { Heart, ShoppingBag, WhatsappLogo, Trash, ArrowRight } from '@phosphor-icons/react';
import LuxuryButton from '../../components/ui/LuxuryButton';

import PageContainer from '../../components/layout/PageContainer';

export default function Wishlist() {
  const { language, t } = useContext(LanguageContext);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);
  const isAr = language === 'ar';

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setWishlistProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    // Use a high limit to ensure all products are returned, not just the default 24
    fetch('/api/products?limit=1000')
      .then(res => res.json())
      .then(data => {
        const all = data.products || data || [];
        const matched = all.filter(p => wishlist.includes(p.id));
        setWishlistProducts(matched);
      })
      .catch(() => setWishlistProducts([]))
      .finally(() => setLoading(false));
  }, [wishlist]);

  const handleMoveToCart = (product) => {
    // Get stock from variants (DB products) or fallback fields
    const stockQty = product.stock_quantity ?? product.stock ?? 0;
    if (stockQty === 0) return;
    // Build cart-compatible product with correct image and price fields
    const defaultVariant = product.variants?.[0];
    const price = defaultVariant ? Number(defaultVariant.price) : Number(product.price || 0);
    const cartProduct = {
      id: product.id,
      slug: product.slug,
      name_ar: product.name_ar,
      name_en: product.name_en,
      image_url: product.image_url || product.thumbnail_url || product.thumbnail,
      price,
      stock: stockQty,
      variant: defaultVariant ? { id: defaultVariant.id, volume: defaultVariant.volume, price } : null,
    };
    addToCart(cartProduct, 1);
    toggleWishlist(product.id);
  };

  return (
    <PageContainer size="default" className="py-24 flex flex-col gap-12">
      
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
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--color-gold)]/30 border-t-[var(--color-gold)] animate-spin" />
          <p className="text-xs text-[var(--color-text-muted)]">{isAr ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      ) : wishlistProducts.length === 0 ? (
        <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-lg mx-auto">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-12 text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-500/5 border border-red-500/10 flex items-center justify-center">
              <Heart size={28} className="text-red-500/40" />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
              {isAr ? 'قائمة المفضلة فارغة حالياً.' : 'Your wishlist is currently empty.'}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-[280px]">
              {isAr ? 'تصفح تشكيلة العطور الفخمة وأضف مفضلاتك بالضغط على أيقونة القلب.' : 'Explore our collection of fine fragrances and save your favorites by tapping the heart icon.'}
            </p>
            <LuxuryButton href="/shop" variant="primary" className="py-3 px-8 mt-2">
              {t('backToShop')}
            </LuxuryButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {wishlistProducts.map(product => {
            // Support both DB fields and static product fields
            const productName = isAr
              ? (product.name_ar || product.title?.ar || product.name || '')
              : (product.name_en || product.title?.en || product.name || '');
            const productSlug = product.slug || product.id;
            const productImage = product.thumbnail_url || product.thumbnail || product.image_url || '/images/background.jpg';
            const productStock = product.stock_quantity ?? product.stock ?? 0;
            const productPrice = Number(product.price || 0);
            const productComparePrice = product.compare_at_price ? Number(product.compare_at_price) : null;
            const productCategory = isAr ? (product.category?.name_ar || product.category_slug || '') : (product.category?.name_en || product.category_slug || '');
            const isOutOfStock = productStock === 0 || (!product.variants?.some(v => v.stock > 0) && product.inventory_mode !== 'FORMULA_BASED');

            const whatsappMessage = isAr
              ? `مرحباً، أود الاستفسار عن عطر: ${productName} بسعر ${productPrice.toFixed(2)} دينار أردني.`
              : `Hello, I would like to ask about the fragrance: ${productName} priced at ${productPrice.toFixed(2)} JOD.`;
            const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div
                key={product.id}
                className="rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 hover:scale-[1.003]"
              >
                <div className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 md:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-main">
                  
                  {/* Product Thumbnail */}
                  <Link href={`/products/${productSlug}`} className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] ${isOutOfStock ? 'opacity-50' : ''}`}>
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-2 text-start min-w-0">
                    {productCategory && (
                      <span className="text-[8px] uppercase tracking-widest text-[var(--color-gold)] font-bold">{productCategory}</span>
                    )}
                    <Link href={`/products/${productSlug}`} className="hover:text-[var(--color-gold)] transition-colors">
                      <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] leading-tight">
                        {productName}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {productPrice.toFixed(2)} JOD
                      </span>
                      {productComparePrice && productComparePrice > productPrice && (
                        <span className="text-xs line-through text-[var(--color-text-muted)] font-light">
                          {productComparePrice.toFixed(2)} JOD
                        </span>
                      )}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${
                      isOutOfStock ? 'text-red-500' : productStock <= 4 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {isOutOfStock
                        ? (isAr ? 'غير متوفر حالياً' : 'Out of Stock')
                        : productStock <= 4
                          ? (isAr ? `باقي ${productStock} قطع فقط!` : `Only ${productStock} left!`)
                          : (isAr ? 'متوفر' : 'In Stock')
                      }
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center sm:justify-end">
                    {!isOutOfStock && (
                      <LuxuryButton
                        variant="primary"
                        onClick={() => handleMoveToCart(product)}
                        className="text-[10px] uppercase tracking-wider !py-2.5 px-4 rounded-full font-bold"
                        iconLeft={ShoppingBag}
                      >
                        {isAr ? 'نقل للسلة' : 'Move to Cart'}
                      </LuxuryButton>
                    )}

                    <LuxuryButton
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      className="text-[10px] uppercase tracking-wider !py-2.5 px-4 rounded-full font-bold"
                      iconLeft={WhatsappLogo}
                    >
                      {isAr ? 'واتساب' : 'Inquire'}
                    </LuxuryButton>

                    <LuxuryButton
                      variant="icon"
                      onClick={() => toggleWishlist(product.id)}
                      className="!p-2.5 !w-auto !h-auto !min-h-0 !min-w-0 rounded-full border-red-500/10 text-red-500 hover:bg-red-500/5 hover:border-red-500/30 transition-all cursor-pointer"
                      aria-label={isAr ? 'حذف من المفضلة' : 'Remove from Wishlist'}
                    >
                      <Trash size={14} />
                    </LuxuryButton>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Continue Shopping CTA */}
          <div className="flex justify-center mt-4">
            <LuxuryButton
              href="/shop"
              variant="ghost"
              className="!text-[10px] font-bold !text-[var(--color-text-secondary)] hover:!text-[var(--color-gold)] uppercase tracking-wider"
              iconRight={ArrowRight}
            >
              {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
            </LuxuryButton>
          </div>
        </div>
      )}

    </PageContainer>
  );
}
