'use client';

import React, { useState, useEffect } from 'react';
import { Palette, MapPin, WhatsappLogo, Storefront, DeviceMobile, FloppyDisk, X, Image as ImageIcon, Desktop, Clock, Heartbeat, Database, Lightning, ArrowsClockwise, HardDrive, CheckCircle, WarningCircle, XCircle } from '@phosphor-icons/react';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);

  // Health state
  const [health, setHealth]           = useState(null);
  const [healthLoading, setHealthLoading] = useState(false);

  const fetchHealth = async () => {
    setHealthLoading(true);
    try {
      const res = await fetch('/api/admin/health');
      if (res.ok) setHealth(await res.json());
    } catch {}
    finally { setHealthLoading(false); }
  };

  // Auto-load health when that tab opens
  const handleTabChange = (id) => {
    setActiveTab(id);
    if (id === 'health' && !health) fetchHealth();
  };

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
        { key: 'store_google_maps_url', value: formData.store_google_maps_url || 'https://maps.google.com/?q=Dahab+Perfumes+Amman', category: 'contact' },
        { key: 'store_map_embed_url', value: formData.store_map_embed_url || 'https://maps.google.com/maps?q=Dahab%20Perfumes,%20Prince%20Mohammad%20Street,%20Amman&t=&z=16&ie=UTF8&iwloc=&output=embed', category: 'contact' },
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
              { id: 'pos', icon: Desktop, label: 'إعدادات الكاشير (POS)' },
              { id: 'health', icon: Heartbeat, label: 'الأداء والصحة' },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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

                {/* Map Location Builder */}
                <div className="pt-4 border-t border-[var(--color-border)] space-y-4">
                  <h3 className="text-sm font-bold text-[var(--color-gold-light)] flex items-center gap-2">
                    <MapPin size={18} /> تحديد موقع المعرض على الخريطة (Google Maps)
                  </h3>

                  <div>
                    <label className="form-label flex items-center gap-2">
                      <span>رابط موقعنا على Google Maps المباشر *</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input text-left dir-ltr text-xs font-mono" 
                      placeholder="ضع رابط موقعك هنا: https://maps.app.goo.gl/... أو اسم المكان" 
                      value={formData.store_google_maps_url || ''} 
                      onChange={e => {
                        const val = e.target.value;
                        handleChange('store_google_maps_url', val);
                        if (!val.includes('output=embed')) {
                          const computedEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(val)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
                          handleChange('store_map_embed_url', computedEmbed);
                        }
                      }} 
                    />
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-1">انسخ رابط مكانك من خرائط جوجل والصقه هنا، وسيتم تعيينه كخريطة حية للموقع تلقائيًا.</p>
                  </div>

                  {/* Live Map Preview */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-300">معاينة الخريطة الحية للموقع (Live Map Preview)</label>
                      <span className="text-[10px] text-[var(--color-gold-light)] font-mono">تحديث فوري عند اللصق</span>
                    </div>
                    <div className="relative h-[240px] rounded-xl overflow-hidden border border-[#c5a25d]/40 bg-black/60 shadow-xl">
                      <iframe 
                        src={
                          formData.store_map_embed_url || 
                          (formData.store_google_maps_url ? `https://maps.google.com/maps?q=${encodeURIComponent(formData.store_google_maps_url)}&t=&z=16&ie=UTF8&iwloc=&output=embed` : "https://maps.google.com/maps?q=Dahab%20Perfumes,%20Prince%20Mohammad%20Street,%20Amman&t=&z=16&ie=UTF8&iwloc=&output=embed")
                        } 
                        className="w-full h-full border-0 grayscale invert contrast-[0.9] hover:grayscale-0 hover:invert-0 transition-all duration-500"
                        allowFullScreen="" 
                        loading="lazy"
                        title="Live Map Preview"
                      />
                    </div>
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

          {/* ── Health & Performance Tab ── */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <h2 className="text-lg font-bold text-[var(--color-gold-light)] font-display flex items-center gap-2">
                  <Heartbeat size={20} /> الأداء والصحة
                </h2>
                <button
                  onClick={fetchHealth}
                  disabled={healthLoading}
                  className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <ArrowsClockwise size={16} className={healthLoading ? 'animate-spin' : ''} />
                  تحديث
                </button>
              </div>

              {healthLoading && !health && (
                <div className="flex justify-center py-12">
                  <div className="spinner w-8 h-8" />
                </div>
              )}

              {health && (() => {
                const StatusIcon = ({ status }) => {
                  if (status === 'ok' || status === 'healthy') return <CheckCircle size={18} className="text-[var(--color-success)]" weight="fill" />;
                  if (status === 'error' || status === 'degraded') return <XCircle size={18} className="text-[var(--color-error)]" weight="fill" />;
                  return <WarningCircle size={18} className="text-[var(--color-warning)]" weight="fill" />;
                };
                const LatencyBadge = ({ ms }) => {
                  if (ms === null || ms === undefined) return <span className="badge-warning-sm">N/A</span>;
                  if (ms < 50)  return <span className="badge-success-sm font-mono">{ms}ms</span>;
                  if (ms < 200) return <span className="badge-warning-sm font-mono">{ms}ms</span>;
                  return <span className="badge-error-sm font-mono">{ms}ms</span>;
                };

                return (
                  <div className="space-y-4">
                    {/* Overall status banner */}
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                      health.status === 'healthy'
                        ? 'bg-[var(--color-success-dim)] border-[var(--color-success-border)]'
                        : 'bg-[var(--color-error-dim)] border-[var(--color-error-border)]'
                    }`}>
                      <StatusIcon status={health.status} />
                      <div>
                        <div className={`font-bold text-sm ${health.status === 'healthy' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                          {health.status === 'healthy' ? 'النظام يعمل بشكل طبيعي' : 'النظام يعاني من مشكلات'}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          آخر فحص: {new Date(health.generated_at).toLocaleString('ar-JO')}
                        </div>
                      </div>
                    </div>

                    {/* Service checks grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Database */}
                      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex items-center gap-3">
                        <Database size={24} className="text-[var(--color-gold)] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[var(--color-text-primary)]">PostgreSQL</div>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusIcon status={health.checks.database?.status} />
                            <LatencyBadge ms={health.checks.database?.ping_ms} />
                          </div>
                        </div>
                      </div>

                      {/* Redis */}
                      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex items-center gap-3">
                        <Lightning size={24} className="text-[var(--color-gold)] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[var(--color-text-primary)]">Redis Cache</div>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusIcon status={health.checks.redis?.status} />
                            {health.checks.redis?.status === 'not_configured'
                              ? <span className="text-xs text-[var(--color-text-muted)]">غير مُفعّل</span>
                              : <LatencyBadge ms={health.checks.redis?.ping_ms} />
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Benchmarks */}
                    <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                      <div className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <Lightning size={16} className="text-[var(--color-gold)]" /> قياسات الاستجابة
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-[var(--color-text-muted)] mb-1">DB Ping</div>
                          <LatencyBadge ms={health.benchmarks?.db_ping_ms} />
                        </div>
                        <div>
                          <div className="text-xs text-[var(--color-text-muted)] mb-1">آخر 50 فاتورة</div>
                          <LatencyBadge ms={health.benchmarks?.sales_query_ms} />
                        </div>
                      </div>
                    </div>

                    {/* Memory */}
                    {health.memory && (
                      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                        <div className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                          <HardDrive size={16} className="text-[var(--color-gold)]" /> استخدام الذاكرة (Server)
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[['Heap Used', health.memory.heap_used_mb], ['Heap Total', health.memory.heap_total_mb], ['RSS', health.memory.rss_mb]].map(([label, val]) => (
                            <div key={label} className="text-center">
                              <div className="text-lg font-mono font-bold text-[var(--color-gold-light)]">{val}</div>
                              <div className="text-[0.65rem] text-[var(--color-text-muted)]">MB — {label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Table counts */}
                    {health.counts && !health.counts.error && (
                      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                        <div className="text-sm font-bold text-[var(--color-text-primary)] mb-3">إحصائيات قاعدة البيانات</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            ['منتجات', health.counts.products],
                            ['مبيعات', health.counts.sales],
                            ['موظفون', health.counts.employees],
                            ['استفسارات', health.counts.inquiries],
                          ].map(([label, val]) => (
                            <div key={label} className="text-center p-3 rounded-lg bg-[var(--color-bg-raised)]">
                              <div className="text-xl font-mono font-bold text-[var(--color-text-primary)]">{val?.toLocaleString('ar-JO') ?? '—'}</div>
                              <div className="text-[0.65rem] text-[var(--color-text-muted)] mt-0.5">{label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-[0.65rem] text-[var(--color-text-subtle)]">
                          وقت الاستعلام: <span className="font-mono text-[var(--color-gold)]">{health.counts.query_ms}ms</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
