'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChartBar, Package, Tag, UsersThree, Coins, 
  Warehouse, Percent, Gear, ShieldWarning, 
  FileText, SignOut, List, X, CaretDown, Sparkle, Storefront, ChatTeardropText
} from '@phosphor-icons/react';
import LuxuryButton from '../ui/LuxuryButton';


export default function AdminSidebar({ user, open, setOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Track which sections are collapsed (roll up / roll down)
  const [collapsedSections, setCollapsedSections] = useState({
    'الرئيسية': false,
    'المتجر': false,
    'المبيعات والموظفين': false,
    'نظام الكاشير': false,
    'النظام': false
  });

  // Load from localStorage on mount (hydration safe)
  useEffect(() => {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    if (saved) {
      try {
        setCollapsedSections(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const toggleSection = (section) => {
    setCollapsedSections(prev => {
      const updated = {
        ...prev,
        [section]: !prev[section]
      };
      localStorage.setItem('admin_sidebar_collapsed', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/admin/logout', { method: 'POST' });
      await fetch('/api/auth/employee/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout failed');
    }
  };

  const isSuperAdmin = !user?.isEmployee || user?.role === 'admin' || user?.isSuperAdmin;
  const perms = user?.permissions || {};

  const rawNavItems = [
    { 
      section: 'الرئيسية', 
      items: [
        { 
          path: '/admin/dashboard', 
          label: 'نظرة عامة', 
          icon: ChartBar,
          show: isSuperAdmin || perms.can_view_accounting || perms.can_print_reports || perms.can_manage_products || perms.can_view_inventory || perms.can_manage_employees || perms.can_access_counter
        }
      ]
    },
    { 
      section: 'المتجر', 
      items: [
        { path: '/admin/products', label: 'المنتجات', icon: Package, show: isSuperAdmin || perms.can_manage_products },
        { path: '/admin/studio', label: 'ستوديو الذكاء الاصطناعي', icon: Sparkle, show: isSuperAdmin || perms.can_manage_products },
        { path: '/admin/categories', label: 'الأقسام', icon: Tag, show: isSuperAdmin || perms.can_manage_products },
        { path: '/admin/inventory', label: 'المخزون', icon: Warehouse, show: isSuperAdmin || perms.can_view_inventory || perms.can_manage_products },
        { path: '/admin/discounts', label: 'العروض والخصومات', icon: Percent, show: isSuperAdmin || perms.can_manage_products },
        { path: '/admin/inquiries', label: 'الاستفسارات والرسائل', icon: ChatTeardropText, show: isSuperAdmin || perms.can_view_settings || perms.can_manage_products },
      ]
    },
    { 
      section: 'المبيعات والموظفين', 
      items: [
        { path: '/admin/sales', label: 'المبيعات', icon: Coins, show: isSuperAdmin || perms.can_view_invoices || perms.can_view_accounting },
        { path: '/admin/reports', label: 'التقارير', icon: FileText, show: isSuperAdmin || perms.can_print_reports || perms.can_view_accounting },
        { path: '/admin/employees', label: 'الموظفين', icon: UsersThree, show: isSuperAdmin || perms.can_manage_employees },
      ]
    },
    { 
      section: 'نظام الكاشير',
      items: [
        { path: '/pos/counter', label: 'كاونتر البيع', icon: Storefront, show: isSuperAdmin || perms.can_access_counter },
      ]
    },
    { 
      section: 'النظام', 
      items: [
        { path: '/admin/settings', label: 'إعدادات الموقع', icon: Gear, show: isSuperAdmin || perms.can_view_settings },
        { path: '/admin/security', label: 'سجل الأمان', icon: ShieldWarning, show: isSuperAdmin || perms.can_view_settings },
      ]
    }
  ];

  const navItems = rawNavItems
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.show)
    }))
    .filter(group => group.items.length > 0);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${open ? 'open' : ''} dir-ar`}>
        
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-widest text-[var(--color-gold)] leading-none">
              DAHAB
            </span>
            <span className="text-[0.6rem] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mt-1">
              PERFUMES
            </span>
            <span className="text-[0.6rem] text-[var(--color-gold-light)] mt-2 font-mono bg-[var(--color-gold-dim)] px-2 py-0.5 inline-block w-fit rounded">
              ADMIN PANEL
            </span>
          </Link>
          <LuxuryButton 
            variant="icon" 
            className="lg:hidden" 
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </LuxuryButton>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 sidebar-nav-scroll">
          {navItems.map((group, gIdx) => {
            const isCollapsed = collapsedSections[group.section];
            return (
              <div key={gIdx} className="border-b border-[var(--color-border-subtle)]/30 pb-3 last:border-0">
                <button 
                  type="button"
                  onClick={() => toggleSection(group.section)}
                  className="flex items-center justify-between w-full text-[0.68rem] font-bold tracking-widest text-[var(--color-text-muted)] uppercase mb-2 px-2 hover:text-[var(--color-gold-light)] transition-colors text-right cursor-pointer"
                >
                  <span>{group.section}</span>
                  <CaretDown 
                    size={12} 
                    className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''} text-[var(--color-gold)]`} 
                  />
                </button>
                
                {/* Collapsible Submenu Container (Grid Height transition) */}
                <div className={`sidebar-submenu ${isCollapsed ? 'collapsed' : ''}`}>
                  <div className="sidebar-submenu-inner">
                    <ul className="flex flex-col gap-1 mt-1">
                      {group.items.map(item => {
                        const isActive = pathname.startsWith(item.path);
                        const Icon = item.icon;
                        return (
                          <li key={item.path}>
                            <Link
                              href={item.path}
                              className={`admin-nav-item ${isActive ? 'active' : ''}`}
                              onClick={() => setOpen(false)}
                            >
                              <Icon size={20} className="nav-icon shrink-0" weight={isActive ? "fill" : "regular"} />
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer / User Info */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]">
            <div className="w-10 h-10 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold-light)] font-bold">
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                {user?.username || 'Admin User'}
              </div>
              <div className="text-xs text-[var(--color-gold-light)]">
                المدير العام
              </div>
            </div>
          </div>
          <LuxuryButton
            onClick={handleLogout}
            variant="ghost"
            fullWidth
            className="!text-[#f97171] hover:!bg-[rgba(180,30,30,0.12)] hover:!border-[rgba(180,30,30,0.3)]"
            iconLeft={(props) => <SignOut size={18} weight="bold" {...props} />}
          >
            تسجيل الخروج
          </LuxuryButton>
        </div>
      </aside>
    </>
  );
}
