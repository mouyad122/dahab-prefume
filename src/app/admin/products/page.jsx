'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Funnel, MagnifyingGlass, PencilSimple, Plus, Trash,
  X, ImageSquare, DownloadSimple, CaretLeft, CaretRight,
  ArrowsClockwise, FunnelSimple, Eye, EyeSlash
} from '@phosphor-icons/react';
import ImageUpload from '../../../components/admin/ImageUpload';
import LuxuryButton from '../../../components/ui/LuxuryButton';
import { getProductImageSrc } from '../../../lib/productDisplay';
import {
  ALLOWED_CATEGORY_SLUGS,
  SEASON_OPTIONS,
  normalizeSeason,
} from '../../../lib/productClassification';

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function formatJOD(fils) {
  const v = Number.isFinite(fils) ? fils : 0;
  return `${(v / 1000).toFixed(3)} JOD`;
}
function getMinPrice(product) {
  const prices = (product?.variants || []).map(v => v.price ?? 0);
  return prices.length > 0 ? Math.min(...prices) : 0;
}
function getTotalStock(product) {
  return (product?.variants || []).reduce((s, v) => s + (v.stock ?? 0), 0);
}

// â”€â”€ Empty State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-[var(--color-text-muted)]">
      <ImageSquare size={48} className="opacity-20" />
      <p className="text-sm">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª Ù…Ø·Ø§Ø¨Ù‚Ø© Ù„Ù‡Ø°Ø§ Ø§Ù„Ø¨Ø­Ø«</p>
      <LuxuryButton variant="primary" onClick={onAdd} iconLeft={Plus} className="text-sm">
        Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯
      </LuxuryButton>
    </div>
  );
}

// â”€â”€ Products page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function AdminProducts() {
  // â”€â”€ Data state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [products, setProducts]     = useState([]);
  const [total, setTotal]           = useState(0);
  const [pages, setPages]           = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [exporting, setExporting]   = useState(false);

  // â”€â”€ Filter state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [search, setSearch]         = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterGender, setFilterGender]     = useState('');
  const [filterVisible, setFilterVisible]   = useState('');
  const [filterStock, setFilterStock]       = useState('');
  const [sort, setSort]                     = useState('newest');
  const [showFilters, setShowFilters]       = useState(false);

  // â”€â”€ Pagination â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const PAGE_SIZE = 20;
  const [page, setPage]             = useState(1);

  // â”€â”€ Product Form Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [isFormOpen, setIsFormOpen]         = useState(false);
  const [formProductId, setFormProductId]   = useState(null);
  const [formSaving, setFormSaving]         = useState(false);

  const [sku, setSku]                       = useState('');
  const [slug, setSlug]                     = useState('');
  const [nameAr, setNameAr]                 = useState('');
  const [nameEn, setNameEn]                 = useState('');
  const [inspiredBy, setInspiredBy]         = useState('');
  const [categoryId, setCategoryId]         = useState('');
  const [gender, setGender]                 = useState('unisex');
  const [season, setSeason]                 = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [imageFilename, setImageFilename]   = useState('');
  const [variants, setVariants]             = useState([{ volume: '100', price: '', stock: '0' }]);
  const [shortDescriptionAr, setShortDescriptionAr] = useState('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState('');
  const [visibleOnWebsite, setVisibleOnWebsite]     = useState(true);
  const [featuredOnFrontend, setFeaturedOnFrontend] = useState(false);

  // â”€â”€ Search debounce â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const searchTimer = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(searchTimer.current);
  }, [search]);

  // â”€â”€ Fetch helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const buildParams = useCallback((overrides = {}) => {
    const p = new URLSearchParams({
      limit:  String(PAGE_SIZE),
      offset: String(((overrides.page ?? page) - 1) * PAGE_SIZE),
      sort,
    });
    const s = overrides.search ?? debouncedSearch;
    if (s)             p.set('search',   s);
    if (filterCategory)p.set('category', filterCategory);
    if (filterGender)  p.set('gender',   filterGender);
    if (filterVisible) p.set('visible',  filterVisible);
    if (filterStock)   p.set('stock',    filterStock);
    return p;
  }, [page, debouncedSearch, filterCategory, filterGender, filterVisible, filterStock, sort]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?${buildParams()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setPages(data.pages || 1);
      }
    } catch (e) {
      console.error('Failed to fetch products', e);
    } finally {
      setLoading(false);
    }
  }, [buildParams]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || data || []);
      }
    } catch {}
  };

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const allowedCategories = categories
    .filter((category) => ALLOWED_CATEGORY_SLUGS.includes(category.slug))
    .sort((a, b) => ALLOWED_CATEGORY_SLUGS.indexOf(a.slug) - ALLOWED_CATEGORY_SLUGS.indexOf(b.slug));

  // â”€â”€ Reset filters and go back to page 1 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const resetFilters = () => {
    setSearch('');
    setFilterCategory('');
    setFilterGender('');
    setFilterVisible('');
    setFilterStock('');
    setSort('newest');
    setPage(1);
  };

  // â”€â”€ CSV Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const params = buildParams();
      params.set('format', 'csv');
      params.delete('limit');
      params.delete('offset');
      const res = await fetch(`/api/admin/products?${params}`);
      if (res.ok) {
        const blob = await res.blob();
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `dahab-products-${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error('CSV export failed', e);
    } finally {
      setExporting(false);
    }
  };

  const handleToggleVisibility = async (e, product) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/products/${product.id}/visibility`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !product.visible }),
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ ØªØºÙŠÙŠØ± Ø­Ø§Ù„Ø© Ø§Ù„Ø¸Ù‡ÙˆØ±');
      }
    } catch (err) {
      console.error(err);
      alert('Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ ØªØºÙŠÙŠØ± Ø­Ø§Ù„Ø© Ø§Ù„Ø¸Ù‡ÙˆØ±');
    }
  };

  // â”€â”€ Modal helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleOpenAddModal = () => {
    setFormProductId(null);
    setSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setSlug(''); setNameAr(''); setNameEn(''); setInspiredBy('');
    setCategoryId('');
    setGender('unisex'); setSeason(''); setLowStockThreshold('5');
    setImageFilename('');
    setVariants([{ volume: '100', price: '', stock: '0' }]);
    setShortDescriptionAr(''); setShortDescriptionEn('');
    setVisibleOnWebsite(true); setFeaturedOnFrontend(false);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (e, product) => {
    e.stopPropagation();
    setFormProductId(product.id);
    setSku(product.sku || '');
    setSlug(product.slug || '');
    setNameAr(product.name_ar || '');
    setNameEn(product.name_en || '');
    setInspiredBy(product.inspired_by || '');
    setCategoryId(product.categoryId || product.category?.id || '');
    setGender(product.gender || 'unisex');
    setSeason(normalizeSeason(product.season_slug || product.season)?.slug || '');
    setLowStockThreshold(String(product.low_stock_threshold || 5));
    setImageFilename(product.image_name || '');
    setVariants(product.variants?.length > 0
      ? product.variants.map(v => ({ volume: v.volume, price: String(v.price / 1000), stock: String(v.stock) }))
      : [{ volume: '100', price: '', stock: '0' }]
    );
    setShortDescriptionAr(product.short_description || '');
    setShortDescriptionEn(product.short_description_en || '');
    setVisibleOnWebsite(product.visible !== false);
    setFeaturedOnFrontend(product.featured === true);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!nameAr) { alert('Ø§Ù„Ø±Ø¬Ø§Ø¡ ØªØ¹Ø¨Ø¦Ø© Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠ'); return; }
    if (variants.length === 0) { alert('Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¶Ø§ÙØ© Ø­Ø¬Ù… ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„'); return; }
    for (const v of variants) {
      if (!v.volume || !v.price) { alert('Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„Ø­Ø¬Ù… ÙˆØ§Ù„Ø³Ø¹Ø± Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø­Ø¬Ø§Ù…'); return; }
    }

    const selectedCat = allowedCategories.find(c => c.id === categoryId);
    const selectedSeason = normalizeSeason(season);
    if (!selectedCat) { alert('Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø§Ø®ØªÙŠØ§Ø± Ù‚Ø³Ù… ØµØ­ÙŠØ­: Ø±Ø¬Ø§Ù„ÙŠ / Ù†Ø³Ø§Ø¦ÙŠ / Ø¹ÙˆØ¯'); return; }
    if (!selectedSeason) { alert('Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø§Ø®ØªÙŠØ§Ø± ÙØµÙ„ ØµØ­ÙŠØ­: ØµÙŠÙÙŠ / Ø´ØªÙˆÙŠ / ÙƒÙ„Ø§ Ø§Ù„ÙØµÙ„ÙŠÙ†'); return; }

    let finalSku  = sku.trim()  || `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
    let finalSlug = slug.trim() || (nameEn.trim() || nameAr.trim() || finalSku)
      .toLowerCase().replace(/[^a-z0-9_]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      sku: finalSku, slug: finalSlug,
      name_ar: nameAr.trim(), name_en: nameEn.trim() || null,
      inspired_by: inspiredBy.trim() || null,
      main_category: selectedCat.name_ar || selectedCat.slug,
      categoryId: selectedCat.id,
      category_slug: selectedCat.slug,
      gender,
      season: selectedSeason.name_ar,
      season_slug: selectedSeason.slug,
      low_stock_threshold: parseInt(lowStockThreshold, 10) || 5,
      variants: variants.map(v => ({
        volume: v.volume.trim(),
        price: Math.round(parseFloat(v.price) * 1000),
        stock: parseInt(v.stock, 10) || 0,
      })),
      short_description: shortDescriptionAr.trim() || null,
      short_description_en: shortDescriptionEn.trim() || null,
      image_name: imageFilename.trim() || null,
      visible: visibleOnWebsite,
      featured: featuredOnFrontend,
    };

    setFormSaving(true);
    try {
      const url    = formProductId ? `/api/products/${formProductId}` : '/api/products';
      const method = formProductId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsFormOpen(false);
        fetchProducts();
      } else {
        const err = await res.json();
        alert(err.error || 'ÙØ´Ù„ Ø­ÙØ¸ Ø§Ù„Ù…Ù†ØªØ¬');
      }
    } catch {
      alert('Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø´Ø¨ÙƒØ©');
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteProduct = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø¥Ø®ÙØ§Ø¡ Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬ Ù…Ù† ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ù…ØªØ¬Ø±ØŸ')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
      else alert('Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø­Ø°Ù');
    } catch { console.error('Failed to delete product'); }
  };

  const generateSlug = () => {
    if (!nameEn) return;
    setSlug(nameEn.toLowerCase().replace(/[^a-z0-9_]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const hasActiveFilters = filterCategory || filterGender || filterVisible || filterStock || search;

  // â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return (
    <div className="flex flex-col gap-6 h-full dir-ar">

      {/* â”€â”€ Header â”€â”€ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Ø¥Ø¶Ø§ÙØ© ÙˆØªØ¹Ø¯ÙŠÙ„ Ø¹Ø·ÙˆØ± Ø§Ù„Ù…ØªØ¬Ø± â€” Ø¥Ø¬Ù…Ø§Ù„ÙŠ <span className="text-[var(--color-gold-light)] font-mono">{total}</span> Ù…Ù†ØªØ¬
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LuxuryButton
            variant="secondary"
            className="text-sm"
            onClick={handleExportCSV}
            iconLeft={DownloadSimple}
            disabled={exporting}
          >
            {exporting ? 'Ø¬Ø§Ø±Ù Ø§Ù„ØªØµØ¯ÙŠØ±...' : 'ØªØµØ¯ÙŠØ± CSV'}
          </LuxuryButton>
          <LuxuryButton
            variant="primary"
            className="text-sm"
            onClick={handleOpenAddModal}
            iconLeft={Plus}
          >
            Ø¥Ø¶Ø§ÙØ© Ø¹Ø·Ø± Ø¬Ø¯ÙŠØ¯
          </LuxuryButton>
        </div>
      </div>

      {/* â”€â”€ Card â”€â”€ */}
      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex flex-col overflow-hidden flex-1 bg-[var(--color-bg-surface)]">

        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <MagnifyingGlass size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                className="form-input pr-10 text-sm"
                placeholder="Ø§Ø¨Ø­Ø« Ø¨Ø±Ù‚Ù… SKU Ø£Ùˆ Ø§Ù„Ø§Ø³Ù…..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* Sort */}
            <select
              className="form-select text-xs py-2 px-3 sm:w-48"
              value={sort}
              onChange={e => { setSort(e.target.value); setPage(1); }}
            >
              <option value="newest">Ø§Ù„Ø£Ø­Ø¯Ø« Ø£ÙˆÙ„Ø§Ù‹</option>
              <option value="oldest">Ø§Ù„Ø£Ù‚Ø¯Ù… Ø£ÙˆÙ„Ø§Ù‹</option>
              <option value="name_asc">Ø§Ù„Ø§Ø³Ù… Ø£â€“ÙŠ</option>
              <option value="name_desc">Ø§Ù„Ø§Ø³Ù… ÙŠâ€“Ø£</option>
            </select>
            {/* Filter toggle */}
            <div className="flex items-center gap-2 sm:mr-auto">
              <LuxuryButton
                variant={showFilters ? 'primary' : 'secondary'}
                className="!py-2 px-3 text-xs"
                iconLeft={FunnelSimple}
                onClick={() => setShowFilters(v => !v)}
              >
                ÙÙ„ØªØ±{hasActiveFilters ? ' â—' : ''}
              </LuxuryButton>
              {hasActiveFilters && (
                <LuxuryButton variant="ghost" className="!py-2 px-3 text-xs" onClick={resetFilters} iconLeft={ArrowsClockwise}>
                  Ø¥Ø²Ø§Ù„Ø© Ø§Ù„ÙƒÙ„
                </LuxuryButton>
              )}
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-[var(--color-border-subtle)] mt-1">
              <select className="form-select text-xs py-1.5" value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setPage(1); }}>
                <option value="">ÙƒÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_ar}</option>)}
              </select>
              <select className="form-select text-xs py-1.5" value={filterGender} onChange={e => { setFilterGender(e.target.value); setPage(1); }}>
                <option value="">ÙƒÙ„ Ø§Ù„Ø£Ø¬Ù†Ø§Ø³</option>
                <option value="male">Ø±Ø¬Ø§Ù„ÙŠ</option>
                <option value="female">Ù†Ø³Ø§Ø¦ÙŠ</option>
                <option value="unisex">Ù„Ù„Ø¬Ù…ÙŠØ¹</option>
              </select>
              <select className="form-select text-xs py-1.5" value={filterVisible} onChange={e => { setFilterVisible(e.target.value); setPage(1); }}>
                <option value="">ÙƒÙ„ Ø­Ø§Ù„Ø§Øª Ø§Ù„Ø¸Ù‡ÙˆØ±</option>
                <option value="true">Ù…Ø±Ø¦ÙŠ ÙÙŠ Ø§Ù„Ù…ØªØ¬Ø±</option>
                <option value="false">Ù…Ø®ÙÙŠ</option>
              </select>
              <select className="form-select text-xs py-1.5" value={filterStock} onChange={e => { setFilterStock(e.target.value); setPage(1); }}>
                <option value="">ÙƒÙ„ Ø§Ù„Ù…Ø®Ø²ÙˆÙ†Ø§Øª</option>
                <option value="low">Ù…Ø®Ø²ÙˆÙ† Ù…Ù†Ø®ÙØ¶</option>
                <option value="out">Ù†ÙØ¯ Ø§Ù„Ù…Ø®Ø²ÙˆÙ†</option>
              </select>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8" />
            </div>
          ) : products.length === 0 ? (
            <EmptyState onAdd={handleOpenAddModal} />
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-4 font-bold w-14">Ø§Ù„ØµÙˆØ±Ø©</th>
                  <th className="py-3 px-4 font-bold">Ø§Ù„Ù…Ù†ØªØ¬</th>
                  <th className="py-3 px-4 font-bold hidden md:table-cell">Ø§Ù„ÙØ¦Ø©</th>
                  <th className="py-3 px-4 font-bold hidden lg:table-cell">Ø§Ù„Ø£Ø­Ø¬Ø§Ù…</th>
                  <th className="py-3 px-4 font-bold">Ø§Ù„Ø³Ø¹Ø±</th>
                  <th className="py-3 px-4 font-bold">Ø§Ù„Ù…Ø®Ø²ÙˆÙ†</th>
                  <th className="py-3 px-4 font-bold hidden sm:table-cell">Ø§Ù„Ø¸Ù‡ÙˆØ±</th>
                  <th className="py-3 px-4 font-bold w-24">Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)] text-[var(--color-text-primary)]">
                {products.map(product => {
                  const totalStock = getTotalStock(product);
                  const isLow = (product.variants || []).some(v => v.stock <= (product.low_stock_threshold || 5));
                  return (
                    <tr key={product.id} className="hover:bg-black/10 transition-colors group">
                      {/* Image */}
                      <td className="py-3 px-4">
                        <div className="w-10 h-10 rounded border border-[var(--color-border-subtle)] overflow-hidden bg-black/40 shrink-0">
                          {product.image_name ? (
                            <img src={getProductImageSrc(product)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageSquare size={16} className="text-[var(--color-text-subtle)]" />
                            </div>
                          )}
                        </div>
                      </td>
                      {/* Product */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[var(--color-text-primary)] leading-tight">{product.name_ar}</div>
                        {product.name_en && <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{product.name_en}</div>}
                        <div className="text-[0.65rem] text-[var(--color-text-subtle)] font-mono mt-0.5">{product.sku}</div>
                      </td>
                      {/* Category */}
                      <td className="py-3 px-4 hidden md:table-cell text-[var(--color-text-secondary)] text-xs">
                        {product.category?.name_ar || product.main_category || 'â€”'}
                      </td>
                      {/* Sizes */}
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {(product.variants || []).map(v => (
                            <span key={v.id || v.volume} className="px-1.5 py-0.5 rounded bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] text-[0.62rem] text-[var(--color-text-secondary)]">
                              {v.volume}Ù…Ù„
                            </span>
                          ))}
                        </div>
                      </td>
                      {/* Price */}
                      <td className="py-3 px-4 font-mono text-[var(--color-gold-light)] font-bold text-xs">
                        {formatJOD(getMinPrice(product))}
                      </td>
                      {/* Stock */}
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                          isLow
                            ? 'bg-[var(--color-error-dim)] text-[var(--color-error)] border-[var(--color-error-border)]'
                            : 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success-border)]'
                        }`}>
                          {totalStock}
                        </span>
                      </td>
                      {/* Visibility */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className={`text-[0.65rem] font-bold ${product.visible ? 'text-[var(--color-success)]' : 'text-[var(--color-text-subtle)]'}`}>
                          {product.visible ? 'â— Ù…Ø±Ø¦ÙŠ' : 'â—‹ Ù…Ø®ÙÙŠ'}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 rounded hover:bg-[var(--color-gold-dim)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
                            title={product.visible ? 'Ø¥Ø®ÙØ§Ø¡' : 'Ø¥Ø¸Ù‡Ø§Ø±'}
                            onClick={e => handleToggleVisibility(e, product)}
                          >
                            {product.visible ? <Eye size={18} /> : <EyeSlash size={18} />}
                          </button>
                          <button
                            className="p-1.5 rounded hover:bg-[var(--color-gold-dim)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
                            title="ØªØ¹Ø¯ÙŠÙ„"
                            onClick={e => handleOpenEditModal(e, product)}
                          >
                            <PencilSimple size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded hover:bg-[var(--color-error-dim)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                            title="Ø­Ø°Ù"
                            onClick={e => handleDeleteProduct(e, product.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination footer */}
        {!loading && total > PAGE_SIZE && (
          <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center justify-between gap-4">
            <span className="text-xs text-[var(--color-text-muted)]">
              Ø¹Ø±Ø¶ {Math.min((page - 1) * PAGE_SIZE + 1, total)}â€“{Math.min(page * PAGE_SIZE, total)} Ù…Ù† {total}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors disabled:opacity-30"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <CaretRight size={16} />
              </button>
              <span className="text-xs text-[var(--color-text-primary)] px-2 font-mono">
                {page} / {pages}
              </span>
              <button
                className="p-1.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors disabled:opacity-30"
                disabled={page >= pages}
                onClick={() => setPage(p => Math.min(pages, p + 1))}
              >
                <CaretLeft size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          Product Add/Edit Modal â€” preserved original logic exactly
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleFormSubmit}
            className="glass-card w-full max-w-2xl p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 max-h-[90vh] overflow-y-auto bg-[var(--color-bg-surface)] text-white"
          >
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                {formProductId ? 'ØªØ¹Ø¯ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¹Ø·Ø±' : 'Ø¥Ø¶Ø§ÙØ© Ø¹Ø·Ø± Ø¬Ø¯ÙŠØ¯'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded hover:bg-white/10 text-[var(--color-text-muted)] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-white">Ø§Ù„Ø§Ø³Ù… Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠ (Ù…Ø·Ù„ÙˆØ¨)</label>
                  <input type="text" className="form-input text-white bg-black/30" value={nameAr} onChange={e => setNameAr(e.target.value)} placeholder="Ù…Ø«Ø§Ù„: Ù…Ø³Ùƒ Ø§Ù„ÙØ§Ù†ÙŠÙ„ÙŠØ§" required />
                </div>
                <div>
                  <label className="form-label">Ø§Ù„Ø§Ø³Ù… Ø¨Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠ (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
                  <input type="text" className="form-input text-left text-white bg-black/30" dir="ltr" value={nameEn} onChange={e => setNameEn(e.target.value)} onBlur={generateSlug} placeholder="e.g. Vanilla Musk" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Ø±Ù‚Ù… SKU</label>
                  <input type="text" className="form-input text-left font-mono text-white bg-black/30" dir="ltr" value={sku} onChange={e => setSku(e.target.value)} placeholder="ÙŠÙˆÙ„Ø¯ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹" />
                </div>
                <div>
                  <label className="form-label">Ø§Ù„Ø±Ø§Ø¨Ø· Slug</label>
                  <input type="text" className="form-input text-left font-mono text-white bg-black/30" dir="ltr" value={slug} onChange={e => setSlug(e.target.value)} placeholder="vanilla-musk" />
                </div>
                <div>
                  <label className="form-label">Ù…Ø³ØªÙˆØ­Ù‰ Ù…Ù† (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
                  <input type="text" className="form-input text-white bg-black/30" value={inspiredBy} onChange={e => setInspiredBy(e.target.value)} placeholder="Ù…Ø«Ø§Ù„: Creed Aventus" />
                </div>
              </div>

              {/* Categorization */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Ø§Ù„Ù‚Ø³Ù… (Ù…Ø·Ù„ÙˆØ¨)</label>
                  <select className="form-select text-white bg-black/30" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                    <option value="" className="bg-[var(--color-bg-surface)]">-- Ø§Ø®ØªØ± Ø§Ù„Ù‚Ø³Ù… --</option>
                    {allowedCategories.map(c => <option key={c.id} value={c.id} className="bg-[var(--color-bg-surface)]">{c.name_ar}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Ø§Ù„Ø¬Ù†Ø³ Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù</label>
                  <select className="form-select text-white bg-black/30" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="unisex" className="bg-[var(--color-bg-surface)]">Ù„Ù„Ø¬Ù†Ø³ÙŠÙ†</option>
                    <option value="male" className="bg-[var(--color-bg-surface)]">Ø±Ø¬Ø§Ù„ÙŠ</option>
                    <option value="female" className="bg-[var(--color-bg-surface)]">Ù†Ø³Ø§Ø¦ÙŠ</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Ø§Ù„Ù…ÙˆØ³Ù…</label>
                  <select className="form-select text-white bg-black/30" value={season} onChange={e => setSeason(e.target.value)} required>
                    <option value="" className="bg-[var(--color-bg-surface)]">-- اختر الموسم --</option>
                    <option value="both" className="bg-[var(--color-bg-surface)]">كلا الفصلين</option>
                    <option value="winter" className="bg-[var(--color-bg-surface)]">Ø´ØªÙˆÙŠ</option>
                    <option value="summer" className="bg-[var(--color-bg-surface)]">ØµÙŠÙÙŠ</option>
                    
                    
                  </select>
                </div>
              </div>

              {/* Image */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <ImageUpload label="ØµÙˆØ±Ø© Ø§Ù„Ù…Ù†ØªØ¬" value={imageFilename} onChange={setImageFilename} />
              </div>

              {/* Variants */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="form-label !mb-0 text-white font-bold">Ø§Ù„Ø£Ø­Ø¬Ø§Ù… ÙˆØ§Ù„Ø£Ø³Ø¹Ø§Ø± ÙˆØ§Ù„Ù…Ø®Ø²ÙˆÙ†</label>
                  <LuxuryButton type="button" variant="secondary" className="!py-1 px-3 text-xs"
                    onClick={() => setVariants([...variants, { volume: '', price: '', stock: '0' }])}>
                    + Ø¥Ø¶Ø§ÙØ© Ø­Ø¬Ù…
                  </LuxuryButton>
                </div>
                <div className="space-y-3">
                  {variants.map((v, i) => (
                    <div key={i} className="flex items-end gap-3 p-3 rounded-lg border border-[var(--color-border-subtle)] bg-black/20">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">Ø§Ù„Ø­Ø¬Ù… (Ù…Ù„)</label>
                          <input type="text" className="form-input py-1.5 text-white bg-black/30" placeholder="100" value={v.volume}
                            onChange={e => { const n = [...variants]; n[i].volume = e.target.value; setVariants(n); }} required />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">Ø§Ù„Ø³Ø¹Ø± (JOD)</label>
                          <input type="number" step="0.001" className="form-input py-1.5 text-white bg-black/30" placeholder="0.000" value={v.price}
                            onChange={e => { const n = [...variants]; n[i].price = e.target.value; setVariants(n); }} required />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">Ø§Ù„Ù…Ø®Ø²ÙˆÙ†</label>
                          <input type="number" className="form-input py-1.5 text-white bg-black/30" placeholder="0" value={v.stock}
                            onChange={e => { const n = [...variants]; n[i].stock = e.target.value; setVariants(n); }} required />
                        </div>
                      </div>
                      {variants.length > 1 && (
                        <LuxuryButton type="button" variant="danger" className="!p-2.5 !w-10 !h-10 !min-h-0 !min-w-0"
                          onClick={() => setVariants(variants.filter((_, idx) => idx !== i))}>
                          <Trash size={16} />
                        </LuxuryButton>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock threshold */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4">
                <div>
                  <label className="form-label">Ø­Ø¯ ØªÙ†Ø¨ÙŠÙ‡ Ø§Ù†Ø®ÙØ§Ø¶ Ø§Ù„Ù…Ø®Ø²ÙˆÙ†</label>
                  <input type="number" className="form-input text-white bg-black/30" value={lowStockThreshold} onChange={e => setLowStockThreshold(e.target.value)} />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">ÙˆØµÙ Ù‚ØµÙŠØ± Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠ</label>
                  <textarea className="form-input h-20 resize-none text-white bg-black/30" value={shortDescriptionAr} onChange={e => setShortDescriptionAr(e.target.value)} placeholder="Ù†Ø¨Ø°Ø© Ù…Ø®ØªØµØ±Ø©..." />
                </div>
                <div>
                  <label className="form-label">Ø§Ù„ÙˆØµÙ Ø§Ù„Ù‚ØµÙŠØ± Ø¨Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠ</label>
                  <textarea className="form-input h-20 resize-none text-left text-white bg-black/30" dir="ltr" value={shortDescriptionEn} onChange={e => setShortDescriptionEn(e.target.value)} placeholder="A brief summary..." />
                </div>
              </div>

              {/* Visibility */}
              <div className="flex gap-6 border-t border-[var(--color-border)] pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={visibleOnWebsite} onChange={e => setVisibleOnWebsite(e.target.checked)} className="rounded" />
                  <span className="text-sm font-semibold">Ø¹Ø±Ø¶ Ø¹Ù„Ù‰ ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ù…ØªØ¬Ø±</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={featuredOnFrontend} onChange={e => setFeaturedOnFrontend(e.target.checked)} className="rounded" />
                  <span className="text-sm font-semibold">ØªÙ…ÙŠÙŠØ² Ø§Ù„Ù…Ù†ØªØ¬ ÙÙŠ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©</span>
                </label>
              </div>
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
              <LuxuryButton variant="secondary" className="px-4 py-2 text-sm" onClick={() => setIsFormOpen(false)} type="button">
                Ø¥Ù„ØºØ§Ø¡
              </LuxuryButton>
              <LuxuryButton type="submit" variant="primary" className="px-4 py-2 text-sm" disabled={formSaving}>
                {formSaving ? 'Ø¬Ø§Ø±Ù Ø§Ù„Ø­ÙØ¸...' : 'Ø­ÙØ¸ Ø§Ù„Ù…Ù†ØªØ¬'}
              </LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

