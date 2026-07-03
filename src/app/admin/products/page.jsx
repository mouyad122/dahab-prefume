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
import ImageUpload from '../../../components/admin/ImageUpload';
import LuxuryButton from '../../../components/ui/LuxuryButton';

function formatJOD(fils) {
  const value = Number.isFinite(fils) ? fils : 0;
  return `${(value / 1000).toFixed(3)} JOD`;
}

function getProductPrice(product) {
  if (product?.variants && product.variants.length > 0) {
    return product.variants[0].price;
  }
  return 0;
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
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [imageFilename, setImageFilename] = useState('');

  // Dynamic variants array: { volume, price, stock }
  const [variants, setVariants] = useState([{ volume: '100', price: '', stock: '0' }]);

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
    setLowStockThreshold('5');
    setImageFilename('');
    
    setVariants([{ volume: '100', price: '', stock: '0' }]);

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
    setLowStockThreshold(String(product.low_stock_threshold || 5));
    setImageFilename(product.image_filename || '');
    
    if (product.variants && product.variants.length > 0) {
      setVariants(product.variants.map(v => ({
        volume: v.volume,
        price: String(v.price / 1000),
        stock: String(v.stock)
      })));
    } else {
      setVariants([{ volume: '100', price: '', stock: '0' }]);
    }

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

    if (variants.length === 0) {
      alert('الرجاء إضافة حجم واحد على الأقل للمنتج');
      return;
    }

    for (const v of variants) {
      if (!v.volume || !v.price) {
        alert('الرجاء إدخال الحجم والسعر لجميع الأحجام المضافة');
        return;
      }
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
      low_stock_threshold: parseInt(lowStockThreshold, 10) || 5,
      variants: variants.map(v => ({
        volume: v.volume.trim(),
        price: Math.round(parseFloat(v.price) * 1000),
        stock: parseInt(v.stock, 10) || 0
      })),
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
        <LuxuryButton 
          variant="primary"
          className="text-sm flex items-center gap-2"
          onClick={handleOpenAddModal}
          iconLeft={Plus}
        >
          إضافة عطر جديد
        </LuxuryButton>
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
          <LuxuryButton variant="secondary" className="!py-2 px-4 text-sm w-full sm:w-auto justify-center" iconLeft={Funnel}>
            تصفية
          </LuxuryButton>
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
                          {(product.variants || []).map(v => (
                            <span key={v.id || v.volume} className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]">
                              {v.volume}ml
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-5 font-mono text-[var(--color-gold-light)] font-bold">
                        {formatJOD(getProductPrice(product))}
                      </td>
                      <td className="py-3 px-5">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          (product.variants || []).some(v => v.stock <= (product.low_stock_threshold || 5))
                            ? 'bg-red-500/10 text-red-500' 
                            : 'bg-[#5ddb85]/10 text-[#5ddb85]'
                        }`}>
                          {(product.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0)} حبة
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <LuxuryButton 
                            variant="icon"
                            className="!p-1 !w-auto !h-auto !min-h-0 !min-w-0 text-[var(--color-text-muted)] hover:!text-[var(--color-gold)] transition-colors border-none" 
                            title="تعديل"
                            onClick={(e) => handleOpenEditModal(e, product)}
                          >
                            <PencilSimple size={18} />
                          </LuxuryButton>
                          <LuxuryButton 
                            variant="icon"
                            className="!p-1 !w-auto !h-auto !min-h-0 !min-w-0 text-[var(--color-text-muted)] hover:!text-red-400 transition-colors border-none" 
                            title="حذف"
                            onClick={(e) => handleDeleteProduct(e, product.id)}
                          >
                            <Trash size={18} />
                          </LuxuryButton>
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
              <LuxuryButton variant="icon" className="!p-1 !w-auto !h-auto !min-h-0 !min-w-0 text-[var(--color-text-muted)] hover:!text-white border-none rounded-full" onClick={() => setIsFormOpen(false)}>
                <X size={20} />
              </LuxuryButton>
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
              <div className="border-t border-[var(--color-border)] pt-4">
                <ImageUpload
                  label="صورة المنتج"
                  value={imageFilename}
                  onChange={setImageFilename}
                />
              </div>

              {/* Dynamic Variants & Stock Management */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-2 mb-3">
                  <label className="form-label !mb-0 text-white font-bold">الأحجام، الأسعار، والمخزون</label>
                  <LuxuryButton
                    type="button"
                    variant="secondary"
                    className="!py-1 px-3 text-xs"
                    onClick={() => setVariants([...variants, { volume: '', price: '', stock: '0' }])}
                  >
                    + إضافة حجم جديد
                  </LuxuryButton>
                </div>
                
                <div className="space-y-3">
                  {variants.map((v, index) => (
                    <div key={index} className="flex items-end gap-3 p-3 rounded-lg border border-[var(--color-border-subtle)] bg-black/20">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">الحجم (مل)</label>
                          <input
                            type="text"
                            className="form-input py-1.5 text-white bg-black/30"
                            placeholder="مثال: 100"
                            value={v.volume}
                            onChange={e => {
                              const newVariants = [...variants];
                              newVariants[index].volume = e.target.value;
                              setVariants(newVariants);
                            }}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">السعر (JOD)</label>
                          <input
                            type="number"
                            step="0.001"
                            className="form-input py-1.5 text-white bg-black/30"
                            placeholder="0.000"
                            value={v.price}
                            onChange={e => {
                              const newVariants = [...variants];
                              newVariants[index].price = e.target.value;
                              setVariants(newVariants);
                            }}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">المخزون (الكمية)</label>
                          <input
                            type="number"
                            className="form-input py-1.5 text-white bg-black/30"
                            placeholder="0"
                            value={v.stock}
                            onChange={e => {
                              const newVariants = [...variants];
                              newVariants[index].stock = e.target.value;
                              setVariants(newVariants);
                            }}
                            required
                          />
                        </div>
                      </div>
                      
                      {variants.length > 1 && (
                        <LuxuryButton
                          type="button"
                          variant="danger"
                          className="!p-2.5 !w-10 !h-10 !min-h-0 !min-w-0"
                          onClick={() => setVariants(variants.filter((_, idx) => idx !== index))}
                        >
                          <Trash size={16} />
                        </LuxuryButton>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Threshold Warning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4">
                <div>
                  <label className="form-label">حد تنبيه انخفاض المخزون (موحد لجميع الأحجام)</label>
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
              <LuxuryButton variant="secondary" className="px-4 py-2 text-sm" onClick={() => setIsFormOpen(false)}>إلغاء</LuxuryButton>
              <LuxuryButton type="submit" variant="primary" className="px-4 py-2 text-sm">حفظ المنتج</LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
