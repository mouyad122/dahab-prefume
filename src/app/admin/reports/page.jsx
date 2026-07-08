'use client';

import React, { useEffect, useState } from 'react';
import { Printer, CalendarBlank, FileText, Funnel } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('today'); // today, yesterday, this_week, this_month, custom
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('all');

  // Exact Date & Time Range Filter States
  const todayStr = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(todayStr);
  const [fromTime, setFromTime] = useState('00:00');
  const [toDate, setToDate] = useState(todayStr);
  const [toTime, setToTime] = useState('23:59');

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (period !== 'custom') {
      fetchReport(period, selectedEmployeeId);
    }
  }, [period, selectedEmployeeId]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
      }
    } catch (e) {
      console.error('Failed to fetch employees');
    }
  };

  const fetchReport = async (selectedPeriod, empId, customStart = null, customEnd = null) => {
    setLoading(true);
    try {
      let startDateStr = customStart;
      let endDateStr = customEnd;

      if (!customStart || !customEnd) {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);

        if (selectedPeriod === 'today') {
          startDateStr = startOfToday.toISOString();
          endDateStr = endOfToday.toISOString();
        } else if (selectedPeriod === 'yesterday') {
          const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
          startDateStr = startOfYesterday.toISOString();
          endDateStr = startOfToday.toISOString();
        } else if (selectedPeriod === 'this_week') {
          const startOfWeek = new Date(startOfToday);
          startOfWeek.setDate(now.getDate() - now.getDay());
          startDateStr = startOfWeek.toISOString();
          endDateStr = endOfToday.toISOString();
        } else if (selectedPeriod === 'this_month') {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          startDateStr = startOfMonth.toISOString();
          endDateStr = endOfToday.toISOString();
        }
      }

      let url = `/api/reports?startDate=${startDateStr}&endDate=${endDateStr}`;
      if (empId && empId !== 'all') {
        url += `&employeeId=${empId}`;
      }

      const res = await fetch(url);
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

  const handleApplyCustomFilter = () => {
    if (!fromDate || !toDate) {
      alert('يرجى تحديد تاريخ البداية وتاريخ النهاية');
      return;
    }

    const startISO = new Date(`${fromDate}T${fromTime || '00:00'}:00`).toISOString();
    const endISO = new Date(`${toDate}T${toTime || '23:59'}:59`).toISOString();

    setPeriod('custom');
    fetchReport('custom', selectedEmployeeId, startISO, endISO);
  };

  const formatJOD = (fils) => `${((fils || 0) / 1000).toFixed(3)} JOD`;

  return (
    <div className="flex-grow p-6 md:p-10 bg-[var(--color-bg-primary)] h-full overflow-y-auto dir-ar text-white text-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col gap-6 mb-8 no-print w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center w-full">
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-white mb-1">
                تقرير المبيعات العام والتأكيدات
              </h1>
              <p className="text-[var(--color-text-secondary)] text-sm">
                ملخص مبيعات المعرض وأداء الموظفين بناءً على اليوم والساعة
              </p>
            </div>
            
            <LuxuryButton variant="secondary" onClick={() => window.print()} className="text-xs !py-2 px-4" iconLeft={Printer}>
              طباعة التقرير (PDF)
            </LuxuryButton>
          </div>

          {/* Filter Bar with Date, Time, and Employee */}
          <div className="p-4 rounded-2xl bg-[#121216] border border-[#c5a25d]/20 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end">
              
              {/* Employee Selection */}
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">الموظف / البائع</label>
                <select 
                  className="form-select text-xs py-1.5 px-2 bg-[#0a0a0c] text-white border border-white/10 rounded-lg w-full"
                  value={selectedEmployeeId}
                  onChange={e => setSelectedEmployeeId(e.target.value)}
                >
                  <option value="all">جميع الموظفين والمدراء</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.display_name} ({emp.username})</option>
                  ))}
                </select>
              </div>

              {/* From Date & Time */}
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">من يوم وساعة</label>
                <div className="flex gap-1">
                  <input 
                    type="date"
                    className="form-input text-xs py-1.5 px-1 w-full font-mono bg-[#0a0a0c]"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                  />
                  <input 
                    type="time"
                    className="form-input text-xs py-1.5 px-1 font-mono shrink-0 w-16 bg-[#0a0a0c]"
                    value={fromTime}
                    onChange={e => setFromTime(e.target.value)}
                  />
                </div>
              </div>

              {/* To Date & Time */}
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">إلى يوم وساعة</label>
                <div className="flex gap-1">
                  <input 
                    type="date"
                    className="form-input text-xs py-1.5 px-1 w-full font-mono bg-[#0a0a0c]"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                  />
                  <input 
                    type="time"
                    className="form-input text-xs py-1.5 px-1 font-mono shrink-0 w-16 bg-[#0a0a0c]"
                    value={toTime}
                    onChange={e => setToTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Apply Custom Filter */}
              <div>
                <LuxuryButton 
                  variant="primary" 
                  className="!py-2 px-3 text-xs w-full justify-center" 
                  iconLeft={Funnel}
                  onClick={handleApplyCustomFilter}
                >
                  فلترة مخصصة
                </LuxuryButton>
              </div>

              {/* Quick Period Presets */}
              <div className="md:col-span-2 flex flex-wrap gap-1 bg-[#0a0a0c] p-1 rounded-xl border border-white/10">
                {[
                  { id: 'today', label: 'اليوم' },
                  { id: 'yesterday', label: 'الأمس' },
                  { id: 'this_week', label: 'هذا الأسبوع' },
                  { id: 'this_month', label: 'هذا الشهر' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setPeriod(p.id); setFromDate(''); setToDate(''); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex-1 text-center ${period === p.id ? 'bg-[#c5a25d] text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

            </div>
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
                <div className="text-2xl font-display font-bold text-[var(--color-gold-light)] font-mono">
                  {formatJOD(report.summary.total_sales_fils)}
                </div>
              </div>
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">عدد الفواتير</div>
                <div className="text-2xl font-display font-bold text-white font-mono">
                  {report.summary.total_invoices}
                </div>
              </div>
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">إجمالي المنتجات المباعة</div>
                <div className="text-2xl font-display font-bold text-white font-mono">
                  {report.summary.total_items_sold}
                </div>
              </div>
              <div className="glass-card p-5 border-l-4 border-l-[var(--color-gold)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="text-[0.75rem] text-white/60 font-bold mb-1">متوسط قيمة الفاتورة</div>
                <div className="text-2xl font-display font-bold text-[var(--color-gold-light)] font-mono">
                  {formatJOD(report.summary.average_invoice_fils)}
                </div>
              </div>
            </div>

            {/* Sales Details Table */}
            <div className="glass-card border border-[var(--color-border-strong)] rounded-lg overflow-hidden bg-[var(--color-bg-surface)] no-print">
              <div className="p-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] flex justify-between items-center">
                <h3 className="font-bold text-white">تفاصيل فواتير المبيعات</h3>
                <span className="text-xs text-gray-400 font-mono">إجمالي: {report.sales.length} فاتورة</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-black/40 text-white text-xs border-b border-[var(--color-border)]">
                    <tr>
                      <th className="py-3 px-4 font-bold">رقم الفاتورة</th>
                      <th className="py-3 px-4 font-bold">التاريخ والوقت</th>
                      <th className="py-3 px-4 font-bold">البائع المسجل</th>
                      <th className="py-3 px-4 font-bold">المنتجات</th>
                      <th className="py-3 px-4 font-bold">طريقة الدفع</th>
                      <th className="py-3 px-4 font-bold">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)] text-white">
                    {report.sales.length > 0 ? report.sales.map(sale => (
                      <tr key={sale.id} className="hover:bg-black/20 transition-colors">
                        <td className="py-3 px-5 font-mono text-[var(--color-gold-light)] font-bold">{sale.invoice_number}</td>
                        <td className="py-3 px-4 text-white/90 font-mono text-xs">{new Date(sale.created_at).toLocaleString('ar-JO')}</td>
                        <td className="py-3 px-4 text-white/90 font-bold">{sale.seller_name_snapshot || sale.employee?.display_name || 'غير محدد'}</td>
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
                        <td colSpan="6" className="py-10 text-center text-white/60">لا توجد مبيعات في هذه الفترة المحددة</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Raw Material Consumption Table */}
            {report.raw_materials_consumption && report.raw_materials_consumption.length > 0 && (
              <div className="glass-card mt-8 border border-[var(--color-border-strong)] rounded-lg overflow-hidden bg-[var(--color-bg-surface)] no-print">
                <div className="p-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] flex justify-between items-center">
                  <h3 className="font-bold text-white">تقرير استهلاك المواد الخام</h3>
                  <span className="text-xs text-gray-400 font-mono">مستخلص من عمليات البيع</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-black/40 text-white text-xs border-b border-[var(--color-border)]">
                      <tr>
                        <th className="py-3 px-4 font-bold">المادة الخام</th>
                        <th className="py-3 px-4 font-bold">النوع</th>
                        <th className="py-3 px-4 font-bold">الكمية المستهلكة (مل)</th>
                        <th className="py-3 px-4 font-bold">لترات (تقريبي)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-subtle)] text-white">
                      {report.raw_materials_consumption.map(rm => (
                        <tr key={rm.raw_material_id} className="hover:bg-black/20 transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{rm.name_ar} {rm.name_en ? `(${rm.name_en})` : ''}</td>
                          <td className="py-3 px-4 text-white/80">{
                            rm.type === 'OIL' ? 'زيت عطري' : 
                            rm.type === 'ALCOHOL' ? 'كحول' : 
                            rm.type === 'FIXATIVE' ? 'مثبت' : 
                            rm.type === 'MUSK' ? 'مسك' : 
                            rm.type === 'OTHER' ? 'أخرى' : rm.type
                          }</td>
                          <td className="py-3 px-4 font-mono font-bold text-[var(--color-gold-light)]">{(rm.total_consumed_ml).toFixed(2)} مل</td>
                          <td className="py-3 px-4 font-mono text-white/60">{(rm.total_consumed_ml / 1000).toFixed(3)} لتر</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Hidden Print Layout */}
            <div className="hidden print-only print-report" dir="rtl">
              <div className="print-header">
                <img
                  src="/brand/dahab-logo.png"
                  alt="DAHAB PERFUMES"
                  className="print-logo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="print-brand-block">
                  <div className="print-brand-name">DAHAB PERFUMES</div>
                  <div className="print-brand-subtitle">دهب للعطور — عمان</div>
                  <div className="print-report-title">تقرير المبيعات التفصيلي</div>
                  <div className="print-report-meta">
                    الموظف/البائع: {selectedEmployeeId === 'all' ? 'جميع الموظفين والمدراء' : employees.find(e => e.id === selectedEmployeeId)?.display_name} &nbsp;|&nbsp;
                    الفترة: {period === 'custom' ? `من ${fromDate} ${fromTime} إلى ${toDate} ${toTime}` : period === 'today' ? 'اليوم' : period === 'yesterday' ? 'الأمس' : period === 'this_week' ? 'هذا الأسبوع' : 'هذا الشهر'} &nbsp;|&nbsp;
                    تاريخ الطباعة: {new Date().toLocaleString('ar-JO')}
                  </div>
                </div>
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
                    <th className="w-24">البائع</th>
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
                      <td>{sale.seller_name_snapshot || sale.employee?.display_name || 'غير محدد'}</td>
                      <td>{sale.items?.length || 0}</td>
                      <td>{sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{formatJOD(sale.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {report.raw_materials_consumption && report.raw_materials_consumption.length > 0 && (
                <>
                  <h3 className="mb-2 mt-6 font-bold" style={{ color: '#8a6222' }}>استهلاك المواد الخام:</h3>
                  <table className="print-table w-full">
                    <thead>
                      <tr>
                        <th className="w-1/3">المادة الخام</th>
                        <th className="w-1/3">النوع</th>
                        <th className="w-1/3">الكمية المستهلكة (مل)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.raw_materials_consumption.map(rm => (
                        <tr key={rm.raw_material_id}>
                          <td>{rm.name_ar} {rm.name_en ? `(${rm.name_en})` : ''}</td>
                          <td>{
                            rm.type === 'OIL' ? 'زيت عطري' : 
                            rm.type === 'ALCOHOL' ? 'كحول' : 
                            rm.type === 'FIXATIVE' ? 'مثبت' : 
                            rm.type === 'MUSK' ? 'مسك' : 
                            rm.type === 'OTHER' ? 'أخرى' : rm.type
                          }</td>
                          <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{(rm.total_consumed_ml).toFixed(2)} مل</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <div className="print-signature-area">
                <div className="print-signature-line">توقيع المدير المسؤول</div>
                <div className="print-signature-line">توقيع قسم المحاسبة</div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
