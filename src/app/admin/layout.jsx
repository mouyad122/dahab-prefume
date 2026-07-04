'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { List } from '@phosphor-icons/react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LuxuryButton from '../../components/ui/LuxuryButton';
import PageContainer from '../../components/layout/PageContainer';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const isCounterPage = pathname.startsWith('/admin/counter');

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
        const curUser = data.user;

        // Enforce permissions for non-superadmins (employees)
        if (curUser && !curUser.isSuperAdmin) {
          const perms = curUser.permissions || {};
          
          if (pathname.startsWith('/admin/settings') && !perms.can_view_settings) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/employees') && !perms.can_manage_employees) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/products') && !perms.can_manage_products) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/inventory') && !perms.can_view_inventory) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/discounts') && !perms.can_manage_products) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/sales') && !perms.can_view_invoices) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/reports') && !perms.can_print_reports) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/inquiries') && !perms.can_view_settings && !perms.can_manage_products) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/security') && !perms.can_view_settings) {
            router.push('/admin/dashboard');
            return;
          }
          if (pathname.startsWith('/admin/cash-reconciliation') && !perms.can_view_accounting) {
            router.push('/admin/dashboard');
            return;
          }
        }

        setUser(curUser);
      } catch (e) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [isLoginPage, router, pathname]);

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
          <LuxuryButton variant="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="!p-2 text-[var(--color-gold)] hover:!bg-[var(--color-gold-dim)] hover:!text-[var(--color-gold-light)] !w-auto !h-auto !min-h-0 !min-w-0 border-none">
            <List size={24} />
          </LuxuryButton>
          <div className="font-display font-bold text-[var(--color-gold-light)] tracking-widest text-lg">
            DAHAB ADMIN
          </div>
          <div className="w-10"></div> {/* spacer */}
        </div>

        <div className="flex-1 overflow-y-auto dir-ar relative">
          {isCounterPage ? (
            <div className="p-4 md:p-6">{children}</div>
          ) : (
            <PageContainer size="admin" className="min-h-full">
              {children}
            </PageContainer>
          )}
        </div>
      </main>
    </div>
  );
}
