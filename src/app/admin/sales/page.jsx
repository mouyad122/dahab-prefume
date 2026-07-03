'use client';

import React, { useEffect, useState } from 'react';
import { DownloadSimple, MagnifyingGlass, Funnel, CalendarBlank, Eye } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sales?limit=100');
      if (res.ok) {
        const data = await res.json();
        setSales(data.sales || []);
      }
    } catch (e) {
      console.error('Failed to fetch sales');
    } finally {
      setLoading(false);
    }
  };

  const formatJOD = (fils) => `${(fils / 1000).toFixed(3)} JOD`;

  const filteredSales = sales.filter(s => 
    s.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    s.employee?.display_name?.includes(search)
  );

  return (
    <div className="flex flex-col gap-6 h-full relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            سجل المبيعات
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            عرض وتتبع جميع مبيعات المتجر
          </p>
        </div>
        <LuxuryButton variant="secondary" className="text-sm flex items-center gap-2" iconLeft={DownloadSimple}>
          تصدير البيانات
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
              placeholder="ابحث برقم الفاتورة..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <LuxuryButton variant="secondary" className="!py-2 px-4 text-sm w-full sm:w-auto justify-center" iconLeft={Funnel}>
            تصفية (التاريخ / الموظف)
          </LuxuryButton>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : filteredSales.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا توجد مبيعات مطابقة للبحث</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="py-3 px-5 font-normal">رقم الفاتورة</th>
                  <th className="py-3 px-5 font-normal">التاريخ والوقت</th>
                  <th className="py-3 px-5 font-normal">الموظف البائع</th>
                  <th className="py-3 px-5 font-normal">الدفع</th>
                  <th className="py-3 px-5 font-normal">الإجمالي</th>
                  <th className="py-3 px-5 font-normal">الحالة</th>
                  <th className="py-3 px-5 font-normal w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filteredSales.map(sale => (
                  <tr key={sale.id} className="hover:bg-[var(--color-bg-surface)] transition-colors group">
                    <td className="py-3 px-5 font-mono text-[var(--color-gold-light)] font-bold">
                      {sale.invoice_number}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-1 text-[var(--color-text-secondary)]">
                        <CalendarBlank size={14} />
                        {new Date(sale.created_at).toLocaleString('ar-JO')}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[var(--color-text-primary)]">
                      {sale.employee?.display_name || 'غير معروف'}
                    </td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-0.5 rounded text-[0.65rem] ${sale.payment_method === 'cash' ? 'bg-[#5ddb85]/10 text-[#5ddb85]' : 'bg-[#a07cf0]/10 text-[#a07cf0]'}`}>
                        {sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة ائتمان'}
                      </span>
                    </td>
                    <td className="py-3 px-5 font-mono font-bold text-[var(--color-text-primary)]">
                      {formatJOD(sale.total)}
                    </td>
                    <td className="py-3 px-5">
                      {sale.status === 'completed' ? (
                        <span className="text-xs text-[#5ddb85]">مكتملة</span>
                      ) : (
                        <span className="text-xs text-red-400">ملغاة</span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-left">
                      <LuxuryButton 
                        variant="icon"
                        onClick={() => setSelectedSale(sale)}
                        className="!p-1 !w-auto !h-auto !min-h-0 !min-w-0 text-[var(--color-text-muted)] hover:!text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity border-none" 
                        title="عرض التفاصيل"
                      >
                        <Eye size={18} />
                      </LuxuryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Sale Details Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] flex flex-col border border-[var(--color-border-strong)] shadow-[var(--shadow-lg)]">
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-secondary)]">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                تفاصيل الفاتورة - {selectedSale.invoice_number}
              </h2>
              <LuxuryButton 
                variant="ghost"
                onClick={() => setSelectedSale(null)} 
                className="text-sm !p-2 !w-auto !h-auto !min-h-0 !min-w-0"
              >
                إغلاق
              </LuxuryButton>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full text-right text-sm border border-[var(--color-border)] rounded-lg overflow-hidden mb-6">
                <thead className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                  <tr>
                    <th className="py-2 px-3 font-normal">المنتج</th>
                    <th className="py-2 px-3 font-normal w-16 text-center">الكمية</th>
                    <th className="py-2 px-3 font-normal w-24">السعر</th>
                    <th className="py-2 px-3 font-normal w-24">المجموع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                  {selectedSale.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3">{item.product_name_ar}</td>
                      <td className="py-2 px-3 text-center">{item.quantity}</td>
                      <td className="py-2 px-3 font-mono">{formatJOD(item.unit_price)}</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-gold-light)]">{formatJOD(item.total_price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">المجموع الفرعي:</span>
                    <span>{formatJOD(selectedSale.subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-[var(--color-gold)] border-t border-[var(--color-border)] pt-2 mt-2">
                    <span>الإجمالي:</span>
                    <span>{formatJOD(selectedSale.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
