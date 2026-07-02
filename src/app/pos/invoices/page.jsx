'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Receipt, CalendarBlank, DownloadSimple } from '@phosphor-icons/react';
import { usePosContext } from '../../../contexts/PosContext';

export default function PosInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { employee } = usePosContext();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sales?limit=50');
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.sales || []);
      }
    } catch (e) {
      console.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const formatJOD = (fils) => `${(fils / 1000).toFixed(3)} JOD`;

  return (
    <div className="flex-1 p-6 md:p-10 bg-[var(--color-bg-primary)] h-full overflow-y-auto dir-ar relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              سجل الفواتير
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              عرض أحدث المبيعات الخاصة بك
            </p>
          </div>
          <button onClick={fetchInvoices} className="btn-secondary text-sm px-4">
            تحديث القائمة
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="spinner w-10 h-10 border-[3px]"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="glass-card p-20 flex flex-col items-center justify-center text-[var(--color-text-muted)] text-center">
            <Receipt size={64} weight="thin" className="mb-4" />
            <p>لا توجد فواتير سابقة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {invoices.map(invoice => (
              <div key={invoice.id} className="glass-card p-5 border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-mono text-sm font-bold text-[var(--color-text-primary)] mb-1">
                      {invoice.invoice_number}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                      <CalendarBlank size={12} />
                      {new Date(invoice.created_at).toLocaleString('ar-JO')}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[0.65rem] font-bold ${invoice.status === 'completed' ? 'bg-[#5ddb85]/10 text-[#5ddb85]' : 'bg-red-500/10 text-red-500'}`}>
                    {invoice.status === 'completed' ? 'مكتملة' : 'ملغاة'}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-[0.8rem] text-[var(--color-text-secondary)] mb-1">
                    طريقة الدفع: {invoice.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}
                  </div>
                  <div className="text-[0.8rem] text-[var(--color-text-secondary)] mb-4">
                    المنتجات: {invoice.items?.length || 0}
                  </div>
                </div>
                
                <div className="flex items-end justify-between border-t border-[var(--color-border-subtle)] pt-4 mt-auto">
                  <div className="font-display font-bold text-[var(--color-gold-light)] text-lg">
                    {formatJOD(invoice.total)}
                  </div>
                  <button 
                    onClick={() => setSelectedInvoice(invoice)}
                    className="icon-btn text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black transition-colors"
                    title="عرض التفاصيل"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] flex flex-col border border-[var(--color-border-strong)] shadow-[var(--shadow-lg)] dir-ar relative">
            
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-secondary)]">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                تفاصيل الفاتورة - {selectedInvoice.invoice_number}
              </h2>
              <button 
                onClick={() => setSelectedInvoice(null)} 
                className="text-[var(--color-text-muted)] hover:text-white"
              >
                إغلاق
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-[var(--color-bg-primary)]">
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-[var(--color-text-secondary)]">
                <div>
                  <span className="block text-[var(--color-text-muted)] mb-1 text-xs uppercase">التاريخ والوقت</span>
                  <span className="font-bold">{new Date(selectedInvoice.created_at).toLocaleString('ar-JO')}</span>
                </div>
                <div>
                  <span className="block text-[var(--color-text-muted)] mb-1 text-xs uppercase">طريقة الدفع</span>
                  <span className="font-bold">{selectedInvoice.payment_method === 'cash' ? 'نقدي' : 'بطاقة ائتمان'}</span>
                </div>
                <div>
                  <span className="block text-[var(--color-text-muted)] mb-1 text-xs uppercase">الموظف</span>
                  <span className="font-bold">{selectedInvoice.employee?.display_name || employee?.display_name}</span>
                </div>
                <div>
                  <span className="block text-[var(--color-text-muted)] mb-1 text-xs uppercase">الحالة</span>
                  <span className={`font-bold ${selectedInvoice.status === 'completed' ? 'text-[#5ddb85]' : 'text-red-500'}`}>
                    {selectedInvoice.status === 'completed' ? 'مكتملة' : 'ملغاة'}
                  </span>
                </div>
              </div>

              <div className="border border-[var(--color-border-subtle)] rounded-lg overflow-hidden mb-6">
                <table className="w-full text-sm text-right">
                  <thead className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                    <tr>
                      <th className="py-3 px-4 font-normal">المنتج</th>
                      <th className="py-3 px-4 font-normal w-20 text-center">الكمية</th>
                      <th className="py-3 px-4 font-normal w-32">السعر</th>
                      <th className="py-3 px-4 font-normal w-32">المجموع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)]">
                    {selectedInvoice.items?.map((item, idx) => (
                      <tr key={idx} className="bg-[var(--color-bg-primary)]">
                        <td className="py-3 px-4 text-[var(--color-text-primary)] font-medium">
                          {item.product_name_ar}
                          {item.product_sku && <div className="text-[0.65rem] text-[var(--color-text-muted)] font-mono">{item.product_sku}</div>}
                        </td>
                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                        <td className="py-3 px-4 font-mono">{formatJOD(item.unit_price)}</td>
                        <td className="py-3 px-4 font-mono text-[var(--color-gold-light)] font-bold">{formatJOD(item.total_price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[var(--color-bg-surface)] p-5 rounded-lg border border-[var(--color-border-strong)] w-full md:w-1/2 mr-auto ml-0">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-[var(--color-text-muted)]">المجموع الفرعي:</span>
                  <span>{formatJOD(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-[#f97171]">
                  <span className="text-[var(--color-text-muted)]">الخصم:</span>
                  <span>- {formatJOD(selectedInvoice.discount_total)}</span>
                </div>
                <div className="divider-gold my-2"></div>
                <div className="flex justify-between mb-4 font-bold text-lg text-[var(--color-gold)]">
                  <span>الإجمالي:</span>
                  <span>{formatJOD(selectedInvoice.total)}</span>
                </div>
                
                {selectedInvoice.payment_method === 'cash' && (
                  <>
                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                      <span>المبلغ المستلم:</span>
                      <span>{formatJOD(selectedInvoice.amount_received)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#5ddb85]">
                      <span>الباقي:</span>
                      <span>{formatJOD(selectedInvoice.amount_received - selectedInvoice.total)}</span>
                    </div>
                  </>
                )}
              </div>

              {selectedInvoice.notes && (
                <div className="mt-6 p-4 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-md text-sm">
                  <strong className="block text-[var(--color-gold-light)] mb-1 text-xs">ملاحظات:</strong>
                  <p className="text-[var(--color-text-secondary)]">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex justify-end">
              <button 
                onClick={() => {
                  window.print();
                }} 
                className="btn-secondary"
              >
                <DownloadSimple size={18} />
                <span>تحميل / طباعة الفاتورة</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
