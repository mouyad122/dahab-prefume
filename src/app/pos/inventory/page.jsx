'use client';

import React, { useState, useEffect } from 'react';
import { Warehouse, MagnifyingGlass, WarningCircle, CheckCircle } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function PosInventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?limit=150');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = search.trim().toLowerCase();
    const name = `${p.name_ar || ''} ${p.name_en || ''} ${p.sku || ''}`.toLowerCase();
    const matchesSearch = !q || name.includes(q);
    const totalStock = (p.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
    const lowThreshold = p.low_stock_threshold || 5;
    const matchesLowStock = !showLowStockOnly || totalStock <= lowThreshold;
    return matchesSearch && matchesLowStock;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto dir-ar text-white">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d]">
            <Warehouse size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-white">مخزون المنتجات (الكاشير)</h1>
            <p className="text-xs text-gray-400">متابعة الكميات المتاحة في المعرض وتحديد النواقص</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LuxuryButton
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            variant={showLowStockOnly ? 'warning' : 'outline'}
            size="sm"
            className="!text-xs font-semibold"
          >
            {showLowStockOnly ? 'عرض كل المنتجات' : 'تصفية النواقص فقط'}
          </LuxuryButton>

          <LuxuryButton onClick={fetchInventory} variant="outline" size="sm" className="!text-xs">
            تحديث
          </LuxuryButton>
        </div>
      </div>

      {/* Search toolbar */}
      <div className="mb-6 relative">
        <MagnifyingGlass size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث باسم العطر أو الـ SKU..."
          className="w-full bg-[#121216] border border-[#c5a25d]/20 rounded-xl pr-11 pl-4 py-3 text-xs text-white focus:border-[#c5a25d] focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-[#121216]/80 backdrop-blur-md border border-[#c5a25d]/20 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-xs">جاري تحميل البيانات...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs">لا توجد منتجات مطابقة للبحث.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#181820] text-gray-300 border-b border-white/10">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">الأحجام والمخزون</th>
                  <th className="p-4">إجمالي الكمية</th>
                  <th className="p-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((p) => {
                  const totalStock = (p.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
                  const lowThreshold = p.low_stock_threshold || 5;
                  const isLow = totalStock <= lowThreshold;
                  const isOutOfStock = totalStock <= 0;

                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white font-serif">{p.name_ar}</td>
                      <td className="p-4 font-mono text-gray-400">{p.sku}</td>
                      <td className="p-4 text-gray-300">
                        {(p.variants || []).map((v) => `${v.volume}ml: ${v.stock} حبة`).join(' | ')}
                      </td>
                      <td className="p-4 font-bold text-white">{totalStock}</td>
                      <td className="p-4">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold">
                            <WarningCircle size={13} /> نفد المخزون
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                            <WarningCircle size={13} /> منخفض ({totalStock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                            <CheckCircle size={13} /> متوفر
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
