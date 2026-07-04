'use client';

import React, { useContext, useMemo, useState } from 'react';
import { FadersHorizontal, MagnifyingGlass, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import ProductCard from '../../components/product/ProductCard';
import LuxuryButton from '../../components/ui/LuxuryButton';

function productPrice(product) {
  if (product.variants && product.variants.length > 0) {
    return product.variants[0].price || 0;
  }
  return 0;
}

export default function ShopClient({ initialProducts }) {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const products = initialProducts || [];

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      if (product.category?.id) map.set(product.category.id, product.category);
    });
    return Array.from(map.values());
  }, [products]);

  const filtered = products.filter((product) => {
    const query = search.trim().toLowerCase();
    const name = `${product.name_ar || ''} ${product.name_en || ''}`.toLowerCase();
    const matchesSearch = !query || name.includes(query);
    const matchesCategory = category === 'all' || product.categoryId === category;
    return matchesSearch && matchesCategory && product.visible_on_website !== false;
  });

  return (
    <main className={`min-h-screen bg-[#0a0a0c] text-white pt-28 md:pt-36 pb-28 md:pb-36 relative overflow-hidden ${isAr ? 'dir-ar' : 'dir-en'}`}>
      
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[#c5a25d]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 md:space-y-12">

        {/* 1. STORE HERO SECTION */}
        <section className="text-center pt-2 pb-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141418] border border-[#c5a25d]/20 text-[#c5a25d] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkle size={13} className="text-[#c5a25d]" />
            <span>{isAr ? 'مجموعة دهب الكاملة' : 'Dahab Full Collection'}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-[#f3e5c8] to-[#c5a25d] bg-clip-text text-transparent font-serif leading-tight mb-4">
            {isAr ? 'تسوّق العطور بثقة ووضوح' : 'Shop Fragrance with Clarity'}
          </h1>

          <p className="max-w-2xl text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6">
            {isAr
              ? 'تصفّح العطور حسب المجموعة، اختر ما يناسب حضورك، واطلب مباشرة عبر السلة أو الاستفسار السريع عبر الواتساب.'
              : 'Browse by collection, choose the scent that matches your presence, and order directly via cart or quick WhatsApp inquiry.'}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#121216] border border-[#c5a25d]/20 text-xs text-[#c5a25d] font-semibold">
            <span>{filtered.length}</span>
            <span className="text-gray-400 font-normal">{isAr ? 'منتج متاح في المعرض' : 'available products'}</span>
          </div>
        </section>

        {/* 2. LIGHTWEIGHT SEARCH & FILTER TOOLBAR */}
        <section className="bg-[#121216]/80 backdrop-blur-xl border border-[#c5a25d]/20 rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <MagnifyingGlass size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={isAr ? 'ابحث عن اسم العطر...' : 'Search fragrance name...'}
                className="w-full bg-[#0a0a0c]/80 border border-[#c5a25d]/20 focus:border-[#c5a25d] rounded-xl pr-11 pl-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 no-scrollbar">
              <LuxuryButton 
                onClick={() => setCategory('all')} 
                variant={category === 'all' ? 'primary' : 'outline'}
                size="sm"
                className="!rounded-full !py-1.5 !px-4 !text-xs shrink-0"
                iconLeft={FadersHorizontal}
              >
                {isAr ? 'الكل' : 'All'}
              </LuxuryButton>
              {categories.map((item) => (
                <LuxuryButton 
                  key={item.id} 
                  onClick={() => setCategory(item.id)} 
                  variant={category === item.id ? 'primary' : 'outline'}
                  size="sm"
                  className="!rounded-full !py-1.5 !px-4 !text-xs shrink-0"
                >
                  {isAr ? item.name_ar : item.name_en}
                </LuxuryButton>
              ))}
            </div>

          </div>
        </section>

        {/* 3. PRODUCT GRID SECTION */}
        <section className="pt-2">
          {filtered.length === 0 ? (
            <div className="bg-[#121216]/60 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a25d]/10 border border-[#c5a25d]/20 flex items-center justify-center text-[#c5a25d] mb-4">
                <MagnifyingGlass size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">
                {isAr ? 'لم نجد منتجًا مطابقًا للبحث' : 'No matching products found'}
              </h3>
              <p className="text-xs text-gray-400 font-light max-w-sm mb-6">
                {isAr ? 'جرب البحث باسم آخر أو اختر فئة مختلفة لمشاهدة باقي العطور.' : 'Try searching with another term or select a different category.'}
              </p>
              <LuxuryButton
                onClick={() => { setSearch(''); setCategory('all'); }}
                variant="outline"
                size="sm"
              >
                {isAr ? 'إعادة ضبط البحث' : 'Reset Search'}
              </LuxuryButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
              {filtered.map((product) => {
                // Image processing
                let image = null;
                if (product.image_filename && typeof product.image_filename === 'string' && product.image_filename.trim()) {
                  const trimmed = product.image_filename.trim();
                  image = trimmed.startsWith('http') || trimmed.startsWith('/')
                    ? trimmed
                    : `/uploads/${trimmed}`;
                }

                const title_ar = product.name_ar || '';
                const title_en = product.name_en || '';
                const categoryName = isAr ? product.category?.name_ar : product.category?.name_en;
                
                const rawFils = productPrice(product);
                const priceInJod = rawFils > 0 ? rawFils / 1000 : 0;
                const totalStock = (product.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);

                const mappedProduct = {
                  id: product.id,
                  title: isAr ? title_ar : title_en,
                  price: priceInJod,
                  compareAtPrice: null,
                  stock: totalStock,
                  inStock: totalStock > 0,
                  category: categoryName || (isAr ? 'عطور' : 'Perfumes'),
                  thumbnail: image,
                  slug: product.slug,
                  volume: product.variants?.[0] ? `${product.variants[0].volume}ml` : '100ml'
                };

                return (
                  <div key={product.id} className="h-full">
                    <ProductCard product={mappedProduct} />
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
