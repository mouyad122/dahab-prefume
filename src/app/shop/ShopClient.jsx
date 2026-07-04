'use client';

import React, { useContext, useMemo, useState } from 'react';
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
  const [accord, setAccord] = useState('all'); // multi-select logic is complex, keep it simple drop-down for now
  
  // Optional: toggles for filter panels
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <main className={`min-h-screen bg-[#0a0a0c] text-white pt-28 md:pt-36 pb-28 md:pb-36 relative overflow-hidden ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[#c5a25d]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <PageContainer size="wide" className="relative z-10 space-y-8 md:space-y-12 pt-2">
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
        </section>

        <section className="bg-[#121216]/80 backdrop-blur-xl border border-[#c5a25d]/20 rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-[#c5a25d]/20 mt-2">
                <select value={category} onChange={e => setCategory(e.target.value)} className="bg-[#0a0a0c] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'القسم: الكل' : 'Category: All'}</option>
                  {categories.map(c => <option key={c.slug} value={c.slug}>{isAr ? c.name_ar : c.name_en}</option>)}
                </select>
                <select value={season} onChange={e => setSeason(e.target.value)} className="bg-[#0a0a0c] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'فصل العطر: الكل' : 'Season: All'}</option>
                  {seasons.map(s => <option key={s.slug} value={s.slug}>{isAr ? s.name_ar : s.name_en}</option>)}
                </select>
                <select value={gender} onChange={e => setGender(e.target.value)} className="bg-[#0a0a0c] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'الجنس: الكل' : 'Gender: All'}</option>
                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select value={family} onChange={e => setFamily(e.target.value)} className="bg-[#0a0a0c] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'العائلة العطرية: الكل' : 'Family: All'}</option>
                  {families.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <select value={accord} onChange={e => setAccord(e.target.value)} className="bg-[#0a0a0c] border border-white/10 text-xs rounded-lg p-2 text-white">
                  <option value="all">{isAr ? 'البصمة العطرية: الكل' : 'Accords: All'}</option>
                  {accordsList.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            )}
          </div>
        </section>

        <section>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#121216]/50 rounded-3xl border border-white/5">
              <div className="w-16 h-16 bg-[#c5a25d]/10 rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlass size={24} className="text-[#c5a25d]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                {isAr ? 'لم نجد عطوراً تطابق بحثك' : 'No fragrances found'}
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
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
                className="mt-6 text-[#c5a25d] text-sm font-semibold hover:text-white transition-colors"
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
