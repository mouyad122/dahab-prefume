'use client';

import React, { useEffect, useState } from 'react';
import {
  Funnel,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
  X,
  ImageSquare
} from '@phosphor-icons/react';

function formatJOD(fils) {
  const value = Number.isFinite(fils) ? fils : 0;
  return `${(value / 1000).toFixed(3)} JOD`;
}

function getProductPrice(product) {
  return product?.price_100ml_fils || product?.price_50ml_fils || product?.price_200ml_fils || 0;
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Product Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formProductId, setFormProductId] = useState(null);
  
  // Product Form Fields
  const [sku, setSku] = useState('');
  const [slug, setSlug] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [inspiredBy, setInspiredBy] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [gender, setGender] = useState('unisex');
  const [season, setSeason] = useState('all');
  const [stock, setStock] = useState('0');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [imageFilename, setImageFilename] = useState('');

  // Volume availability checkboxes
  const [has50ml, setHas50ml] = useState(false);
  const [has100ml, setHas100ml] = useState(true);
  const [has200ml, setHas200ml] = useState(false);

  // Price inputs
  const [price50ml, setPrice50ml] = useState('');
  const [price100ml, setPrice100ml] = useState('');
  const [price200ml, setPrice200ml] = useState('');

  const [shortDescriptionAr, setShortDescriptionAr] = useState('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState('');
  const [visibleOnWebsite, setVisibleOnWebsite] = useState(true);
  const [featuredOnFrontend, setFeaturedOnFrontend] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || data || []);
      }
    } catch (e) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?limit=100');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    return (
      product.name_ar?.includes(search) ||
      product.name_en?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query)
    );
  });

  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageFilename(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Product Add/Edit Form Actions
  const handleOpenAddModal = () => {
    setFormProductId(null);
    setSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setSlug('');
    setNameAr('');
    setNameEn('');
    setInspiredBy('');
    setCategoryId(categories[0]?.id || '');
    setGender('unisex');
    setSeason('all');
    setStock('0');
    setLowStockThreshold('5');
    setImageFilename('');
    
    setHas50ml(false);
    setHas100ml(true);
    setHas200ml(false);
    setPrice50ml('');
    setPrice100ml('');
    setPrice200ml('');

    setShortDescriptionAr('');
    setShortDescriptionEn('');
    setVisibleOnWebsite(true);
    setFeaturedOnFrontend(false);
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
    setCategoryId(product.categoryId || '');
    setGender(product.gender || 'unisex');
    setSeason(product.season || 'all');
    setStock(String(product.stock || 0));
    setLowStockThreshold(String(product.low_stock_threshold || 5));
    setImageFilename(product.image_filename || '');
    
    setHas50ml(!!product.price_50ml_fils);
    setHas100ml(!!product.price_100ml_fils);
    setHas200ml(!!product.price_200ml_fils);
    
    setPrice50ml(product.price_50ml_fils ? String(product.price_50ml_fils / 1000) : '');
    setPrice100ml(product.price_100ml_fils ? String(product.price_100ml_fils / 1000) : '');
    setPrice200ml(product.price_200ml_fils ? String(product.price_200ml_fils / 1000) : '');

    setShortDescriptionAr(product.short_description_ar || '');
    setShortDescriptionEn(product.short_description_en || '');
    setVisibleOnWebsite(product.visible_on_website !== false);
    setFeaturedOnFrontend(product.featured_on_frontend === true);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!nameAr) {
      alert('الرجاء تعبئة اسم المنتج بالعربي');
      return;
    }

    let finalSku = sku.trim();
    if (!finalSku) {
      finalSku = `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    let finalSlug = slug.trim();
    if (!finalSlug) {
      const seed = nameEn.trim() || nameAr.trim() || finalSku;
      finalSlug = seed.toLowerCase()
        .replace(/[^a-z0-9_]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const selectedCat = categories.find(c => c.id === categoryId);

    const payload = {
      sku: finalSku,
      slug: finalSlug,
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || null,
      inspired_by: inspiredBy.trim() || null,
      main_category: selectedCat ? selectedCat.slug : 'private',
      categoryId: categoryId || null,
      gender: gender,
      season: season,
      stock: parseInt(stock, 10) || 0,
      low_stock_threshold: parseInt(lowStockThreshold, 10) || 5,
      price_50ml_fils: has50ml && price50ml ? Math.round(parseFloat(price50ml) * 1000) : null,
      price_100ml_fils: has100ml && price100ml ? Math.round(parseFloat(price100ml) * 1000) : null,
      price_200ml_fils: has200ml && price200ml ? Math.round(parseFloat(price200ml) * 1000) : null,
      short_description_ar: shortDescriptionAr.trim() || null,
      short_description_en: shortDescriptionEn.trim() || null,
      image_filename: imageFilename.trim() || null,
      visible_on_website: visibleOnWebsite,
      featured_on_frontend: featuredOnFrontend
    };

    try {
      const url = formProductId ? `/api/products/${formProductId}` : '/api/products';
      const method = formProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsFormOpen(false);
        fetchProducts();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save product');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleDeleteProduct = async (e, id) => {
    e.stopPropagation();
    if (!confirm('هل أنت متأكد من إخفاء هذا المنتج من واجهة المتجر؟')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('حدث خطأ أثناء الحذف');
      }
    } catch (e) {
      console.error('Failed to delete product');
    }
  };

  const generateSlug = () => {
    if (!nameEn) return;
    setSlug(nameEn.toLowerCase().replace(/[^a-z0-9_]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  return (
    <div className="flex flex-col gap-6 h-full dir-ar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة المنتجات
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            إضافة وتعديل عطور المتجر ومتابعة الكميات والأسعار
          </p>
        </div>
        <button 
          className="btn-primary text-sm flex items-center gap-2"
          onClick={handleOpenAddModal}
        >
          <Plus size={16} />
          <span>إضافة عطر جديد</span>
        </button>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex flex-col overflow-hidden min-h-[520px] flex-1 bg-[var(--color-bg-surface)]">
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <MagnifyingGlass size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              className="form-input pr-10 text-sm"
              placeholder="ابحث برقم SKU أو اسم المنتج"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <button className="btn-secondary py-2 px-4 text-sm w-full sm:w-auto flex items-center gap-2 justify-center">
            <Funnel size={16} />
            <span>تصفية</span>
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا توجد منتجات مطابقة للبحث</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-5 font-bold w-16">الصورة</th>
                  <th className="py-3 px-5 font-bold">المنتج</th>
                  <th className="py-3 px-5 font-bold">الأحجام المتوفرة</th>
                  <th className="py-3 px-5 font-bold">السعر الرئيسي</th>
                  <th className="py-3 px-5 font-bold">المخزون</th>
                  <th className="py-3 px-5 font-bold w-24">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)] text-white">
                {filteredProducts.map((product) => {
                  const image = product.image_filename || '';
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-black/20 transition-colors"
                    >
                      <td className="py-3 px-5">
                        <div className="w-10 h-10 rounded border border-[var(--color-border-subtle)] overflow-hidden bg-black/40">
                          {image ? (
                            <img src={image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[0.6rem] text-[var(--color-text-muted)]">صورة</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="font-semibold text-white">{product.name_ar}</div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">{product.sku}</div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex gap-1.5 flex-wrap">
                          {product.price_50ml_fils && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]">50ml</span>}
                          {product.price_100ml_fils && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]">100ml</span>}
                          {product.price_200ml_fils && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]">200ml</span>}
                        </div>
                      </td>
                      <td className="py-3 px-5 font-mono text-[var(--color-gold-light)] font-bold">
                        {formatJOD(getProductPrice(product))}
                      </td>
                      <td className="py-3 px-5">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${product.stock <= 5 ? 'bg-red-500/10 text-red-500' : 'bg-[#5ddb85]/10 text-[#5ddb85]'}`}>
                          {product.stock} حبة
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] p-1 transition-colors" 
                            title="تعديل"
                            onClick={(e) => handleOpenEditModal(e, product)}
                          >
                            <PencilSimple size={18} />
                          </button>
                          <button 
                            className="text-[var(--color-text-muted)] hover:text-red-400 p-1 transition-colors" 
                            title="حذف"
                            onClick={(e) => handleDeleteProduct(e, product.id)}
                          >
                            <Trash size={18} />
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
      </div>

      {/* Product Add/Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleFormSubmit} className="glass-card w-full max-w-2xl p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 max-h-[90vh] overflow-y-auto bg-[var(--color-bg-surface)] text-white">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                {formProductId ? 'تعديل بيانات العطر' : 'إضافة عطر جديد'}
              </h2>
              <button type="button" className="text-[var(--color-text-muted)] hover:text-white" onClick={() => setIsFormOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-white">الاسم بالعربي (مطلوب)</label>
                  <input 
                    type="text" 
                    className="form-input text-white bg-black/30" 
                    value={nameAr}
                    onChange={e => setNameAr(e.target.value)}
                    placeholder="مثال: مسك الفانيليا"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">الاسم بالإنجليزي (اختياري)</label>
                  <input 
                    type="text" 
                    className="form-input text-left text-white bg-black/30" 
                    dir="ltr"
                    value={nameEn}
                    onChange={e => setNameEn(e.target.value)}
                    onBlur={generateSlug}
                    placeholder="e.g. Vanilla Musk"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">رقم SKU (اختياري - يولد تلقائياً)</label>
                  <input 
                    type="text" 
                    className="form-input text-left font-mono text-white bg-black/30" 
                    dir="ltr"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                    placeholder="يولد تلقائياً في حال تركه فارغاً"
                  />
                </div>
                <div>
                  <label className="form-label">الرابط الفرعي Slug (اختياري)</label>
                  <input 
                    type="text" 
                    className="form-input text-left font-mono text-white bg-black/30" 
                    dir="ltr"
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    placeholder="vanilla-musk"
                  />
                </div>
                <div>
                  <label className="form-label">مستوحى من عطر (اختياري)</label>
                  <input 
                    type="text" 
                    className="form-input text-white bg-black/30" 
                    value={inspiredBy}
                    onChange={e => setInspiredBy(e.target.value)}
                    placeholder="مثال: Creed Aventus"
                  />
                </div>
              </div>

              {/* Categorization & Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">القسم (مطلوب)</label>
                  <select 
                    className="form-select text-white bg-black/30"
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="" className="bg-[var(--color-bg-surface)]">-- اختر القسم --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id} className="bg-[var(--color-bg-surface)]">{c.name_ar}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">الجنس المستهدف (اختياري)</label>
                  <select 
                    className="form-select text-white bg-black/30"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  >
                    <option value="unisex" className="bg-[var(--color-bg-surface)]">للجنسين</option>
                    <option value="male" className="bg-[var(--color-bg-surface)]">رجالي</option>
                    <option value="female" className="bg-[var(--color-bg-surface)]">نسائي</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">الموسم الملائم (اختياري)</label>
                  <select 
                    className="form-select text-white bg-black/30"
                    value={season}
                    onChange={e => setSeason(e.target.value)}
                  >
                    <option value="all" className="bg-[var(--color-bg-surface)]">كل المواسم</option>
                    <option value="winter" className="bg-[var(--color-bg-surface)]">شتوي</option>
                    <option value="summer" className="bg-[var(--color-bg-surface)]">صيفي</option>
                    <option value="spring" className="bg-[var(--color-bg-surface)]">ربيعي</option>
                    <option value="autumn" className="bg-[var(--color-bg-surface)]">خريفي</option>
                  </select>
                </div>
              </div>

              {/* Product Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4">
                <div>
                  <label className="form-label">رابط صورة المنتج (URL)</label>
                  <input 
                    type="text" 
                    className="form-input text-white bg-black/30 text-left" 
                    dir="ltr"
                    value={imageFilename}
                    onChange={e => setImageFilename(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="form-label">أو ارفع صورة مباشرة</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="form-input py-1.5 text-white bg-black/30"
                    onChange={e => handleImageUpload(e.target.files?.[0])}
                  />
                </div>
              </div>

              {/* Price & Volumes Selection with Checkboxes */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <label className="form-label border-b border-[var(--color-border-subtle)] pb-2 mb-3 block">
                  الأحجام والأسعار المتوفرة
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Size 50ml */}
                  <div className="p-3 rounded-lg border border-[var(--color-border-subtle)] bg-black/20 flex flex-col gap-2">
                    <label className="flex items-center gap-2.5 cursor-pointer font-bold">
                      <input 
                        type="checkbox"
                        checked={has50ml}
                        onChange={e => setHas50ml(e.target.checked)}
                        className="rounded border-[var(--color-border)] text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      />
                      <span>حجم 50 مل</span>
                    </label>
                    {has50ml && (
                      <div className="mt-1">
                        <label className="text-xs text-[var(--color-text-muted)] mb-1 block">السعر (JOD)</label>
                        <input 
                          type="number" 
                          step="0.001"
                          className="form-input py-1 text-white bg-black/30" 
                          placeholder="0.000"
                          value={price50ml}
                          onChange={e => setPrice50ml(e.target.value)}
                          required={has50ml}
                        />
                      </div>
                    )}
                  </div>

                  {/* Size 100ml */}
                  <div className="p-3 rounded-lg border border-[var(--color-border-subtle)] bg-black/20 flex flex-col gap-2">
                    <label className="flex items-center gap-2.5 cursor-pointer font-bold">
                      <input 
                        type="checkbox"
                        checked={has100ml}
                        onChange={e => setHas100ml(e.target.checked)}
                        className="rounded border-[var(--color-border)] text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      />
                      <span>حجم 100 مل</span>
                    </label>
                    {has100ml && (
                      <div className="mt-1">
                        <label className="text-xs text-[var(--color-text-muted)] mb-1 block">السعر (JOD)</label>
                        <input 
                          type="number" 
                          step="0.001"
                          className="form-input py-1 text-white bg-black/30" 
                          placeholder="0.000"
                          value={price100ml}
                          onChange={e => setPrice100ml(e.target.value)}
                          required={has100ml}
                        />
                      </div>
                    )}
                  </div>

                  {/* Size 200ml */}
                  <div className="p-3 rounded-lg border border-[var(--color-border-subtle)] bg-black/20 flex flex-col gap-2">
                    <label className="flex items-center gap-2.5 cursor-pointer font-bold">
                      <input 
                        type="checkbox"
                        checked={has200ml}
                        onChange={e => setHas200ml(e.target.checked)}
                        className="rounded border-[var(--color-border)] text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      />
                      <span>حجم 200 مل</span>
                    </label>
                    {has200ml && (
                      <div className="mt-1">
                        <label className="text-xs text-[var(--color-text-muted)] mb-1 block">السعر (JOD)</label>
                        <input 
                          type="number" 
                          step="0.001"
                          className="form-input py-1 text-white bg-black/30" 
                          placeholder="0.000"
                          value={price200ml}
                          onChange={e => setPrice200ml(e.target.value)}
                          required={has200ml}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stock Management */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4">
                <div>
                  <label className="form-label">الكمية المتوفرة في المخزن (اختياري)</label>
                  <input 
                    type="number" 
                    className="form-input text-white bg-black/30" 
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">حد تنبيه انخفاض المخزون (اختياري)</label>
                  <input 
                    type="number" 
                    className="form-input text-white bg-black/30" 
                    value={lowStockThreshold}
                    onChange={e => setLowStockThreshold(e.target.value)}
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">وصف قصير بالعربي (اختياري)</label>
                  <textarea 
                    className="form-input h-20 resize-none text-white bg-black/30"
                    value={shortDescriptionAr}
                    onChange={e => setShortDescriptionAr(e.target.value)}
                    placeholder="نبذة مختصرة عن نوتات العطر وثباته..."
                  />
                </div>
                <div>
                  <label className="form-label">الوصف القصير بالإنجليزي (اختياري)</label>
                  <textarea 
                    className="form-input h-20 resize-none text-left text-white bg-black/30" 
                    dir="ltr"
                    value={shortDescriptionEn}
                    onChange={e => setShortDescriptionEn(e.target.value)}
                    placeholder="A brief summary of the fragrance..."
                  />
                </div>
              </div>

              {/* Frontend Visibility Switches */}
              <div className="flex gap-6 border-t border-[var(--color-border)] pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={visibleOnWebsite}
                    onChange={e => setVisibleOnWebsite(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                  <span className="text-sm font-semibold">عرض على واجهة المتجر</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={featuredOnFrontend}
                    onChange={e => setFeaturedOnFrontend(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                  <span className="text-sm font-semibold">تميز المنتج في الصفحة الرئيسية</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
              <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setIsFormOpen(false)}>إلغاء</button>
              <button type="submit" className="btn-primary px-4 py-2 text-sm">حفظ المنتج</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
