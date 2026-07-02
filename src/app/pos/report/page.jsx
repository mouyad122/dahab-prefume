'use client';

import React, { useEffect, useState } from 'react';
import { Printer, CalendarBlank, FileText } from '@phosphor-icons/react';
import { usePosContext } from '../../../contexts/PosContext';

export default function PosReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { employee, permissions } = usePosContext();
  const [period, setPeriod] = useState('today'); // today, yesterday, this_week, this_month

  useEffect(() => {
    fetchReport(period);
  }, [period]);

  const fetchReport = async (selectedPeriod) => {
    setLoading(true);
    try {
      // Calculate dates
      const now = new Date();
      let startDate, endDate;
      
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000).toISOString();

      if (selectedPeriod === 'today') {
        startDate = startOfToday.toISOString();
      } else if (selectedPeriod === 'yesterday') {
        const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
        startDate = startOfYesterday.toISOString();
        endDate = startOfToday.toISOString();
      } else if (selectedPeriod === 'this_week') {
        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday as start
        startDate = startOfWeek.toISOString();
      } else if (selectedPeriod === 'this_month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate = startOfMonth.toISOString();
      }

      const res = await fetch(`/api/reports?startDate=${startDate}&endDate=${endDate}&employeeId=${employee?.id}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data);
      }
    } catch (e) {
      console.error('Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const formatJOD = (fils) => `${(fils / 1000).toFixed(3)} JOD`;

  if (!permissions?.can_print_reports) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-bg-primary)] h-full dir-ar p-6 text-center">
        <div className="glass-card p-10 max-w-md border border-red-500/20">
          <FileText size={48} className="mx-auto mb-4 text-red-400" />
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">عذراً، غير مصرح لك</h2>
          <p className="text-[var(--color-text-secondary)]">ليس لديك الصلاحية لعرض وطباعة تقارير المبيعات.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-10 bg-[var(--color-bg-primary)] h-full overflow-y-auto dir-ar">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 no-print">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              تقرير المبيعات
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              ملخص مبيعاتك وأدائك
            </p>
          </div>
          
          <div className="flex gap-2 bg-[var(--color-bg-surface)] p-1 rounded-md border border-[var(--color-border)]">
            {[
              { id: 'today', label: 'اليوم' },
              { id: 'yesterday', label: 'الأمس' },
              { id: 'this_week', label: 'هذا الأسبوع' },
              { id: 'this_month', label: 'هذا الشهر' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-colors ${period === p.id ? 'bg-[var(--color-gold)] text-black' : 'text-[var(--color-text-secondary)] hover:text-white'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="spinner w-10 h-10 border-[3px]"></div>
          </div>
        ) : report ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 no-print">
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">إجمالي المبيعات</div>
                <div className="text-2xl font-display font-bold text-[var(--color-gold-light)]">
                  {formatJOD(report.summary.total_sales_fils)}
                </div>
              </div>
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">عدد الفواتير</div>
                <div className="text-2xl font-display font-bold text-white">
                  {report.summary.total_invoices}
                </div>
              </div>
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">إجمالي المنتجات المباعة</div>
                <div className="text-2xl font-display font-bold text-white">
                  {report.summary.total_items_sold}
                </div>
              </div>
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">متوسط قيمة الفاتورة</div>
                <div className="text-2xl font-display font-bold text-[var(--color-gold-light)]">
                  {formatJOD(report.summary.average_invoice_fils)}
                </div>
              </div>
            </div>

            <div className="glass-card border border-[var(--color-border-strong)] rounded-lg overflow-hidden bg-[var(--color-bg-surface)] no-print">
              <div className="p-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] flex justify-between items-center">
                <h3 className="font-bold text-white">تفاصيل المبيعات</h3>
                <button onClick={() => window.print()} className="btn-secondary text-xs py-1.5 px-3">
                  <Printer size={16} />
                  <span>طباعة التقرير</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-black/40 text-white text-xs border-b border-[var(--color-border)]">
                    <tr>
                      <th className="py-3 px-4 font-bold">رقم الفاتورة</th>
                      <th className="py-3 px-4 font-bold">الوقت</th>
                      <th className="py-3 px-4 font-bold">المنتجات</th>
                      <th className="py-3 px-4 font-bold">طريقة الدفع</th>
                      <th className="py-3 px-4 font-bold">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)] text-white">
                    {report.sales.length > 0 ? report.sales.map(sale => (
                      <tr key={sale.id} className="hover:bg-black/20 transition-colors">
                        <td className="py-3 px-4 font-mono text-[var(--color-gold-light)] font-bold">{sale.invoice_number}</td>
                        <td className="py-3 px-4 text-white/90">{new Date(sale.created_at).toLocaleTimeString('ar-JO')}</td>
                        <td className="py-3 px-4 text-white/90">{sale.items?.length || 0}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded border text-[0.65rem] font-bold ${
                            sale.payment_method === 'cash' 
                              ? 'bg-white/10 text-white border-white/20' 
                              : 'bg-[var(--color-gold-dim)] text-[var(--color-gold-light)] border-[var(--color-gold)]/20'
                          }`}>
                            {sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white">{formatJOD(sale.total)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="py-10 text-center text-white/60">لا توجد مبيعات في هذه الفترة</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hidden Print Layout */}
            <div className="hidden print-only print-report" dir="rtl">
              <div className="print-header">
                <h1>DAHAB PERFUMES</h1>
                <p>تقرير مبيعات الموظف</p>
                <p>الموظف: {employee?.display_name}</p>
                <p>الفترة: {period === 'today' ? 'اليوم' : period === 'yesterday' ? 'الأمس' : period === 'this_week' ? 'هذا الأسبوع' : 'هذا الشهر'}</p>
                <p>تاريخ الطباعة: {new Date().toLocaleString('ar-JO')}</p>
              </div>
              
              <div className="print-summary-box mb-6">
                <table className="w-full text-right" style={{ border: 'none' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: 'none', padding: '4px' }}><strong>إجمالي المبيعات:</strong> {formatJOD(report.summary.total_sales_fils)}</td>
                      <td style={{ border: 'none', padding: '4px' }}><strong>عدد الفواتير:</strong> {report.summary.total_invoices}</td>
                    </tr>
                    <tr>
                      <td style={{ border: 'none', padding: '4px' }}><strong>إجمالي المنتجات:</strong> {report.summary.total_items_sold}</td>
                      <td style={{ border: 'none', padding: '4px' }}><strong>متوسط الفاتورة:</strong> {formatJOD(report.summary.average_invoice_fils)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="mb-2 font-bold" style={{ color: '#8a6222' }}>تفاصيل الفواتير:</h3>
              <table className="print-table w-full">
                <thead>
                  <tr>
                    <th className="w-24">رقم الفاتورة</th>
                    <th className="w-32">التاريخ والوقت</th>
                    <th className="w-16">المنتجات</th>
                    <th className="w-20">الدفع</th>
                    <th className="w-24">المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {report.sales.map(sale => (
                    <tr key={sale.id}>
                      <td style={{ fontFamily: 'monospace' }}>{sale.invoice_number}</td>
                      <td>{new Date(sale.created_at).toLocaleString('ar-JO')}</td>
                      <td>{sale.items?.length || 0}</td>
                      <td>{sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{formatJOD(sale.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="print-signature-area">
                <div className="print-signature-line">توقيع الموظف المعتمد</div>
                <div className="print-signature-line">تدقيق الإدارة / المحاسبة</div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
