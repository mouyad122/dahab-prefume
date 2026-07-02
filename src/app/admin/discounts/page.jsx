'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash, CheckCircle, Percent, X } from '@phosphor-icons/react';

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form fields
  const [selectedProductId, setSelectedProductId] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [labelAr, setLabelAr] = useState('');
  const [labelEn, setLabelEn] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');

  useEffect(() => {
    fetchDiscounts();
    fetchProducts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const res = await fetch('/api/discounts');
      if (res.ok) {
        const data = await res.json();
        setDiscounts(data.discounts || []);
      }
    } catch (e) {
      console.error('Failed to fetch discounts');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?limit=200');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error('Failed to fetch products');
    }
  };

  const formatJOD = (fils) => `${(fils / 1000).toFixed(3)} JOD`;

  const handleAddDiscount = async (e) => {
    e.preventDefault();
    if (!selectedProductId || !discountValue) return;

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    // Get original price (100ml or general)
    const originalPrice = product.price_100ml_fils || product.price_50ml_fils || product.price_200ml_fils || 0;

    const payload = {
      productId: selectedProductId,
      discount_type: discountType,
      discount_value: parseFloat(discountValue),
      original_price: originalPrice,
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
      label_ar: labelAr || null,
      label_en: labelEn || null
    };

    try {
      const res = await fetch('/api/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        // Reset form
        setSelectedProductId('');
        setDiscountValue('');
        setLabelAr('');
        setLabelEn('');
        setStartsAt('');
        setEndsAt('');
        fetchDiscounts();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save discount');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleDeleteDiscount = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الخصم؟')) return;
    try {
      const res = await fetch(`/api/discounts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDiscounts();
      }
    } catch (e) {
      console.error('Failed to delete discount');
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full dir-ar">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            العروض والخصومات
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            إدارة عروض الخصم ونسب التخفيض المؤقتة على العطور
          </p>
        </div>
        <button 
          className="btn-primary text-sm flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          <span>خصم جديد</span>
        </button>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : discounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <Percent size={48} className="mb-4 text-[var(--color-gold)]" weight="thin" />
              <p>لا توجد خصومات فعالة حالياً</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-5 font-normal">المنتج</th>
                  <th className="py-3 px-5 font-normal">نوع الخصم</th>
                  <th className="py-3 px-5 font-normal text-center">القيمة</th>
                  <th className="py-3 px-5 font-normal">السعر الأصلي</th>
                  <th className="py-3 px-5 font-normal">السعر بعد الخصم</th>
                  <th className="py-3 px-5 font-normal">الفترة</th>
                  <th className="py-3 px-5 font-normal w-24">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {discounts.map(disc => (
                  <tr key={disc.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                    <td className="py-3 px-5">
                      <div className="font-bold text-[var(--color-text-primary)]">{disc.product?.name_ar}</div>
                      <div className="text-xs text-[var(--color-text-muted)] font-mono">{disc.product?.sku}</div>
                    </td>
                    <td className="py-3 px-5">
                      <span className="badge-gold">
                        {disc.discount_type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center font-bold">
                      {disc.discount_type === 'percentage' ? `%${disc.discount_value}` : `${disc.discount_value} JOD`}
                    </td>
                    <td className="py-3 px-5 font-mono text-[var(--color-text-muted)] line-through">
                      {formatJOD(disc.original_price)}
                    </td>
                    <td className="py-3 px-5 font-mono text-[#5ddb85] font-bold">
                      {formatJOD(disc.discounted_price)}
                    </td>
                    <td className="py-3 px-5 text-xs text-[var(--color-text-secondary)]">
                      {disc.starts_at ? new Date(disc.starts_at).toLocaleDateString('ar-JO') : 'فوراً'} 
                      {' - '}
                      {disc.ends_at ? new Date(disc.ends_at).toLocaleDateString('ar-JO') : 'مفتوح'}
                    </td>
                    <td className="py-3 px-5">
                      <button 
                        className="text-red-400 hover:text-red-500 p-1"
                        onClick={() => handleDeleteDiscount(disc.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Discount Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleAddDiscount} className="glass-card w-full max-w-lg p-6 border border-[var(--color-border-strong)] flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">إضافة خصم جديد</h2>
              <button type="button" className="text-[var(--color-text-muted)] hover:text-white" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="form-label">المنتج</label>
                <select 
                  className="form-select" 
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  required
                >
                  <option value="">-- اختر المنتج --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name_ar} ({formatJOD(p.price_100ml_fils || p.price_50ml_fils || p.price_200ml_fils || 0)})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">نوع الخصم</label>
                  <select 
                    className="form-select"
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value)}
                  >
                    <option value="percentage">نسبة مئوية (%)</option>
                    <option value="fixed">مبلغ ثابت (JOD)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">قيمة الخصم</label>
                  <input 
                    type="number" 
                    step="any"
                    className="form-input" 
                    placeholder={discountType === 'percentage' ? '15' : '2.500'}
                    value={discountValue}
                    onChange={e => setDiscountValue(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">تاريخ البدء (اختياري)</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={startsAt}
                    onChange={e => setStartsAt(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">تاريخ الانتهاء (اختياري)</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={endsAt}
                    onChange={e => setEndsAt(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">الملصق بالعربي (اختياري)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="عرض الصيف"
                    value={labelAr}
                    onChange={e => setLabelAr(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Label (EN - Optional)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Summer Sale"
                    value={labelEn}
                    onChange={e => setLabelEn(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
              <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setIsModalOpen(false)}>إلغاء</button>
              <button type="submit" className="btn-primary px-4 py-2 text-sm">حفظ الخصم</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
