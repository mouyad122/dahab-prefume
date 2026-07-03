'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function PosLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 429) {
          if (data.blocked) {
            setError('تم حظر عنوان IP الخاص بك. تواصل مع المدير لحل المشكلة.');
          } else {
            setError('Too many attempts. Try again later.');
          }
        } else if (res.status === 401) {
          setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
        } else if (res.status === 403) {
          setError('تم تعطيل حسابك. تواصل مع المدير.');
        } else {
          setError(data.error || 'Login failed');
        }
        return;
      }

      // Success
      if (data.permissions?.can_access_counter) {
        router.push('/pos/counter');
      } else {
        router.push('/pos/invoices');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center relative overflow-hidden dir-ar">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-gold)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-gold)] opacity-5 rounded-full blur-[100px] pointer-events-none" />

      <div className="glass-card w-full max-w-md p-10 relative z-10 border border-[var(--color-border-strong)] shadow-[var(--shadow-gold)]">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold tracking-widest text-[var(--color-gold-light)] mb-2">
            DAHAB
          </h1>
          <div className="text-[0.6rem] font-bold tracking-[0.3em] text-[var(--color-text-muted)] uppercase mb-6">
            PERFUMES
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            بوابة الموظف
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">نظام المبيعات (POS)</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-[rgba(180,30,30,0.12)] border border-[rgba(180,30,30,0.3)] text-[#f97171] text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="form-label text-[var(--color-text-muted)]">اسم المستخدم</label>
            <input 
              type="text" 
              className="form-input text-left" 
              dir="ltr"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="form-label text-[var(--color-text-muted)]">كلمة المرور</label>
            <input 
              type="password" 
              className="form-input text-left" 
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <LuxuryButton 
            type="submit" 
            variant="primary"
            fullWidth
            className="mt-4 h-12 text-base shadow-[var(--shadow-gold)]"
            disabled={loading}
            loading={loading}
          >
            تسجيل الدخول
          </LuxuryButton>
        </form>

        <div className="mt-10 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-6">
          &copy; {new Date().getFullYear()} DAHAB PERFUMES. جميع الحقوق محفوظة.
        </div>
      </div>
    </main>
  );
}
