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

// ── Helpers ─────────────────────────────────────────────────────────────────
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

// ── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-[var(--color-text-muted)]">
      <ImageSquare size={48} className="opacity-20" />
      <p className="text-sm">لا توجد منتجات مطابقة لهذا البحث</p>
      <LuxuryButton variant="primary" onClick={onAdd} iconLeft={Plus} className="text-sm">
        إضافة منتج جديد
      </LuxuryButton>
    </div>
  );
}

// ── Products page ────────────────────────────────────────────────────────────
export default function AdminProducts() {
  // ── Data state ─────────────────────────────────────────────────────────────
  const [products, setProducts]     = useState([]);
  const [total, setTotal]           = useState(0);
  const [pages, setPages]           = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [exporting, setExporting]   = useState(false);

  // ── Filter state ────────────────────────────────────────────────────────────
  const [search, setSearch]         = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterGender, setFilterGender]     = useState('');
  const [filterVisible, setFilterVisible]   = useState('');
  const [filterStock, setFilterStock]       = useState('');
  const [sort, setSort]                     = useState('newest');
  const [showFilters, setShowFilters]       = useState(false);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const PAGE_SIZE = 20;
  const [page, setPage]             = useState(1);

  // ── Product Form Modal ──────────────────────────────────────────────────────
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
  const [season, setSeason]                 = useState('all');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [imageFilename, setImageFilename]   = useState('');
  const [variants, setVariants]             = useState([{ volume: '100', price: '', stock: '0' }]);
  const [shortDescriptionAr, setShortDescriptionAr] = useState('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState('');
  const [visibleOnWebsite, setVisibleOnWebsite]     = useState(true);
  const [featuredOnFrontend, setFeaturedOnFrontend] = useState(false);

  // ── Search debounce ─────────────────────────────────────────────────────────
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

  // ── Fetch helpers ────────────────────────────────────────────────────────────
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

  // ── Reset filters and go back to page 1 ────────────────────────────────────
  const resetFilters = () => {
    setSearch('');
    setFilterCategory('');
    setFilterGender('');
    setFilterVisible('');
    setFilterStock('');
    setSort('newest');
    setPage(1);
  };

  // ── CSV Export ──────────────────────────────────────────────────────────────
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
        alert('حدث خطأ أثناء تغيير حالة الظهور');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تغيير حالة الظهور');
    }
  };

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const handleOpenAddModal = () => {
    setFormProductId(null);
    setSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setSlug(''); setNameAr(''); setNameEn(''); setInspiredBy('');
    setCategoryId(categories[0]?.id || '');
    setGender('unisex'); setSeason('all'); setLowStockThreshold('5');
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
    setSeason(product.season || 'all');
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
    if (!nameAr) { alert('الرجاء تعبئة اسم المنتج بالعربي'); return; }
    if (variants.length === 0) { alert('الرجاء إضافة حجم واحد على الأقل'); return; }
    for (const v of variants) {
      if (!v.volume || !v.price) { alert('الرجاء إدخال الحجم والسعر لجميع الأحجام'); return; }
    }

    let finalSku  = sku.trim()  || `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
    let finalSlug = slug.trim() || (nameEn.trim() || nameAr.trim() || finalSku)
      .toLowerCase().replace(/[^a-z0-9_]+/g, '-').replace(/(^-|-$)/g, '');

    const selectedCat = categories.find(c => c.id === categoryId);
    const payload = {
      sku: finalSku, slug: finalSlug,
      name_ar: nameAr.trim(), name_en: nameEn.trim() || null,
      inspired_by: inspiredBy.trim() || null,
      main_category: selectedCat ? selectedCat.slug : 'private',
      categoryId: categoryId || null, gender, season,
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
        alert(err.error || 'فشل حفظ المنتج');
      }
    } catch {
      alert('خطأ في الشبكة');
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteProduct = async (e, id) => {
    e.stopPropagation();
    if (!confirm('هل أنت متأكد من إخفاء هذا المنتج من واجهة المتجر؟')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
      else alert('حدث خطأ أثناء الحذف');
    } catch { console.error('Failed to delete product'); }
  };

  const generateSlug = () => {
    if (!nameEn) return;
    setSlug(nameEn.toLowerCase().replace(/[^a-z0-9_]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const hasActiveFilters = filterCategory || filterGender || filterVisible || filterStock || search;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 h-full dir-ar">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة المنتجات
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            إضافة وتعديل عطور المتجر — إجمالي <span className="text-[var(--color-gold-light)] font-mono">{total}</span> منتج
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
            {exporting ? 'جارٍ التصدير...' : 'تصدير CSV'}
          </LuxuryButton>
          <LuxuryButton
            variant="primary"
            className="text-sm"
            onClick={handleOpenAddModal}
            iconLeft={Plus}
          >
            إضافة عطر جديد
          </LuxuryButton>
        </div>
      </div>

      {/* ── Card ── */}
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
                placeholder="ابحث برقم SKU أو الاسم..."
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
              <option value="newest">الأحدث أولاً</option>
              <option value="oldest">الأقدم أولاً</option>
              <option value="name_asc">الاسم أ–ي</option>
              <option value="name_desc">الاسم ي–أ</option>
            </select>
            {/* Filter toggle */}
            <div className="flex items-center gap-2 sm:mr-auto">
              <LuxuryButton
                variant={showFilters ? 'primary' : 'secondary'}
                className="!py-2 px-3 text-xs"
                iconLeft={FunnelSimple}
                onClick={() => setShowFilters(v => !v)}
              >
                فلتر{hasActiveFilters ? ' ●' : ''}
              </LuxuryButton>
              {hasActiveFilters && (
                <LuxuryButton variant="ghost" className="!py-2 px-3 text-xs" onClick={resetFilters} iconLeft={ArrowsClockwise}>
                  إزالة الكل
                </LuxuryButton>
              )}
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-[var(--color-border-subtle)] mt-1">
              <select className="form-select text-xs py-1.5" value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setPage(1); }}>
                <option value="">كل الأقسام</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_ar}</option>)}
              </select>
              <select className="form-select text-xs py-1.5" value={filterGender} onChange={e => { setFilterGender(e.target.value); setPage(1); }}>
                <option value="">كل الأجناس</option>
                <option value="male">رجالي</option>
                <option value="female">نسائي</option>
                <option value="unisex">للجميع</option>
              </select>
              <select className="form-select text-xs py-1.5" value={filterVisible} onChange={e => { setFilterVisible(e.target.value); setPage(1); }}>
                <option value="">كل حالات الظهور</option>
                <option value="true">مرئي في المتجر</option>
                <option value="false">مخفي</option>
              </select>
              <select className="form-select text-xs py-1.5" value={filterStock} onChange={e => { setFilterStock(e.target.value); setPage(1); }}>
                <option value="">كل المخزونات</option>
                <option value="low">مخزون منخفض</option>
                <option value="out">نفد المخزون</option>
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
                  <th className="py-3 px-4 font-bold w-14">الصورة</th>
                  <th className="py-3 px-4 font-bold">المنتج</th>
                  <th className="py-3 px-4 font-bold hidden md:table-cell">الفئة</th>
                  <th className="py-3 px-4 font-bold hidden lg:table-cell">الأحجام</th>
                  <th className="py-3 px-4 font-bold">السعر</th>
                  <th className="py-3 px-4 font-bold">المخزون</th>
                  <th className="py-3 px-4 font-bold hidden sm:table-cell">الظهور</th>
                  <th className="py-3 px-4 font-bold w-24">إجراءات</th>
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
                        {product.category?.name_ar || product.main_category || '—'}
                      </td>
                      {/* Sizes */}
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {(product.variants || []).map(v => (
                            <span key={v.id || v.volume} className="px-1.5 py-0.5 rounded bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] text-[0.62rem] text-[var(--color-text-secondary)]">
                              {v.volume}مل
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
                          {product.visible ? '● مرئي' : '○ مخفي'}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 rounded hover:bg-[var(--color-gold-dim)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
                            title={product.visible ? 'إخفاء' : 'إظهار'}
                            onClick={e => handleToggleVisibility(e, product)}
                          >
                            {product.visible ? <Eye size={18} /> : <EyeSlash size={18} />}
                          </button>
                          <button
                            className="p-1.5 rounded hover:bg-[var(--color-gold-dim)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
                            title="تعديل"
                            onClick={e => handleOpenEditModal(e, product)}
                          >
                            <PencilSimple size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded hover:bg-[var(--color-error-dim)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                            title="حذف"
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
              عرض {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)} من {total}
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

      {/* ══════════════════════════════════════════════════════════════════
          Product Add/Edit Modal — preserved original logic exactly
          ══════════════════════════════════════════════════════════════════ */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleFormSubmit}
            className="glass-card w-full max-w-2xl p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 max-h-[90vh] overflow-y-auto bg-[var(--color-bg-surface)] text-white"
          >
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                {formProductId ? 'تعديل بيانات العطر' : 'إضافة عطر جديد'}
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
                  <label className="form-label text-white">الاسم بالعربي (مطلوب)</label>
                  <input type="text" className="form-input text-white bg-black/30" value={nameAr} onChange={e => setNameAr(e.target.value)} placeholder="مثال: مسك الفانيليا" required />
                </div>
                <div>
                  <label className="form-label">الاسم بالإنجليزي (اختياري)</label>
                  <input type="text" className="form-input text-left text-white bg-black/30" dir="ltr" value={nameEn} onChange={e => setNameEn(e.target.value)} onBlur={generateSlug} placeholder="e.g. Vanilla Musk" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">رقم SKU</label>
                  <input type="text" className="form-input text-left font-mono text-white bg-black/30" dir="ltr" value={sku} onChange={e => setSku(e.target.value)} placeholder="يولد تلقائياً" />
                </div>
                <div>
                  <label className="form-label">الرابط Slug</label>
                  <input type="text" className="form-input text-left font-mono text-white bg-black/30" dir="ltr" value={slug} onChange={e => setSlug(e.target.value)} placeholder="vanilla-musk" />
                </div>
                <div>
                  <label className="form-label">مستوحى من (اختياري)</label>
                  <input type="text" className="form-input text-white bg-black/30" value={inspiredBy} onChange={e => setInspiredBy(e.target.value)} placeholder="مثال: Creed Aventus" />
                </div>
              </div>

              {/* Categorization */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">القسم (مطلوب)</label>
                  <select className="form-select text-white bg-black/30" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                    <option value="" className="bg-[var(--color-bg-surface)]">-- اختر القسم --</option>
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-[var(--color-bg-surface)]">{c.name_ar}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">الجنس المستهدف</label>
                  <select className="form-select text-white bg-black/30" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="unisex" className="bg-[var(--color-bg-surface)]">للجنسين</option>
                    <option value="male" className="bg-[var(--color-bg-surface)]">رجالي</option>
                    <option value="female" className="bg-[var(--color-bg-surface)]">نسائي</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">الموسم</label>
                  <select className="form-select text-white bg-black/30" value={season} onChange={e => setSeason(e.target.value)}>
                    <option value="all" className="bg-[var(--color-bg-surface)]">كل المواسم</option>
                    <option value="winter" className="bg-[var(--color-bg-surface)]">شتوي</option>
                    <option value="summer" className="bg-[var(--color-bg-surface)]">صيفي</option>
                    <option value="spring" className="bg-[var(--color-bg-surface)]">ربيعي</option>
                    <option value="autumn" className="bg-[var(--color-bg-surface)]">خريفي</option>
                  </select>
                </div>
              </div>

              {/* Image */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <ImageUpload label="صورة المنتج" value={imageFilename} onChange={setImageFilename} />
              </div>

              {/* Variants */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="form-label !mb-0 text-white font-bold">الأحجام والأسعار والمخزون</label>
                  <LuxuryButton type="button" variant="secondary" className="!py-1 px-3 text-xs"
                    onClick={() => setVariants([...variants, { volume: '', price: '', stock: '0' }])}>
                    + إضافة حجم
                  </LuxuryButton>
                </div>
                <div className="space-y-3">
                  {variants.map((v, i) => (
                    <div key={i} className="flex items-end gap-3 p-3 rounded-lg border border-[var(--color-border-subtle)] bg-black/20">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">الحجم (مل)</label>
                          <input type="text" className="form-input py-1.5 text-white bg-black/30" placeholder="100" value={v.volume}
                            onChange={e => { const n = [...variants]; n[i].volume = e.target.value; setVariants(n); }} required />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">السعر (JOD)</label>
                          <input type="number" step="0.001" className="form-input py-1.5 text-white bg-black/30" placeholder="0.000" value={v.price}
                            onChange={e => { const n = [...variants]; n[i].price = e.target.value; setVariants(n); }} required />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">المخزون</label>
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
                  <label className="form-label">حد تنبيه انخفاض المخزون</label>
                  <input type="number" className="form-input text-white bg-black/30" value={lowStockThreshold} onChange={e => setLowStockThreshold(e.target.value)} />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">وصف قصير بالعربي</label>
                  <textarea className="form-input h-20 resize-none text-white bg-black/30" value={shortDescriptionAr} onChange={e => setShortDescriptionAr(e.target.value)} placeholder="نبذة مختصرة..." />
                </div>
                <div>
                  <label className="form-label">الوصف القصير بالإنجليزي</label>
                  <textarea className="form-input h-20 resize-none text-left text-white bg-black/30" dir="ltr" value={shortDescriptionEn} onChange={e => setShortDescriptionEn(e.target.value)} placeholder="A brief summary..." />
                </div>
              </div>

              {/* Visibility */}
              <div className="flex gap-6 border-t border-[var(--color-border)] pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={visibleOnWebsite} onChange={e => setVisibleOnWebsite(e.target.checked)} className="rounded" />
                  <span className="text-sm font-semibold">عرض على واجهة المتجر</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={featuredOnFrontend} onChange={e => setFeaturedOnFrontend(e.target.checked)} className="rounded" />
                  <span className="text-sm font-semibold">تمييز المنتج في الصفحة الرئيسية</span>
                </label>
              </div>
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
              <LuxuryButton variant="secondary" className="px-4 py-2 text-sm" onClick={() => setIsFormOpen(false)} type="button">
                إلغاء
              </LuxuryButton>
              <LuxuryButton type="submit" variant="primary" className="px-4 py-2 text-sm" disabled={formSaving}>
                {formSaving ? 'جارٍ الحفظ...' : 'حفظ المنتج'}
              </LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
