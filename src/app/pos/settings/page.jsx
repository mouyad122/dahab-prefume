'use client';

import React, { useState, useEffect } from 'react';
import { Gear, CheckCircle, Clock } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function PosSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [posSettings, setPosSettings] = useState({
    pos_idle_timeout_mins: '5',
    pos_show_clock: 'true',
    pos_receipt_footer_note: 'شكراً لزيارتكم دهب للعطور - نرجو احتفاظكم بالفاتورة'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setPosSettings(prev => ({
            ...prev,
            ...data.settings
          }));
        }
      }
    } catch (e) {
      console.error('Failed to load POS settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: [
            { key: 'pos_idle_timeout_mins', value: posSettings.pos_idle_timeout_mins, category: 'pos' },
            { key: 'pos_show_clock', value: String(posSettings.pos_show_clock), category: 'pos' },
            { key: 'pos_receipt_footer_note', value: posSettings.pos_receipt_footer_note, category: 'pos' }
          ]
        })
      });

      if (res.ok) {
        setSuccessMsg('تم حفظ إعدادات الكاشير بنجاح');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (e) {
      alert('فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center text-white">
        <div className="spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto dir-ar text-white">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d]">
          <Gear size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif text-white">إعدادات نقطة البيع (POS)</h1>
          <p className="text-xs text-gray-400">تخصيص شاشة الكاشير والطباعة الخاصة بالفرع</p>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-[#121216]/80 backdrop-blur-md border border-[#c5a25d]/20 p-6 rounded-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <Clock size={16} className="text-[#c5a25d]" /> مهلة شاشة الخمول (بالدقائق)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={posSettings.pos_idle_timeout_mins}
              onChange={(e) => setPosSettings({ ...posSettings, pos_idle_timeout_mins: e.target.value })}
              className="w-full bg-[#0a0a0c] border border-[#c5a25d]/20 rounded-xl px-4 py-3 text-sm text-white focus:border-[#c5a25d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              نص ختام الفاتورة المطبوعة
            </label>
            <input
              type="text"
              value={posSettings.pos_receipt_footer_note}
              onChange={(e) => setPosSettings({ ...posSettings, pos_receipt_footer_note: e.target.value })}
              className="w-full bg-[#0a0a0c] border border-[#c5a25d]/20 rounded-xl px-4 py-3 text-sm text-white focus:border-[#c5a25d] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <LuxuryButton type="submit" variant="primary" loading={saving} size="md">
            حفظ الإعدادات
          </LuxuryButton>
        </div>
      </form>
    </div>
  );
}
