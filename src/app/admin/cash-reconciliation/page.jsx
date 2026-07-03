'use client';

import React, { useState } from 'react';
import { Money, Calculator, CheckCircle, Warning } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminCashReconciliation() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [employee, setEmployee] = useState('');
  
  // Simulated data for UI
  const expectedCash = 1250.500; // JOD
  const expectedCard = 450.000;
  
  const [actualCash, setActualCash] = useState('');
  const [notes, setNotes] = useState('');
  
  const diff = actualCash ? (parseFloat(actualCash) - expectedCash) : null;
  const isDeficit = diff !== null && diff < 0;
  const isSurplus = diff !== null && diff > 0;

  const formatJOD = (val) => `${val.toFixed(3)} JOD`;

  return (
    <div className="flex flex-col gap-6 h-full max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          تسوية النقدية (End of Day)
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          مطابقة الكاش الفعلي في الصندوق مع المبيعات المسجلة في النظام
        </p>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="form-label">تاريخ التسوية</label>
            <input 
              type="date" 
              className="form-input text-left dir-en font-mono"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">الموظف / نقطة البيع</label>
            <select className="form-select" value={employee} onChange={e => setEmployee(e.target.value)}>
              <option value="">-- اختر الموظف --</option>
              <option value="1">أحمد الزعبي (الفرع الرئيسي)</option>
              <option value="2">محمود علي (الفرع الرئيسي)</option>
            </select>
          </div>
        </div>

        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h3 className="text-sm font-bold text-[var(--color-gold-light)] mb-4 flex items-center gap-2">
            <Calculator size={18} />
            <span>حسابات النظام (المتوقعة)</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-bg-primary)]">
              <div className="text-xs text-[var(--color-text-muted)] mb-1">إجمالي المبيعات</div>
              <div className="text-xl font-mono font-bold text-[var(--color-text-primary)]">{formatJOD(expectedCash + expectedCard)}</div>
            </div>
            <div className="p-4 border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-bg-primary)] border-b-4 border-b-[#5ddb85]">
              <div className="text-xs text-[var(--color-text-muted)] mb-1">المبيعات النقدية (الكاش المتوقع)</div>
              <div className="text-xl font-mono font-bold text-[#5ddb85]">{formatJOD(expectedCash)}</div>
            </div>
            <div className="p-4 border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-bg-primary)] border-b-4 border-b-[#a07cf0]">
              <div className="text-xs text-[var(--color-text-muted)] mb-1">مبيعات البطاقات (فيزا/ماستر)</div>
              <div className="text-xl font-mono font-bold text-[#a07cf0]">{formatJOD(expectedCard)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="form-label flex items-center gap-2">
              <Money size={16} className="text-[var(--color-gold)]" />
              <span>الكاش الفعلي في الصندوق (JOD)</span>
            </label>
            <input 
              type="number" 
              step="0.001"
              className="form-input text-xl font-mono font-bold dir-en text-left py-3 h-14"
              placeholder="0.000"
              value={actualCash}
              onChange={e => setActualCash(e.target.value)}
            />
            
            {diff !== null && (
              <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${isDeficit ? 'bg-red-500/10 border border-red-500/30' : isSurplus ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                {isDeficit || isSurplus ? <Warning size={20} className={isDeficit ? 'text-red-400' : 'text-orange-400'} weight="fill" /> : <CheckCircle size={20} className="text-[#5ddb85]" weight="fill" />}
                <div>
                  <div className={`font-bold ${isDeficit ? 'text-red-400' : isSurplus ? 'text-orange-400' : 'text-[#5ddb85]'}`}>
                    {isDeficit ? 'يوجد عجز في الصندوق' : isSurplus ? 'يوجد زيادة في الصندوق' : 'الصندوق مطابق تماماً'}
                  </div>
                  {(isDeficit || isSurplus) && (
                    <div className="font-mono text-lg font-bold mt-1">
                      {isDeficit ? '-' : '+'}{Math.abs(diff).toFixed(3)} JOD
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="form-label">ملاحظات الإدارة (اختياري)</label>
            <textarea 
              className="form-textarea h-32" 
              placeholder="اكتب أي ملاحظات حول العجز أو الزيادة أو سبب التسوية..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end border-t border-[var(--color-border-subtle)] pt-6">
          <LuxuryButton 
            variant="primary"
            className="px-8"
            disabled={!employee || !actualCash}
          >
            اعتماد وحفظ التسوية
          </LuxuryButton>
        </div>
      </div>
    </div>
  );
}
