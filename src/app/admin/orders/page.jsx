'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, MagnifyingGlass, WhatsappLogo } from '@phosphor-icons/react';

function formatJOD(fils = 0) {
  return `${(fils / 1000).toFixed(3)} JOD`;
}

export default function AdminOrdersPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadSales = async () => {
      try {
        const response = await fetch('/api/sales?limit=100');
        if (response.ok) {
          const data = await response.json();
          setSales(data.sales || []);
        }
      } catch (error) {
        console.error('Failed to load orders', error);
      } finally {
        setLoading(false);
      }
    };
    loadSales();
  }, []);

  const filtered = sales.filter((sale) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      sale.invoice_number?.toLowerCase().includes(query) ||
      sale.employee?.username?.toLowerCase().includes(query) ||
      sale.employee?.display_name?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex h-full flex-col gap-6 dir-ar">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
            الطلبات والفواتير
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            متابعة فواتير المتجر ونقاط البيع بدون الاعتماد على التخزين المحلي.
          </p>
        </div>
        <Link href="/admin/sales" className="btn-secondary text-sm">
          <FileText size={16} />
          <span>إدارة المبيعات</span>
        </Link>
      </div>

      <div className="glass-card flex min-h-[520px] flex-1 flex-col overflow-hidden border border-[var(--color-border-strong)]">
        <div className="flex flex-col gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-96">
            <MagnifyingGlass size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="form-input pr-10 text-sm"
              placeholder="ابحث برقم الفاتورة أو الموظف"
            />
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            {filtered.length} فاتورة
          </span>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner h-8 w-8" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 p-20 text-center text-[var(--color-text-muted)]">
              <WhatsappLogo size={34} />
              <p>لا توجد فواتير مطابقة حتى الآن.</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="sticky top-0 z-10 bg-[var(--color-bg-surface)] text-xs text-[var(--color-text-muted)]">
                <tr>
                  <th className="px-5 py-3 font-normal">رقم الفاتورة</th>
                  <th className="px-5 py-3 font-normal">الموظف</th>
                  <th className="px-5 py-3 font-normal">طريقة الدفع</th>
                  <th className="px-5 py-3 font-normal">الإجمالي</th>
                  <th className="px-5 py-3 font-normal">التاريخ</th>
                  <th className="px-5 py-3 font-normal">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filtered.map((sale) => (
                  <tr key={sale.id} className="hover:bg-[var(--color-bg-surface)]">
                    <td className="px-5 py-3 font-mono text-[var(--color-gold-light)]">
                      {sale.invoice_number}
                    </td>
                    <td className="px-5 py-3">
                      {sale.employee?.display_name || sale.employee?.username || 'غير محدد'}
                    </td>
                    <td className="px-5 py-3">{sale.payment_method}</td>
                    <td className="px-5 py-3 font-mono font-bold">{formatJOD(sale.total)}</td>
                    <td className="px-5 py-3 text-xs text-[var(--color-text-muted)]">
                      {new Date(sale.created_at).toLocaleString('ar-JO')}
                    </td>
                    <td className="px-5 py-3">
                      <span className="badge-success">{sale.status || 'completed'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
