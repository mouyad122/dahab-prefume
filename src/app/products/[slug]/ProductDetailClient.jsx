'use client';

import React, { useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { useCartStore } from '../../../stores/useCartStore';
import { initialProducts } from '../../../data/initialProducts';
import ProductCard from '../../../components/product/ProductCard';
import Link from 'next/link';
import JSONLD from '../../../components/layout/JSONLD';
import { 
  WhatsappLogo, 
  ShoppingBag, 
  Wind, 
  Truck, 
  ArrowClockwise,
  Hourglass,
  Gauge,
  Heart,
  Plus,
  Minus
} from '@phosphor-icons/react';

export default function ProductDetailClient() {
  const { slug } = useParams();
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const product = initialProducts.find(p => p.slug === slug);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);

  // Detail Page Local States
  const [quantity, setQuantity] = useState(1);
  const [addedNote, setAddedNote] = useState(false);

  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-28 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {isAr ? 'العطر المطلوب غير متوفر' : 'Fragrance Not Found'}
        </h2>
        <Link href="/shop" className="btn-primary mt-6">{t('backToShop')}</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock === 0;

  // Related products (same category, excluding current product)
  const relatedProducts = initialProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAddedNote(true);
    setTimeout(() => setAddedNote(false), 3000);
  };

  const handleQtyChange = (val) => {
    const nextVal = Math.max(1, Math.min(val, product.stock));
    setQuantity(nextVal);
  };

  const whatsappMessage = isAr 
    ? `مرحباً، أود الاستفسار عن عطر: ${t(product.title)} بسعر ${product.price.toFixed(2)} دينار أردني.` 
    : `Hello, I would like to ask about the fragrance: ${t(product.title)} priced at ${product.price.toFixed(2)} JOD.`;
  const whatsappUrl = `https://wa.me/962785050655?text=${encodeURIComponent(whatsappMessage)}`;

  // Translation helpers for metrics
  const longevityLabel = {
    eternal: { ar: 'أبدي (12+ ساعة)', en: 'Eternal (12+ hours)' },
    long_lasting: { ar: 'طويل الأمد (8-12 ساعة)', en: 'Long-lasting (8-12 hours)' },
    moderate: { ar: 'متوسط (4-8 ساعات)', en: 'Moderate (4-8 hours)' }
  };

  const sillageLabel = {
    heavy: { ar: 'قوي وفواح جداً', en: 'Heavy & Bold' },
    moderate: { ar: 'معتدل وجذاب', en: 'Moderate & Elegant' },
    soft: { ar: 'ناعم وهادئ', en: 'Soft & Intimate' }
  };

  // Breadcrumb structure for SEO
  const breadcrumbData = {
    items: [
      { name: isAr ? 'الرئيسية' : 'Home', link: '/' },
      { name: isAr ? 'المتجر' : 'Shop', link: '/shop' },
      { name: isAr ? product.title.ar : product.title.en, link: `/products/${product.slug}` }
    ]
  };

  return (
    <div className="premium-container py-16 flex flex-col gap-20">
      <JSONLD type="product" data={product} />
      <JSONLD type="breadcrumb" data={breadcrumbData} />
      
      {/* Back to Shop Link */}
      <Link href="/shop" className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] self-start transition-colors">
        ← {t('backToShop')}
      </Link>

      {/* Main Product Frame - Double Bezel Card */}
      <div className="rounded-[3rem] bg-black/5 dark:bg-white/5 p-2.5 ring-1 ring-black/5 dark:ring-white/10 w-full">
        <div className="rounded-[calc(3rem-0.625rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-14 shadow-main grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Visual Gallery */}
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] relative">
            <img src={product.thumbnail} alt={t(product.title)} className="w-full h-full object-cover opacity-90" />
            {product.compareAtPrice && (
              <span className="absolute top-6 right-6 bg-[var(--color-gold)] text-black text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                {isAr ? 'خصم خاص' : 'Offer'}
              </span>
            )}
          </div>

          {/* Right Column: Complete Details & Specifications */}
          <div className="flex flex-col gap-6 text-start">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)] bg-[var(--color-gold-dim)] px-3 py-1 rounded-full border border-[var(--color-gold)]/10 w-max">
                {product.category}
              </span>

              {/* Wishlist Button toggle */}
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] hover:text-red-500 hover:border-red-500/20 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none"
                aria-label="Add to Wishlist"
              >
                <Heart size={18} weight={isWishlisted ? 'fill' : 'regular'} className={isWishlisted ? 'text-red-500' : ''} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                {t(product.title)}
              </h1>
              <span className="text-[9px] text-[var(--color-text-muted)] tracking-wider uppercase font-light">
                SKU: {product.sku} | Volume: {product.volume}
              </span>
            </div>

            {/* Price Tags */}
            <div className="flex items-center gap-4 py-3 border-y border-[var(--color-border)] w-max">
              <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                {product.price.toFixed(2)} JOD
              </span>
              {product.compareAtPrice && (
                <span className="text-sm line-through text-[var(--color-text-muted)] font-light">
                  {product.compareAtPrice.toFixed(2)} JOD
                </span>
              )}
            </div>

            {/* Scent Description */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-bold">{isAr ? 'عن العطر' : 'Scent Overview'}</p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
                {t(product.longDescription)}
              </p>
            </div>

            {/* Olfactory Notes Pyramid */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5 border-b border-[var(--color-border)] pb-2">
                <Wind size={14} className="text-[var(--color-gold)]" />
                <span>{isAr ? 'الهرم العطري والتكوين' : 'Olfactory Notes Pyramid'}</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-3 text-[10px] bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)]">
                <div className="flex flex-col gap-1 border-r border-[var(--color-border)] pr-2">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'القمة العطرية' : 'Top Notes'}</span>
                  <span className="text-zinc-300 font-light">{product.fragranceNotes.top.join(', ')}</span>
                </div>
                <div className="flex flex-col gap-1 border-r border-[var(--color-border)] px-2">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'القلب العطري' : 'Heart Notes'}</span>
                  <span className="text-zinc-300 font-light">{product.fragranceNotes.heart.join(', ')}</span>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'القاعدة العطرية' : 'Base Notes'}</span>
                  <span className="text-zinc-300 font-light">{product.fragranceNotes.base.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Scent Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-light">
              <div className="flex items-center gap-2">
                <Hourglass size={16} className="text-[var(--color-gold)]" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'الثبات' : 'Longevity'}</span>
                  <span>{t(longevityLabel[product.metrics.longevity])}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-[var(--color-gold)]" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{isAr ? 'الفوحان' : 'Projection'}</span>
                  <span>{t(sillageLabel[product.metrics.sillage])}</span>
                </div>
              </div>
            </div>

            {/* Stock status indicator */}
            <div className="text-xs text-[var(--color-text-secondary)] font-light flex items-center gap-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${isOutOfStock ? 'bg-red-500' : product.stock <= 4 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span>
                {isOutOfStock 
                  ? (isAr ? 'غير متوفر حالياً في المخزن' : 'Out of stock') 
                  : product.stock <= 4 
                    ? (isAr ? 'كمية محدودة جداً متبقية!' : 'Very limited quantities left!') 
                    : (isAr ? 'متوفر وجاهز للتسليم الفوري' : 'In stock, ready for delivery')
                }
              </span>
            </div>

            {/* Actions Block */}
            <div className="flex flex-col gap-4 mt-2 w-full">
              
              {/* Quantity selector & Add to Cart row */}
              {!isOutOfStock && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full px-4 py-3 shrink-0">
                    <button 
                      onClick={() => handleQtyChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <Minus size={12} weight="bold" />
                    </button>
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] w-8 text-center select-none">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => handleQtyChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <Plus size={12} weight="bold" />
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 group relative flex items-center justify-center gap-3 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.15em] py-4 rounded-full transition-all duration-300 hover:bg-[var(--color-gold-light)] hover:scale-102 active:scale-[0.98] cursor-pointer shadow-md"
                  >
                    <ShoppingBag size={18} weight="bold" />
                    <span>{t('addToCart')}</span>
                  </button>
                </div>
              )}

              {/* WhatsApp direct Inquiry */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-center gap-3 border border-[#25D366]/20 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/10 text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300 hover:scale-102 active:scale-[0.98] w-full"
              >
                <WhatsappLogo size={18} weight="bold" />
                <span>{isAr ? 'استفسار عبر واتساب' : 'WhatsApp Inquiry'}</span>
              </a>
              
              {addedNote && (
                <span className="text-[10px] text-emerald-500 font-bold text-center animate-fade-in block mt-1">
                  {isAr ? 'تمت إضافة العطر بنجاح إلى سلة التسوق!' : 'Fragrance successfully added to your shopping cart!'}
                </span>
              )}
            </div>

            {/* Shipping & Return Preview Details */}
            <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-5 text-[10px] text-[var(--color-text-muted)] font-light mt-2">
              <div className="flex items-start gap-2">
                <Truck size={16} className="text-zinc-500" />
                <p>{isAr ? 'توصيل خلال 24 - 48 ساعة لكافة محافظات الأردن.' : 'Local shipping in 24-48 business hours Jordan-wide.'}</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowClockwise size={16} className="text-zinc-500" />
                <p>{isAr ? 'سياسة استبدال مرنة. افحص العطر مع المندوب قبل الدفع.' : 'Flexible exchange. Inspect the scent with the courier prior to payment.'}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2 border-b border-[var(--color-border)] pb-4">
            <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)]">
              {isAr ? 'قد يعجبك أيضاً' : 'Olfactory Affinities'}
            </span>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              {isAr ? 'عطور مشابهة ومكملة' : 'Related Creations'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {relatedProducts.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
