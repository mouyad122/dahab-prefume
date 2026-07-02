'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from '@phosphor-icons/react';

export const dynamic = 'force-dynamic';

export default function AdminLogin() {
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
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 429) {
          if (data.blocked) {
            setError('Account locked due to too many failed attempts. Try again later.');
          } else {
            setError('Too many attempts. Try again later.');
          }
        } else if (res.status === 401) {
          setError('Invalid username or password.');
        } else {
          setError(data.error || 'Login failed');
        }
        return;
      }

      // Success
      router.push('/admin/dashboard');
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-gold)] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-gold)] opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-card w-full max-w-md p-10 md:p-12 relative z-10 border border-[var(--color-border-strong)] shadow-[var(--shadow-lg)]">
        
        {/* Language Toggle Placeholder (visual only for admin) */}
        <div className="absolute top-6 right-6 text-[var(--color-text-muted)]">
          <Globe size={20} />
        </div>

        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold tracking-widest text-[var(--color-gold-light)] mb-2">
            DAHAB
          </h1>
          <div className="text-[0.6rem] font-bold tracking-[0.3em] text-[var(--color-text-muted)] uppercase mb-6">
            PERFUMES
          </div>
          <h2 className="text-lg text-[var(--color-text-secondary)] uppercase tracking-widest">
            Admin Portal
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-[rgba(180,30,30,0.12)] border border-[rgba(180,30,30,0.3)] text-[#f97171] text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="form-label text-[var(--color-text-muted)] tracking-wider">USERNAME</label>
            <input 
              type="text" 
              className="form-input text-left" 
              dir="ltr"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              placeholder="Admin Username"
            />
          </div>
          <div>
            <label className="form-label text-[var(--color-text-muted)] tracking-wider">PASSWORD</label>
            <input 
              type="password" 
              className="form-input text-left" 
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary mt-2 w-full h-12 text-sm uppercase tracking-widest font-bold shadow-[var(--shadow-gold)]"
            disabled={loading}
          >
            {loading ? <div className="spinner mx-auto"></div> : 'Secure Login'}
          </button>
        </form>

      </div>
    </main>
  );
}
