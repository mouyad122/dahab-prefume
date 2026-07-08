'use client';

import React, { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash, X, FloppyDisk, ShieldCheck, XCircle, DownloadSimple, Sparkle } from '@phosphor-icons/react';
import LuxuryButton from '../../../../components/ui/LuxuryButton';

export default function AdminFragranceAccords() {
  const [accords, setAccords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editId, setEditId] = useState(null);
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#000000');
  const [sortOrder, setSortOrder] = useState('0');
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  useEffect(() => {
    fetchAccords();
  }, []);

  const fetchAccords = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings/fragrance-accords');
      if (res.ok) {
        const data = await res.json();
        setAccords(data.accords || []);
      }
    } catch (e) {
      console.error('Failed to fetch accords', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setNameAr('');
    setNameEn('');
    setSlug('');
    setColor('#000000');
    setSortOrder('0');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (accord) => {
    setEditId(accord.id);
    setNameAr(accord.name_ar);
    setNameEn(accord.name_en || '');
    setSlug(accord.slug);
    setColor(accord.color || '#000000');
    setSortOrder(String(accord.sort_order || 0));
    setIsActive(accord.is_active);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`هل أنت متأكد من حذف البصمة العطرية (${name})؟`)) return;
    try {
      const res = await fetch(`/api/admin/settings/fragrance-accords/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAccords();
      } else {
        alert('فشل الحذف. قد تكون مرتبطة بمنتجات.');
      }
    } catch (e) {
      alert('حدث خطأ');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editId ? `/api/admin/settings/fragrance-accords/${editId}` : '/api/admin/settings/fragrance-accords';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name_ar: nameAr,
          name_en: nameEn,
          slug,
          color,
          sort_order: parseInt(sortOrder, 10),
          is_active: isActive
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchAccords();
      } else {
        const data = await res.json();
        alert(data.error || 'حدث خطأ أثناء الحفظ');
      }
    } catch (e) {
      alert('خطأ في الاتصال');
    } finally {
      setSubmitting(false);
    }
  };

  // Auto-import accords from existing products' fragrance_accords field
  const handleImportFromProducts = async () => {
    if (!confirm('سيتم استيراد البصمات العطرية من بيانات المنتجات الموجودة. هل تريد المتابعة؟')) return;
    setImporting(true);
    setImportResult(null);
    try {
      // Fetch all products
      const res = await fetch('/api/products?limit=500');
      const data = await res.json();
      const products = data.products || [];

      // Collect all unique accord names
      const accordSet = new Map(); // slug -> { name_ar, name_en, color }
      const PRESET_COLORS = {
        vanilla: '#d4a96a', wood: '#8B5E3C', woody: '#8B5E3C',
        citrus: '#f9c74f', amber: '#e9902a', musk: '#c8a8a0',
        floral: '#f4a0b0', rose: '#e07090', oud: '#5c2d1e',
        tobacco: '#6b4c3b', leather: '#8b4513', spice: '#a0522d',
        fresh: '#88c9d4', aquatic: '#4fc3f7', green: '#66bb6a',
        sweet: '#f48fb1', smoky: '#90a4ae', powdery: '#ce93d8',
      };

      products.forEach(p => {
        const fas = p.fragrance_accords || p.accords || [];
        fas.forEach(fa => {
          const nameAr = fa.name_ar || fa.label || fa;
          const nameEn = fa.name_en || fa.name || '';
          const rawSlug = (fa.slug || nameEn || nameAr || '')
            .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          if (rawSlug && !accordSet.has(rawSlug)) {
            const color = PRESET_COLORS[rawSlug] || fa.color || '#c5a25d';
            accordSet.set(rawSlug, { name_ar: nameAr, name_en: nameEn, slug: rawSlug, color });
          }
        });
      });

      if (accordSet.size === 0) {
        setImportResult({ added: 0, skipped: 0, message: 'لم يتم العثور على بصمات في المنتجات. تأكد أن المنتجات تحتوي حقل fragrance_accords.' });
        setImporting(false);
        return;
      }

      // Get existing accord slugs to avoid duplicates
      const existingSlugs = new Set(accords.map(a => a.slug));
      const toCreate = [...accordSet.values()].filter(a => !existingSlugs.has(a.slug));

      let added = 0;
      for (const accord of toCreate) {
        try {
          const r = await fetch('/api/admin/settings/fragrance-accords', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...accord, sort_order: added, is_active: true })
          });
          if (r.ok) added++;
        } catch {}
      }

      setImportResult({ added, skipped: accordSet.size - toCreate.length, total: accordSet.size });
      fetchAccords();
    } catch (e) {
      console.error(e);
      setImportResult({ error: 'حدث خطأ أثناء الاستيراد' });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full dir-ar">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-2">البصمات العطرية (Accords)</h1>
          <p className="text-gray-400 text-sm">
            إدارة البصمات العطرية التي تظهر للعملاء في صفحة المنتج (مثل: فانيلا، خشبي، الخ...)
          </p>
          {importResult && (
            <div className={`mt-2 text-xs px-3 py-2 rounded-lg ${importResult.error ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {importResult.error
                ? importResult.error
                : importResult.message
                ? importResult.message
                : `تم إضافة ${importResult.added} بصمة جديدة من أصل ${importResult.total} | تخطي ${importResult.skipped} موجودة مسبقاً`
              }
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <LuxuryButton
            variant="secondary"
            iconLeft={DownloadSimple}
            onClick={handleImportFromProducts}
            loading={importing}
          >
            استيراد من المنتجات
          </LuxuryButton>
          <LuxuryButton
            variant="primary"
            iconLeft={Plus}
            onClick={handleOpenAddModal}
          >
            إضافة بصمة عطرية
          </LuxuryButton>
        </div>
      </div>

      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="w-8 h-8 border-2 border-[#c5a25d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : accords.length === 0 ? (
            <div className="p-20 text-center text-gray-500">لا توجد بصمات عطرية مضافة.</div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[#121216] text-gray-400 text-xs sticky top-0 border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">الترتيب</th>
                  <th className="py-4 px-6">اللون</th>
                  <th className="py-4 px-6">الاسم (عربي)</th>
                  <th className="py-4 px-6">الاسم (انجليزي)</th>
                  <th className="py-4 px-6">المعرّف (Slug)</th>
                  <th className="py-4 px-6">الحالة</th>
                  <th className="py-4 px-6 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {accords.map(acc => (
                  <tr key={acc.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-6 font-mono text-gray-400">{acc.sort_order}</td>
                    <td className="py-4 px-6">
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: acc.color }}></div>
                    </td>
                    <td className="py-4 px-6 font-bold text-white">{acc.name_ar}</td>
                    <td className="py-4 px-6 text-gray-300">{acc.name_en || '-'}</td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-500">{acc.slug}</td>
                    <td className="py-4 px-6">
                      {acc.is_active ? (
                        <span className="text-emerald-400 font-bold text-xs flex items-center gap-1"><ShieldCheck size={14}/> مفعل</span>
                      ) : (
                        <span className="text-gray-500 font-bold text-xs flex items-center gap-1"><XCircle size={14}/> معطل</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleOpenEditModal(acc)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><PencilSimple size={16}/></button>
                        <button onClick={() => handleDelete(acc.id, acc.name_ar)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg"><Trash size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="bg-[#0a0a0c] border border-white/10 w-full max-w-lg rounded-2xl flex flex-col shadow-2xl">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#121216]">
              <h2 className="text-xl font-bold text-white">{editId ? 'تعديل بصمة عطرية' : 'إضافة بصمة عطرية'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-white"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">الاسم (عربي) *</label>
                <input type="text" required className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={nameAr} onChange={e => setNameAr(e.target.value)} />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">الاسم (انجليزي)</label>
                <input type="text" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={nameEn} onChange={e => setNameEn(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">المعرف (Slug) *</label>
                <input type="text" required dir="ltr" placeholder="vanilla" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">اللون المميز</label>
                  <div className="flex items-center gap-3 bg-[#121216] border border-white/10 rounded-lg p-2">
                    <input type="color" className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent" value={color} onChange={e => setColor(e.target.value)} />
                    <span className="font-mono text-xs text-gray-400">{color}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">الترتيب</label>
                  <input type="number" min="0" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={sortOrder} onChange={e => setSortOrder(e.target.value)} />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-[#121216] border border-white/10 text-[#c5a25d]" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
                  <span className="text-sm text-white font-bold">مفعّل (يظهر في الموقع)</span>
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#121216] flex justify-end gap-3">
              <LuxuryButton variant="secondary" onClick={() => setIsModalOpen(false)}>إلغاء</LuxuryButton>
              <LuxuryButton type="submit" variant="primary" loading={submitting}>حفظ</LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
