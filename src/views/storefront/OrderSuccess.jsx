'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LanguageContext } from '../../contexts/LanguageContext';
import { StorageService } from '../../services/StorageService';
import Link from 'next/link';
import { WhatsappLogo, CheckCircle, Truck, ShieldCheck, ArrowRight, Copy, Check } from '@phosphor-icons/react';

export default function OrderSuccess() {
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderId && typeof window !== 'undefined') {
      const orders = StorageService.get('dahab_orders', []);
      const found = orders.find(o => o.orderId === orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderId]);

  // Copy order ID to clipboard
  const handleCopyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  if (!order) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-28 text-center flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <ShieldCheck size={28} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {isAr ? 'لم يتم العثور على معلومات الطلب' : 'Order Information Not Found'}
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] max-w-sm">
          {isAr ? 'تأكد من أنك وصلت لهذه الصفحة من خلال إتمام طلب صحيح.' : 'Please make sure you arrived here from a valid checkout.'}
        </p>
        <Link href="/shop" className="btn-primary mt-2">{t('backToShop')}</Link>
      </div>
    );
  }

  // Build WhatsApp message matching the exact specification format
  const compileWhatsAppUrl = () => {
    const phoneNum = '962785050655';
    let text = '';

    if (isAr) {
      text = `مرحباً DAHAB PERFUMES،
أرغب بتأكيد الطلب التالي:

رقم الطلب:
${order.orderId}

المنتجات:
${order.items.map(item => `* ${t(item.title)} × ${item.quantity} — ${item.total.toFixed(2)} JOD`).join('\n')}

الإجمالي:
${order.total.toFixed(2)} JOD

معلومات التوصيل:
الاسم: ${order.customer.name}
الهاتف: ${order.customer.phone}
المدينة: ${order.customer.city}
المنطقة: ${order.customer.area}
العنوان: ${order.customer.address}
ملاحظات: ${order.customer.notes || 'لا يوجد'}

طريقة الدفع:
${order.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'بطاقة بنكية'}`;
    } else {
      text = `Hello DAHAB PERFUMES,
I would like to confirm the following order:

Order ID:
${order.orderId}

Products:
${order.items.map(item => `* ${t(item.title)} × ${item.quantity} — ${item.total.toFixed(2)} JOD`).join('\n')}

Total:
${order.total.toFixed(2)} JOD

Delivery Information:
Name: ${order.customer.name}
Phone: ${order.customer.phone}
City: ${order.customer.city}
Area: ${order.customer.area}
Address: ${order.customer.address}
Notes: ${order.customer.notes || 'None'}

Payment Method:
${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}`;
    }

    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-12 items-center">
      
      {/* Success Icon and Greeting */}
      <div className="flex flex-col items-center text-center gap-5">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 relative">
          <CheckCircle size={40} weight="fill" />
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
        </div>
        
        <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-emerald-500 border border-emerald-500/20 bg-emerald-500/5">
          {isAr ? 'تم استلام الطلب بنجاح' : 'Order Received'}
        </span>
        
        <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {isAr ? 'شكراً لثقتكم' : 'Thank You'}
        </h1>

        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] max-w-lg font-light leading-relaxed">
          {isAr 
            ? 'تم استلام طلبك بنجاح. يمكنك تأكيد الطلب مباشرة عبر واتساب ليقوم فريق DAHAB PERFUMES بمتابعته معك.'
            : 'Your order has been received successfully. You can confirm it directly through WhatsApp and the DAHAB PERFUMES team will follow up with you.'
          }
        </p>
      </div>

      {/* Primary CTA: WhatsApp Confirmation */}
      <a 
        href={compileWhatsAppUrl()}
        target="_blank" 
        rel="noopener noreferrer" 
        className="group relative flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold uppercase tracking-[0.15em] py-5 px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98] shadow-lg w-full max-w-md"
      >
        <WhatsappLogo size={22} weight="bold" />
        <span>{isAr ? 'تأكيد الطلب عبر واتساب' : 'Confirm on WhatsApp'}</span>
      </a>

      {/* Main Order Success Frame - Double Bezel Card */}
      <div className="rounded-[3rem] bg-black/5 dark:bg-white/5 p-2.5 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-4xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="rounded-[calc(3rem-0.625rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-12 shadow-main grid grid-cols-1 md:grid-cols-2 gap-10 text-start">
          
          {/* Left Column: Client contact & order info */}
          <div className="flex flex-col gap-6">
            {/* Order ID with copy */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)] block mb-1">
                {isAr ? 'رقم الطلب المرجعي' : 'Order Reference'}
              </span>
              <div className="flex items-center gap-3">
                <h4 className="font-sans-en text-lg font-bold text-[var(--color-text-primary)]">
                  {order.orderId}
                </h4>
                <button 
                  onClick={handleCopyOrderId}
                  className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all active:scale-95 cursor-pointer"
                  aria-label={isAr ? 'نسخ رقم الطلب' : 'Copy order ID'}
                >
                  {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>
              </div>
              <span className="text-[9px] text-zinc-500 font-light block mt-1">
                {isAr ? 'التاريخ:' : 'Date:'} {order.orderDate}
              </span>
            </div>

            {/* Customer details */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)] block mb-1">
                {isAr ? 'بيانات العميل والتوصيل' : 'Shipping Details'}
              </span>
              <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                {order.customer.name}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] font-light mt-1.5 leading-relaxed">
                {order.customer.phone} <br />
                {order.customer.city} — {order.customer.area} <br />
                {order.customer.address}
              </p>
              {order.customer.notes && (
                <div className="mt-3 p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[10px] text-[var(--color-text-muted)] italic">
                  * {isAr ? 'ملاحظة:' : 'Note:'} {order.customer.notes}
                </div>
              )}
            </div>

            {/* Payment method */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)] block mb-1">
                {isAr ? 'طريقة الدفع' : 'Payment Method'}
              </span>
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                {order.paymentMethod === 'cod' ? (isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery') : (isAr ? 'بطاقة بنكية' : 'Card Payment')}
              </span>
            </div>

            {/* Delivery estimate */}
            <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-3 rounded-lg text-xs text-[var(--color-text-secondary)]">
              <Truck size={16} className="text-[var(--color-gold)] shrink-0" />
              <span>{isAr ? 'التوصيل خلال 24 - 72 ساعة حسب المدينة.' : 'Delivery within 24-72 hours depending on city.'}</span>
            </div>
          </div>

          {/* Right Column: Invoice items summary */}
          <div className="flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-gold)] block border-b border-[var(--color-border)] pb-2">
                {isAr ? 'تفاصيل المنتجات' : 'Items Ordered'}
              </span>

              {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/40 pb-2">
                  <div className="flex flex-col text-start">
                    <span className="font-bold text-[var(--color-text-primary)]">{t(item.title)}</span>
                    <span className="text-[9px] text-zinc-500">
                      {isAr ? 'الكمية:' : 'Qty:'} {item.quantity} × {item.price.toFixed(2)} JOD
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--color-text-primary)] shrink-0">
                    {item.total.toFixed(2)} JOD
                  </span>
                </div>
              ))}
            </div>

            {/* Total parameters */}
            <div className="flex flex-col gap-3.5 border-t border-[var(--color-border)] pt-4 mt-2">
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-light">
                <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span>{order.subtotal.toFixed(2)} JOD</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-light">
                <span>{isAr ? 'التوصيل المحلي' : 'Delivery'}</span>
                <span>{order.deliveryFee.toFixed(2)} JOD</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[var(--color-text-primary)]">
                <span>{isAr ? 'المجموع النهائي' : 'Total Amount'}</span>
                <span className="text-[var(--color-gold)]">{order.total.toFixed(2)} JOD</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Secondary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center justify-center w-full max-w-md">
        <Link 
          href="/shop" 
          className="btn-secondary py-4 px-8 text-center flex items-center justify-center gap-2 w-full"
        >
          <span>{isAr ? 'متابعة التسوق' : 'Continue Shopping'}</span>
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>

    </div>
  );
}
