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
  Compass,
  Package,
  Headset,
  WarningCircle
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
  const [popupBlockedUrl, setPopupBlockedUrl] = useState(null);

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
    setPopupBlockedUrl(null);

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
        const newWindow = window.open(waUrl, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          setPopupBlockedUrl(waUrl);
        }
      }, 100);

    } catch (err) {
      setErrors({ server: err.message || 'حدث خطأ، يمكنك التواصل معنا مباشرة عبر الواتساب' });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('contact-form') || document.getElementById('luxury-contact-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-[#c5a25d] selection:text-black dir-ar pt-24 pb-20 overflow-hidden relative">
      {/* Subtle Ambient Gold Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#c5a25d]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-20">

        {/* 1. COMPACT PREMIUM HERO SECTION */}
        <section className="text-center pt-4 pb-2 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141418] border border-[#c5a25d]/20 text-[#c5a25d] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkle size={13} className="text-[#c5a25d]" />
            <span>تواصل مباشر وخدمة فاخرة</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-[#f3e5c8] to-[#c5a25d] bg-clip-text text-transparent font-serif leading-tight mb-4"
          >
            تواصل معنا
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-sm md:text-base text-gray-300 font-light leading-relaxed"
          >
            نحن هنا لمساعدتك في اختيار العطر الأنسب، الاستفسار عن توفر المنتجات، أو متابعة طلبك بكل سهولة.
          </motion.p>
        </section>

        {/* 2. MAIN CONTACT SECTION (FORM + SUPPORT PANEL) */}
        <section id="contact-form" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Form Column: Right side in RTL (Desktop 65% / lg:col-span-7) */}
            <div className="lg:col-span-7 order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-[#121216]/90 backdrop-blur-xl border border-[#c5a25d]/25 p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.6)] relative"
              >
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-[#c5a25d]/60 to-transparent" />

                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-white mb-2">
                    نموذج التواصل والاستفسار
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                    أدخل بياناتك وسيتم تسجيل استفسارك وتحويلك مباشرة للتواصل عبر الواتساب.
                  </p>
                </div>

                {submittedSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-4 text-[#25D366]">
                      <CheckCircle size={32} weight="fill" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">تم تسجيل استفسارك بنجاح!</h3>
                    
                    {!popupBlockedUrl ? (
                      <p className="text-sm text-gray-300 mb-6 font-light">
                        يتم الآن فتح تطبيق الواتساب لإكمال التواصل المباشر مع فريق الدعم...
                      </p>
                    ) : (
                      <div className="mb-6">
                        <p className="text-sm text-yellow-400 mb-4 font-light flex items-center justify-center gap-2">
                          <WarningCircle size={18} /> متصفحك يمنع فتح النوافذ المنبثقة.
                        </p>
                        <LuxuryButton
                          href={popupBlockedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="whatsapp"
                          className="w-full text-sm shadow-[0_0_15px_rgba(37,211,102,0.3)] animate-pulse"
                          iconLeft={WhatsappLogo}
                        >
                          اضغط هنا لفتح واتساب
                        </LuxuryButton>
                      </div>
                    )}

                    <LuxuryButton
                      variant="outline"
                      onClick={() => {
                        setSubmittedSuccess(false);
                        setPopupBlockedUrl(null);
                        setFormData({ name: '', phone: '', type: 'استفسار عن عطر', message: '' });
                      }}
                      className="text-xs mt-2 w-full"
                    >
                      إرسال استفسار آخر
                    </LuxuryButton>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {errors.server && (
                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium">
                        {errors.server}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          الاسم الكامل <span className="text-[#c5a25d]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="أدخل اسمك الكريم"
                          className={`w-full bg-[#0a0a0c]/80 border ${errors.name ? 'border-red-500' : 'border-[#c5a25d]/20 focus:border-[#c5a25d]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all`}
                        />
                        {errors.name && <p className="text-xs text-red-400 mt-1 font-light">{errors.name}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          رقم الهاتف <span className="text-[#c5a25d]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="07 8505 0655"
                          dir="ltr"
                          className={`w-full bg-[#0a0a0c]/80 border ${errors.phone ? 'border-red-500' : 'border-[#c5a25d]/20 focus:border-[#c5a25d]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all text-right`}
                        />
                        {errors.phone && <p className="text-xs text-red-400 mt-1 font-light">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Inquiry Type Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        نوع الاستفسار <span className="text-[#c5a25d]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full bg-[#0a0a0c]/80 border border-[#c5a25d]/20 focus:border-[#c5a25d] rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all cursor-pointer"
                        >
                          {INQUIRY_TYPES.map((t) => (
                            <option key={t.value} value={t.value} className="bg-[#121216] text-white">
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c5a25d] text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        الرسالة أو تفاصيل الطلب <span className="text-[#c5a25d]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب رسالتك أو استفسارك هنا بكل تفصيل..."
                        className={`w-full bg-[#0a0a0c]/80 border ${errors.message ? 'border-red-500' : 'border-[#c5a25d]/20 focus:border-[#c5a25d]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a25d] transition-all resize-none`}
                      />
                      {errors.message && <p className="text-xs text-red-400 mt-1 font-light">{errors.message}</p>}
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
                      إرسال وفتح واتساب
                    </LuxuryButton>

                    <p className="text-[11px] text-center text-gray-500 font-light mt-3">
                      🔒 جميع بياناتك محمية ومشفرة وفق أعلى معايير الخصوصية لدار دهب للعطور.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Support Panel Column: Left side in RTL (Desktop 35% / lg:col-span-5) */}
            <div className="lg:col-span-5 order-2 flex flex-col justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#121216]/60 backdrop-blur-xl border border-[#c5a25d]/15 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
              >
                <h2 className="text-xl md:text-2xl font-bold font-serif text-white mb-2">
                  كيف يمكننا مساعدتك؟
                </h2>
                <p className="text-xs text-gray-400 font-light mb-6 leading-relaxed">
                  نحن هنا لتقديم أفضل تجربة دعم ومساندة في اختيار العطور ومتابعة الطلبات.
                </p>

                <div className="space-y-4">
                  {/* Row 1: Perfume Selection */}
                  <div className="bg-[#16161c]/80 border border-[#c5a25d]/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-[#c5a25d]/25 transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/25 flex items-center justify-center text-[#c5a25d]">
                      <Compass size={20} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5 font-serif">اختيار العطر المناسب</h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        استشارات مخصصة لاكتشاف النوتات والعطور الأنسب لشخصيتك ومناسباتك.
                      </p>
                    </div>
                  </div>

                  {/* Row 2: Product Availability */}
                  <div className="bg-[#16161c]/80 border border-[#c5a25d]/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-[#c5a25d]/25 transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/25 flex items-center justify-center text-[#c5a25d]">
                      <Package size={20} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5 font-serif">توفر المنتجات</h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        استفسر فوراً عن توفر الأحجام والتركيزات المطلوبة لعطرك المفضل.
                      </p>
                    </div>
                  </div>

                  {/* Row 3: Order Tracking */}
                  <div className="bg-[#16161c]/80 border border-[#c5a25d]/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-[#c5a25d]/25 transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/25 flex items-center justify-center text-[#c5a25d]">
                      <Headset size={20} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5 font-serif">متابعة الطلبات</h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        تتبع حالة طلبك ومواعيد الشحن والتوصيل بكل يسر وسهولة.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* 3. QUICK CONTACT CARDS (4 COMPACT CARDS BELOW MAIN FORM) */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Direct WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-[#121216]/70 backdrop-blur-md border border-[#c5a25d]/15 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#c5a25d]/40 transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center mb-4 text-[#25D366]">
                  <WhatsappLogo size={22} weight="fill" />
                </div>
                <h3 className="text-base font-bold text-white mb-1 font-serif">واتساب مباشر</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">
                  تواصل فوري عبر الواتساب للاستفسارات السريعة وطلب العطور المباشر.
                </p>
              </div>
              <LuxuryButton
                href={`https://wa.me/${brandConfig.whatsappNumberClean}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="sm"
                className="w-full text-xs font-bold"
                iconLeft={WhatsappLogo}
              >
                تواصل عبر واتساب
              </LuxuryButton>
            </motion.div>

            {/* Card 2: Direct Phone Call */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#121216]/70 backdrop-blur-md border border-[#c5a25d]/15 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#c5a25d]/40 transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/25 flex items-center justify-center mb-4 text-[#c5a25d]">
                  <PhoneCall size={22} weight="duotone" />
                </div>
                <h3 className="text-base font-bold text-white mb-1 font-serif">اتصال مباشر</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">
                  تحدث مباشرة مع فريق خدمة العملاء للإجابة على جميع تساؤلاتك.
                </p>
              </div>
              <LuxuryButton
                href={`tel:${brandConfig.whatsappNumberClean}`}
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold"
                iconLeft={PhoneCall}
              >
                اتصل الآن ({brandConfig.phoneLocal})
              </LuxuryButton>
            </motion.div>

            {/* Card 3: Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-[#121216]/70 backdrop-blur-md border border-[#c5a25d]/15 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#c5a25d]/40 transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/25 flex items-center justify-center mb-4 text-[#c5a25d]">
                  <ChatTeardropText size={22} weight="duotone" />
                </div>
                <h3 className="text-base font-bold text-white mb-1 font-serif">الاستفسارات العامة</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">
                  إرشاد مخصص لاختيار عطور النيش والمسك الفاخر بما يتناسب مع ذوقك.
                </p>
              </div>
              <LuxuryButton
                onClick={scrollToForm}
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold"
              >
                تعبئة نموذج الاستفسار
              </LuxuryButton>
            </motion.div>

            {/* Card 4: Working Hours (No Button) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#121216]/70 backdrop-blur-md border border-[#c5a25d]/15 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#c5a25d]/40 transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#c5a25d]/10 border border-[#c5a25d]/25 flex items-center justify-center mb-4 text-[#c5a25d]">
                  <Clock size={22} weight="duotone" />
                </div>
                <h3 className="text-base font-bold text-white mb-1 font-serif">ساعات العمل</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  طيلة أيام الأسبوع
                </p>
                <p className="text-xs text-[#c5a25d] font-semibold mt-1 mb-5">
                  10:00 صباحاً – 11:00 مساءً
                </p>
              </div>
              <div className="w-full py-2 px-3 rounded-xl bg-[#16161c] border border-white/5 text-gray-400 text-xs flex items-center justify-center gap-1.5">
                <CheckCircle size={15} className="text-[#25D366] shrink-0" />
                <span>متاحون لخدمتك دائماً</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 4. FINAL WHATSAPP CTA SECTION */}
        <section className="pt-2 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-r from-[#121216] via-[#1a1a24] to-[#121216] border border-[#c5a25d]/25 p-7 sm:p-10 text-center flex flex-col items-center shadow-[0_10px_35px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-4">
              <WhatsappLogo size={28} weight="fill" />
            </div>

            <h2 className="text-xl md:text-3xl font-bold font-serif text-white mb-2">
              تحتاج مساعدة مباشرة؟
            </h2>

            <p className="text-xs md:text-sm text-gray-300 font-light max-w-md mx-auto mb-6 leading-relaxed">
              تواصل معنا عبر الواتساب وسنساعدك بكل سرور.
            </p>

            <LuxuryButton
              href={`https://wa.me/${brandConfig.whatsappNumberClean}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="md"
              className="px-8 font-bold"
              iconLeft={(props) => <WhatsappLogo size={20} weight="bold" {...props} />}
            >
              تواصل عبر واتساب
            </LuxuryButton>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
