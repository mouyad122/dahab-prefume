'use client';

import React, { useEffect, useState } from 'react';
import { Warning, Funnel, ArrowCounterClockwise, MagnifyingGlass, X, CheckCircle, DownloadSimple, Plus, Minus, Drop } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';
import { DEFAULT_LOW_STOCK_THRESHOLD_ML } from '../../../lib/inventory';

// Helper: format ml nicely (e.g. 1000ml → 1.00 لتر, 750ml → 750 مل)
function formatMl(ml) {
  if (ml == null) return '0 مل';
  if (ml >= 1000) return `${(ml / 1000).toFixed(2)} لتر`;
  return `${Math.round(ml)} مل`;
}

const QUICK_DELTA_OPTIONS = [100, 250, 500, 1000]; // ml

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Quick ml delta selector (per row)
  const [quickDelta, setQuickDelta] = useState(100); // ml

  // Bulk Edit State (ml-based)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAddMl, setBulkAddMl] = useState('');
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

  // Edit Modal State (ml-based)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newMlValue, setNewMlValue] = useState('');
  const [lowThreshold, setLowThreshold] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Movements Audit Log Modal State
  const [isMovementsModalOpen, setIsMovementsModalOpen] = useState(false);
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(false);

  useEffect(() => { fetchInventory(); }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?limit=500');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSelectAll = (e, filteredArray) => {
    if (e.target.checked) setSelectedProducts(filteredArray.map(p => p.id));
    else setSelectedProducts([]);
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  // Add ml to all selected products
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    const deltaNum = parseFloat(bulkAddMl);
    if (!deltaNum) { alert('الرجاء إدخال كمية الملل المراد إضافتها'); return; }
    if (!confirm(`هل أنت متأكد من إضافة ${formatMl(deltaNum)} لـ ${selectedProducts.length} منتج؟`)) return;

    setBulkSubmitting(true);
    let successCount = 0;
    for (const pId of selectedProducts) {
      try {
        const res = await fetch('/api/admin/inventory/adjust', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: pId,
            deltaMl: deltaNum,
            reason: `إضافة جماعية: +${formatMl(deltaNum)}`
          })
        });
        if (res.ok) successCount++;
      } catch {}
    }
    alert(`تم التحديث بنجاح: ${successCount} منتج`);
    setBulkSubmitting(false);
    setSelectedProducts([]);
    setBulkAddMl('');
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
    } catch (e) { console.error('Failed to fetch movements'); }
    finally { setLoadingMovements(false); }
  };

  // Quick +/- by quickDelta ml
  const handleQuickMlAdjust = async (product, sign) => {
    const delta = sign * quickDelta;
    try {
      const res = await fetch('/api/admin/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          deltaMl: delta,
          reason: delta > 0
            ? `إضافة سريعة +${formatMl(Math.abs(delta))}`
            : `خصم سريع -${formatMl(Math.abs(delta))}`
        })
      });
      if (res.ok) { fetchInventory(); }
      else { const d = await res.json(); alert(d.error || 'فشل تعديل المخزون'); }
    } catch { alert('حدث خطأ أثناء التعديل السريع'); }
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setNewMlValue(String(product.bulk_stock_ml || 0));
    setLowThreshold(String(product.low_stock_threshold || DEFAULT_LOW_STOCK_THRESHOLD_ML));
    setReason('');
  };

  const handleSaveAdjustment = async (e) => {
    e.preventDefault();
    if (!reason.trim()) { alert('يرجى كتابة سبب التعديل بشكل واضح'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          newBulkMl: parseFloat(newMlValue),
          lowStockThreshold: parseInt(lowThreshold, 10),
          reason
        })
      });
      if (res.ok) { setSelectedProduct(null); fetchInventory(); }
      else { const d = await res.json(); alert(d.error || 'فشل تعديل المخزون'); }
    } catch { alert('حدث خطأ أثناء تعديل المخزون'); }
    finally { setSubmitting(false); }
  };

  const handleExportCSV = () => {
    const headers = ['اسم المنتج', 'SKU', 'المخزون (مل)', 'المخزون (لتر)', 'الحالة'];
    const rows = filtered.map(p => {
      const ml = p.bulk_stock_ml || 0;
      const lowThresh = p.low_stock_threshold || DEFAULT_LOW_STOCK_THRESHOLD_ML;
      const status = ml === 0 ? 'نافذ' : ml <= lowThresh ? 'منخفض' : 'متوفر';
      return [p.name_ar, p.sku, ml, (ml / 1000).toFixed(3), status];
    });
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `inventory_ml_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase();
    const name = `${p.name_ar || ''} ${p.sku || ''}`.toLowerCase();
    const matchesSearch = !q || name.includes(q);
    const ml = p.bulk_stock_ml || 0;
    const lowThresh = p.low_stock_threshold || DEFAULT_LOW_STOCK_THRESHOLD_ML;
    const matchesLow = !showLowStockOnly || ml <= lowThresh;
    return matchesSearch && matchesLow;
  });

  const currentMlVal = parseFloat(selectedProduct?.bulk_stock_ml || 0);
  const newMlNum = parseFloat(newMlValue || '0');
  const diffMl = newMlNum - currentMlVal;

  return (
    <div className="flex flex-col gap-6 h-full dir-ar">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
            <Drop size={22} weight="fill" className="text-cyan-400" />
            إدارة المخزون بالملل
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            تتبع وتكميل مخزون العطور السائلة بالملل واللتر مع سجل كامل للحركات
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LuxuryButton
            variant="secondary"
            className="text-sm flex items-center gap-2"
            iconLeft={ArrowCounterClockwise}
            onClick={() => { fetchMovements(); setIsMovementsModalOpen(true); }}
          >
            سجل الحركات
          </LuxuryButton>
          <LuxuryButton
            variant="outline"
            className="text-sm flex items-center gap-2"
            iconLeft={DownloadSimple}
            onClick={handleExportCSV}
          >
            تصدير CSV
          </LuxuryButton>
        </div>
      </div>

      {/* Quick Delta Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-[var(--color-text-muted)] font-semibold">مقدار الإضافة/الخصم السريع:</span>
        {QUICK_DELTA_OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => setQuickDelta(opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
              quickDelta === opt
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-cyan-500/30'
            }`}
          >
            {formatMl(opt)}
          </button>
        ))}
        <div className="flex items-center gap-1">
          <input
            type="number"
            min="1"
            placeholder="مخصص..."
            className="form-input py-1 text-xs font-mono w-28"
            value={QUICK_DELTA_OPTIONS.includes(quickDelta) ? '' : quickDelta}
            onChange={e => setQuickDelta(parseFloat(e.target.value) || 100)}
          />
          <span className="text-xs text-gray-500">مل</span>
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
              variant={showLowStockOnly ? 'primary' : 'secondary'}
              className="!py-2 px-4 text-sm flex-1 justify-center"
              iconLeft={Funnel}
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            >
              {showLowStockOnly ? 'عرض الكل' : 'تصفية المنخفض فقط'}
            </LuxuryButton>
            <LuxuryButton variant="outline" className="!py-2 px-4 text-sm" onClick={fetchInventory}>
              تحديث
            </LuxuryButton>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">

          {/* Bulk action bar */}
          {selectedProducts.length > 0 && (
            <div className="bg-cyan-500/10 border-b border-cyan-500/20 p-3 flex items-center justify-between">
              <div className="text-sm font-bold text-cyan-300">
                تم تحديد {selectedProducts.length} منتج
              </div>
              <form onSubmit={handleBulkSubmit} className="flex items-center gap-2">
                <input
                  type="number"
                  className="form-input text-xs py-1.5 w-28 font-mono"
                  placeholder="مل مراد إضافتها"
                  value={bulkAddMl}
                  onChange={e => setBulkAddMl(e.target.value)}
                  min="1"
                  required
                />
                <span className="text-xs text-gray-400">مل</span>
                <LuxuryButton type="submit" variant="primary" className="!py-1.5 px-3 text-xs" loading={bulkSubmitting}>
                  إضافة للكل
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
              <p>لا توجد منتجات مطابقة</p>
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
                  <th className="py-3 px-5 font-normal text-center">
                    المخزون (مل) — تعديل سريع {quickDelta}مل
                  </th>
                  <th className="py-3 px-5 font-normal text-center">الحالة</th>
                  <th className="py-3 px-5 font-normal w-28">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filtered.map(product => {
                  const ml = product.bulk_stock_ml || 0;
                  const lowThresh = product.low_stock_threshold || DEFAULT_LOW_STOCK_THRESHOLD_ML;
                  const isLow = ml > 0 && ml <= lowThresh;
                  const isOut = ml <= 0;

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
                        <div className="text-[10px] text-cyan-400/70 mt-0.5 font-mono">
                          {(product.variants || []).map(v => `${v.volume}ml`).join(' | ')}
                        </div>
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-[var(--color-text-secondary)]">
                        {product.sku}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickMlAdjust(product, -1)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center font-bold text-sm border border-red-500/20 active:scale-95 transition-all cursor-pointer"
                            title={`خصم ${formatMl(quickDelta)}`}
                          >
                            <Minus size={14} />
                          </button>
                          <div className="text-center min-w-[72px]">
                            <div className={`font-mono font-bold text-sm ${isOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-cyan-300'}`}>
                              {formatMl(ml)}
                            </div>
                            {ml >= 1000 && (
                              <div className="text-[10px] text-gray-500 font-mono">{Math.round(ml)} مل</div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleQuickMlAdjust(product, 1)}
                            className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center font-bold text-sm border border-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                            title={`إضافة ${formatMl(quickDelta)}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-center">
                        {isOut ? (
                          <div className="flex items-center justify-center gap-1 text-xs text-red-400 font-bold"><Warning size={14} /> نافذ</div>
                        ) : isLow ? (
                          <div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-bold"><Warning size={14} /> منخفض</div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-xs text-[#5ddb85] font-bold"><CheckCircle size={14} /> متوفر</div>
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

      {/* Adjustment Modal (ml-based) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSaveAdjustment} className="glass-card w-full max-w-md p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 text-white">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Drop size={18} weight="fill" /> تعديل مخزون: {selectedProduct.name_ar}
              </h2>
              <LuxuryButton variant="icon" className="!p-1 text-gray-400 hover:text-white border-none rounded-full" onClick={() => setSelectedProduct(null)}>
                <X size={20} />
              </LuxuryButton>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-black/40 border border-white/10">
                <div>
                  <span className="text-gray-400 block mb-1">المخزون الحالي:</span>
                  <span className="text-base font-bold font-mono text-cyan-300">{formatMl(currentMlVal)}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">الفارق:</span>
                  <span className={`text-base font-bold font-mono ${diffMl > 0 ? 'text-[#5ddb85]' : diffMl < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                    {diffMl > 0 ? `+${formatMl(diffMl)}` : diffMl < 0 ? `-${formatMl(Math.abs(diffMl))}` : '—'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">الكمية الجديدة (بالمل) *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="form-input flex-1 font-mono"
                    value={newMlValue}
                    onChange={e => setNewMlValue(e.target.value)}
                    required
                  />
                  <span className="text-gray-400 text-sm">مل</span>
                </div>
                {newMlNum >= 1000 && (
                  <p className="text-cyan-400 text-[10px] mt-1 font-mono">{(newMlNum / 1000).toFixed(3)} لتر</p>
                )}
              </div>

              {/* Quick presets */}
              <div>
                <p className="text-gray-500 text-[10px] mb-1">ضبط سريع:</p>
                <div className="flex flex-wrap gap-1">
                  {[500, 1000, 2000, 5000].map(v => (
                    <button key={v} type="button"
                      onClick={() => setNewMlValue(String(v))}
                      className="px-2 py-1 text-[10px] font-mono bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-200 rounded border border-white/10 hover:border-cyan-500/30 transition-all"
                    >
                      {formatMl(v)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">حد تنبيه انخفاض المخزون (مل)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    className="form-input flex-1 font-mono"
                    value={lowThreshold}
                    onChange={e => setLowThreshold(e.target.value)}
                  />
                  <span className="text-gray-400 text-sm">مل</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">سبب التعديل (مطلوب للتوثيق) *</label>
                <textarea
                  rows={2}
                  className="form-input w-full text-xs resize-none"
                  placeholder="مثال: تعبئة من البرميل، جرد، تالف..."
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
                <ArrowCounterClockwise size={20} /> سجل حركات المخزون
              </h2>
              <LuxuryButton variant="icon" className="!p-1 text-gray-400 hover:text-white border-none rounded-full" onClick={() => setIsMovementsModalOpen(false)}>
                <X size={20} />
              </LuxuryButton>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loadingMovements ? (
                <div className="p-12 text-center text-gray-400">جاري تحميل السجل...</div>
              ) : movements.length === 0 ? (
                <div className="p-12 text-center text-gray-400">لا توجد حركات مخزون مسجلة.</div>
              ) : (
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#181820] text-gray-300 sticky top-0">
                    <tr>
                      <th className="p-3">المنتج</th>
                      <th className="p-3">التغيير (مل)</th>
                      <th className="p-3">السبب</th>
                      <th className="p-3">المعدّل</th>
                      <th className="p-3">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {movements.map(m => {
                      const change = m.quantity_change;
                      return (
                        <tr key={m.id} className="hover:bg-white/5">
                          <td className="p-3 font-bold text-white">
                            {m.product?.name_ar || 'منتج'}
                            <div className="text-[10px] text-gray-400 font-mono">{m.product?.sku}</div>
                          </td>
                          <td className="p-3 font-mono font-bold">
                            <span className="text-gray-400">{formatMl(m.old_quantity)}</span>
                            <span className="text-gray-500 mx-1">→</span>
                            <span className="text-white">{formatMl(m.new_quantity)}</span>
                            <span className={`mr-2 ${change > 0 ? 'text-[#5ddb85]' : 'text-red-400'}`}>
                              ({change > 0 ? '+' : ''}{Math.round(change)}مل)
                            </span>
                          </td>
                          <td className="p-3 text-gray-300">{m.reason}</td>
                          <td className="p-3 text-[var(--color-gold-light)] font-semibold">{m.adjusted_by}</td>
                          <td className="p-3 text-gray-400 font-mono text-[10px]">
                            {new Date(m.created_at).toLocaleString('ar-JO')}
                          </td>
                        </tr>
                      );
                    })}
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
