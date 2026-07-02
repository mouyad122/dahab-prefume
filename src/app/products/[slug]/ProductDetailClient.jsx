'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Drop, MapPin, ShieldCheck, Sparkle, WhatsappLogo, ShoppingCart } from '@phosphor-icons/react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { brandConfig } from '../../../config/brand';
import { useCartStore } from '../../../stores/useCartStore';
import Button from '../../../components/ui/Button';

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
  const isOut = product.stock <= 0;

  // Determine available sizes and prices
  const sizes = [];
  if (product.price_50ml_fils) sizes.push({ key: '50ml', label: isAr ? '50 مل' : '50ml', price: product.price_50ml_fils });
  if (product.price_100ml_fils) sizes.push({ key: '100ml', label: isAr ? '100 مل' : '100ml', price: product.price_100ml_fils });
  if (product.price_200ml_fils) sizes.push({ key: '200ml', label: isAr ? '200 مل' : '200ml', price: product.price_200ml_fils });

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
      stock: product.stock || 99,
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
                      onClick={() => setSelectedSize(size.key)}
                      className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${
                        selectedSize === size.key
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold-dim)] text-[var(--color-gold-light)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white'
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
                <Button
                  onClick={handleAddToCart}
                  disabled={isOut}
                  variant="primary"
                  className="flex-1 !py-4 font-sans-ar uppercase tracking-[0.1em]"
                  icon={ShoppingCart}
                >
                  {isAr ? 'إضافة إلى السلة' : 'Add to Cart'}
                </Button>

                {/* Direct Whatsapp button */}
                <Button
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="success"
                  className="flex-1 !py-4 font-sans-ar uppercase tracking-[0.1em]"
                  icon={WhatsappLogo}
                  disabled={isOut}
                >
                  {isAr ? 'اطلب سريعاً عبر واتساب' : 'Order via WhatsApp'}
                </Button>
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

        {/* Notes Story */}
        <section className="product-story-grid mt-16 border-t border-[var(--color-border)] pt-12">
          <div className="story-block text-right">
            <span className="section-label text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold block mb-2">{isAr ? 'قصة العطر' : 'Fragrance Story'}</span>
            <h2 className="text-2xl font-display font-bold text-white mb-4">{isAr ? 'الأثر قبل التفاصيل.' : 'The impression before the details.'}</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">{story || (isAr ? 'عطر مصمم ليحمل فخامة شرقية بلمسة عصرية، مناسب لمن يريد حضورًا هادئًا وواضحًا في الوقت نفسه.' : 'A scent designed around Eastern luxury with a modern restraint, made for a quiet yet unmistakable presence.')}</p>
          </div>
          <div className="notes-panel flex flex-col gap-4 text-right bg-black/20 p-6 rounded-2xl border border-[var(--color-border-subtle)]">
            {notes.map((note) => (
              <div key={note.label} className="border-b border-[var(--color-border-subtle)] pb-3 last:border-0 last:pb-0">
                <span className="text-xs text-[var(--color-text-muted)] font-bold block mb-1">{note.label}</span>
                <strong className="text-white font-medium">{note.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="product-final-cta text-center py-16 bg-black/10 rounded-3xl border border-[var(--color-border-subtle)] mt-16">
          <h2 className="text-xl font-bold text-white mb-4">{isAr ? 'غير متأكد أن العطر مناسب لذوقك؟' : 'Not sure this is your scent?'}</h2>
          <Button 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            variant="secondary"
            className="!py-3 !px-8 !text-xs inline-flex items-center gap-2"
          >
            <span>{isAr ? 'استفسر من خبير العطور' : 'Ask a Dahab specialist'}</span>
            <ArrowIcon size={15} />
          </Button>
        </section>
      </div>
    </main>
  );
}
