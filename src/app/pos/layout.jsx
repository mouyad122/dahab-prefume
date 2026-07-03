'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PosProvider } from '../../contexts/PosContext';
import POSSidebar from '../../components/pos/POSSidebar';
import { usePOSIdleTimer } from '../../hooks/usePOSIdleTimer';
import POSIdleScreensaver from '../../components/pos/POSIdleScreensaver';

export default function PosLayout({ children }) {
  const [session, setSession] = useState(null);
  const [posSettings, setPosSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const [res, settingsRes] = await Promise.all([
          fetch('/api/auth/employee/me'),
          fetch('/api/settings')
        ]);
        
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        
        const data = await res.json();
        setSession(data);
        
        try {
          if (settingsRes.ok) {
            const settingsData = await settingsRes.json();
            setPosSettings(settingsData?.pos || {});
          }
        } catch(e) {}

        
        // Check permissions against route
        if (pathname.includes('/pos/counter') && !data.permissions?.can_access_counter) {
          router.push('/pos/invoices');
        }
      } catch (e) {
        router.push('/pos/login');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [pathname, router]);

  // If on login page, render it directly without layout wrapper
  if (pathname === '/pos/login') {
    return children;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center">
        <div className="spinner mb-4 w-12 h-12"></div>
        <p className="text-[var(--color-gold-light)] font-display animate-pulse">جاري التحميل...</p>
      </div>
    );
  }

  if (!session) return null;

  const isIdleEnabled = posSettings?.pos_idle_enabled !== false && posSettings?.pos_idle_enabled !== 'false';
  let idleTimeout = parseInt(posSettings?.pos_idle_timeout_minutes);
  if (isNaN(idleTimeout) || idleTimeout < 1) idleTimeout = 4;
  
  const { isIdle, forceWake } = usePOSIdleTimer({
    enabled: isIdleEnabled,
    timeoutMinutes: idleTimeout
  });

  return (
    <PosProvider employee={session.employee} permissions={session.permissions}>
      {isIdle && (
        <POSIdleScreensaver 
          onWake={forceWake} 
          showClock={posSettings?.pos_idle_show_clock !== false && posSettings?.pos_idle_show_clock !== 'false'}
          requirePin={posSettings?.pos_idle_require_pin === true || posSettings?.pos_idle_require_pin === 'true'}
        />
      )}
      <div className="flex bg-[var(--color-bg-primary)] min-h-screen text-[var(--color-text-primary)]">
        <POSSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Universal POS Header */}
          <header className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border)] h-16 px-4 flex items-center justify-end no-print shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-[var(--color-text-primary)]">{session.employee?.display_name}</div>
                <div className="text-[0.65rem] text-[var(--color-gold)]">{session.employee?.role === 'manager' ? 'مدير فرع' : 'موظف مبيعات'}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-gold-dark)] font-bold text-sm shadow-sm">
                {session.employee?.display_name?.[0]?.toUpperCase() || 'E'}
              </div>
            </div>
          </header>
          <main className="flex-1 flex flex-col h-full overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </PosProvider>
  );
}
