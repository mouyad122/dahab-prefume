'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { List } from '@phosphor-icons/react';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Handle mobile screen width auto-collapse on load
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const checkSession = async () => {
      if (isLoginPage) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/admin/me');
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return children;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center">
        <div className="spinner mb-4 w-12 h-12 border-t-[var(--color-gold)]"></div>
        <p className="text-[var(--color-gold-light)] font-display animate-pulse tracking-widest text-lg">
          DAHAB PERFUMES
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex bg-[var(--color-bg-primary)] min-h-screen text-[var(--color-text-primary)] overflow-hidden relative">
      <AdminSidebar user={user} open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <main className={`admin-content flex-1 flex flex-col h-screen overflow-hidden ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Universal Header with Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] no-print dir-ar">
          <div className="w-10"></div> {/* spacer */}
          <div className="font-display font-bold text-[var(--color-gold-light)] tracking-widest text-lg">
            DAHAB ADMIN
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="icon-btn text-[var(--color-gold)] cursor-pointer hover:bg-[var(--color-gold-dim)]">
            <List size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 dir-ar relative">
          {children}
        </div>
      </main>
    </div>
  );
}
