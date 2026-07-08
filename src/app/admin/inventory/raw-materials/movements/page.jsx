'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { CaretRight, Flask, FileText, MagnifyingGlass } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function MovementsContent() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const materialId = searchParams.get('material_id');

  useEffect(() => {
    fetchMovements();
  }, [materialId]);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const url = materialId 
        ? `/api/admin/inventory/raw-materials/movements?material_id=${materialId}`
        : '/api/admin/inventory/raw-materials/movements';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMovements(data.movements || []);
      }
    } catch (e) {
      console.error('Failed to fetch movements', e);
    } finally {
      setLoading(false);
    }
  };

  const getMovementTypeLabel = (type) => {
    switch(type) {
      case 'INITIAL': return <span className="text-blue-400">رصيد افتتاحي</span>;
      case 'PURCHASE': return <span className="text-emerald-400">مشتريات</span>;
      case 'MANUAL_ADD': return <span className="text-emerald-400">إضافة يدوية</span>;
      case 'MANUAL_SUBTRACT': return <span className="text-orange-400">إنقاص يدوي</span>;
      case 'SALE_DEDUCTION': return <span className="text-gray-400">استهلاك مبيعات</span>;
      case 'DAMAGE': return <span className="text-red-400">تالف / هدر</span>;
      case 'LOSS': return <span className="text-red-400">فقدان</span>;
      default: return type;
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full dir-ar">
      <div className="flex items-center gap-4">
        <Link href="/admin/inventory/raw-materials" className="p-2 bg-[#121216] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <CaretRight size={20} />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <FileText size={24} className="text-[var(--color-gold)]" />
            سجل حركات المواد الخام
          </h1>
          <p className="text-gray-400 text-sm">
            تتبع كامل لعمليات الإضافة، الاستهلاك، والتسوية على مخزون المواد الخام.
          </p>
        </div>
      </div>

      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="w-8 h-8 border-2 border-[#c5a25d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : movements.length === 0 ? (
            <div className="p-20 text-center text-gray-500">لا توجد حركات مسجلة.</div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[#121216] text-gray-400 text-xs sticky top-0 border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">التاريخ والوقت</th>
                  <th className="py-4 px-6">المادة الخام</th>
                  <th className="py-4 px-6">نوع الحركة</th>
                  <th className="py-4 px-6">الكمية</th>
                  <th className="py-4 px-6">الموظف / النظام</th>
                  <th className="py-4 px-6">ملاحظات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {movements.map(mov => (
                  <tr key={mov.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-6 text-gray-400 text-xs">
                      {new Date(mov.created_at).toLocaleString('ar-JO')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">{mov.raw_material?.name_ar || 'مادة محذوفة'}</div>
                      <div className="font-mono text-[10px] text-gray-500">{mov.raw_material?.sku || '-'}</div>
                    </td>
                    <td className="py-4 px-6 font-bold text-xs">
                      {getMovementTypeLabel(mov.movement_type)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-mono font-bold ${mov.quantity_change > 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {mov.quantity_change > 0 ? '+' : ''}{mov.quantity_change} {mov.unit || mov.raw_material?.unit}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300 text-xs">{mov.created_by || 'SYSTEM'}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-400 max-w-[200px] truncate" title={mov.reason || ''}>
                      {mov.reason || '-'}
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

export default function AdminRawMaterialsMovements() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><div className="w-8 h-8 border-2 border-[#c5a25d] border-t-transparent rounded-full animate-spin"></div></div>}>
      <MovementsContent />
    </Suspense>
  );
}
