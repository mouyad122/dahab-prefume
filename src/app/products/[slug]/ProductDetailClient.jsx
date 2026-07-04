'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Drop, MapPin, ShieldCheck, Sparkle, WhatsappLogo, ShoppingCart } from '@phosphor-icons/react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { brandConfig } from '../../../config/brand';
import { useCartStore } from '../../../stores/useCartStore';
import LuxuryButton from '../../../components/ui/LuxuryButton';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=900';

function formatJOD(fils) {
  return `${(fils / 1000).toFixed(3)} JOD`;
}

export default function ProductDetailClient({ product }) {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const addToCart = useCartStore(state => state.addToCart);
  
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const image = product.image_filename || FALLBACK_IMAGE;
  const name = (isAr ? product.name_ar : product.name_en) || product.name_ar || product.name_en;
  const description = (isAr ? product.short_description_ar : product.short_description_en) || product.short_description_ar;
  const story = (isAr ? product.long_description_ar : product.long_description_en) || product.long_description_ar;

  // Determine available sizes and prices dynamically
  const sizes = Object.entries(product.prices?.sizes || {}).map(([key, value]) => ({
    key, // "50ml", "100ml", "60ml", "1000ml", etc.
    label: isAr ? `${key.replace('ml', '')} مل` : key,
    price: value.fils,
    stock: value.stock,
    id: value.id
  }));

  const totalStock = sizes.reduce((acc, s) => acc + (s.stock || 0), 0);
  const isOut = totalStock <= 0;

  // Default to first available size
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.key || '100ml');
  const activeSizeObj = sizes.find(s => s.key === selectedSize) || sizes[0];
  const activePrice_fils = activeSizeObj ? activeSizeObj.price : 0;

  const whatsappText = isAr
    ? `مرحبًا، أريد طلب عطر ${name} (حجم: ${activeSizeObj?.label || ''}) - SKU: ${product.sku}`
    : `Hello, I would like to order ${name} (Size: ${activeSizeObj?.label || ''}) - SKU: ${product.sku}`;
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(whatsappText)}`;

  const handleAddToCart = () => {
    if (!activeSizeObj) return;
    
    const cartItem = {
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      slug: product.slug,
      title: product.name_ar, // Store title as AR for consistent order rendering
      category: isAr ? product.category?.name_ar : product.category?.name_en,
      volume: activeSizeObj.label,
      price: parseFloat(activePrice_fils / 1000),
      stock: activeSizeObj.stock || 99,
      thumbnail: image
    };
    
    addToCart(cartItem, 1);
  };

  const notes = [
    { label: isAr ? 'القمة' : 'Top', value: product.notes_top || product.notes || (isAr ? 'حمضيات، توابل ناعمة' : 'Citrus, soft spices') },
    { label: isAr ? 'القلب' : 'Heart', value: product.notes_heart || (isAr ? 'زهور، عنبر، عود' : 'Florals, amber, oud') },
    { label: isAr ? 'القاعدة' : 'Base', value: product.notes_base || (isAr ? 'مسك، أخشاب، باتشولي' : 'Musk, woods, patchouli') },
  ];

  return (
    <main className={`product-page ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <div className="premium-container">
        <Link href="/shop" className="product-back">
          <BackIcon size={15} />
          <span>{isAr ? 'العودة للمتجر' : 'Back to shop'}</span>
        </Link>

        <section className="product-layout">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="product-gallery-main relative border border-[var(--color-border)] rounded-3xl overflow-hidden bg-black/40 aspect-square">
              <img src={image} alt={name} className="w-full h-full object-cover" />
              {isOut && <span className="stock-pill large absolute top-4 right-4">{isAr ? 'نفذت الكمية' : 'Out of stock'}</span>}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-info flex flex-col gap-6 text-right">
            <div>
              <div className="eyebrow flex items-center gap-1.5 justify-end">
                <Sparkle size={15} weight="fill" className="text-[var(--color-gold)]" />
                <span>{product.category?.name_ar || (isAr ? 'عطر فاخر' : 'Luxury fragrance')}</span>
              </div>
              <h1 className="text-3xl font-display font-bold mt-2 text-white">{name}</h1>
              <p className="text-[var(--color-text-secondary)] mt-3 leading-relaxed">
                {description || (isAr ? 'تركيبة عطرية مختارة بعناية لحضور واضح وثبات أنيق.' : 'A carefully curated fragrance with elegant presence and lasting character.')}
              </p>
            </div>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="border-t border-b border-[var(--color-border)] py-4 my-2">
                <span className="text-xs text-[var(--color-text-muted)] font-bold mb-3 block">
                  {isAr ? 'اختر الحجم:' : 'Select Size:'}
                </span>
                <div className="flex gap-3 justify-end">
                  {sizes.map(size => (
                    <button
                      key={size.key}
                      type="button"
                      onClick={() => setSelectedSize(size.key)}
                      className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] ${
                        selectedSize === size.key
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold-dim)] text-[var(--color-gold-light)] shadow-[0_0_15px_rgba(196,154,68,0.2)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]'
                      }`}
                    >
                      {size.label} ({formatJOD(size.price)})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase CTA Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl border border-[var(--color-border-subtle)]">
                <span className="text-sm text-[var(--color-text-secondary)]">{isAr ? 'السعر الحالي' : 'Price'}</span>
                <strong className="text-2xl font-mono text-[var(--color-gold-light)] font-bold">
                  {formatJOD(activePrice_fils)}
                </strong>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {/* Add to Cart button */}
                <LuxuryButton
                  onClick={handleAddToCart}
                  disabled={isOut}
                  variant="primary"
                  className="flex-1 !py-4 font-sans-ar uppercase tracking-[0.1em]"
                  iconLeft={ShoppingCart}
                >
                  {isAr ? 'إضافة إلى السلة' : 'Add to Cart'}
                </LuxuryButton>

                {/* Direct Whatsapp button */}
                <LuxuryButton
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="flex-1 !py-4 font-sans-ar uppercase tracking-[0.1em]"
                  iconLeft={WhatsappLogo}
                  disabled={isOut}
                >
                  {isAr ? 'اطلب سريعاً عبر واتساب' : 'Order via WhatsApp'}
                </LuxuryButton>
              </div>
            </div>

            {/* Assurances */}
            <div className="product-assurance border-t border-[var(--color-border)] pt-5 mt-2 flex flex-col gap-3.5 text-xs text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-3 justify-end">
                <span>{isAr ? 'تجربة وتجربة العطر قبل الشراء متوفرة في معرضنا' : 'In-store testing available'}</span>
                <ShieldCheck size={20} className="text-[var(--color-gold)]" weight="duotone" />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <span>{isAr ? 'مكان تواجدنا:' : 'Location:'} {brandConfig.address[language]}</span>
                <MapPin size={20} className="text-[var(--color-gold)]" weight="duotone" />
              </div>
            </div>
          </div>
        </section>

        {/* Notes Story & Profile */}
        <section className="mt-16 border-t border-[var(--color-border)] pt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Story & Specs */}
          <div className="story-block text-right">
            <span className="section-label text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold block mb-2">{isAr ? 'قصة العطر' : 'Fragrance Story'}</span>
            <h2 className="text-2xl font-display font-bold text-[var(--color-text-primary)] mb-4">{isAr ? 'الأثر قبل التفاصيل.' : 'The impression before the details.'}</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">{story || (isAr ? 'عطر مصمم ليحمل فخامة شرقية بلمسة عصرية، مناسب لمن يريد حضورًا هادئًا وواضحًا في الوقت نفسه.' : 'A scent designed around Eastern luxury with a modern restraint, made for a quiet yet unmistakable presence.')}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-[var(--color-border-subtle)] text-right">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold block mb-1">{isAr ? 'الجنس' : 'Gender'}</span>
                <strong className="text-sm font-bold text-[var(--color-text-primary)]">
                  {product.gender === 'unisex' ? (isAr ? 'للجنسين' : 'Unisex') : (product.gender === 'men' ? (isAr ? 'رجالي' : 'Men') : (isAr ? 'نسائي' : 'Women'))}
                </strong>
              </div>
              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-[var(--color-border-subtle)] text-right">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold block mb-1">{isAr ? 'الموسم' : 'Season'}</span>
                <strong className="text-sm font-bold text-[var(--color-text-primary)]">{product.season === 'all' ? (isAr ? 'جميع المواسم' : 'All Seasons') : product.season}</strong>
              </div>
              {product.fragrance_family_raw && (
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-[var(--color-border-subtle)] text-right col-span-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold block mb-1">{isAr ? 'العائلة العطرية' : 'Fragrance Family'}</span>
                  <strong className="text-sm font-bold text-[var(--color-text-primary)]">{product.fragrance_family_raw}</strong>
                </div>
              )}
            </div>

            {product.family_tags && product.family_tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 justify-end">
                {product.family_tags.map(tag => (
                  <span key={tag.id} className="px-3 py-1 bg-[var(--color-gold-dim)] text-[var(--color-gold)] border border-[var(--color-gold)]/20 rounded-full text-xs font-bold">
                    {tag.tag_ar}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Accords & Notes */}
          <div className="flex flex-col gap-8">
            <div className="notes-panel text-right bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
              <span className="section-label text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold block mb-4">{isAr ? 'الهرم العطري' : 'Olfactory Pyramid'}</span>
              {notes.map((note) => (
                <div key={note.label} className="border-b border-[var(--color-border-subtle)] pb-3 mb-3 last:border-0 last:pb-0 last:mb-0 flex justify-between items-center">
                  <span className="text-[0.65rem] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">{note.label}</span>
                  <strong className="text-[var(--color-text-primary)] font-medium text-sm">{note.value}</strong>
                </div>
              ))}
            </div>

            {product.accords && product.accords.length > 0 && (
              <div className="accords-panel text-right bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                <span className="section-label text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold block mb-4">{isAr ? 'البصمة العطرية (Accords)' : 'Main Accords'}</span>
                <div className="flex flex-col gap-3">
                  {product.accords.map((accord) => (
                    <div key={accord.id} className="w-full">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[0.65rem] text-[var(--color-text-muted)] font-bold">{accord.strength}%</span>
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">{accord.name_ar}</span>
                      </div>
                      <div className="w-full bg-[var(--color-border-subtle)] h-1.5 rounded-full overflow-hidden flex justify-end">
                        <div 
                          className="bg-[var(--color-gold)] h-full transition-all duration-1000 ease-out" 
                          style={{ width: `${accord.strength}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="product-final-cta text-center py-16 bg-black/10 rounded-3xl border border-[var(--color-border-subtle)] mt-16">
          <h2 className="text-xl font-bold text-white mb-4">{isAr ? 'غير متأكد أن العطر مناسب لذوقك؟' : 'Not sure this is your scent?'}</h2>
          <LuxuryButton 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            variant="secondary"
            className="!py-3 !px-8 !text-xs inline-flex items-center gap-2"
            iconRight={ArrowIcon}
          >
            {isAr ? 'استفسر من خبير العطور' : 'Ask a Dahab specialist'}
          </LuxuryButton>
        </section>
      </div>
    </main>
  );
}
