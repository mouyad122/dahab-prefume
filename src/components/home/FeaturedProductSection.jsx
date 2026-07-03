'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ShoppingCart, WhatsappLogo } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';
import LuxuryButton from '../ui/LuxuryButton';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    slug: 'musk-vanilla-hair-mist',
    name: { ar: 'مسك فانيليا', en: 'Musk Vanilla Hair Mist' },
    price_fils: 3500,
    category: { slug: 'hair-mists' },
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    stock: 50
  },
  {
    id: 2,
    slug: 'eragon-100ml',
    name: { ar: 'ايراجون', en: 'Eragon Perfume 100ml' },
    price_fils: 12000,
    category: { slug: 'private' },
    image: 'https://images.unsplash.com/photo-1560011791-8a56acb53fba?auto=format&fit=crop&q=80&w=600',
    stock: 20
  },
  {
    id: 3,
    slug: 'lattafa-adeeb',
    name: { ar: 'أديب لطافة', en: 'Lattafa Adeeb 80ml' },
    price_fils: 9000,
    category: { slug: 'middle-eastern' },
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=80&w=600',
    stock: 15
  },
  {
    id: 4,
    slug: 'kalemat',
    name: { ar: 'كلمات العود العربي', en: 'Arabian Oud Kalemat 100ml' },
    price_fils: 15000,
    category: { slug: 'middle-eastern' },
    image: 'https://images.unsplash.com/photo-1547005327-4f5a2a60e93e?auto=format&fit=crop&q=80&w=600',
    stock: 10
  }
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function FeaturedProductSection() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [ref, visible] = useReveal();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const formatPrice = (fils) => `${(fils / 1000).toFixed(2)} JOD`;

  return (
    <section className="luxury-section bg-[var(--color-bg-primary)]" ref={ref}>
      <div className="premium-container">
        {/* Header */}
        <div className={`mb-12 flex flex-col items-center text-center gap-4 ${visible ? 'reveal-up' : 'opacity-0'}`}>
          <span className="section-kicker">
            {isAr ? 'الأكثر مبيعاً' : 'Best Sellers'}
          </span>
          <h2 className="font-display text-display-md text-[var(--color-text-primary)]">
            {isAr ? 'أبرز منتجاتنا' : 'Featured Products'}
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              className={`product-card flex flex-col ${visible ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="product-image-wrap relative">
                  <img src={product.image} alt={product.name[language]} />
                  <div className="absolute bottom-2 right-2">
                    <LuxuryButton 
                      variant="icon" 
                      className="bg-[var(--color-bg-card)]/80 backdrop-blur-sm border-[var(--color-border)] shadow-md text-[var(--color-text-primary)] hover:bg-[var(--color-gold)] hover:text-black hover:border-[var(--color-gold)]"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={18} />
                    </LuxuryButton>
                  </div>
                </div>
              </Link>
              <div className={`p-4 flex flex-col flex-1 ${isAr ? 'dir-ar' : 'dir-en'}`}>
                <div className="text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                  {product.category.slug.replace('-', ' ')}
                </div>
                <Link href={`/product/${product.slug}`} className="block mb-2 group">
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-light)] transition-colors line-clamp-2">
                    {product.name[language]}
                  </h3>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-semibold text-[var(--color-gold)]">
                    {formatPrice(product.price_fils)}
                  </span>
                  <LuxuryButton
                    variant="whatsapp"
                    size="sm"
                    href={`https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(`أريد طلب: ${product.name.ar} - ${product.name.en}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 min-h-[32px] px-3 py-1 text-[0.7rem] gap-1"
                    onClick={(e) => e.stopPropagation()}
                    iconLeft={() => <WhatsappLogo weight="fill" size={14} />}
                  >
                    {isAr ? 'اطلب' : 'Order'}
                  </LuxuryButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`mt-12 flex justify-center ${visible ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <LuxuryButton 
            variant="secondary" 
            href="/shop" 
            className="px-8 group"
            iconRight={(props) => <Arrow {...props} className="transition-transform group-hover:translate-x-1" />}
          >
            {isAr ? 'عرض جميع المنتجات' : 'View All Products'}
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}
