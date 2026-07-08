'use client';

import React, { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash, MagnifyingGlass, Flask, WarningCircle } from '@phosphor-icons/react';
import LuxuryButton from '../../../../components/ui/LuxuryButton';

export default function AdminRawMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  
  // Form State
  const [editId, setEditId] = useState(null);
  const [sku, setSku] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [type, setType] = useState('OIL'); // OIL, ALCOHOL, FIXATIVE, BOTTLE, CAP, OTHER
  const [unit, setUnit] = useState('ML'); // ML, PIECE
  const [costPerUnit, setCostPerUnit] = useState('0');
  const [initialStock, setInitialStock] = useState('0');
  const [lowStockThreshold, setLowStockThreshold] = useState('0');
  const [submitting, setSubmitting] = useState(false);

  // Adjust Form State
  const [adjustId, setAdjustId] = useState(null);
  const [adjustType, setAdjustType] = useState('MANUAL_ADD');
  const [adjustQty, setAdjustQty] = useState('');
  const [adjustNote, setAdjustNote] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMaterials();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inventory/raw-materials?search=${encodeURIComponent(search)}`);
      if (res.ok) {
        const data = await res.json();
        setMaterials(data.rawMaterials || []);
      }
    } catch (e) {
      console.error('Failed to fetch raw materials', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setSku('');
    setNameAr('');
    setNameEn('');
    setType('OIL');
    setUnit('ML');
    setCostPerUnit('0');
    setInitialStock('0');
    setLowStockThreshold('0');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (mat) => {
    setEditId(mat.id);
    setSku(mat.sku);
    setNameAr(mat.name_ar);
    setNameEn(mat.name_en || '');
    setType(mat.type);
    setUnit(mat.unit);
    setCostPerUnit(String(mat.cost_per_unit || 0));
    setInitialStock(String(mat.current_quantity || 0)); // used only for display when editing, won't update stock
    setLowStockThreshold(String(mat.low_stock_threshold || 0));
    setIsModalOpen(true);
  };

  const handleOpenAdjustModal = (mat) => {
    setAdjustId(mat.id);
    setAdjustType('MANUAL_ADD');
    setAdjustQty('');
    setAdjustNote('');
    setIsAdjustModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`هل أنت متأكد من حذف المادة (${name})؟`)) return;
    try {
      const res = await fetch(`/api/admin/inventory/raw-materials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMaterials();
      } else {
        const data = await res.json();
        alert(data.error || 'فشل الحذف. قد تكون مستخدمة.');
      }
    } catch (e) {
      alert('حدث خطأ');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editId ? `/api/admin/inventory/raw-materials/${editId}` : '/api/admin/inventory/raw-materials';
      const method = editId ? 'PUT' : 'POST';
      
      const payload = {
        sku,
        name_ar: nameAr,
        name_en: nameEn,
        type,
        unit,
        cost_per_unit: parseFloat(costPerUnit) || 0,
        low_stock_threshold: parseFloat(lowStockThreshold) || 0
      };

      if (!editId) {
        payload.initial_stock = parseFloat(initialStock) || 0;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchMaterials();
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

  const handleAdjustSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/inventory/raw-materials/${adjustId}/adjust`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movement_type: adjustType,
          quantity_changed: parseFloat(adjustQty),
          reference_note: adjustNote
        })
      });

      if (res.ok) {
        setIsAdjustModalOpen(false);
        fetchMaterials();
      } else {
        const data = await res.json();
        alert(data.error || 'حدث خطأ أثناء التسوية');
      }
    } catch (e) {
      alert('خطأ في الاتصال');
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeLabel = (typeCode) => {
    const types = {
      'OIL': 'زيت عطري',
      'ALCOHOL': 'كحول',
      'FIXATIVE': 'مثبت',
      'BOTTLE': 'زجاجة',
      'CAP': 'غطاء',
      'OTHER': 'أخرى'
    };
    return types[typeCode] || typeCode;
  };

  return (
    <div className="flex flex-col gap-8 h-full dir-ar">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Flask size={24} className="text-[var(--color-gold)]" />
            المواد الخام
          </h1>
          <p className="text-gray-400 text-sm">
            إدارة الزيوت، الكحول، والزجاجات لتركيب العطور ومتابعة استهلاكها بالمليلتر.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <MagnifyingGlass size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="ابحث بالاسم أو SKU..." 
              className="w-full bg-[#121216] border border-white/10 rounded-lg pr-10 pl-4 py-2 text-sm text-white focus:border-[#c5a25d] outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <LuxuryButton 
            variant="primary" 
            iconLeft={Plus} 
            onClick={handleOpenAddModal}
            className="shrink-0"
          >
            مادة جديدة
          </LuxuryButton>
          <LuxuryButton 
            variant="secondary"
            onClick={() => window.location.href = '/admin/inventory/raw-materials/movements'}
            className="shrink-0"
          >
            سجل الحركات
          </LuxuryButton>
        </div>
      </div>

      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="w-8 h-8 border-2 border-[#c5a25d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : materials.length === 0 ? (
            <div className="p-20 text-center text-gray-500">لا توجد مواد تطابق البحث.</div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[#121216] text-gray-400 text-xs sticky top-0 border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">SKU</th>
                  <th className="py-4 px-6">المادة</th>
                  <th className="py-4 px-6">النوع</th>
                  <th className="py-4 px-6">الكمية المتوفرة</th>
                  <th className="py-4 px-6">الوحدة</th>
                  <th className="py-4 px-6">تنبيه النقص</th>
                  <th className="py-4 px-6 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {materials.map(mat => {
                  const currentQuantity = mat.current_quantity || 0;
                  const isLow = currentQuantity <= mat.low_stock_threshold;
                  return (
                    <tr key={mat.id} className="hover:bg-white/[0.02]">
                      <td className="py-4 px-6 font-mono text-gray-400">{mat.sku}</td>
                      <td className="py-4 px-6 font-bold text-white">{mat.name_ar}</td>
                      <td className="py-4 px-6 text-gray-300">
                        <span className="px-2 py-1 bg-white/5 rounded text-[10px]">{getTypeLabel(mat.type)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-mono font-bold ${isLow ? 'text-red-400' : 'text-emerald-400'}`}>
                          {currentQuantity.toFixed(2)}
                        </span>
                        {isLow && <WarningCircle size={14} className="inline text-red-400 mr-1" />}
                      </td>
                      <td className="py-4 px-6 text-gray-400">{mat.unit}</td>
                      <td className="py-4 px-6 text-gray-500 font-mono">{mat.low_stock_threshold}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleOpenAdjustModal(mat)} className="p-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 rounded-lg" title="تسوية المخزون"><Flask size={16}/></button>
                          <button onClick={() => handleOpenEditModal(mat)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg" title="تعديل"><PencilSimple size={16}/></button>
                          <button onClick={() => handleDelete(mat.id, mat.name_ar)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg" title="حذف"><Trash size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="bg-[#0a0a0c] border border-white/10 w-full max-w-xl rounded-2xl flex flex-col shadow-2xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#121216]">
              <h2 className="text-xl font-bold text-white">{editId ? 'تعديل مادة خام' : 'إضافة مادة خام جديدة'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-white"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">SKU (رمز المادة) *</label>
                  <input type="text" required dir="ltr" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={sku} onChange={e => setSku(e.target.value.toUpperCase().replace(/\s+/g, ''))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">النوع *</label>
                  <select className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={type} onChange={e => setType(e.target.value)}>
                    <option value="OIL">زيت عطري</option>
                    <option value="ALCOHOL">كحول / مذيب</option>
                    <option value="FIXATIVE">مثبت</option>
                    <option value="BOTTLE">زجاجة</option>
                    <option value="CAP">غطاء / مضخة</option>
                    <option value="OTHER">أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">الاسم (عربي) *</label>
                <input type="text" required className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={nameAr} onChange={e => setNameAr(e.target.value)} />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">الاسم (انجليزي)</label>
                <input type="text" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={nameEn} onChange={e => setNameEn(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">وحدة القياس *</label>
                  <select className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="ML">مليلتر (ML)</option>
                    <option value="PIECE">حبة / قطعة (Piece)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">التكلفة للوحدة الواحدة</label>
                  <input type="number" step="0.001" min="0" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={costPerUnit} onChange={e => setCostPerUnit(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">حد النقص (التنبيه)</label>
                  <input type="number" step="0.01" min="0" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={lowStockThreshold} onChange={e => setLowStockThreshold(e.target.value)} />
                </div>
                {!editId && (
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">الرصيد الافتتاحي</label>
                    <input type="number" step="0.01" min="0" className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={initialStock} onChange={e => setInitialStock(e.target.value)} />
                  </div>
                )}
                {editId && (
                  <div className="opacity-50">
                    <label className="block text-xs font-bold text-gray-400 mb-2">الكمية الحالية</label>
                    <input type="text" readOnly disabled className="w-full bg-transparent border border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-500 font-mono" value={initialStock} />
                    <span className="text-[10px] text-gray-500 block mt-1">تعديل المخزون يتم من حركات المخزون</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#121216] flex justify-end gap-3 shrink-0">
              <LuxuryButton variant="secondary" onClick={() => setIsModalOpen(false)}>إلغاء</LuxuryButton>
              <LuxuryButton type="submit" variant="primary" loading={submitting}>حفظ</LuxuryButton>
            </div>
          </form>
        </div>
      )}

      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <form onSubmit={handleAdjustSubmit} className="bg-[#0a0a0c] border border-white/10 w-full max-w-md rounded-2xl flex flex-col shadow-2xl">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#121216]">
              <h2 className="text-xl font-bold text-white">تسوية مخزون المادة</h2>
              <button type="button" onClick={() => setIsAdjustModalOpen(false)} className="p-2 text-gray-400 hover:text-white"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">نوع التسوية *</label>
                <select className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" value={adjustType} onChange={e => setAdjustType(e.target.value)}>
                  <option value="MANUAL_ADD">إضافة يدوية (MANUAL_ADD)</option>
                  <option value="MANUAL_SUBTRACT">إنقاص يدوي (MANUAL_SUBTRACT)</option>
                  <option value="DAMAGE">تالف / هدر (DAMAGE)</option>
                  <option value="LOSS">فقدان (LOSS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">الكمية *</label>
                <input type="number" step="0.01" min="0.01" required className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono" value={adjustQty} onChange={e => setAdjustQty(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">ملاحظة التوثيق</label>
                <textarea className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white h-24" value={adjustNote} onChange={e => setAdjustNote(e.target.value)} placeholder="مثال: استلام طلبية جديدة..." />
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#121216] flex justify-end gap-3 shrink-0">
              <LuxuryButton variant="secondary" onClick={() => setIsAdjustModalOpen(false)}>إلغاء</LuxuryButton>
              <LuxuryButton type="submit" variant="primary" loading={submitting}>تنفيذ التسوية</LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
