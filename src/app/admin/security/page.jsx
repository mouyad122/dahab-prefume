'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldWarning, Prohibit, Clock, MapPin, Plus, X } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminSecurity() {
  const [activeTab, setActiveTab] = useState('attempts');
  const [loading, setLoading] = useState(true);

  const [attempts, setAttempts] = useState([]);
  const [stats, setStats] = useState({ total: 0, failed: 0, success: 0 });
  const [blockedList, setBlockedList] = useState([]);

  // Block Modal State
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockIp, setBlockIp] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [submittingBlock, setSubmittingBlock] = useState(false);

  useEffect(() => {
    fetchSecurityData();
  }, [activeTab]);

  const fetchSecurityData = async () => {
    setLoading(true);
    try {
      const typeParam = activeTab === 'attempts' ? 'attempts' : 'blocked';
      const res = await fetch(`/api/security?type=${typeParam}`);
      if (res.ok) {
        const data = await res.json();
        if (activeTab === 'attempts') {
          setAttempts(data.attempts || []);
          if (data.stats) setStats(data.stats);
        } else {
          setBlockedList(data.blocked || []);
        }
      }
    } catch (e) {
      console.error('Failed to fetch security data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (ipAddress) => {
    if (!window.confirm(`هل أنت تأكد من رغبتك في إلغاء حظر الـ IP (${ipAddress})؟`)) return;

    try {
      const res = await fetch('/api/security/unblock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip_address: ipAddress })
      });

      if (res.ok) {
        alert(`تم إلغاء حظر الـ IP (${ipAddress}) بنجاح.`);
        fetchSecurityData();
      } else {
        const err = await res.json();
        alert(err.error || 'فشل إلغاء الحظر');
      }
    } catch (e) {
      alert('حدث خطأ في الاتصال بالشبكة');
    }
  };

  const handleManualBlock = async (e) => {
    e.preventDefault();
    if (!blockIp.trim()) {
      alert('يرجى كتابة عنوان IP الصحيح');
      return;
    }

    setSubmittingBlock(true);
    try {
      const res = await fetch('/api/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip_address: blockIp.trim(),
          reason: blockReason || 'حظر يدوي من الأدمن',
          durationHours: 72
        })
      });

      if (res.ok) {
        setIsBlockModalOpen(false);
        setBlockIp('');
        setBlockReason('');
        fetchSecurityData();
      } else {
        const data = await res.json();
        alert(data.error || 'فشل الحظر');
      }
    } catch (e) {
      alert('حدث خطأ أثناء حظر الـ IP');
    } finally {
      setSubmittingBlock(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full dir-ar">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            سجل الأمان وحماية النظام
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            مراقبة محاولات الدخول، تسجيل النشاطات، وتتبع العناوين المحظورة
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LuxuryButton
            variant="danger"
            size="sm"
            className="text-xs flex items-center gap-1.5"
            iconLeft={Plus}
            onClick={() => setIsBlockModalOpen(true)}
          >
            حظر IP يدويًا
          </LuxuryButton>
          <div className="flex items-center gap-2 text-xs text-[var(--color-success)] bg-[var(--color-success-dim)] px-3 py-1.5 rounded-full border border-[var(--color-success-border)]">
            <ShieldCheck size={16} weight="fill" />
            <span>نظام الحماية مفعل</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-info-dim)] flex items-center justify-center text-[var(--color-info)]">
            <ShieldCheck size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[var(--color-text-primary)]">{stats.success}</div>
            <div className="text-xs text-[var(--color-text-muted)]">تسجيل دخول ناجح</div>
          </div>
        </div>
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-warning-dim)] flex items-center justify-center text-[var(--color-warning)]">
            <ShieldWarning size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-amber-400">{stats.failed}</div>
            <div className="text-xs text-[var(--color-text-muted)]">محاولات دخول فاشلة</div>
          </div>
        </div>
        <div className="glass-card p-4 border border-[var(--color-border)] rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-error-dim)] flex items-center justify-center text-[var(--color-error)]">
            <Prohibit size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[var(--color-error)]">{blockedList.length}</div>
            <div className="text-xs text-[var(--color-text-muted)]">عنوان IP محظور حاليًا</div>
          </div>
        </div>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border)] bg-[#121216]">
          <button 
            type="button"
            className={`px-6 py-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'attempts' ? 'text-[var(--color-gold-light)] border-[var(--color-gold)] bg-[var(--color-bg-surface)]' : 'text-gray-400 border-transparent hover:text-white'}`}
            onClick={() => setActiveTab('attempts')}
          >
            سجل محاولات الدخول
          </button>
          <button 
            type="button"
            className={`px-6 py-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'blocked' ? 'text-red-400 border-red-500 bg-red-500/5' : 'text-gray-400 border-transparent hover:text-white'}`}
            onClick={() => setActiveTab('blocked')}
          >
            عناوين IP المحظورة ({blockedList.length})
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : activeTab === 'attempts' ? (
            attempts.length === 0 ? (
              <div className="p-20 text-center text-gray-400 text-xs">لا توجد محاولات دخول مسجلة.</div>
            ) : (
              <table className="w-full text-right text-xs">
                <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] sticky top-0 z-10 border-b border-[var(--color-border-subtle)]">
                  <tr>
                    <th className="py-3 px-5 font-normal">النتيجة</th>
                    <th className="py-3 px-5 font-normal">الوقت والتاريخ</th>
                    <th className="py-3 px-5 font-normal">عنوان IP</th>
                    <th className="py-3 px-5 font-normal">الحساب والمستخدم</th>
                    <th className="py-3 px-5 font-normal">نوع الحساب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                  {attempts.map(item => (
                    <tr key={item.id} className="hover:bg-[var(--color-bg-surface)] transition-colors">
                      <td className="py-3 px-5">
                        {item.success ? (
                          <span className="inline-flex items-center gap-1 text-xs text-[#5ddb85] font-bold">
                            <ShieldCheck size={14} /> دخول ناجح
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400 font-bold">
                            <ShieldWarning size={14} /> محاولة فاشلة
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-5 font-mono text-gray-400">
                        {new Date(item.created_at).toLocaleString('ar-JO')}
                      </td>
                      <td className="py-3 px-5 font-mono font-bold text-white dir-ltr text-right">
                        {item.ip_address}
                      </td>
                      <td className="py-3 px-5 font-mono text-[var(--color-gold-light)] font-bold">
                        {item.employee?.display_name || item.username || 'زائر'}
                      </td>
                      <td className="py-3 px-5 text-gray-400">
                        {item.user_type === 'employee' ? 'كاشير' : 'أدمن'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            blockedList.length === 0 ? (
              <div className="p-20 text-center text-gray-400 text-xs">لا توجد عناوين IP محظورة حاليًا.</div>
            ) : (
              <table className="w-full text-right text-xs">
                <thead className="bg-[#181820] text-gray-300 sticky top-0 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-5">عنوان IP المحظور</th>
                    <th className="py-3 px-5">سبب الحظر</th>
                    <th className="py-3 px-5">تاريخ الحظر</th>
                    <th className="py-3 px-5">ينتهي في</th>
                    <th className="py-3 px-5 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blockedList.map(b => (
                    <tr key={b.id || b.ip_address} className="hover:bg-white/5">
                      <td className="py-3 px-5 font-mono font-bold text-red-400 dir-ltr text-right">
                        {b.ip_address}
                      </td>
                      <td className="py-3 px-5 text-gray-300">{b.reason || b.details || 'حظر أمني تلقائي'}</td>
                      <td className="py-3 px-5 font-mono text-gray-400">
                        {new Date(b.created_at).toLocaleString('ar-JO')}
                      </td>
                      <td className="py-3 px-5 font-mono text-gray-400">
                        {b.expires_at ? new Date(b.expires_at).toLocaleString('ar-JO') : 'دائم'}
                      </td>
                      <td className="py-3 px-5 text-center">
                        <LuxuryButton
                          variant="secondary"
                          size="sm"
                          className="!py-1 px-3 text-xs font-semibold hover:!border-emerald-500 hover:!text-emerald-400"
                          onClick={() => handleUnblock(b.ip_address)}
                        >
                          إلغاء الحظر
                        </LuxuryButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>

      {/* Manual Block Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleManualBlock} className="glass-card w-full max-w-md p-6 border border-red-500/30 flex flex-col gap-4 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="font-display text-lg font-bold text-red-400 flex items-center gap-2">
                <Prohibit size={20} /> حظر عنوان IP جديد
              </h2>
              <LuxuryButton variant="icon" className="!p-1 text-gray-400 hover:text-white border-none rounded-full" onClick={() => setIsBlockModalOpen(false)}>
                <X size={20} />
              </LuxuryButton>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">عنوان IP المراد حظره *</label>
                <input
                  type="text"
                  placeholder="192.168.1.100"
                  dir="ltr"
                  value={blockIp}
                  onChange={e => setBlockIp(e.target.value)}
                  className="form-input w-full font-mono text-left"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">سبب الحظر *</label>
                <input
                  type="text"
                  placeholder="محاولات اختراق أو نشاط مشبوه..."
                  value={blockReason}
                  onChange={e => setBlockReason(e.target.value)}
                  className="form-input w-full"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2">
              <LuxuryButton variant="secondary" className="px-4 py-2 text-xs" onClick={() => setIsBlockModalOpen(false)}>إلغاء</LuxuryButton>
              <LuxuryButton type="submit" variant="danger" className="px-4 py-2 text-xs" loading={submittingBlock}>حظر الـ IP</LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
