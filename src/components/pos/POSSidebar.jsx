'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Storefront, Receipt, FileText, SignOut } from '@phosphor-icons/react';
import { usePosContext } from '../../contexts/PosContext';

export default function POSSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { employee, permissions } = usePosContext();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/employee/logout', { method: 'POST' });
      localStorage.removeItem(`pos_session_start_${employee?.id}`);
      router.push('/pos/login');
      router.refresh();
    } catch (e) {
      console.error('Logout failed');
    }
  };

  const navItems = [
    {
      path: '/pos/counter',
      label: 'كاونتر البيع',
      icon: Storefront,
      show: permissions?.can_access_counter
    },
    {
      path: '/pos/invoices',
      label: 'الفواتير',
      icon: Receipt,
      show: permissions?.can_view_invoices
    },
    {
      path: '/pos/report',
      label: 'تقرير اليوم',
      icon: FileText,
      show: permissions?.can_print_reports
    }
  ];

  return (
    <aside className="w-[260px] bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] flex flex-col no-print h-screen overflow-hidden">
      {/* Brand Header */}
      <div className="p-6 border-b border-[var(--color-border)] text-center">
        <div className="font-display text-2xl font-bold tracking-widest text-[var(--color-gold)] mb-1">DAHAB</div>
        <div className="text-[0.6rem] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">PERFUMES</div>
        
        <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-strong)] rounded-lg p-3">
          <div className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{employee?.display_name || 'موظف مبيعات'}</div>
          <div className="text-xs text-[var(--color-gold-light)]">{employee?.role === 'manager' ? 'مدير' : 'موظف'}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2 dir-ar overflow-y-auto">
        {navItems.filter(item => item.show).map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-[var(--color-gold-dim)] text-[var(--color-gold-dark)] border border-[var(--color-gold)]/30 font-bold' 
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]'
              }`}
            >
              <Icon size={22} className="ml-3 shrink-0" weight={isActive ? "fill" : "regular"} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-md text-sm font-bold text-[#f97171] hover:bg-[rgba(180,30,30,0.08)] border border-transparent hover:border-[#f97171]/30 transition-colors"
        >
          <SignOut size={18} weight="bold" />
          <span>تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
}
