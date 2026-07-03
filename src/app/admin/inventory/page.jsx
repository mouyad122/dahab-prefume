'use client';

import React, { useEffect, useState } from 'react';
import { Warning, Funnel, Plus, ArrowCounterClockwise, MagnifyingGlass } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filtered = products.filter(p => 
    p.name_ar?.includes(search) || 
    p.sku?.toLowerCase().includes(search.toLowerCase()) || 
    p.barcode?.includes(search)
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة المخزون
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            مراقبة كميات المنتجات والتعديل اليدوي على المخزون
          </p>
        </div>
        <LuxuryButton variant="secondary" className="text-sm flex items-center gap-2" iconLeft={ArrowCounterClockwise}>
          سجل حركات المخزون
        </LuxuryButton>
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
            <LuxuryButton variant="secondary" className="!py-2 px-4 text-sm flex-1 justify-center" iconLeft={Funnel}>
              تصفية (نواقص فقط)
            </LuxuryButton>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا توجد منتجات مطابقة للبحث</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="py-3 px-5 font-normal">المنتج</th>
                  <th className="py-3 px-5 font-normal">SKU</th>
                  <th className="py-3 px-5 font-normal text-center">الكمية المتوفرة</th>
                  <th className="py-3 px-5 font-normal text-center">حد النواقص</th>
                  <th className="py-3 px-5 font-normal">الحالة</th>
                  <th className="py-3 px-5 font-normal w-24">تعديل المخزون</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filtered.map(product => {
                  const isLow = product.stock <= (product.low_stock_threshold || 5);
                  const isOut = product.stock === 0;
                  
                  return (
                    <tr key={product.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                      <td className="py-3 px-5">
                        <div className="font-bold text-[var(--color-text-primary)]">{product.name_ar}</div>
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-[var(--color-text-secondary)]">
                        {product.sku}
                      </td>
                      <td className="py-3 px-5 text-center">
                        <span className={`font-mono font-bold text-lg ${isOut ? 'text-red-400' : isLow ? 'text-orange-400' : 'text-[#5ddb85]'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-center text-[var(--color-text-muted)] font-mono">
                        {product.low_stock_threshold || 5}
                      </td>
                      <td className="py-3 px-5">
                        {isOut ? (
                          <div className="flex items-center gap-1 text-xs text-red-400"><Warning size={14} /> نافذ</div>
                        ) : isLow ? (
                          <div className="flex items-center gap-1 text-xs text-orange-400"><Warning size={14} /> قارب على النفاذ</div>
                        ) : (
                          <span className="text-xs text-[#5ddb85]">متوفر</span>
                        )}
                      </td>
                      <td className="py-3 px-5">
                        <LuxuryButton variant="secondary" className="!py-1 px-3 text-xs" iconLeft={() => <Plus size={12} />}>
                          تعديل
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
    </div>
  );
}
