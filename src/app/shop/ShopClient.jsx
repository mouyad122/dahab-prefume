'use client';

import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { initialProducts } from '../../data/initialProducts';
import ProductCard from '../../components/product/ProductCard';
import { MagnifyingGlass, Funnel, ArrowsDownUp } from '@phosphor-icons/react';

export default function ShopClient() {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Filter Categories
  const categories = [
    { key: 'all', ar: 'كل المنتجات', en: 'All Products' },
    { key: 'hair-mists', ar: 'معطرات الشعر', en: 'Hair Mists' },
    { key: 'private-collection', ar: 'المجموعة الخاصة', en: 'Private Collection' },
    { key: 'middle-eastern', ar: 'العطور الشرقية', en: 'Middle Eastern' }
  ];

  // Sorting Options
  const sortOptions = [
    { key: 'featured', ar: 'المنتجات المميزة', en: 'Featured' },
    { key: 'newest', ar: 'الأحدث', en: 'Newest' },
    { key: 'price-asc', ar: 'السعر من الأقل للأعلى', en: 'Price: Low to High' },
    { key: 'price-desc', ar: 'السعر من الأعلى للأقل', en: 'Price: High to Low' }
  ];

  useEffect(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        t(p.title).toLowerCase().includes(query) || 
        t(p.shortDescription).toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort Products
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      // Simulating newest by ID or SKU
      result.sort((a, b) => b.sku.localeCompare(a.sku));
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy, language]);

  return (
    <div className="premium-container py-16 flex flex-col gap-12">
      {/* Page Hero */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
          {t('shop')}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {isAr ? 'تسوّق عطور DAHAB PERFUMES' : 'Shop DAHAB PERFUMES Products'}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {isAr ? 'عطور نيش شرقية وفرنسية مميزة مصممة للتميز والتفرد بجمال الثبات.' : 'Discover curated niche perfumes and nourishing hair mists with extreme performance.'}
        </p>
      </div>

      {/* Search, Filter, Sort Controls Panel */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 rounded-[2rem] shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder={isAr ? 'ابحث عن عطر...' : 'Search fragrance...'} 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input pl-10 text-xs bg-[var(--color-bg-primary)]"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 justify-start md:justify-center no-scrollbar">
          <Funnel size={14} className="text-[var(--color-gold)] hidden md:block" />
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all duration-300 focus-visible:outline-none ${
                selectedCategory === cat.key 
                  ? 'bg-[var(--color-gold)] text-black' 
                  : 'bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              {isAr ? cat.ar : cat.en}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="relative w-full md:w-auto flex items-center gap-2 justify-end">
          <ArrowsDownUp size={14} className="text-zinc-500" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs rounded-full px-4 py-2 font-medium focus:outline-none focus:border-[var(--color-gold)] cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.key} value={opt.key}>
                {isAr ? opt.ar : opt.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-4">
        <span>
          {isAr ? 'المنتجات المعروضة:' : 'Showing products:'} <strong className="text-[var(--color-text-primary)] font-bold">{filteredProducts.length}</strong>
        </span>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-lg mx-auto">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-12 text-center flex flex-col items-center gap-4">
            <span className="text-4xl">🔍</span>
            <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
              {isAr ? 'لم نجد أي نتائج تطابق بحثك' : 'No Fragrances Found'}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {isAr ? 'تأكد من كتابة الكلمات بشكل صحيح أو حاول إعادة تعيين الفلاتر.' : 'Try adjusting your search filters or clear inputs to see the full list.'}
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSortBy('featured'); }}
              className="btn-primary py-2 px-6 mt-2"
            >
              {isAr ? 'إعادة تعيين' : 'Clear Filters'}
            </button>
          </div>
        </div>
      ) : (
        /* Product Grid using reusable ProductCard */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-center justify-items-center">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
