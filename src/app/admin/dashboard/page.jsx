'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Coins, Receipt, Package, WarningCircle, ArrowRight } from '@phosphor-icons/react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState({ total_sales: 0, total_invoices: 0, recent: [] });
  const [productsData, setProductsData] = useState({ total_products: 0, low_stock: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch recent sales for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const salesRes = await fetch(`/api/sales?startDate=${today.toISOString()}&limit=5`);
        if (salesRes.ok) {
          const sData = await salesRes.json();
          setSalesData({
            total_sales: sData.totalAmount || 0,
            total_invoices: sData.count || 0,
            recent: sData.sales || []
          });
        }

        // Fetch products summary
        const prodRes = await fetch('/api/products?limit=100'); // Fetch enough to count
        if (prodRes.ok) {
          const pData = await prodRes.json();
          const products = pData.products || [];
           const lowStock = products.filter(p => 
             (p.variants || []).some(v => v.stock <= (p.low_stock_threshold || 5))
           ).length;
          setProductsData({
            total_products: products.length,
            low_stock: lowStock
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatJOD = (fils) => `${(fils / 1000).toFixed(3)} JOD`;

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">نظرة عامة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-32 w-full rounded-lg"></div>)}
        </div>
        <div className="skeleton h-64 w-full rounded-lg mt-4"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            نظرة عامة
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            ملخص أداء المتجر والمبيعات لليوم
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/reports" className="btn-secondary text-sm">
            عرض التقارير
          </Link>
          <Link href="/admin/products" className="btn-primary text-sm">
            إضافة منتج
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-stat-card border-l-4 border-l-[var(--color-gold)]">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[0.75rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">مبيعات اليوم</div>
            <div className="p-2 rounded bg-[var(--color-gold-dim)] text-[var(--color-gold)]">
              <Coins size={20} />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-[var(--color-gold-light)]">
            {formatJOD(salesData.total_sales)}
          </div>
        </div>

        <div className="admin-stat-card border-l-4 border-l-[var(--color-success)]"> 
          <div className="flex justify-between items-start mb-4">
            <div className="text-[0.75rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">فواتير اليوم</div>
            <div className="p-2 rounded bg-[var(--color-success-dim)] text-[var(--color-success)]">
              <Receipt size={20} />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-[var(--color-text-primary)]">
            {salesData.total_invoices}
          </div>
        </div>

        <div className="admin-stat-card border-l-4 border-l-[var(--color-info)]">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[0.75rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">إجمالي المنتجات</div>
            <div className="p-2 rounded bg-[var(--color-info-dim)] text-[var(--color-info)]">
              <Package size={20} />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-[var(--color-text-primary)]">
            {productsData.total_products}
          </div>
        </div>

        <div className="admin-stat-card border-l-4 border-l-[var(--color-error)]">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[0.75rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">نواقص المخزون</div>
            <div className="p-2 rounded bg-[var(--color-error-dim)] text-[var(--color-error)]">
              <WarningCircle size={20} />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-[var(--color-error)]">
            {productsData.low_stock}
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-secondary)]">
          <h3 className="font-bold text-[var(--color-text-primary)]">أحدث المبيعات</h3>
          <Link href="/admin/sales" className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-light)] flex items-center gap-1">
            <span>عرض الكل</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs border-b border-[var(--color-border)]">
              <tr>
                <th className="py-3 px-5 font-normal">رقم الفاتورة</th>
                <th className="py-3 px-5 font-normal">الموظف</th>
                <th className="py-3 px-5 font-normal">المبلغ</th>
                <th className="py-3 px-5 font-normal">التاريخ والوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {salesData.recent.length > 0 ? salesData.recent.map(sale => (
                <tr key={sale.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                  <td className="py-3 px-5 font-mono text-[var(--color-gold-light)]">{sale.invoice_number}</td>
                  <td className="py-3 px-5 text-[var(--color-text-primary)]">{sale.employee?.display_name || 'موظف غير معروف'}</td>
                  <td className="py-3 px-5 font-mono font-bold text-[var(--color-text-primary)]">{formatJOD(sale.total)}</td>
                  <td className="py-3 px-5 text-[var(--color-text-secondary)] text-xs">{new Date(sale.created_at).toLocaleString('ar-JO')}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-[var(--color-text-muted)]">لا توجد مبيعات لليوم حتى الآن</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
