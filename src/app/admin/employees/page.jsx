'use client';

import React, { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash, ShieldCheck, XCircle, X } from '@phosphor-icons/react';

const PERMISSION_KEYS = [
  { key: 'can_access_counter', label: 'الوصول لكاونتر البيع' },
  { key: 'can_view_invoices', label: 'عرض الفواتير' },
  { key: 'can_print_reports', label: 'طباعة التقارير' },
  { key: 'can_add_notes', label: 'إضافة ملاحظات على الفواتير' },
  { key: 'can_view_inventory', label: 'عرض المخزون' },
  { key: 'can_manage_products', label: 'إدارة المنتجات' },
  { key: 'can_manage_employees', label: 'إدارة الموظفين' },
  { key: 'can_view_accounting', label: 'عرض الحسابات المالية' },
  { key: 'can_view_settings', label: 'الوصول للإعدادات' },
];

export default function AdminEmployees() {
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
    PERMISSION_KEYS.reduce((acc, item) => ({ ...acc, [item.key]: false }), {})
  );

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
      console.error('Failed to fetch employees');
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
    setPermissions(PERMISSION_KEYS.reduce((acc, item) => ({ ...acc, [item.key]: false }), {}));
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditEmployeeId(emp.id);
    setDisplayName(emp.display_name);
    setUsername(emp.username);
    setPassword(''); // Leave password empty for edits unless they want to change it
    setRole(['employee', 'manager'].includes(emp.role) ? emp.role : 'manager');
    setPermissions(
      PERMISSION_KEYS.reduce((acc, item) => ({
        ...acc,
        [item.key]: emp.permissions?.[item.key] === true
      }), {})
    );
    setIsModalOpen(true);
  };

  const handleTogglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      display_name: displayName,
      username: username,
      role: role,
      permissions: permissions
    };

    if (password) {
      payload.password = password;
    }

    try {
      const url = editEmployeeId ? `/api/employees/${editEmployeeId}` : '/api/employees';
      const method = editEmployeeId ? 'PUT' : 'POST';

      // If creating, password is required
      if (!editEmployeeId && !password) {
        alert('كلمة المرور مطلوبة للموظف الجديد');
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
        alert(err.error || 'Failed to save employee');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleToggleActive = async (id, currentActiveState) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentActiveState })
      });

      if (res.ok) {
        fetchEmployees();
      }
    } catch (e) {
      console.error('Failed to toggle employee status');
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full dir-ar">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة الموظفين
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            إدارة حسابات وصلاحيات موظفي المبيعات والمدراء
          </p>
        </div>
        <button 
          className="btn-primary text-sm flex items-center gap-2"
          onClick={handleOpenAddModal}
        >
          <Plus size={16} />
          <span>موظف جديد</span>
        </button>
      </div>

      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="spinner w-8 h-8"></div>
            </div>
          ) : employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-[var(--color-text-muted)]">
              <p>لا يوجد موظفين مضافين</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] text-xs sticky top-0 z-10 shadow-sm border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-5 font-normal">الاسم</th>
                  <th className="py-3 px-5 font-normal">اسم المستخدم</th>
                  <th className="py-3 px-5 font-normal">الدور</th>
                  <th className="py-3 px-5 font-normal">الصلاحيات</th>
                  <th className="py-3 px-5 font-normal">الحالة</th>
                  <th className="py-3 px-5 font-normal w-24">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-[var(--color-bg-surface)] transition-colors group">
                    <td className="py-3 px-5">
                      <div className="font-bold text-[var(--color-text-primary)]">{emp.display_name}</div>
                    </td>
                    <td className="py-3 px-5 font-mono text-[var(--color-text-secondary)]">
                      {emp.username}
                    </td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold ${emp.role === 'manager' ? 'bg-[#5ddb85]/10 text-[#5ddb85]' : 'bg-[var(--color-gold-dim)] text-[var(--color-gold-light)]'}`}>
                        {emp.role === 'manager' ? 'مدير فرع' : 'موظف مبيعات'}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex flex-wrap gap-1">
                        {emp.permissions?.can_access_counter && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]" title="كاونتر البيع">🛒 كاشير</span>}
                        {emp.permissions?.can_view_invoices && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]" title="الفواتير">🧾 فواتير</span>}
                        {emp.permissions?.can_print_reports && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]" title="التقارير">📊 تقارير</span>}
                        {emp.permissions?.can_manage_products && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[0.65rem]" title="المنتجات">📦 منتجات</span>}
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      {emp.is_active ? (
                        <div className="flex items-center gap-1 text-xs text-[#5ddb85]"><ShieldCheck size={14} weight="fill" /> نشط</div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-red-400"><XCircle size={14} weight="fill" /> معطل</div>
                      )}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] p-1 transition-colors" 
                          title="تعديل"
                          onClick={() => handleOpenEditModal(emp)}
                        >
                          <PencilSimple size={18} />
                        </button>
                        <button 
                          className={`p-1 transition-colors ${emp.is_active ? 'text-red-400 hover:text-red-500' : 'text-[#5ddb85] hover:text-[#43c46e]'}`}
                          title={emp.is_active ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                          onClick={() => handleToggleActive(emp.id, emp.is_active)}
                        >
                          {emp.is_active ? <Trash size={18} /> : <ShieldCheck size={18} />}
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
      
      {/* Employee Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="glass-card w-full max-w-lg p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-xl font-bold text-[var(--color-gold-light)]">
                {editEmployeeId ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}
              </h2>
              <button type="button" className="text-[var(--color-text-muted)] hover:text-white" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="form-label">الاسم المعروض (الاسم الثنائي)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="مثال: أحمد الزعبي"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">اسم المستخدم (بالإنجليزي فقط)</label>
                  <input 
                    type="text" 
                    className="form-input text-left" 
                    dir="ltr"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="example_username"
                    required
                    disabled={!!editEmployeeId} // Cannot change username after creation
                  />
                </div>
                <div>
                  <label className="form-label">
                    {editEmployeeId ? 'كلمة مرور جديدة (اختياري)' : 'كلمة المرور (6 خانات فأكثر)'}
                  </label>
                  <input 
                    type="password" 
                    className="form-input text-left" 
                    dir="ltr"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="******"
                    required={!editEmployeeId}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">الدور الوظيفي</label>
                <select 
                  className="form-select"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="employee">موظف مبيعات / كاشير</option>
                  <option value="manager">مدير فرع / مشرف مبيعات</option>
                </select>
              </div>

              <div>
                <label className="form-label border-b border-[var(--color-border)] pb-2 mb-3 block">صلاحيات الموظف</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PERMISSION_KEYS.map(item => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer p-2 rounded bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-sm transition-colors">
                      <input 
                        type="checkbox" 
                        checked={permissions[item.key] === true}
                        onChange={() => handleTogglePermission(item.key)}
                        className="rounded border-[var(--color-border)] text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
              <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setIsModalOpen(false)}>إلغاء</button>
              <button type="submit" className="btn-primary px-4 py-2 text-sm">حفظ البيانات</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
