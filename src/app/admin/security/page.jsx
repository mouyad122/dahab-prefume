'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldWarning, Prohibit, Clock, MapPin } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminSecurity() {
  const [activeTab, setActiveTab] = useState('attempts');

  // Simulated data
  const logs = [
    { id: 1, type: 'failed_login', ip: '192.168.1.105', user: 'admin', time: '10:45 AM', date: '2026-07-01', location: 'Amman, JO' },
    { id: 2, type: 'failed_login', ip: '192.168.1.105', user: 'admin', time: '10:46 AM', date: '2026-07-01', location: 'Amman, JO' },
    { id: 3, type: 'blocked_ip', ip: '192.168.1.105', user: 'system', time: '10:47 AM', date: '2026-07-01', location: 'Amman, JO', reason: 'Brute force protection (5 failed attempts)' },
    { id: 4, type: 'success_login', ip: '10.0.0.5', user: 'ahmed_pos', time: '09:00 AM', date: '2026-07-01', location: 'Amman, JO (Store)' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            سجل الأمان والحماية
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            مراقبة محاولات الدخول وحماية النظام من الهجمات
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-success)] bg-[var(--color-success-dim)] px-3 py-1.5 rounded-full border border-[var(--color-success-border)]">
          <ShieldCheck size={16} weight="fill" />
          <span>نظام الحماية مفعل</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-info-dim)] flex items-center justify-center text-[var(--color-info)]">
            <ShieldCheck size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[var(--color-text-primary)]">12</div>
            <div className="text-xs text-[var(--color-text-muted)]">تسجيل دخول ناجح (اليوم)</div>
          </div>
        </div>
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-warning-dim)] flex items-center justify-center text-[var(--color-warning)]">
            <ShieldWarning size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[var(--color-text-primary)]">3</div>
            <div className="text-xs text-[var(--color-text-muted)]">محاولات فاشلة (اليوم)</div>
          </div>
        </div>
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-error-dim)] flex items-center justify-center text-[var(--color-error)]">
            <Prohibit size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[var(--color-error)]">1</div>
            <div className="text-xs text-[var(--color-text-muted)]">IPs محظورة حاليا̂</div>
          </div>
        </div>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border)]">
          <LuxuryButton 
            variant="ghost"
            className={`px-6 py-3 text-sm font-bold transition-colors !rounded-none !border-x-0 !border-t-0 ${activeTab === 'attempts' ? 'text-[var(--color-gold-light)] !border-b-2 !border-[var(--color-gold)] bg-[var(--color-bg-surface)]' : 'text-[var(--color-text-secondary)] hover:!text-white !border-b-transparent'}`}
            onClick={() => setActiveTab('attempts')}
          >
            سجل النشاطات
          </LuxuryButton>
          <LuxuryButton 
            variant="ghost"
            className={`px-6 py-3 text-sm font-bold transition-colors !rounded-none !border-x-0 !border-t-0 ${activeTab === 'blocked' ? 'text-red-400 !border-b-2 !border-red-500 bg-red-500/5' : 'text-[var(--color-text-secondary)] hover:!text-white !border-b-transparent'}`}
            onClick={() => setActiveTab('blocked')}
          >
            عناوين IP المحظورة
          </LuxuryButton>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border-subtle)]">
              <tr>
                <th className="py-3 px-5 font-normal">الحدث</th>
                <th className="py-3 px-5 font-normal">الوقت والتاريخ</th>
                <th className="py-3 px-5 font-normal">عنوان IP</th>
                <th className="py-3 px-5 font-normal">المستخدم / التفاصيل</th>
                <th className="py-3 px-5 font-normal">الموقع التقريبي</th>
                <th className="py-3 px-5 font-normal w-24">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {logs.filter(l => activeTab === 'attempts' ? true : l.type === 'blocked_ip').map(log => (
                <tr key={log.id} className="hover:bg-[var(--color-bg-surface)] transition-colors group">
                  <td className="py-3 px-5">
                    {log.type === 'success_login' && <span className="flex items-center gap-1 text-xs text-[var(--color-success)]"><ShieldCheck size={14} /> دخول ناجح</span>}
                    {log.type === 'failed_login' && <span className="flex items-center gap-1 text-xs text-[var(--color-warning)]"><ShieldWarning size={14} /> محاولة فاشلة</span>}
                    {log.type === 'blocked_ip' && <span className="flex items-center gap-1 text-xs text-[var(--color-error)]"><Prohibit size={14} /> حظر IP</span>}
                  </td>
                  <td className="py-3 px-5 text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1 dir-en justify-end">
                      <span>{log.date}</span>
                      <Clock size={12} className="mx-1" />
                      <span>{log.time}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 font-mono text-sm text-[var(--color-text-primary)] dir-en text-right">
                    {log.ip}
                  </td>
                  <td className="py-3 px-5 text-[var(--color-text-muted)]">
                    {log.type === 'blocked_ip' ? (
                      <span className="text-[var(--color-error)] text-xs">{log.reason}</span>
                    ) : (
                      <span className="font-mono text-[var(--color-gold-light)]">{log.user}</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                      <MapPin size={12} /> {log.location}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    {log.type === 'blocked_ip' && (
                      <LuxuryButton variant="secondary" className="!py-1 px-3 text-xs hover:!border-green-500 hover:!text-green-500">
                        إلغاء الحظر
                      </LuxuryButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
