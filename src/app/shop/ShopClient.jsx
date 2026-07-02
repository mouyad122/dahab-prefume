'use client';

import React, { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import { FadersHorizontal, MagnifyingGlass, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import ProductCard from '../../components/product/ProductCard';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=700';

function parseImages(value) {
  try {
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function productPrice(product) {
  return product.price_100ml_fils || product.price_50ml_fils || product.price_200ml_fils || 0;
}

function formatJOD(fils) {
  return `${(fils / 1000).toFixed(3)} JOD`;
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
    <main className={`shop-page ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <section className="shop-hero">
        <div className="premium-container">
          <div className="shop-hero-inner">
            <div>
              <div className="eyebrow">
                <Sparkle size={15} weight="fill" />
                <span>{isAr ? 'مجموعة دهب الكاملة' : 'Dahab full collection'}</span>
              </div>
              <h1>{isAr ? 'تسوّق العطور بثقة ووضوح.' : 'Shop fragrance with clarity.'}</h1>
              <p>
                {isAr
                  ? 'تصفّح العطور حسب المجموعة، اختر ما يناسب حضورك، واطلب مباشرة عبر واتساب أو من صفحة المنتج.'
                  : 'Browse by collection, choose the scent that matches your presence, and order directly from the product page.'}
              </p>
            </div>
            <div className="shop-count">
              <strong>{filtered.length}</strong>
              <span>{isAr ? 'منتج متاح' : 'available products'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-container shop-toolbar">
        <div className="search-control">
          <MagnifyingGlass size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={isAr ? 'ابحث عن اسم العطر' : 'Search by fragrance name'}
          />
        </div>
        <div className="category-strip">
          <button onClick={() => setCategory('all')} className={category === 'all' ? 'active' : ''}>
            <FadersHorizontal size={15} />
            {isAr ? 'الكل' : 'All'}
          </button>
          {categories.map((item) => (
            <button key={item.id} onClick={() => setCategory(item.id)} className={category === item.id ? 'active' : ''}>
              {isAr ? item.name_ar : item.name_en}
            </button>
          ))}
        </div>
      </section>

      <section className="premium-container pb-20">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <MagnifyingGlass size={42} />
            <p>{isAr ? 'لم نجد منتجًا مطابقًا للبحث.' : 'No matching products found.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const image = product.image_filename || FALLBACK_IMAGE;
              const title_ar = product.name_ar || '';
              const title_en = product.name_en || '';
              const categoryName = isAr ? product.category?.name_ar : product.category?.name_en;
              
              const mappedProduct = {
                id: product.id,
                title: isAr ? title_ar : title_en,
                price: productPrice(product) / 1000,
                compareAtPrice: null, // Assuming no compareAtPrice in DB model directly available here
                stock: product.stock,
                category: categoryName || (isAr ? 'عطور' : 'Perfumes'),
                thumbnail: image,
                slug: product.slug,
                volume: '100ml' // Static fallback or parse if available
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
    </main>
  );
}
