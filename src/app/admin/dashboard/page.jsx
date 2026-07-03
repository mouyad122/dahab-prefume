'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Coins, Receipt, Package, WarningCircle, ArrowLeft,
  ChatTeardropText, UsersThree, Plus, Storefront,
  ArrowClockwise, TrendUp, ChartBar
} from '@phosphor-icons/react';

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatJOD(fils) {
  const v = Number.isFinite(fils) ? fils : 0;
  return `${(v / 1000).toFixed(3)} JOD`;
}

// ── CSS-only bar chart (no external library) ──────────────────────────────────
function SalesBarChart({ days }) {
  if (!days || days.length === 0) return null;
  const maxVal = Math.max(...days.map(d => d.total_fils), 1);

  return (
    <div className="flex items-end gap-2 h-28 w-full" role="img" aria-label="مخطط مبيعات آخر 7 أيام">
      {days.map((day, i) => {
        const pct = maxVal > 0 ? (day.total_fils / maxVal) * 100 : 0;
        const isToday = i === days.length - 1;
        return (
          <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-1 group relative">
            {/* Tooltip */}
            {day.total_fils > 0 && (
              <div className="absolute bottom-full mb-1 hidden group-hover:flex items-center justify-center z-10">
                <div className="text-[0.62rem] font-mono bg-[var(--color-bg-raised)] border border-[var(--color-border-strong)] text-[var(--color-gold-light)] px-1.5 py-0.5 rounded whitespace-nowrap shadow-md">
                  {formatJOD(day.total_fils)}
                </div>
              </div>
            )}
            {/* Bar */}
            <div className="w-full flex-1 flex items-end rounded-t overflow-hidden">
              <div
                className="w-full rounded-t transition-all duration-500"
                style={{
                  height: pct > 0 ? `${Math.max(pct, 4)}%` : '4%',
                  background: isToday
                    ? 'linear-gradient(180deg, var(--color-gold-light), var(--color-gold-dark))'
                    : 'linear-gradient(180deg, rgba(201,160,80,0.5), rgba(201,160,80,0.15))',
                  opacity: day.total_fils === 0 ? 0.25 : 1,
                }}
              />
            </div>
            {/* Label */}
            <span className={`text-[0.6rem] font-bold ${isToday ? 'text-[var(--color-gold-light)]' : 'text-[var(--color-text-subtle)]'}`}>
              {day.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, colorVar, subLabel }) {
  return (
    <div className={`admin-stat-card border-s-4`} style={{ borderInlineStartColor: `var(${colorVar})` }}>
      <div className="flex justify-between items-start mb-3">
        <div className="text-[0.72rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider leading-tight">
          {label}
        </div>
        <div className="p-2 rounded shrink-0" style={{ background: `var(${colorVar}-dim)`, color: `var(${colorVar})` }}>
          <Icon size={18} />
        </div>
      </div>
      <div className="text-2xl font-display font-bold" style={{ color: `var(${colorVar})` }}>
        {value}
      </div>
      {subLabel && (
        <div className="text-[0.68rem] text-[var(--color-text-subtle)] mt-1">{subLabel}</div>
      )}
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-8 w-48 skeleton rounded" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="skeleton h-28 rounded-xl" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="skeleton h-48 rounded-xl lg:col-span-2" />
        <div className="skeleton h-48 rounded-xl" />
      </div>
      <div className="skeleton h-64 rounded-xl" />
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('فشل تحميل البيانات');
      setData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-[var(--color-text-muted)]">
        <WarningCircle size={40} className="text-[var(--color-error)]" />
        <p>{error}</p>
        <button onClick={fetchStats} className="btn-secondary text-sm flex items-center gap-2">
          <ArrowClockwise size={16} /> إعادة المحاولة
        </button>
      </div>
    );
  }

  const d = data;
  const maxChartVal = Math.max(...(d.chart_days || []).map(x => x.total_fils), 1);

  return (
    <div className="flex flex-col gap-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-0.5">
            نظرة عامة
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            ملخص أداء المتجر لحظة بلحظة
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            className="icon-btn"
            title="تحديث البيانات"
          >
            <ArrowClockwise size={18} />
          </button>
          <Link href="/admin/reports" className="btn-secondary text-sm">
            عرض التقارير
          </Link>
          <Link href="/admin/products" className="btn-primary text-sm">
            <Plus size={16} weight="bold" />
            إضافة منتج
          </Link>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="مبيعات اليوم"
          value={formatJOD(d.today.sales_fils)}
          icon={Coins}
          colorVar="--color-gold"
          subLabel={`${d.today.invoices} فاتورة`}
        />
        <StatCard
          label="مبيعات الأسبوع"
          value={formatJOD(d.week.sales_fils)}
          icon={TrendUp}
          colorVar="--color-info"
          subLabel={`${d.week.invoices} فاتورة`}
        />
        <StatCard
          label="مبيعات الشهر"
          value={formatJOD(d.month.sales_fils)}
          icon={Receipt}
          colorVar="--color-success"
          subLabel={`${d.month.invoices} فاتورة`}
        />
        <StatCard
          label="نواقص المخزون"
          value={d.low_stock_count}
          icon={WarningCircle}
          colorVar="--color-error"
          subLabel={d.low_stock_count > 0 ? 'تحتاج تجديد' : 'المخزون سليم'}
        />
      </div>

      {/* ── Middle Row: Chart + Quick Actions + Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Sales Chart */}
        <div className="glass-card p-5 border border-[var(--color-border)] rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[var(--color-text-primary)] font-bold text-sm">
              <ChartBar size={18} className="text-[var(--color-gold)]" />
              المبيعات — آخر 7 أيام
            </div>
            <span className="text-[0.68rem] text-[var(--color-text-subtle)]">
              الأعمدة الذهبية = اليوم
            </span>
          </div>
          <SalesBarChart days={d.chart_days} />
          <div className="mt-3 text-[0.7rem] text-[var(--color-text-subtle)] text-center">
            الإجمالي الأسبوع الحالي: <span className="text-[var(--color-gold-light)] font-mono">{formatJOD(d.week.sales_fils)}</span>
          </div>
        </div>

        {/* Right column: Quick info tiles */}
        <div className="flex flex-col gap-3">

          {/* Inquiries */}
          <Link href="/admin/inquiries" className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4 hover:border-[var(--color-border-strong)] transition-colors group">
            <div className="w-11 h-11 rounded-full bg-[var(--color-info-dim)] flex items-center justify-center text-[var(--color-info)] shrink-0">
              <ChatTeardropText size={20} weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.72rem] text-[var(--color-text-muted)] uppercase tracking-wider font-bold">استفسارات جديدة</div>
              <div className="text-xl font-display font-bold text-[var(--color-text-primary)]">{d.new_inquiries}</div>
            </div>
            {d.new_inquiries > 0 && (
              <span className="badge-info-sm shrink-0">جديد</span>
            )}
          </Link>

          {/* Products */}
          <Link href="/admin/products" className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4 hover:border-[var(--color-border-strong)] transition-colors">
            <div className="w-11 h-11 rounded-full bg-[var(--color-gold-dim)] flex items-center justify-center text-[var(--color-gold)] shrink-0">
              <Package size={20} weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.72rem] text-[var(--color-text-muted)] uppercase tracking-wider font-bold">إجمالي المنتجات</div>
              <div className="text-xl font-display font-bold text-[var(--color-text-primary)]">{d.total_products}</div>
            </div>
          </Link>

          {/* Employees */}
          <Link href="/admin/employees" className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4 hover:border-[var(--color-border-strong)] transition-colors">
            <div className="w-11 h-11 rounded-full bg-[var(--color-success-dim)] flex items-center justify-center text-[var(--color-success)] shrink-0">
              <UsersThree size={20} weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.72rem] text-[var(--color-text-muted)] uppercase tracking-wider font-bold">موظفين نشطين</div>
              <div className="text-xl font-display font-bold text-[var(--color-text-primary)]">{d.active_employees}</div>
            </div>
          </Link>

          {/* POS Shortcut */}
          <Link href="/pos/counter" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm flex items-center justify-center gap-2 py-3 rounded-xl">
            <Storefront size={18} />
            فتح كاونتر البيع
          </Link>
        </div>
      </div>

      {/* ── Low Stock Alert ── */}
      {d.low_stock_count > 0 && (
        <div className="glass-card border border-[var(--color-error-border)] rounded-xl overflow-hidden">
          <div className="p-4 bg-[var(--color-error-dim)] border-b border-[var(--color-error-border)] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[var(--color-error)] font-bold text-sm">
              <WarningCircle size={18} weight="fill" />
              تنبيه نقص المخزون ({d.low_stock_count} صنف)
            </div>
            <Link href="/admin/inventory" className="text-xs text-[var(--color-error)] hover:text-[var(--color-text-primary)] flex items-center gap-1 transition-colors">
              عرض المخزون <ArrowLeft size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-2 px-4 font-bold">المنتج</th>
                  <th className="py-2 px-4 font-bold">الحجم</th>
                  <th className="py-2 px-4 font-bold">الكمية</th>
                  <th className="py-2 px-4 font-bold">SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {(d.low_stock_items || []).slice(0, 8).map(item => (
                  <tr key={item.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-[var(--color-text-primary)]">
                      {item.product?.name_ar}
                    </td>
                    <td className="py-2.5 px-4 text-[var(--color-text-secondary)]">
                      {item.volume} مل
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="badge-error-sm">{item.stock} قطعة</span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[var(--color-text-subtle)] text-xs">
                      {item.product?.sku}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Recent Sales Table ── */}
      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-secondary)]">
          <h3 className="font-bold text-[var(--color-text-primary)] text-sm">أحدث المبيعات</h3>
          <Link href="/admin/sales" className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-light)] flex items-center gap-1 transition-colors">
            <span>عرض الكل</span>
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs border-b border-[var(--color-border)]">
              <tr>
                <th className="py-3 px-4 font-bold">رقم الفاتورة</th>
                <th className="py-3 px-4 font-bold">الموظف</th>
                <th className="py-3 px-4 font-bold">طريقة الدفع</th>
                <th className="py-3 px-4 font-bold">المبلغ</th>
                <th className="py-3 px-4 font-bold">الوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {(d.recent_sales || []).length > 0 ? d.recent_sales.map(sale => (
                <tr key={sale.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                  <td className="py-3 px-4 font-mono text-[var(--color-gold-light)] font-bold text-xs">
                    {sale.invoice_number}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-text-primary)]">
                    {sale.employee?.display_name || 'غير محدد'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold ${
                      sale.payment_method === 'cash'
                        ? 'bg-[var(--color-success-dim)] text-[var(--color-success)]'
                        : 'bg-[var(--color-info-dim)] text-[var(--color-info)]'
                    }`}>
                      {sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[var(--color-text-primary)]">
                    {formatJOD(sale.total)}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-text-secondary)] text-xs dir-ltr text-right">
                    {new Date(sale.created_at).toLocaleString('ar-JO', {
                      hour: '2-digit', minute: '2-digit',
                      month: 'short', day: 'numeric'
                    })}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[var(--color-text-muted)]">
                    <div className="flex flex-col items-center gap-2">
                      <Receipt size={32} className="opacity-30" />
                      <span>لا توجد مبيعات مسجلة بعد</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Performance meta */}
        {d._meta && (
          <div className="p-2 border-t border-[var(--color-border-subtle)] flex items-center gap-3 bg-[var(--color-bg-card)]">
            <span className="text-[0.6rem] text-[var(--color-text-subtle)]">
              وقت تحميل البيانات: <span className="font-mono text-[var(--color-gold)]">{d._meta.query_ms}ms</span>
            </span>
            <span className="text-[0.6rem] text-[var(--color-text-subtle)]">
              Redis: <span className={`font-mono ${d._meta.redis_status === 'ok' ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}>
                {d._meta.redis_status === 'ok' ? `${d._meta.redis_ping_ms}ms` : d._meta.redis_status}
              </span>
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
