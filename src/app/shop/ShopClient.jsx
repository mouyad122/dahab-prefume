'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FadersHorizontal, MagnifyingGlass, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import ProductCard from '../../components/product/ProductCard';
import LuxuryButton from '../../components/ui/LuxuryButton';
import PageContainer from '../../components/layout/PageContainer';
import {
  CATEGORY_OPTIONS,
  SEASON_OPTIONS,
  isAllowedCategorySlug,
  isAllowedSeasonSlug,
} from '../../lib/productClassification';

export default function ShopClient({ initialProducts }) {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [season, setSeason] = useState('all');
  const [gender, setGender] = useState('all');
  const [family, setFamily] = useState('all');
  const [accord, setAccord] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, season, gender, family, accord]);

  const toggleCategoryExpand = (categorySlug) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categorySlug]: !prev[categorySlug]
    }));
  };

  // Dynamic categories from DB
  const [dbCategories, setDbCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) {
          setDbCategories(data.categories.filter(c => c.is_active));
        }
      })
      .catch(() => {});
  }, []);

  const products = initialProducts || [];

  const categories = useMemo(() => {
    const present = new Set(products.map((product) => product.category_slug || product.category?.slug).filter(isAllowedCategorySlug));
    return CATEGORY_OPTIONS.filter((option) => present.has(option.slug));
  }, [products]);

  const seasons = useMemo(() => {
    const present = new Set(products.map((product) => product.season_slug || product.season).filter(isAllowedSeasonSlug));
    return SEASON_OPTIONS.filter((option) => present.has(option.slug));
  }, [products]);

  const genders = useMemo(() => {
    return Array.from(new Set(products.map(p => p.gender).filter(Boolean)));
  }, [products]);

  const families = useMemo(() => {
    return Array.from(new Set(products.map(p => p.fragrance_family).filter(Boolean)));
  }, [products]);

  const accordsList = useMemo(() => {
    const allAccords = new Set();
    products.forEach(p => {
      if (p.accords) {
        p.accords.forEach(a => {
          if (a.name_ar) allAccords.add(a.name_ar);
        });
      }
    });
    return Array.from(allAccords);
  }, [products]);

  const filtered = products.filter((product) => {
    const query = search.trim().toLowerCase();
    const name = `${product.name_ar || ''} ${product.name_en || ''}`.toLowerCase();
    
    const matchesSearch = !query || name.includes(query);
    const productCategory = product.category_slug || product.category?.slug;
    const productSeason = product.season_slug || product.season;
    const matchesCategory = category === 'all' || productCategory === category;
    const matchesSeason = season === 'all' || productSeason === season;
    const matchesGender = gender === 'all' || product.gender === gender;
    const matchesFamily = family === 'all' || product.fragrance_family === family;
    
    let matchesAccord = true;
    if (accord !== 'all') {
      matchesAccord = product.accords && product.accords.some(a => a.name_ar === accord);
    }
    
    return matchesSearch &&
      matchesCategory &&
      matchesSeason &&
      matchesGender &&
      matchesFamily &&
      matchesAccord &&
      product.visible !== false &&
      isAllowedCategorySlug(productCategory) &&
      isAllowedSeasonSlug(productSeason);
  });

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  // Build category tabs: from DB if available, else fallback to static
  const categoryTabs = useMemo(() => {
    if (dbCategories.length > 0) {
      return dbCategories.sort((a, b) => a.display_order - b.display_order);
    }
    return [];
  }, [dbCategories]);

  const displayCategories = useMemo(() => {
    if (categoryTabs.length > 0) return categoryTabs;
    return categories;
  }, [categoryTabs, categories]);

  const mobileSections = useMemo(() => {
    const activeCats = category === 'all' ? displayCategories : displayCategories.filter(c => c.slug === category);
    return activeCats.map(cat => {
      const categoryProducts = filtered.filter(p => (p.category_slug || p.category?.slug) === cat.slug);
      return {
        ...cat,
        products: categoryProducts
      };
    }).filter(sec => sec.products.length > 0);
  }, [displayCategories, filtered, category]);

  return (
    <main className={`min-h-screen bg-[#0E0E0E] text-white pt-28 md:pt-36 pb-28 md:pb-36 relative overflow-hidden ${isAr ? 'dir-ar' : 'dir-en'}`}>
      {/* Background glows */}
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[#584838]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#3C3631]/6 rounded-full blur-[160px] pointer-events-none" />

      <PageContainer size="wide" className="relative z-10 space-y-8 md:space-y-10 pt-2">
        {/* ── Hero Header ── */}
        <section className="text-center pt-4 pb-6 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1B1A] border border-[#584838]/30 text-[#C8A882] text-xs font-semibold tracking-wider uppercase">
            <Sparkle size={13} className="text-[#C8A882]" />
            <span>{isAr ? 'مجموعة دهب الكاملة' : 'Dahab Full Collection'}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-[#F0E0C8] to-[#B89070] bg-clip-text text-transparent font-serif leading-tight">
            {isAr ? 'تسوّق العطور بثقة ووضوح' : 'Shop Fragrance with Clarity'}
          </h1>

          <p className="max-w-2xl text-sm md:text-base text-[#9A8A7A] font-light leading-relaxed">
            {isAr
              ? 'تصفّح العطور حسب المجموعة، اختر ما يناسب حضورك، واطلب مباشرة عبر السلة أو الاستفسار السريع عبر الواتساب.'
              : 'Browse by collection, choose the scent that matches your presence, and order directly via cart or quick WhatsApp inquiry.'}
          </p>
        </section>

        {/* ── Category Tabs (Collections) ── */}
        {categoryTabs.length > 0 && (
          <section aria-label={isAr ? 'تصفح حسب القسم' : 'Browse by category'}>
            <div className="shop-category-tabs">
              <button
                onClick={() => setCategory('all')}
                className={`shop-category-tab ${category === 'all' ? 'active' : ''}`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>
              {categoryTabs.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.slug)}
                  className={`shop-category-tab ${category === cat.slug ? 'active' : ''}`}
                >
                  {isAr ? cat.name_ar : cat.name_en}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── Search & Filters ── */}
        <section className="bg-[#1C1B1A]/80 backdrop-blur-xl border border-[#584838]/25 rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80 shrink-0">
                <MagnifyingGlass size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6A5A4A] pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={isAr ? 'ابحث عن اسم العطر...' : 'Search fragrance name...'}
                  className="w-full bg-[#0E0E0E]/80 border border-[#584838]/25 focus:border-[#B89070] rounded-xl pr-11 pl-4 py-2.5 text-xs text-white placeholder-[#6A5A4A] focus:outline-none focus:ring-1 focus:ring-[#B89070] transition-all"
                />
              </div>

              <LuxuryButton 
                onClick={() => setShowFilters(!showFilters)} 
                variant={showFilters ? 'primary' : 'outline'}
                size="sm"
                className="!rounded-full !py-2 !px-5 !text-xs"
                iconLeft={FadersHorizontal}
              >
                {isAr ? 'الفلاتر المتقدمة' : 'Advanced Filters'}
              </LuxuryButton>
            </div>

            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-[#584838]/20 mt-2">
                <select value={category} onChange={e => setCategory(e.target.value)} className="bg-[#0E0E0E] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'القسم: الكل' : 'Category: All'}</option>
                  {categories.map(c => <option key={c.slug} value={c.slug}>{isAr ? c.name_ar : c.name_en}</option>)}
                </select>
                <select value={season} onChange={e => setSeason(e.target.value)} className="bg-[#0E0E0E] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'فصل العطر: الكل' : 'Season: All'}</option>
                  {seasons.map(s => <option key={s.slug} value={s.slug}>{isAr ? s.name_ar : s.name_en}</option>)}
                </select>
                <select value={gender} onChange={e => setGender(e.target.value)} className="bg-[#0E0E0E] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'الجنس: الكل' : 'Gender: All'}</option>
                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select value={family} onChange={e => setFamily(e.target.value)} className="bg-[#0E0E0E] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'العائلة العطرية: الكل' : 'Family: All'}</option>
                  {families.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <select value={accord} onChange={e => setAccord(e.target.value)} className="bg-[#0E0E0E] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'البصمة العطرية: الكل' : 'Accords: All'}</option>
                  {accordsList.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            )}
          </div>
        </section>

        {/* ── Products Grid ── */}
        <section>
          {filtered.length > 0 ? (
            isMobile ? (
              <div className="space-y-20 pb-12">
                {mobileSections.map((sec) => (
                  <div key={sec.slug} className="mobile-category-section border-t-2 border-[#584838]/15 pt-10 first:border-t-0 first:pt-0">
                    <div className="flex items-center justify-between border-b border-[#584838]/20 pb-3 mb-6">
                      <div className="flex items-baseline gap-3">
                        <h2 className="text-[1.05rem] font-extrabold text-[#D4A96A] font-serif uppercase tracking-[0.12em] drop-shadow-sm">
                          {isAr ? sec.name_ar : sec.name_en}
                        </h2>
                        {!expandedCategories[sec.slug] && sec.products.length > 1 && (
                          <span className="text-[10px] text-[#7A6A5A] font-light tracking-wide flex items-center gap-1 select-none">
                            {isAr ? '← اسحب' : 'Swipe →'}
                          </span>
                        )}
                      </div>
                      {sec.products.length > 2 && (
                        <button
                          type="button"
                          onClick={() => toggleCategoryExpand(sec.slug)}
                          className="text-xs text-[#B89070] hover:text-white font-bold flex items-center gap-1 focus:outline-none cursor-pointer bg-[#1C1B1A] border border-[#584838]/30 px-3 py-1 rounded-full hover:border-[#B89070] transition-colors"
                        >
                          {expandedCategories[sec.slug] 
                            ? (isAr ? 'عرض أقل' : 'Show Less') 
                            : (isAr ? `عرض المزيد (+${sec.products.length - 2})` : `Show More (+${sec.products.length - 2})`)}
                        </button>
                      )}
                    </div>
                    
                    {expandedCategories[sec.slug] ? (
                      <div className="grid grid-cols-2 gap-4">
                        {sec.products.map((p) => (
                          <div key={p.id} className="h-full">
                            <ProductCard product={p} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {sec.products.map((p) => (
                          <div key={p.id} className="w-[70vw] shrink-0 snap-start">
                            <ProductCard product={p} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1C1B1A]/50 rounded-3xl border border-white/5">
              <div className="w-16 h-16 bg-[#584838]/15 rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlass size={24} className="text-[#B89070]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                {isAr ? 'لم نجد عطوراً تطابق بحثك' : 'No fragrances found'}
              </h3>
              <p className="text-[#9A8A7A] text-sm max-w-md">
                {isAr
                  ? 'جرب البحث بكلمات أخرى أو تصفح المجموعات المختلفة للعثور على عطرك المفضل.'
                  : 'Try adjusting your search or filters to find what you are looking for.'}
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                  setSeason('all');
                  setGender('all');
                  setFamily('all');
                  setAccord('all');
                }}
                className="mt-6 text-[#B89070] text-sm font-semibold hover:text-white transition-colors"
              >
                {isAr ? 'إظهار جميع العطور' : 'Show all fragrances'}
              </button>
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
