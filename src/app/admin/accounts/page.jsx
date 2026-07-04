'use client';

import React, { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash, ShieldCheck, XCircle, X, UserGear, Storefront, ChartLineUp, Database, IdentificationBadge } from '@phosphor-icons/react';

const PERMISSION_GROUPS = [
  {
    title: 'نظام الكاشير والمبيعات',
    icon: Storefront,
    keys: [
      { key: 'can_access_counter', label: 'الوصول لكاونتر البيع', desc: 'يسمح بفتح نقطة البيع وتسجيل الطلبات' },
      { key: 'can_add_notes', label: 'إضافة ملاحظات', desc: 'يسمح بكتابة ملاحظات مخصصة على الفواتير' },
    ]
  },
  {
    title: 'الإدارة والتقارير',
    icon: ChartLineUp,
    keys: [
      { key: 'can_view_invoices', label: 'سجل الفواتير', desc: 'الاطلاع على كافة فواتير المتجر' },
      { key: 'can_print_reports', label: 'طباعة التقارير', desc: 'طباعة وتصدير تقارير المبيعات' },
      { key: 'can_view_accounting', label: 'الحسابات المالية', desc: 'الوصول للتسويات والأرباح' },
    ]
  },
  {
    title: 'المنتجات والمخزون',
    icon: Database,
    keys: [
      { key: 'can_manage_products', label: 'إدارة المنتجات', desc: 'إضافة وتعديل المنتجات والأقسام' },
      { key: 'can_view_inventory', label: 'إدارة المخزون', desc: 'متابعة وجرد كميات المنتجات' },
    ]
  },
  {
    title: 'النظام والصلاحيات',
    icon: UserGear,
    keys: [
      { key: 'can_manage_employees', label: 'إدارة الحسابات', desc: 'إضافة وتعديل صلاحيات المستخدمين' },
      { key: 'can_view_settings', label: 'إعدادات النظام', desc: 'التحكم بإعدادات المتجر العامة' },
    ]
  }
];

// Flat array for quick initialization
const PERMISSION_KEYS = PERMISSION_GROUPS.flatMap(g => g.keys.map(k => k.key));

export default function AdminAccounts() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  // Form Fields
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [permissions, setPermissions] = useState(
    PERMISSION_KEYS.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );
  
  // Tab state in Modal
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'permissions'

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/employees');
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
      }
    } catch (e) {
      console.error('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditEmployeeId(null);
    setDisplayName('');
    setUsername('');
    setPassword('');
    setRole('employee');
    setPermissions(PERMISSION_KEYS.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditEmployeeId(emp.id);
    setDisplayName(emp.display_name);
    setUsername(emp.username);
    setPassword('');
    setRole(emp.role || 'employee');
    setPermissions(
      PERMISSION_KEYS.reduce((acc, key) => ({
        ...acc,
        [key]: emp.permissions?.[key] === true
      }), {})
    );
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleTogglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      display_name: displayName,
      username: username,
      role: role,
      permissions: permissions
    };

    if (password) payload.password = password;

    try {
      const url = editEmployeeId ? `/api/employees/${editEmployeeId}` : '/api/employees';
      const method = editEmployeeId ? 'PUT' : 'POST';

      if (!editEmployeeId && !password) {
        alert('كلمة المرور مطلوبة للحساب الجديد');
        return;
      }

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchEmployees();
      } else {
        const err = await res.json();
        alert(err.error || 'فشل حفظ بيانات الحساب');
      }
    } catch (e) {
      alert('حدث خطأ في الاتصال بالشبكة');
    }
  };

  const handleToggleActive = async (id, currentActiveState) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentActiveState })
      });
      if (res.ok) fetchEmployees();
    } catch (e) {
      console.error('Failed to toggle account status');
    }
  };

  const getRoleBadge = (roleKey) => {
    switch (roleKey) {
      case 'admin': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#c5a25d]/10 text-[#c5a25d] border border-[#c5a25d]/20">مدير النظام</span>;
      case 'manager': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">مشرف الفرع</span>;
      case 'inventory': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">مسؤول مستودع</span>;
      case 'accountant': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">محاسب</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">موظف مبيعات</span>;
    }
  };

  const totalAccounts = employees.length;
  const activeAccounts = employees.filter(e => e.is_active).length;
  const adminAccounts = employees.filter(e => e.role === 'admin' || e.role === 'manager').length;

  return (
    <div className="flex flex-col gap-8 h-full dir-ar">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            إدارة الحسابات والموظفين
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            التحكم الكامل بصلاحيات الوصول، الموظفين، والمدراء. 
            يتم تطبيق مبدأ الصلاحيات الدقيقة (RBAC) لضمان أمان النظام.
          </p>
        </div>
        
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 rounded-lg font-bold text-sm"
        >
          <Plus size={18} weight="bold" />
          <span>حساب جديد</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121216] border border-white/5 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">إجمالي الحسابات</p>
            <p className="text-2xl font-mono text-white">{totalAccounts}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
            <IdentificationBadge size={20} weight="duotone" />
          </div>
        </div>
        <div className="bg-[#121216] border border-white/5 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-500/70 uppercase font-bold tracking-wider mb-1">الحسابات النشطة</p>
            <p className="text-2xl font-mono text-emerald-400">{activeAccounts}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={20} weight="duotone" />
          </div>
        </div>
        <div className="bg-[#121216] border border-white/5 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#c5a25d]/70 uppercase font-bold tracking-wider mb-1">حسابات الإدارة</p>
            <p className="text-2xl font-mono text-[#c5a25d]">{adminAccounts}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#c5a25d]/10 flex items-center justify-center text-[#c5a25d]">
            <UserGear size={20} weight="duotone" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-[#c5a25d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <IdentificationBadge size={48} className="mb-4 opacity-20" />
              <p>لا توجد حسابات مسجلة في النظام.</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[#121216] text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10 border-b border-white/10">
                <tr>
                  <th className="py-4 px-6 font-bold">المستخدم</th>
                  <th className="py-4 px-6 font-bold">الدور الوظيفي</th>
                  <th className="py-4 px-6 font-bold hidden md:table-cell">تاريخ الانضمام</th>
                  <th className="py-4 px-6 font-bold">الحالة</th>
                  <th className="py-4 px-6 font-bold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-white font-bold text-xs">
                          {emp.display_name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <div className="font-bold text-white mb-0.5">{emp.display_name}</div>
                          <div className="font-mono text-[10px] text-gray-500">@{emp.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getRoleBadge(emp.role)}
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="text-gray-400 text-xs">
                        {new Date(emp.created_at).toLocaleDateString('ar-JO')}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {emp.is_active ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          نشط
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                          معطل
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEditModal(emp)}
                          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                          title="تعديل الحساب"
                        >
                          <PencilSimple size={16} />
                        </button>
                        <button 
                          onClick={() => handleToggleActive(emp.id, emp.is_active)}
                          className={`p-2 rounded-lg bg-white/5 transition-colors ${emp.is_active ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
                          title={emp.is_active ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                        >
                          {emp.is_active ? <XCircle size={16} /> : <ShieldCheck size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Enterprise Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="bg-[#0a0a0c] border border-white/10 w-full max-w-3xl rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#121216]">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {editEmployeeId ? 'تحديث بيانات الحساب' : 'إنشاء حساب جديد'}
                </h2>
                <p className="text-xs text-gray-400 font-mono">{editEmployeeId || 'ID_PENDING'}</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-white/10 bg-[#0a0a0c] px-6 pt-2">
              <button 
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'basic' ? 'border-[#c5a25d] text-[#c5a25d]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                البيانات الأساسية
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('permissions')}
                className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'permissions' ? 'border-[#c5a25d] text-[#c5a25d]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                الصلاحيات والأمان
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0c]">
              
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الاسم المعروض</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#c5a25d] focus:ring-1 focus:ring-[#c5a25d] outline-none transition-all"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        placeholder="الاسم الكامل"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الدور الوظيفي</label>
                      <select 
                        className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#c5a25d] focus:ring-1 focus:ring-[#c5a25d] outline-none transition-all"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                      >
                        <option value="admin">مدير نظام (صلاحيات كاملة)</option>
                        <option value="manager">مدير فرع</option>
                        <option value="employee">كاشير / مبيعات</option>
                        <option value="inventory">مستودع</option>
                        <option value="accountant">محاسب</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">اسم المستخدم (للتسجيل)</label>
                      <input 
                        type="text" 
                        dir="ltr"
                        className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#c5a25d] outline-none transition-all"
                        value={username}
                        onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="user_name"
                        required
                        disabled={!!editEmployeeId}
                      />
                      {!!editEmployeeId && <p className="text-[10px] text-red-400 mt-1">لا يمكن تغيير اسم المستخدم بعد الإنشاء</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        {editEmployeeId ? 'تغيير كلمة المرور (اختياري)' : 'كلمة المرور'}
                      </label>
                      <input 
                        type="password" 
                        dir="ltr"
                        className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#c5a25d] outline-none transition-all"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required={!editEmployeeId}
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PERMISSION_GROUPS.map((group, idx) => (
                    <div key={idx} className="bg-[#121216] border border-white/5 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
                        <group.icon size={20} className="text-[#c5a25d]" weight="duotone" />
                        <h3 className="font-bold text-sm text-white">{group.title}</h3>
                      </div>
                      <div className="space-y-4">
                        {group.keys.map(item => (
                          <label key={item.key} className="flex items-start gap-3 cursor-pointer group/toggle">
                            <div className="relative flex items-center justify-center mt-0.5">
                              <input 
                                type="checkbox" 
                                className="sr-only"
                                checked={permissions[item.key] === true}
                                onChange={() => handleTogglePermission(item.key)}
                              />
                              <div className={`w-10 h-5 rounded-full transition-colors ${permissions[item.key] ? 'bg-[#c5a25d]' : 'bg-gray-700'}`}></div>
                              <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${permissions[item.key] ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm font-bold transition-colors ${permissions[item.key] ? 'text-white' : 'text-gray-400 group-hover/toggle:text-gray-300'}`}>{item.label}</span>
                              <span className="text-[10px] text-gray-500 mt-0.5">{item.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:px-6 sm:py-4 border-t border-white/10 bg-[#121216] flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                إلغاء
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#c5a25d] text-black hover:bg-[#d6b36e] transition-colors shadow-[0_0_15px_rgba(197,162,93,0.3)]"
              >
                {editEmployeeId ? 'حفظ التحديثات' : 'إنشاء الحساب'}
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
