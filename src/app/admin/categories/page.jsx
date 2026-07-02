'use client';

import React, { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash, X, ArrowUpRight, Eye, Sparkle, Tag } from '@phosphor-icons/react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    slug: '',
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    image: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error('Failed to fetch categories', e);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      name_ar: '',
      name_en: '',
      description_ar: '',
      description_en: '',
      image: '',
      display_order: 0,
      is_active: true
    });
    setEditCategoryId(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setFormData({
      slug: category.slug || '',
      name_ar: category.name_ar || '',
      name_en: category.name_en || '',
      description_ar: category.description_ar || '',
      description_en: category.description_en || '',
      image: category.image || '',
      display_order: category.display_order || 0,
      is_active: category.is_active !== false
    });
    setEditCategoryId(category.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه المجموعة؟ (لن يتم حذف المنتجات المرتبطة بها)')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleteProducts: false })
      });
      if (res.ok) {
        fetchCategories();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete category');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editCategoryId ? `/api/categories/${editCategoryId}` : '/api/categories';
      const method = editCategoryId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save category');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full relative dir-ar">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة المجموعات والخلطات (Collections Management)
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            إدارة كاملة للمجموعات العطرية وإعداداتها وروابطها والصور الخاصة بها
          </p>
        </div>
        <button onClick={handleAddNew} className="btn-primary text-sm flex items-center gap-2">
          <Plus size={16} />
          <span>إضافة مجموعة جديدة</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)] font-bold">إجمالي المجموعات</span>
          <span className="text-xl font-mono font-bold text-[var(--color-gold-light)]">{categories.length}</span>
        </div>
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)] font-bold">المجموعات المفعلة</span>
          <span className="text-xl font-mono font-bold text-emerald-400">{categories.filter(c => c.is_active).length}</span>
        </div>
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)] font-bold">المجموعة الخاصة</span>
          <a href="/collections/private-collection" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-gold)] font-bold flex items-center gap-1 hover:underline">
            <span>اختبار الرابط</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا توجد مجموعات مضافة بعد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(category => (
                <div key={category.id} className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-gold)] transition-colors flex flex-col gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-black/40 overflow-hidden border border-[var(--color-border-subtle)] shrink-0">
                      {category.image ? (
                        <img src={category.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[0.6rem] text-[var(--color-text-muted)]">بدون صورة</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1 truncate">{category.name_ar}</h3>
                      <div className="text-xs text-[var(--color-text-muted)] font-mono truncate">/collections/{category.slug}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-[var(--color-gold-light)] font-bold">
                          {category._count?.products || 0} منتج
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${category.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {category.is_active ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-3 mt-1">
                    <a 
                      href={`/collections/${category.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[var(--color-gold)] hover:text-[var(--color-gold-pale)] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye size={15} />
                      <span>معاينة المجموعة</span>
                      <ArrowUpRight size={13} />
                    </a>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(category)} className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] p-1.5 bg-[var(--color-bg-primary)] rounded transition-colors" title="تعديل">
                        <PencilSimple size={16} />
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="text-[var(--color-text-muted)] hover:text-red-400 p-1.5 bg-[var(--color-bg-primary)] rounded transition-colors" title="حذف">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                {editCategoryId ? 'تعديل المجموعة' : 'إضافة مجموعة جديدة'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              <form id="categoryForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">الاسم (عربي)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.name_ar}
                      onChange={e => setFormData({...formData, name_ar: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">الاسم (انجليزي)</label>
                    <input 
                      type="text" 
                      className="form-input text-left" 
                      dir="ltr"
                      value={formData.name_en}
                      onChange={e => setFormData({...formData, name_en: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="form-label">الرابط اللطيف (Slug)</label>
                  <input 
                    type="text" 
                    className="form-input text-left font-mono text-sm" 
                    dir="ltr"
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    placeholder="e.g. signature-collection"
                    required
                  />
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">يجب أن يكون باللغة الانجليزية وبدون مسافات (استخدم - بدلاً من المسافة)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">الوصف (عربي)</label>
                    <textarea 
                      className="form-input min-h-[80px]" 
                      value={formData.description_ar}
                      onChange={e => setFormData({...formData, description_ar: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="form-label">الوصف (انجليزي)</label>
                    <textarea 
                      className="form-input text-left min-h-[80px]" 
                      dir="ltr"
                      value={formData.description_en}
                      onChange={e => setFormData({...formData, description_en: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">رابط الصورة (URL)</label>
                  <input 
                    type="url" 
                    className="form-input text-left" 
                    dir="ltr"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">ترتيب العرض</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={formData.display_order}
                      onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={e => setFormData({...formData, is_active: e.target.checked})}
                        className="rounded border-[var(--color-border)] text-[var(--color-gold)]"
                      />
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">مفعل (يظهر في المتجر)</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                إلغاء
              </button>
              <button type="submit" form="categoryForm" className="btn-primary">
                حفظ المجموعة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
