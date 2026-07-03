'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  ChatTeardropText, 
  WhatsappLogo, 
  MagnifyingGlass, 
  Trash, 
  Eye, 
  CheckCircle, 
  Clock, 
  Archive, 
  X,
  Phone,
  Funnel,
  NotePencil,
  ArrowClockwise
} from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

const STATUS_LABELS = {
  new: { label: 'جديد', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
  read: { label: 'تم الاطلاع', bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
  replied: { label: 'تم الرد', bg: 'bg-[#c5a25d]/10 border-[#c5a25d]/30 text-[#c5a25d]' },
  archived: { label: 'مؤرشف', bg: 'bg-gray-500/10 border-gray-500/30 text-gray-400' }
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countsMap, setCountsMap] = useState({ all: 0, new: 0, read: 0, replied: 0, archived: 0 });

  // Filter state
  const [activeStatus, setActiveStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Inquiry Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeStatus !== 'all') params.append('status', activeStatus);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/inquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        if (data.countsMap) setCountsMap(data.countsMap);
      }
    } catch (e) {
      console.error('Failed to fetch inquiries:', e);
    } finally {
      setLoading(false);
    }
  }, [activeStatus, selectedType, searchQuery]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
        }
        fetchInquiries();
      }
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedInquiry) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: adminNote })
      });

      if (res.ok) {
        setSelectedInquiry(prev => ({ ...prev, notes: adminNote }));
        setInquiries(prev => prev.map(item => item.id === selectedInquiry.id ? { ...item, notes: adminNote } : item));
      }
    } catch (e) {
      console.error('Failed to save note', e);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت تأكد من رغبتك في حذف هذا الاستفسار؟')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        fetchInquiries();
      }
    } catch (e) {
      console.error('Failed to delete inquiry', e);
    }
  };

  const openWhatsAppReply = (inquiry) => {
    const cleanPhone = inquiry.phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('962') ? cleanPhone : cleanPhone.startsWith('0') ? `962${cleanPhone.slice(1)}` : `962${cleanPhone}`;
    const text = `مرحباً أستاذ/ة ${inquiry.name} ✨%0Aمعك دار دهب للعطور.%0Aبخصوص استفسارك حول (${inquiry.type}):%0A`;
    
    // Automatically set status to replied if replying
    handleStatusChange(inquiry.id, 'replied');

    window.open(`https://wa.me/${formattedPhone}?text=${text}`, '_blank');
  };

  const openDetailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNote(inquiry.notes || '');
    if (inquiry.status === 'new') {
      handleStatusChange(inquiry.id, 'read');
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto text-white dir-ar">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-white font-serif">
              استفسارات ورسائل العملاء
            </h1>
            {countsMap.new > 0 && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold animate-pulse">
                {countsMap.new} جديد
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1 font-light">
            إدارة وتتبع استفسارات الزوار الواردة من صفحة التواصل والتفاعل معها مباشرة.
          </p>
        </div>

        <LuxuryButton
          variant="secondary"
          onClick={fetchInquiries}
          className="text-xs"
        >
          <ArrowClockwise size={16} className={loading ? 'animate-spin' : ''} />
          <span>تحديث القائمة</span>
        </LuxuryButton>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div 
          onClick={() => setActiveStatus('all')}
          className={`p-5 rounded-2xl bg-[#121216] border transition-all cursor-pointer ${activeStatus === 'all' ? 'border-[#c5a25d] shadow-[0_0_15px_rgba(197,162,93,0.15)]' : 'border-[#c5a25d]/10 hover:border-[#c5a25d]/30'}`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold">إجمالي الرسائل</span>
            <ChatTeardropText size={20} className="text-[#c5a25d]" />
          </div>
          <span className="text-2xl font-bold text-white font-mono">{countsMap.all}</span>
        </div>

        <div 
          onClick={() => setActiveStatus('new')}
          className={`p-5 rounded-2xl bg-[#121216] border transition-all cursor-pointer ${activeStatus === 'new' ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-[#c5a25d]/10 hover:border-emerald-500/30'}`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-emerald-400">جديد غير مقروء</span>
            <Clock size={20} className="text-emerald-400" />
          </div>
          <span className="text-2xl font-bold text-emerald-400 font-mono">{countsMap.new}</span>
        </div>

        <div 
          onClick={() => setActiveStatus('read')}
          className={`p-5 rounded-2xl bg-[#121216] border transition-all cursor-pointer ${activeStatus === 'read' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-[#c5a25d]/10 hover:border-blue-500/30'}`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-blue-400">تم الاطلاع</span>
            <Eye size={20} className="text-blue-400" />
          </div>
          <span className="text-2xl font-bold text-blue-400 font-mono">{countsMap.read}</span>
        </div>

        <div 
          onClick={() => setActiveStatus('replied')}
          className={`p-5 rounded-2xl bg-[#121216] border transition-all cursor-pointer ${activeStatus === 'replied' ? 'border-[#c5a25d] shadow-[0_0_15px_rgba(197,162,93,0.15)]' : 'border-[#c5a25d]/10 hover:border-[#c5a25d]/30'}`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-[#c5a25d]">تم الرد</span>
            <CheckCircle size={20} className="text-[#c5a25d]" />
          </div>
          <span className="text-2xl font-bold text-[#c5a25d] font-mono">{countsMap.replied}</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#121216] border border-[#c5a25d]/10 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو رقم الهاتف..."
            className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a25d]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Funnel size={16} />
            <span>نوع الاستفسار:</span>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a25d] cursor-pointer"
          >
            <option value="all">جميع الأنواع</option>
            <option value="استفسار عن عطر">استفسار عن عطر</option>
            <option value="توفر منتج">توفر منتج</option>
            <option value="طلب توصية">طلب توصية</option>
            <option value="طلب سابق">طلب سابق</option>
            <option value="استفسار عام">استفسار عام</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#121216] border border-[#c5a25d]/15 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">جاري تحميل الاستفسارات...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm font-light">
            لا توجد استفسارات مطابقة للخيارات المحددة.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#181820] text-gray-400 border-b border-white/10 font-semibold uppercase">
                <tr>
                  <th className="px-6 py-4">العميل</th>
                  <th className="px-6 py-4">نوع الاستفسار</th>
                  <th className="px-6 py-4">معاينة الرسالة</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((inquiry) => {
                  const statusInfo = STATUS_LABELS[inquiry.status] || STATUS_LABELS.new;
                  const formattedDate = new Date(inquiry.created_at).toLocaleDateString('ar-JO', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr 
                      key={inquiry.id} 
                      className={`hover:bg-white/[0.02] transition-colors ${inquiry.status === 'new' ? 'bg-emerald-500/[0.03]' : ''}`}
                    >
                      {/* Customer Name & Phone */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{inquiry.name}</div>
                        <div className="text-gray-400 font-mono dir-ltr text-right text-[11px] mt-0.5">
                          {inquiry.phone}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-[#c5a25d]/10 border border-[#c5a25d]/20 text-[#c5a25d] text-[11px] font-medium inline-block">
                          {inquiry.type}
                        </span>
                      </td>

                      {/* Message Preview */}
                      <td className="px-6 py-4 max-w-xs">
                        <p 
                          onClick={() => openDetailModal(inquiry)}
                          className="text-gray-300 line-clamp-2 cursor-pointer hover:text-white transition-colors"
                        >
                          {inquiry.message}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold inline-block ${statusInfo.bg}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-400 text-[11px]">
                        {formattedDate}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* WhatsApp Reply */}
                          <LuxuryButton
                            variant="whatsapp"
                            onClick={() => openWhatsAppReply(inquiry)}
                            title="رد عبر الواتساب"
                            className="!p-2 !w-auto !h-auto !min-h-0 !min-w-0"
                          >
                            <WhatsappLogo size={16} weight="bold" />
                          </LuxuryButton>

                          {/* View details */}
                          <LuxuryButton
                            variant="icon"
                            onClick={() => openDetailModal(inquiry)}
                            title="عرض التفاصيل"
                            className="!p-2 !w-auto !h-auto !min-h-0 !min-w-0 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg transition-all"
                          >
                            <Eye size={16} />
                          </LuxuryButton>

                          {/* Delete */}
                          <LuxuryButton
                            variant="icon"
                            onClick={() => handleDelete(inquiry.id)}
                            title="حذف"
                            className="!p-2 !w-auto !h-auto !min-h-0 !min-w-0 bg-red-500/10 hover:bg-red-500 text-red-400 hover:!text-white border border-red-500/20 rounded-lg transition-all"
                          >
                            <Trash size={16} />
                          </LuxuryButton>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#121216] border border-[#c5a25d]/30 rounded-3xl max-w-2xl w-full p-6 md:p-8 text-white relative shadow-2xl space-y-6">
            
            {/* Close */}
            <LuxuryButton 
              variant="icon"
              onClick={() => setSelectedInquiry(null)}
              className="absolute left-6 top-6 !p-2 !w-auto !h-auto !min-h-0 !min-w-0 bg-white/5 hover:bg-white/10 text-gray-400 hover:!text-white rounded-full transition-all"
            >
              <X size={20} />
            </LuxuryButton>

            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs text-[#c5a25d] font-semibold bg-[#c5a25d]/10 px-3 py-1 rounded-full border border-[#c5a25d]/20">
                  {selectedInquiry.type}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full border ${STATUS_LABELS[selectedInquiry.status]?.bg}`}>
                  {STATUS_LABELS[selectedInquiry.status]?.label}
                </span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-white mt-2">
                تفاصيل استفسار {selectedInquiry.name}
              </h2>
            </div>

            {/* Customer Details Box */}
            <div className="grid grid-cols-2 gap-4 bg-[#181820] border border-white/5 p-4 rounded-2xl">
              <div>
                <span className="text-[11px] text-gray-400 block">الاسم:</span>
                <span className="text-sm font-semibold text-white">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block">رقم الهاتف:</span>
                <a 
                  href={`tel:${selectedInquiry.phone}`}
                  className="text-sm font-mono text-[#c5a25d] dir-ltr inline-block hover:underline"
                >
                  {selectedInquiry.phone}
                </a>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs text-gray-400 block mb-2 font-semibold">نص الرسالة:</span>
              <div className="p-4 rounded-2xl bg-[#0a0a0c] border border-white/10 text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Change Status */}
            <div>
              <span className="text-xs text-gray-400 block mb-2 font-semibold">تغيير حالة الاستفسار:</span>
              <div className="flex flex-wrap gap-2">
                {['new', 'read', 'replied', 'archived'].map(st => (
                  <LuxuryButton
                    key={st}
                    variant={selectedInquiry.status === st ? 'primary' : 'ghost'}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className="!px-3.5 !py-1.5 rounded-xl text-xs font-semibold"
                  >
                    {STATUS_LABELS[st].label}
                  </LuxuryButton>
                ))}
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <span className="text-xs text-gray-400 block mb-2 font-semibold">ملاحظات الإدارة الداخلية:</span>
              <textarea
                rows={3}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="أضف ملاحظة خاصة بالإدارة حول هذا الاستفسار..."
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a25d]"
              />
              <LuxuryButton
                variant="outline"
                onClick={handleSaveNote}
                disabled={savingNote}
                className="mt-2 text-xs"
              >
                {savingNote ? 'جاري الحفظ...' : 'حفظ الملاحظة'}
              </LuxuryButton>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <LuxuryButton
                variant="whatsapp"
                onClick={() => openWhatsAppReply(selectedInquiry)}
                className="px-6 py-3 text-xs"
              >
                <WhatsappLogo size={18} weight="bold" />
                <span>مراسلة عبر الواتساب</span>
              </LuxuryButton>

              <LuxuryButton
                variant="ghost"
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2.5 text-xs"
              >
                إغلاق
              </LuxuryButton>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
