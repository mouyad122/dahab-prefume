'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Translate, MapPin, WhatsappLogo, Storefront, DeviceMobile, FloppyDisk, X, Image as ImageIcon, Desktop, Clock } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        // Flat map the data to simple key-value for forms
        const flatData = {};
        Object.keys(data).forEach(cat => {
          Object.keys(data[cat]).forEach(key => {
            flatData[key] = data[cat][key];
          });
        });
        setOriginalData(flatData);
        setFormData(flatData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load settings', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleDiscard = () => {
    setFormData(originalData);
    setToast({ type: 'info', message: 'تم التراجع عن التغييرات' });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePublish = async () => {
    setSaving(true);
    // Convert back to API format
    const payload = {
      settings: [
        { key: 'store_name_ar', value: formData.store_name_ar || 'دهب للعطور', category: 'general' },
        { key: 'store_name_en', value: formData.store_name_en || 'DAHAB PERFUMES', category: 'general' },
        { key: 'hero_title_ar', value: formData.hero_title_ar || '', category: 'hero' },
        { key: 'hero_title_en', value: formData.hero_title_en || '', category: 'hero' },
        { key: 'hero_desc_ar', value: formData.hero_desc_ar || '', category: 'hero' },
        { key: 'hero_desc_en', value: formData.hero_desc_en || '', category: 'hero' },
        { key: 'whatsapp_number', value: formData.whatsapp_number || '', category: 'contact' },
        { key: 'phone_primary', value: formData.phone_primary || '', category: 'contact' },
        { key: 'address_ar', value: formData.address_ar || '', category: 'contact' },
        { key: 'address_en', value: formData.address_en || '', category: 'contact' },
        { key: 'pos_idle_enabled', value: formData.pos_idle_enabled !== undefined ? String(formData.pos_idle_enabled) : 'true', category: 'pos', value_type: 'boolean' },
        { key: 'pos_idle_timeout_minutes', value: formData.pos_idle_timeout_minutes || '4', category: 'pos', value_type: 'number' },
        { key: 'pos_idle_show_clock', value: formData.pos_idle_show_clock !== undefined ? String(formData.pos_idle_show_clock) : 'true', category: 'pos', value_type: 'boolean' },
        { key: 'pos_idle_require_pin', value: formData.pos_idle_require_pin !== undefined ? String(formData.pos_idle_require_pin) : 'false', category: 'pos', value_type: 'boolean' }
      ]
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setOriginalData(formData);
        setToast({ type: 'success', message: 'تم حفظ الإعدادات بنجاح ونشرها' });
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      setToast({ type: 'error', message: 'حدث خطأ أثناء الحفظ' });
    }
    setSaving(false);
    setTimeout(() => setToast(null), 3000);
  };

  const hasChanges = JSON.stringify(originalData) !== JSON.stringify(formData);

  if (loading) {
    return <div className="p-8 text-center text-[var(--color-text-muted)]">جاري تحميل الإعدادات...</div>;
  }

  return (
    <div className="flex flex-col gap-6 h-full max-w-5xl mx-auto relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-sm font-bold shadow-lg animate-in slide-in-from-top-2 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center bg-[var(--color-bg-secondary)] p-4 rounded-xl border border-[var(--color-border)] shadow-sm">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            إدارة المحتوى والإعدادات (CMS)
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            تحكم كامل بواجهة المتجر، النصوص، الألوان، والمحتوى
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <LuxuryButton variant="ghost" onClick={handleDiscard} disabled={saving} className="!text-red-400 hover:!bg-red-500/10">
              <X size={18} className="mr-2" /> التراجع
            </LuxuryButton>
          )}
          <LuxuryButton variant="primary" onClick={handlePublish} disabled={saving || !hasChanges}>
            <FloppyDisk size={18} className="mr-2" />
            {saving ? 'جاري الحفظ...' : 'نشر التغييرات'}
          </LuxuryButton>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="glass-card rounded-xl border border-[var(--color-border)] p-2 flex flex-col gap-1">
            {[
              { id: 'general', icon: Storefront, label: 'إعدادات عامة' },
              { id: 'hero', icon: ImageIcon, label: 'قسم الهيرو (الرئيسية)' },
              { id: 'contact', icon: WhatsappLogo, label: 'التواصل والموقع' },
              { id: 'theme', icon: Palette, label: 'المظهر والألوان' },
              { id: 'pos', icon: Desktop, label: 'إعدادات الكاشير (POS)' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm transition-colors text-right ${isActive ? 'bg-[var(--color-gold-dim)] text-[var(--color-gold-light)] border border-[var(--color-border-strong)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] border border-transparent'}`}
                >
                  <Icon size={18} />
                  <span className="font-bold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 glass-card border border-[var(--color-border-strong)] rounded-xl p-6 md:p-8">
          
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-[var(--color-gold-light)] mb-6 font-display border-b border-[var(--color-border)] pb-2">الإعدادات العامة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="form-label">اسم المتجر (عربي)</label>
                    <input type="text" className="form-input" value={formData.store_name_ar || ''} onChange={e => handleChange('store_name_ar', e.target.value)} />
                  </div>
                </div>
                
                <div className="space-y-4 dir-en text-left">
                  <div>
                    <label className="form-label">Store Name (English)</label>
                    <input type="text" className="form-input text-left" value={formData.store_name_en || ''} onChange={e => handleChange('store_name_en', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-[var(--color-gold-light)] mb-6 font-display border-b border-[var(--color-border)] pb-2">محتوى الهيرو (Hero Section)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="form-label">عنوان الهيرو (عربي)</label>
                    <input type="text" className="form-input" value={formData.hero_title_ar || ''} onChange={e => handleChange('hero_title_ar', e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label">وصف الهيرو (عربي)</label>
                    <textarea className="form-textarea h-24" value={formData.hero_desc_ar || ''} onChange={e => handleChange('hero_desc_ar', e.target.value)}></textarea>
                  </div>
                </div>
                
                <div className="space-y-4 dir-en text-left">
                  <div>
                    <label className="form-label">Hero Title (English)</label>
                    <input type="text" className="form-input text-left" value={formData.hero_title_en || ''} onChange={e => handleChange('hero_title_en', e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label">Hero Description (English)</label>
                    <textarea className="form-textarea h-24 text-left" value={formData.hero_desc_en || ''} onChange={e => handleChange('hero_desc_en', e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-[var(--color-gold-light)] mb-6 font-display border-b border-[var(--color-border)] pb-2">التواصل والموقع</h2>
              
              <div className="grid grid-cols-1 gap-6 max-w-2xl">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <WhatsappLogo size={16} /> <span>رقم الواتساب (مع رمز الدولة)</span>
                  </label>
                  <input type="text" className="form-input dir-en text-left" value={formData.whatsapp_number || ''} onChange={e => handleChange('whatsapp_number', e.target.value)} />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">يستخدم لزر الطلب المباشر</p>
                </div>
                
                <div>
                  <label className="form-label flex items-center gap-2">
                    <DeviceMobile size={16} /> <span>رقم الهاتف الأساسي</span>
                  </label>
                  <input type="text" className="form-input dir-en text-left" value={formData.phone_primary || ''} onChange={e => handleChange('phone_primary', e.target.value)} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label flex items-center gap-2">
                      <MapPin size={16} /> <span>العنوان (عربي)</span>
                    </label>
                    <input type="text" className="form-input" value={formData.address_ar || ''} onChange={e => handleChange('address_ar', e.target.value)} />
                  </div>
                  <div className="dir-en text-left">
                    <label className="form-label flex items-center gap-2">
                      <MapPin size={16} /> <span>Address (English)</span>
                    </label>
                    <input type="text" className="form-input text-left" value={formData.address_en || ''} onChange={e => handleChange('address_en', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-[var(--color-gold-light)] mb-6 font-display border-b border-[var(--color-border)] pb-2">إعدادات المظهر</h2>
              
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  تم ضبط ألوان الموقع بدقة لتعكس الهوية الفاخرة لعلامة دهب للعطور (Dark Luxury Gold). تعديل هذه الألوان مقيد لضمان الحفاظ على الجودة البصرية. <strong>لا يُسمح بإدخال أكواد CSS يدوياً.</strong>
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div>
                    <div className="w-full h-12 rounded border border-[var(--color-border)] bg-[#070504] mb-2"></div>
                    <div className="text-xs text-center text-[var(--color-text-muted)] font-mono">#070504<br/>Deep Black</div>
                  </div>
                  <div>
                    <div className="w-full h-12 rounded border border-[var(--color-border)] bg-[#24170F] mb-2"></div>
                    <div className="text-xs text-center text-[var(--color-text-muted)] font-mono">#24170F<br/>Espresso</div>
                  </div>
                  <div>
                    <div className="w-full h-12 rounded border border-[var(--color-border)] bg-[#B89657] mb-2"></div>
                    <div className="text-xs text-center text-[var(--color-text-muted)] font-mono">#B89657<br/>Muted Gold</div>
                  </div>
                  <div>
                    <div className="w-full h-12 rounded border border-[var(--color-border)] bg-[#D6B878] mb-2"></div>
                    <div className="text-xs text-center text-[var(--color-text-muted)] font-mono">#D6B878<br/>Soft Gold</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pos' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-[var(--color-gold-light)] mb-6 font-display border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
                <Desktop size={20} />
                إعدادات الكاشير وشاشة التوقف (POS)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                  <div>
                    <label className="font-bold text-sm block">تفعيل شاشة التوقف</label>
                    <span className="text-xs text-[var(--color-text-muted)]">إظهار شاشة توقف فاخرة عند خمول نقطة البيع</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.pos_idle_enabled !== false && formData.pos_idle_enabled !== 'false'}
                      onChange={e => handleChange('pos_idle_enabled', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-[var(--color-bg-surface)] peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]"></div>
                  </label>
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Clock size={16} /> <span>مدة الخمول (بالدقائق)</span>
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="60" 
                    className="form-input text-center" 
                    value={formData.pos_idle_timeout_minutes || '4'} 
                    onChange={e => {
                      let val = parseInt(e.target.value);
                      if (isNaN(val)) val = 4;
                      if (val < 1) val = 1;
                      if (val > 60) val = 60;
                      handleChange('pos_idle_timeout_minutes', val);
                    }} 
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">وقت عدم الاستخدام قبل ظهور شاشة التوقف (1 - 60 دقيقة)</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                  <div>
                    <label className="font-bold text-sm block">عرض الساعة</label>
                    <span className="text-xs text-[var(--color-text-muted)]">إظهار الوقت الحالي في شاشة التوقف</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.pos_idle_show_clock !== false && formData.pos_idle_show_clock !== 'false'}
                      onChange={e => handleChange('pos_idle_show_clock', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-[var(--color-bg-surface)] peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] opacity-60">
                  <div>
                    <label className="font-bold text-sm block">طلب رمز PIN بعد الخمول</label>
                    <span className="text-xs text-[var(--color-text-muted)]">(ميزة مستقبلية) إغلاق الشاشة برقم سري</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-not-allowed">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.pos_idle_require_pin === true || formData.pos_idle_require_pin === 'true'}
                      onChange={e => handleChange('pos_idle_require_pin', e.target.checked)}
                      disabled
                    />
                    <div className="w-11 h-6 bg-[var(--color-bg-surface)] peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
