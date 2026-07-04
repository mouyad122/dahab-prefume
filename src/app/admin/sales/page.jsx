'use client';

import React, { useEffect, useState } from 'react';
import { DownloadSimple, MagnifyingGlass, Funnel, CalendarBlank, Eye, X, FileXls, Printer } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSale, setSelectedSale] = useState(null);

  // Accounts/Employees List
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('all');

  // Date & Time Filter States
  const [fromDate, setFromDate] = useState('');
  const [fromTime, setFromTime] = useState('00:00');
  const [toDate, setToDate] = useState('');
  const [toTime, setToTime] = useState('23:59');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Export Modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchSales();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
      }
    } catch (e) {
      console.error('Failed to fetch accounts list');
    }
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('limit', '300');

      if (selectedEmployeeId !== 'all') {
        params.append('employeeId', selectedEmployeeId);
      }

      if (fromDate) {
        const startISO = new Date(`${fromDate}T${fromTime || '00:00'}:00`).toISOString();
        params.append('startDate', startISO);
      }
      if (toDate) {
        const endISO = new Date(`${toDate}T${toTime || '23:59'}:59`).toISOString();
        params.append('endDate', endISO);
      }
      if (paymentFilter !== 'all') params.append('paymentMethod', paymentFilter);

      const res = await fetch(`/api/sales?${params.toString()}`);
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

  const formatJOD = (fils) => `${((fils || 0) / 1000).toFixed(3)} JOD`;

  const filteredSales = sales.filter(s => {
    const q = search.trim().toLowerCase();
    const inv = (s.invoice_number || '').toLowerCase();
    const seller = (s.seller_name_snapshot || s.employee?.display_name || '').toLowerCase();
    return !q || inv.includes(q) || seller.includes(q);
  });

  const handleExportCSV = () => {
    const headers = ['رقم الفاتورة', 'التاريخ والوقت', 'اسم البائع', 'دور البائع', 'المصدر', 'طريقة الدفع', 'المجموع الفرعي (JOD)', 'الخصم (JOD)', 'الإجمالي (JOD)', 'الحالة'];
    const rows = filteredSales.map(s => [
      s.invoice_number,
      new Date(s.created_at).toLocaleString('ar-JO'),
      s.seller_name_snapshot || s.employee?.display_name || 'غير محدد',
      s.seller_role_snapshot || 'كاشير',
      s.sale_source || 'STAFF_POS',
      s.payment_method === 'cash' ? 'نقدي' : 'بطاقة',
      ((s.subtotal || 0) / 1000).toFixed(3),
      ((s.discount_total || 0) / 1000).toFixed(3),
      ((s.total || 0) / 1000).toFixed(3),
      s.status === 'completed' ? 'مكتملة' : 'ملغاة'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales_report_${fromDate || 'all'}_to_${toDate || 'today'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportModalOpen(false);
  };

  const handleExportPDF = () => {
    window.print();
    setIsExportModalOpen(false);
  };

  return (
    <>
    <div className="flex flex-col gap-6 h-full relative dir-ar no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            سجل المبيعات والتسوية
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            عرض وتتبع جميع فواتير المتجر وتوثيق بيانات البائعين
          </p>
        </div>
        <LuxuryButton 
          variant="secondary" 
          className="text-sm flex items-center gap-2" 
          iconLeft={DownloadSimple}
          onClick={() => setIsExportModalOpen(true)}
        >
          تصدير التقرير (PDF / Excel)
        </LuxuryButton>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden">
        
        {/* Date, Time & Employee Filter Toolbar */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end">
            
            {/* Search */}
            <div className="md:col-span-2 relative">
              <label className="block text-[11px] text-gray-400 mb-1">بحث برقم الفاتورة أو اسم البائع</label>
              <div className="relative">
                <MagnifyingGlass size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  className="form-input pr-9 text-xs font-mono w-full" 
                  placeholder="ابحث..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Employee Filter */}
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">الموظف / البائع</label>
              <select
                className="form-select text-xs py-1.5 px-2 bg-[#0a0a0c] border border-white/10 text-white rounded-lg w-full"
                value={selectedEmployeeId}
                onChange={e => setSelectedEmployeeId(e.target.value)}
              >
                <option value="all">كل الحسابات (الكل)</option>
                <option value="admin">المدير العام (Admin)</option>
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
                  className="form-input text-xs py-1.5 px-1 w-full font-mono"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                />
                <input 
                  type="time"
                  className="form-input text-xs py-1.5 px-1 font-mono shrink-0 w-16"
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
                  className="form-input text-xs py-1.5 px-1 w-full font-mono"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                />
                <input 
                  type="time"
                  className="form-input text-xs py-1.5 px-1 font-mono shrink-0 w-16"
                  value={toTime}
                  onChange={e => setToTime(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Trigger Button */}
            <div>
              <LuxuryButton 
                variant="primary" 
                className="!py-2 px-3 text-xs w-full justify-center" 
                iconLeft={Funnel}
                onClick={fetchSales}
              >
                تطبيق الفلترة
              </LuxuryButton>
            </div>

          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : filteredSales.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا توجد مبيعات مطابقة للبحث أو الموظف أو الفترة المحددة</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="py-3 px-5 font-normal">رقم الفاتورة</th>
                  <th className="py-3 px-5 font-normal">التاريخ والوقت</th>
                  <th className="py-3 px-5 font-normal">صاحب الحساب البائع</th>
                  <th className="py-3 px-5 font-normal">المصدر</th>
                  <th className="py-3 px-5 font-normal">الدفع</th>
                  <th className="py-3 px-5 font-normal">الإجمالي</th>
                  <th className="py-3 px-5 font-normal">الحالة</th>
                  <th className="py-3 px-5 font-normal w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filteredSales.map(sale => {
                  const sellerName = sale.seller_name_snapshot || sale.employee?.display_name || 'غير محدد';
                  const sellerRole = sale.seller_role_snapshot || (sale.employee?.role === 'manager' ? 'مدير فرع' : 'كاشير');
                  
                  return (
                    <tr key={sale.id} className="hover:bg-[var(--color-bg-surface)] transition-colors group">
                      <td className="py-3 px-5 font-mono text-[var(--color-gold-light)] font-bold">
                        {sale.invoice_number}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-1 text-[var(--color-text-secondary)] text-xs font-mono">
                          <CalendarBlank size={13} />
                          {new Date(sale.created_at).toLocaleString('ar-JO')}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="font-bold text-[var(--color-text-primary)] text-xs">{sellerName}</div>
                        <div className="text-[10px] text-[var(--color-gold-light)]">{sellerRole}</div>
                      </td>
                      <td className="py-3 px-5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300">
                          {sale.sale_source || 'STAFF_POS'}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold ${sale.payment_method === 'cash' ? 'bg-[var(--color-success-dim)] text-[var(--color-success)]' : 'bg-[var(--color-info-dim)] text-[var(--color-info)]'}`}>
                          {sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة ائتمان'}
                        </span>
                      </td>
                      <td className="py-3 px-5 font-mono font-bold text-[var(--color-text-primary)]">
                        {formatJOD(sale.total)}
                      </td>
                      <td className="py-3 px-5">
                        {sale.status === 'completed' ? (
                          <span className="text-xs text-[var(--color-success)] font-bold">مكتملة</span>
                        ) : (
                          <span className="text-xs text-[var(--color-error)] font-bold">ملغاة</span>
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Export Choice Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 text-white">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-lg font-bold text-[var(--color-gold-light)]">
                اختر نوع التقرير للتصدير
              </h2>
              <LuxuryButton variant="icon" className="!p-1 text-gray-400 hover:text-white border-none rounded-full" onClick={() => setIsExportModalOpen(false)}>
                <X size={20} />
              </LuxuryButton>
            </div>

            <p className="text-xs text-gray-300">
              سيتم تصدير المبيعات بناءً على الفلترة المحددة حاليًا ({filteredSales.length} فاتورة).
            </p>

            <div className="grid grid-cols-2 gap-4 my-2">
              <button
                type="button"
                onClick={handleExportPDF}
                className="p-5 rounded-2xl bg-[#121216] border border-[#c5a25d]/30 hover:border-[#c5a25d] flex flex-col items-center gap-3 text-center transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d] group-hover:scale-110 transition-transform">
                  <Printer size={26} />
                </div>
                <span className="font-bold text-sm text-white">تقرير طباعة (PDF)</span>
                <span className="text-[10px] text-gray-400">تقرير رسمي بشعار دهب والملخص</span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="p-5 rounded-2xl bg-[#121216] border border-emerald-500/30 hover:border-emerald-500 flex flex-col items-center gap-3 text-center transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <FileXls size={26} />
                </div>
                <span className="font-bold text-sm text-white">جدول Excel (.csv)</span>
                <span className="text-[10px] text-gray-400">مناسب للمحاسبة والجداول</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <LuxuryButton variant="secondary" className="px-4 py-2 text-xs" onClick={() => setIsExportModalOpen(false)}>إلغاء</LuxuryButton>
            </div>
          </div>
        </div>
      )}

      {/* Sale Details Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] flex flex-col border border-[var(--color-border-strong)] shadow-[var(--shadow-lg)]">
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-secondary)]">
              <div>
                <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                  تفاصيل الفاتورة - {selectedSale.invoice_number}
                </h2>
                <div className="text-xs text-gray-400 mt-0.5">
                  البائع: <span className="text-white font-bold">{selectedSale.seller_name_snapshot || selectedSale.employee?.display_name || 'غير محدد'}</span> ({selectedSale.seller_role_snapshot || 'كاشير'})
                </div>
              </div>
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

    {/* Hidden Print Layout */}
    <div className="hidden print-only print-report" dir="rtl">
      <div className="print-header">
        <h1>DAHAB PERFUMES</h1>
        <p>تقرير مبيعات المتجر</p>
        <p>تاريخ الطباعة: {new Date().toLocaleString('ar-JO')}</p>
        {fromDate && toDate && (
          <p>الفترة: من {fromDate} {fromTime} إلى {toDate} {toTime}</p>
        )}
      </div>
      
      <div className="print-summary-box mb-6">
        <table className="w-full text-right" style={{ border: 'none' }}>
          <tbody>
            <tr>
              <td style={{ border: 'none', padding: '4px' }}><strong>إجمالي المبيعات:</strong> {formatJOD(filteredSales.reduce((acc, s) => acc + (s.total || 0), 0))}</td>
              <td style={{ border: 'none', padding: '4px' }}><strong>عدد الفواتير:</strong> {filteredSales.length}</td>
            </tr>
            <tr>
              <td style={{ border: 'none', padding: '4px' }}><strong>إجمالي المنتجات:</strong> {filteredSales.reduce((acc, s) => acc + (s.items?.length || 0), 0)}</td>
              <td style={{ border: 'none', padding: '4px' }}><strong>البائع:</strong> {selectedEmployeeId === 'all' ? 'الكل' : selectedEmployeeId === 'admin' ? 'المدير العام' : employees.find(e => e.id === selectedEmployeeId)?.display_name || 'محدد'}</td>
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
            <th className="w-16">الدفع</th>
            <th className="w-24">المجموع</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map(sale => (
            <tr key={sale.id}>
              <td style={{ fontFamily: 'monospace' }}>{sale.invoice_number}</td>
              <td>{new Date(sale.created_at).toLocaleString('ar-JO')}</td>
              <td>{sale.seller_name_snapshot || sale.employee?.display_name || 'غير محدد'}</td>
              <td>{sale.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}</td>
              <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{formatJOD(sale.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="print-signature-area">
        <div className="print-signature-line">توقيع المسؤول</div>
        <div className="print-signature-line">تدقيق الإدارة / المحاسبة</div>
      </div>
    </div>
    </>
  );
}
