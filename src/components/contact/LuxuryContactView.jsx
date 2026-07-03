'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  WhatsappLogo, 
  PhoneCall, 
  ChatTeardropText, 
  Clock, 
  Sparkle, 
  CheckCircle, 
  PaperPlaneTilt,
  Compass,
  Package,
  Headset
} from '@phosphor-icons/react';
import { brandConfig } from '../../config/brand';
import LuxuryButton from '../ui/LuxuryButton';

const INQUIRY_TYPES = [
  { value: 'استفسار عن عطر', label: 'استفسار عن عطر' },
  { value: 'توفر منتج', label: 'توفر منتج' },
  { value: 'طلب توصية', label: 'طلب توصية' },
  { value: 'طلب سابق', label: 'طلب سابق' },
  { value: 'استفسار عام', label: 'استفسار عام' }
];

export default function LuxuryContactView() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'استفسار عن عطر',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'يرجى كتابة الاسم الكامل (حرفين على الأقل)';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 7) {
      errs.phone = 'يرجى كتابة رقم هاتف صحيح';
    }

    if (!formData.message.trim() || formData.message.trim().length < 3) {
      errs.message = 'يرجى كتابة تفاصيل الاستفسار (3 أحرف على الأقل)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      // 1. Send data to backend API to save in DB for Admin Management
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'حدث خطأ أثناء الإرسال');
      }

      setSubmittedSuccess(true);

      // 2. Open WhatsApp with formatted Arabic text message for immediate assistance
      const waMessage = `مرحباً دهب للعطور ✨%0A%0A*استفسار جديد من الموقع الإلكتروني*%0A*الاسم:* ${encodeURIComponent(formData.name)}%0A*رقم الهاتف:* ${encodeURIComponent(formData.phone)}%0A*نوع الاستفسار:* ${encodeURIComponent(formData.type)}%0A*الرسالة:* ${encodeURIComponent(formData.message)}`;
      
      const waUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${waMessage}`;
      
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);

    } catch (err) {
      setErrors({ server: err.message || 'حدث خطأ، يمكنك التواصل معنا مباشرة عبر الواتساب' });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('luxury-contact-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-[#c5a25d] selection:text-black dir-ar pt-24 pb-20 overflow-hidden relative">
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#c5a25d]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-[450px] h-[450px] bg-[#c5a25d]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. CINEMATIC HERO SECTION */}
        <section className="text-center py-12 md:py-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16161a] border border-[#c5a25d]/30 text-[#c5a25d] text-xs font-semibold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(197,162,93,0.15)]"
          >
            <Sparkle size={14} className="animate-pulse text-[#d4af37]" />
            <span>تجربة تواصل فاخرة</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#fff] via-[#f3e5c8] to-[#c5a25d] bg-clip-text text-transparent font-serif leading-tight mb-6"
          >
            تواصل معنا
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-base md:text-lg text-gray-300 font-light leading-relaxed mb-8"
          >
            نحن هنا لمساعدتك في اختيار عطرك القادم، الاستفسار عن توفر المنتجات، متابعة الطلبات، والحصول على التوصيات العطرية الخاصة بكل رقي.
          </motion.p>
        </section>

        {/* 2. CONTACT METHODS SECTION (4 GLASSMORPHISM CARDS) */}
        <section className="py-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#121216]/80 backdrop-blur-xl border border-[#c5a25d]/20 rounded-2xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#c5a25d]/60 hover:shadow-[0_0_25px_rgba(197,162,93,0.2)] transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366]/20 to-emerald-950/40 border border-[#25D366]/30 flex items-center justify-center mb-5 text-[#25D366] group-hover:scale-110 transition-transform duration-300">
                  <WhatsappLogo size={26} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">واتساب مباشر</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                  تواصل فوري عبر الواتساب للاستفسارات السريعة وطلب العطور المباشر.
                </p>
              </div>
              <LuxuryButton
                href={`https://wa.me/${brandConfig.whatsappNumberClean}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full text-sm"
                iconLeft={WhatsappLogo}
              >
                تواصل عبر واتساب
              </LuxuryButton>
            </motion.div>

            {/* Card 2: Phone Call */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#121216]/80 backdrop-blur-xl border border-[#c5a25d]/20 rounded-2xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#c5a25d]/60 hover:shadow-[0_0_25px_rgba(197,162,93,0.2)] transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center mb-5 text-[#c5a25d] group-hover:scale-110 transition-transform duration-300">
                  <PhoneCall size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 font-serif">اتصال مباشر</h3>
                <p className="text-xs font-mono text-[#c5a25d] font-semibold mb-2 dir-ltr text-right">
                  {brandConfig.phoneLocal}
                </p>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                  تحدث مباشرة مع فريق خدمة العملاء للإجابة على جميع تساؤلاتك.
                </p>
              </div>
              <LuxuryButton
                href={`tel:${brandConfig.whatsappNumberClean}`}
                variant="outline"
                className="w-full text-sm"
                iconLeft={PhoneCall}
              >
                اتصل الآن ({brandConfig.phoneLocal})
              </LuxuryButton>
            </motion.div>

            {/* Card 3: Customer Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#121216]/80 backdrop-blur-xl border border-[#c5a25d]/20 rounded-2xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#c5a25d]/60 hover:shadow-[0_0_25px_rgba(197,162,93,0.2)] transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center mb-5 text-[#c5a25d] group-hover:scale-110 transition-transform duration-300">
                  <ChatTeardropText size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">استفسارات المنتجات</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                  إرشاد مخصص لاختيار عطور النيش والمسك الفاخر بما يتناسب مع ذوقك.
                </p>
              </div>
              <LuxuryButton
                onClick={scrollToForm}
                variant="outline"
                className="w-full text-sm"
                iconLeft={PaperPlaneTilt}
              >
                إرسال استفسار
              </LuxuryButton>
            </motion.div>

            {/* Card 4: Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#121216]/80 backdrop-blur-xl border border-[#c5a25d]/20 rounded-2xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#c5a25d]/60 hover:shadow-[0_0_25px_rgba(197,162,93,0.2)] transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center mb-5 text-[#c5a25d] group-hover:scale-110 transition-transform duration-300">
                  <Clock size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">ساعات العمل</h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed mb-1">
                  طيلة أيام الأسبوع
                </p>
                <p className="text-xs text-[#c5a25d] font-medium leading-relaxed mb-6">
                  10:00 صباحاً – 11:00 مساءً
                </p>
              </div>
              <div className="w-full py-2.5 px-4 rounded-xl bg-[#16161c] border border-white/5 text-gray-400 font-normal text-xs flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-[#25D366]" />
                <span>متاحون لخدمتك دائماً</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 3. LUXURY INQUIRY FORM SECTION */}
        <section id="luxury-contact-form" className="py-8 mb-20 scroll-mt-28">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl bg-gradient-to-b from-[#16161c]/90 to-[#0e0e12]/90 backdrop-blur-2xl border border-[#c5a25d]/30 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#c5a25d] to-transparent" />

              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold font-serif text-white mb-3">
                  نموذج التواصل والاستفسار
                </h2>
                <p className="text-sm text-gray-400 font-light max-w-lg mx-auto">
                  قم بتعبئة البيانات أدناه وسنقوم بتسجيل استفسارك وتحويلك فوراً للواتساب لتوفير استجابة سريعة.
                </p>
              </div>

              {submittedSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#25D366]/10 border border-[#25D366]/40 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mx-auto mb-4 text-[#25D366]">
                    <CheckCircle size={36} weight="fill" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">تم تسجيل استفسارك بنجاح!</h3>
                  <p className="text-sm text-gray-300 mb-6 font-light">
                    يتم الآن فتح تطبيق الواتساب لإكمال التواصل المباشر مع فريق الدعم...
                  </p>
                  <LuxuryButton
                    variant="outline"
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormData({ name: '', phone: '', type: 'استفسار عن عطر', message: '' });
                    }}
                    className="text-xs"
                  >
                    إرسال استفسار آخر
                  </LuxuryButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {errors.server && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-medium">
                      {errors.server}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        الاسم الكامل <span className="text-[#c5a25d]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك الكريم"
                        className={`w-full bg-[#0a0a0c]/80 border ${errors.name ? 'border-red-500' : 'border-[#c5a25d]/20 focus:border-[#c5a25d]'} rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all`}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1.5 font-light">{errors.name}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        رقم الهاتف <span className="text-[#c5a25d]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="07 8505 0655"
                        dir="ltr"
                        className={`w-full bg-[#0a0a0c]/80 border ${errors.phone ? 'border-red-500' : 'border-[#c5a25d]/20 focus:border-[#c5a25d]'} rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all text-right`}
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1.5 font-light">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Inquiry Type Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      نوع الاستفسار <span className="text-[#c5a25d]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-[#0a0a0c]/80 border border-[#c5a25d]/20 focus:border-[#c5a25d] rounded-xl px-4 py-3.5 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all cursor-pointer"
                      >
                        {INQUIRY_TYPES.map((t) => (
                          <option key={t.value} value={t.value} className="bg-[#121216] text-white">
                            {t.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c5a25d]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      الرسالة أو تفاصيل الطلب <span className="text-[#c5a25d]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب رسالتك أو استفسارك هنا بكل تفصيل..."
                      className={`w-full bg-[#0a0a0c]/80 border ${errors.message ? 'border-red-500' : 'border-[#c5a25d]/20 focus:border-[#c5a25d]'} rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all resize-none`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1.5 font-light">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <LuxuryButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={submitting}
                    iconLeft={WhatsappLogo}
                  >
                    إرسال واستمرار عبر الواتساب
                  </LuxuryButton>

                  <p className="text-[11px] text-center text-gray-500 font-light mt-4">
                    🔒 جميع بياناتك محمية ومشفرة وفق أعلى معايير الخصوصية لدار دهب للعطور.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* 4. "HOW CAN WE HELP YOU?" SECTION (3 PREMIUM CARDS) */}
        <section className="py-12 mb-20 border-t border-[#c5a25d]/10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-white mb-3">
              كيف يمكننا مساعدتك؟
            </h2>
            <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
              خدمات استشارية ومتابعة مخصصة تضمن حصولك على أقصى درجات الرفاهية في عالم العطور.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Help Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#121216]/60 backdrop-blur-md border border-[#c5a25d]/20 rounded-2xl p-8 text-center flex flex-col items-center shadow-lg hover:border-[#c5a25d]/50 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d] mb-6">
                <Compass size={30} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">اختيار العطر المناسب</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                نساعدك في اكتشاف العطر الذي يعبر عن شخصيتك ويعكس حضورك الفريد بين تشكيلة النيش والمسك وسكبات الزيوت الفاخرة.
              </p>
            </motion.div>

            {/* Help Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-[#121216]/60 backdrop-blur-md border border-[#c5a25d]/20 rounded-2xl p-8 text-center flex flex-col items-center shadow-lg hover:border-[#c5a25d]/50 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d] mb-6">
                <Package size={30} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">الاستفسار عن توفر المنتجات</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                تأكد فوراً من توفر الأحجام والتركيزات المطلوبة لعطرك المفضل في المعرض قبل تقديم الطلب.
              </p>
            </motion.div>

            {/* Help Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-[#121216]/60 backdrop-blur-md border border-[#c5a25d]/20 rounded-2xl p-8 text-center flex flex-col items-center shadow-lg hover:border-[#c5a25d]/50 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d] mb-6">
                <Headset size={30} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">متابعة الطلبات</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                تتبع حالة طلبك والتوصيل السريع لكافة محافظات المملكة الهاشمية بالتنسيق المباشر مع فريق المتابعة.
              </p>
            </motion.div>

          </div>
        </section>

        {/* 5. FINAL WHATSAPP CTA SECTION */}
        <section className="py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-r from-[#181820] via-[#242432] to-[#181820] border border-[#c5a25d]/40 p-8 md:p-14 text-center flex flex-col items-center shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-6 shadow-[0_0_20px_rgba(37,211,102,0.2)]">
              <WhatsappLogo size={36} weight="fill" />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold font-serif text-white mb-4">
              تحتاج مساعدة مباشرة؟
            </h2>

            <p className="text-base md:text-lg text-gray-300 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              تواصل معنا عبر الواتساب وسنساعدك بكل سرور اختيار منتجاتك وتلبية جميع استفساراتك العطرية.
            </p>

            <LuxuryButton
              href={`https://wa.me/${brandConfig.whatsappNumberClean}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="px-10 font-extrabold"
              iconLeft={(props) => <WhatsappLogo size={24} weight="bold" {...props} />}
            >
              تواصل عبر واتساب
            </LuxuryButton>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
