'use client';

import React, { useEffect, useState } from 'react';
import { Warning, Funnel, ArrowCounterClockwise, MagnifyingGlass, X, CheckCircle, DownloadSimple, Plus, Minus } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Bulk Edit State
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkStock, setBulkStock] = useState('');
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

  // Edit Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [newStock, setNewStock] = useState('');
  const [lowThreshold, setLowThreshold] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Movements Audit Log Modal State
  const [isMovementsModalOpen, setIsMovementsModalOpen] = useState(false);
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?limit=200');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  const handleSelectAll = (e, filteredArray) => {
    if (e.target.checked) {
      setSelectedProducts(filteredArray.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!bulkStock) { alert('الرجاء إدخال الكمية الجديدة'); return; }
    if (!confirm(`هل أنت متأكد من تحديث ${selectedProducts.length} منتجات؟`)) return;
    
    setBulkSubmitting(true);
    let successCount = 0;
    
    for (const pId of selectedProducts) {
      const product = products.find(p => p.id === pId);
      if (!product || !product.variants || product.variants.length === 0) continue;
      
      try {
        const res = await fetch('/api/admin/inventory/adjust', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            variantId: product.variants[0].id,
            newStock: parseInt(bulkStock, 10),
            lowStockThreshold: product.low_stock_threshold || 5,
            reason: 'تحديث جماعي'
          })
        });
        if (res.ok) successCount++;
      } catch (err) {}
    }
    
    alert(`تم التحديث بنجاح: ${successCount} منتج`);
    setBulkSubmitting(false);
    setSelectedProducts([]);
    setBulkStock('');
    fetchInventory();
  };

  const fetchMovements = async () => {
    setLoadingMovements(true);
    try {
      const res = await fetch('/api/admin/inventory/movements');
      if (res.ok) {
        const data = await res.json();
        setMovements(data.movements || []);
      }
    } catch (e) {
      console.error('Failed to fetch movements');
    } finally {
      setLoadingMovements(false);
    }
  };

  const handleQuickStockAdjust = async (product, delta) => {
    const firstVariant = product.variants?.[0];
    if (!firstVariant) return;

    const newQty = Math.max(0, firstVariant.stock + delta);
    try {
      const res = await fetch('/api/admin/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          variantId: firstVariant.id,
          newStock: newQty,
          lowStockThreshold: product.low_stock_threshold || 5,
          reason: delta > 0 ? 'زيادة سريعة من جدول المخزون' : 'تخفيض سريع من جدول المخزون'
        })
      });

      if (res.ok) {
        fetchInventory();
      } else {
        const data = await res.json();
        alert(data.error || 'فشل تعديل المخزون');
      }
    } catch (e) {
      alert('حدث خطأ أثناء التعديل السريع');
    }
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    const firstVariant = product.variants?.[0];
    setSelectedVariantId(firstVariant?.id || '');
    setNewStock(firstVariant ? String(firstVariant.stock) : '0');
    setLowThreshold(String(product.low_stock_threshold || 5));
    setReason('');
  };

  const handleVariantSelectChange = (variantId) => {
    setSelectedVariantId(variantId);
    const variant = selectedProduct?.variants?.find(v => v.id === variantId);
    if (variant) {
      setNewStock(String(variant.stock));
    }
  };

  const handleSaveAdjustment = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('يرجى كتابة سبب التعديل بشكل واضح');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          variantId: selectedVariantId,
          newStock: parseInt(newStock, 10),
          lowStockThreshold: parseInt(lowThreshold, 10),
          reason: reason
        })
      });

      if (res.ok) {
        setSelectedProduct(null);
        fetchInventory();
      } else {
        const data = await res.json();
        alert(data.error || 'فشل تعديل المخزون');
      }
    } catch (e) {
      alert('حدث خطأ أثناء تعديل المخزون');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['اسم المنتج', 'SKU', 'حد النواقص', 'إجمالي الكمية', 'الحالة'];
    const rows = filtered.map(p => {
      const totalStock = (p.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
      const lowThresh = p.low_stock_threshold || 5;
      const status = totalStock === 0 ? 'نافذ' : totalStock <= lowThresh ? 'منخفض' : 'متوفر';
      return [p.name_ar, p.sku, lowThresh, totalStock, status];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventory_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase();
    const name = `${p.name_ar || ''} ${p.sku || ''}`.toLowerCase();
    const matchesSearch = !q || name.includes(q);
    
    const totalStock = (p.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
    const lowThresh = p.low_stock_threshold || 5;
    const matchesLowStock = !showLowStockOnly || totalStock <= lowThresh;

    return matchesSearch && matchesLowStock;
  });

  const selectedVariantObj = selectedProduct?.variants?.find(v => v.id === selectedVariantId);
  const currentStockVal = selectedVariantObj ? selectedVariantObj.stock : 0;
  const newStockNum = parseInt(newStock || '0', 10);
  const diffVal = newStockNum - currentStockVal;

  return (
    <div className="flex flex-col gap-6 h-full dir-ar">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة المخزون والتكميل
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            مراقبة كميات العطور والتعديل المباشر الموثق على مخزون المعرض والمتجر
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LuxuryButton 
            variant="secondary" 
            className="text-sm flex items-center gap-2" 
            iconLeft={ArrowCounterClockwise}
            onClick={() => {
              fetchMovements();
              setIsMovementsModalOpen(true);
            }}
          >
            سجل حركات المخزون
          </LuxuryButton>
          <LuxuryButton 
            variant="outline" 
            className="text-sm flex items-center gap-2" 
            iconLeft={DownloadSimple}
            onClick={handleExportCSV}
          >
            تصدير
          </LuxuryButton>
        </div>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <MagnifyingGlass size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              className="form-input pr-10 text-sm font-mono" 
              placeholder="ابحث بالاسم أو SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <LuxuryButton 
              variant={showLowStockOnly ? "primary" : "secondary"} 
              className="!py-2 px-4 text-sm flex-1 justify-center" 
              iconLeft={Funnel}
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            >
              {showLowStockOnly ? 'عرض الكل' : 'تصفية النواقص فقط'}
            </LuxuryButton>
            <LuxuryButton
              variant="outline"
              className="!py-2 px-4 text-sm"
              onClick={fetchInventory}
            >
              تحديث
            </LuxuryButton>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {selectedProducts.length > 0 && (
            <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] p-3 flex items-center justify-between">
              <div className="text-sm font-bold text-[var(--color-gold-light)]">
                تم تحديد {selectedProducts.length} منتج
              </div>
              <form onSubmit={handleBulkSubmit} className="flex items-center gap-2">
                <input
                  type="number"
                  className="form-input text-xs py-1.5 w-24"
                  placeholder="الكمية"
                  value={bulkStock}
                  onChange={e => setBulkStock(e.target.value)}
                  min="0"
                  required
                />
                <LuxuryButton type="submit" variant="primary" className="!py-1.5 px-3 text-xs" loading={bulkSubmitting}>
                  تحديث الكل
                </LuxuryButton>
                <LuxuryButton type="button" variant="ghost" className="!py-1.5 px-3 text-xs" onClick={() => setSelectedProducts([])}>
                  إلغاء
                </LuxuryButton>
              </form>
            </div>
          )}
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا توجد منتجات مطابقة للخيارات المحددة</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="py-3 px-4 font-normal w-10 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-[var(--color-border-subtle)] bg-transparent focus:ring-[var(--color-gold)]"
                      checked={filtered.length > 0 && selectedProducts.length === filtered.length}
                      onChange={(e) => handleSelectAll(e, filtered)}
                    />
                  </th>
                  <th className="py-3 px-5 font-normal">المنتج</th>
                  <th className="py-3 px-5 font-normal">SKU</th>
                  <th className="py-3 px-5 font-normal text-center">الكمية المتوفرة (تعديل سريع)</th>
                  <th className="py-3 px-5 font-normal text-center">حد النواقص</th>
                  <th className="py-3 px-5 font-normal">الحالة</th>
                  <th className="py-3 px-5 font-normal w-24">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filtered.map(product => {
                  const totalStock = (product.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
                  const lowThresh = product.low_stock_threshold || 5;
                  const isLow = totalStock <= lowThresh && totalStock > 0;
                  const isOut = totalStock <= 0;
                  
                  return (
                    <tr key={product.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                      <td className="py-3 px-4 text-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-[var(--color-border-subtle)] bg-transparent focus:ring-[var(--color-gold)]"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                      </td>
                      <td className="py-3 px-5">
                        <div className="font-bold text-[var(--color-text-primary)]">{product.name_ar}</div>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                          {(product.variants || []).map(v => `${v.volume}ml: ${v.stock} حبة`).join(' | ')}
                        </div>
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-[var(--color-text-secondary)]">
                        {product.sku}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickStockAdjust(product, -1)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center font-bold text-sm border border-red-500/20 active:scale-95 transition-all cursor-pointer"
                            title="إنقاص الكمية (-1)"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={`font-mono font-bold text-base px-2 min-w-[32px] text-center ${isOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-[#5ddb85]'}`}>
                            {totalStock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuickStockAdjust(product, 1)}
                            className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center font-bold text-sm border border-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                            title="زيادة الكمية (+1)"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-center text-[var(--color-text-muted)] font-mono">
                        {lowThresh}
                      </td>
                      <td className="py-3 px-5">
                        {isOut ? (
                          <div className="flex items-center gap-1 text-xs text-red-400 font-bold"><Warning size={14} /> نافذ</div>
                        ) : isLow ? (
                          <div className="flex items-center gap-1 text-xs text-amber-400 font-bold"><Warning size={14} /> قارب على النفاذ</div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-[#5ddb85] font-bold"><CheckCircle size={14} /> متوفر</div>
                        )}
                      </td>
                      <td className="py-3 px-5">
                        <LuxuryButton 
                          variant="secondary" 
                          className="!py-1 px-3 text-xs"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          تعديل تفصيلي
                        </LuxuryButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Adjustment Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSaveAdjustment} className="glass-card w-full max-w-md p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 text-white">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-lg font-bold text-[var(--color-gold-light)]">
                تعديل مخزون: {selectedProduct.name_ar}
              </h2>
              <LuxuryButton variant="icon" className="!p-1 text-gray-400 hover:text-white border-none rounded-full" onClick={() => setSelectedProduct(null)}>
                <X size={20} />
              </LuxuryButton>
            </div>

            <div className="space-y-4 text-xs">
              {selectedProduct.variants && selectedProduct.variants.length > 1 && (
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">اختر الحجم المراد تعديله</label>
                  <select 
                    className="form-select w-full bg-[#121216]"
                    value={selectedVariantId}
                    onChange={e => handleVariantSelectChange(e.target.value)}
                  >
                    {selectedProduct.variants.map(v => (
                      <option key={v.id} value={v.id}>
                        حجم {v.volume} مل (المخزون الحالي: {v.stock})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-black/40 border border-white/10">
                <div>
                  <span className="text-gray-400 block">الكمية الحالية:</span>
                  <span className="text-base font-bold font-mono text-white">{currentStockVal}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">الفارق:</span>
                  <span className={`text-base font-bold font-mono ${diffVal > 0 ? 'text-[#5ddb85]' : diffVal < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                    {diffVal > 0 ? `+${diffVal}` : diffVal}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">الكمية الجديدة *</label>
                <input 
                  type="number"
                  min="0"
                  className="form-input w-full font-mono"
                  value={newStock}
                  onChange={e => setNewStock(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">حد النواقص (التنبيه)</label>
                <input 
                  type="number"
                  min="1"
                  className="form-input w-full font-mono"
                  value={lowThreshold}
                  onChange={e => setLowThreshold(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">سبب التعديل (مطلوب للتوثيق) *</label>
                <textarea
                  rows={2}
                  className="form-input w-full text-xs resize-none"
                  placeholder="مثال: جرد سنوي، بضاعة جديدة، تالف..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
              <LuxuryButton variant="secondary" className="px-4 py-2 text-xs" onClick={() => setSelectedProduct(null)}>إلغاء</LuxuryButton>
              <LuxuryButton type="submit" variant="primary" className="px-4 py-2 text-xs" loading={submitting}>حفظ وتوثيق الحركة</LuxuryButton>
            </div>
          </form>
        </div>
      )}

      {/* Movements Audit Modal */}
      {isMovementsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-3xl p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 text-white max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-lg font-bold text-[var(--color-gold-light)] flex items-center gap-2">
                <ArrowCounterClockwise size={20} /> سجل حركة وتعديلات المخزون
              </h2>
              <LuxuryButton variant="icon" className="!p-1 text-gray-400 hover:text-white border-none rounded-full" onClick={() => setIsMovementsModalOpen(false)}>
                <X size={20} />
              </LuxuryButton>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingMovements ? (
                <div className="p-12 text-center text-gray-400">جاري تحميل السجل...</div>
              ) : movements.length === 0 ? (
                <div className="p-12 text-center text-gray-400">لا توجد حركات تعديل مخزون مسجلة.</div>
              ) : (
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#181820] text-gray-300 sticky top-0">
                    <tr>
                      <th className="p-3">المنتج</th>
                      <th className="p-3">التغيير</th>
                      <th className="p-3">السبب</th>
                      <th className="p-3">المعدّل</th>
                      <th className="p-3">التاريخ والوقت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {movements.map(m => (
                      <tr key={m.id} className="hover:bg-white/5">
                        <td className="p-3 font-bold text-white">
                          {m.product?.name_ar || 'منتج'}
                          <div className="text-[10px] text-gray-400 font-mono">{m.product?.sku}</div>
                        </td>
                        <td className="p-3 font-mono font-bold">
                          {m.old_quantity} ➔ {m.new_quantity} ({m.quantity_change > 0 ? `+${m.quantity_change}` : m.quantity_change})
                        </td>
                        <td className="p-3 text-gray-300">{m.reason}</td>
                        <td className="p-3 text-[var(--color-gold-light)] font-semibold">{m.adjusted_by}</td>
                        <td className="p-3 text-gray-400 font-mono text-[10px]">
                          {new Date(m.created_at).toLocaleString('ar-JO')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-[var(--color-border)]">
              <LuxuryButton variant="secondary" className="px-4 py-2 text-xs" onClick={() => setIsMovementsModalOpen(false)}>إغلاق</LuxuryButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
