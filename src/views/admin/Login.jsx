'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/useAuthStore';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Lock, User, Warning, Globe } from '@phosphor-icons/react';
import LuxuryButton from '../../components/ui/LuxuryButton';

export default function Login() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const isAr = language === 'ar';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const login = useAuthStore(state => state.login);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const hydrateAuth = useAuthStore(state => state.hydrateAuth);
  const router = useRouter();

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError(isAr ? 'يرجى إدخال اسم المستخدم وكلمة المرور.' : 'Please enter username and password.');
      return;
    }
    
    const success = login(username.trim(), password.trim());
    if (success) {
      router.push('/admin');
    } else {
      setError(isAr ? 'اسم المستخدم أو كلمة المرور غير صحيحة.' : 'Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col justify-between py-12 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square rounded-full bg-[var(--color-gold-glow)] filter blur-[120px] pointer-events-none opacity-40" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] aspect-square rounded-full bg-[var(--color-gold-glow)] filter blur-[120px] pointer-events-none opacity-40" />

      {/* Top Bar for Language switching */}
      <div className="w-full max-w-7xl mx-auto flex justify-end z-10">
        <LuxuryButton
          variant="outline"
          onClick={toggleLanguage}
          className="!px-4 !py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] hover:!text-[var(--color-gold)] hover:!border-[var(--color-gold)]"
          aria-label={isAr ? 'Switch to English' : 'تغيير للغة العربية'}
          iconLeft={Globe}
        >
          {isAr ? 'English' : 'العربية'}
        </LuxuryButton>
      </div>

      {/* Login Main Card - Double Bezel Layout */}
      <div className="flex-1 flex items-center justify-center z-10 my-8">
        <div className="w-full max-w-md rounded-[3rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500">
          <div className="rounded-[calc(3rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-10 shadow-2xl flex flex-col gap-6 text-start">
            
            <div className="text-center flex flex-col gap-2">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-[0.2em] text-[var(--color-gold)] leading-none">
                DAHAB PERFUMES
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-secondary)] mt-2 font-bold ${isAr ? 'font-sans-ar' : 'font-sans-en'}`}>
                {isAr ? 'بوابة المدير الآمنة' : 'Secure Admin Portal'}
              </span>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl flex items-center gap-2">
                <Warning size={16} className="shrink-0" />
                <span className={isAr ? 'font-sans-ar' : 'font-sans-en'}>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Username field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                  <User size={12} />
                  <span>{isAr ? 'اسم المستخدم' : 'Username'}</span>
                </label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => { setUsername(e.target.value); setError(''); }} 
                  placeholder={isAr ? 'أدخل اسم المستخدم' : 'Enter username'}
                  className="form-input text-xs" 
                  required 
                  autoComplete="username"
                  dir="ltr"
                />
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                  <Lock size={12} />
                  <span>{isAr ? 'كلمة المرور' : 'Password'}</span>
                </label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => { setPassword(e.target.value); setError(''); }} 
                  placeholder={isAr ? '••••••••' : '••••••••'}
                  className="form-input text-xs" 
                  required 
                  autoComplete="current-password"
                  dir="ltr"
                />
              </div>

              {/* Submit button */}
              <LuxuryButton 
                type="submit" 
                variant="primary"
                className="w-full justify-center text-xs font-bold uppercase tracking-[0.15em] py-4 rounded-full mt-3 shadow-lg"
              >
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </LuxuryButton>
            </form>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="w-full text-center z-10">
        <p className="text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} DAHAB PERFUMES. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </p>
      </div>
    </div>
  );
}
