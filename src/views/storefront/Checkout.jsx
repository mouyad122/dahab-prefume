'use client';

import React, { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useCartStore } from '../../stores/useCartStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { StorageService } from '../../services/StorageService';
import { Truck, ShieldCheck, WhatsappLogo, Info, ArrowLeft, CheckCircle, Warning } from '@phosphor-icons/react';
import LuxuryButton from '../../components/ui/LuxuryButton';

// Sanitize input to prevent XSS
const sanitize = (str) => {
  if (!str) return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Delivery fee configuration — structured for easy admin modification later
const DELIVERY_CONFIG = {
  amman: { fee: 2.00, labelAr: 'عمان', labelEn: 'Amman', timeAr: '24 - 48 ساعة', timeEn: '24-48 hours' },
  zarqa: { fee: 3.00, labelAr: 'الزرقاء', labelEn: 'Zarqa', timeAr: '48 - 72 ساعة', timeEn: '48-72 hours' },
  irbid: { fee: 3.00, labelAr: 'إربد', labelEn: 'Irbid', timeAr: '48 - 72 ساعة', timeEn: '48-72 hours' },
  salt: { fee: 3.00, labelAr: 'السلط', labelEn: 'Salt', timeAr: '48 - 72 ساعة', timeEn: '48-72 hours' },
  madaba: { fee: 3.00, labelAr: 'مأدبا', labelEn: 'Madaba', timeAr: '48 - 72 ساعة', timeEn: '48-72 hours' },
  jerash: { fee: 3.00, labelAr: 'جرش', labelEn: 'Jerash', timeAr: '48 - 72 ساعة', timeEn: '48-72 hours' },
  ajloun: { fee: 3.00, labelAr: 'عجلون', labelEn: 'Ajloun', timeAr: '48 - 72 ساعة', timeEn: '48-72 hours' },
  aqaba: { fee: 4.00, labelAr: 'العقبة', labelEn: 'Aqaba', timeAr: '72+ ساعة', timeEn: '72+ hours' },
  mafraq: { fee: 4.00, labelAr: 'المفرق', labelEn: 'Mafraq', timeAr: '72+ ساعة', timeEn: '72+ hours' },
  karak: { fee: 4.00, labelAr: 'الكرك', labelEn: 'Karak', timeAr: '72+ ساعة', timeEn: '72+ hours' },
  tafileh: { fee: 4.00, labelAr: 'الطفيلة', labelEn: 'Tafileh', timeAr: '72+ ساعة', timeEn: '72+ hours' },
  maan: { fee: 4.00, labelAr: 'معان', labelEn: "Ma'an", timeAr: '72+ ساعة', timeEn: '72+ hours' },
};

import PageContainer from '../../components/layout/PageContainer';

export default function Checkout() {
  const { language, t } = useContext(LanguageContext);
  const cartItems = useCartStore(state => state.cartItems);
  const clearCart = useCartStore(state => state.clearCart);
  const isAr = language === 'ar';
  const router = useRouter();
  const formRef = useRef(null);

  // Form Fields State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Error States
  const [errors, setErrors] = useState({});
  const [cardWarning, setCardWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Dynamic Shipping Fee calculator
  const getDeliveryFee = (selectedCity) => {
    if (!selectedCity) return 2.00;
    const config = DELIVERY_CONFIG[selectedCity];
    return config ? config.fee : 3.00;
  };

  const getDeliveryTime = (selectedCity) => {
    if (!selectedCity) return isAr ? '24 - 48 ساعة' : '24-48 hours';
    const config = DELIVERY_CONFIG[selectedCity];
    return config ? (isAr ? config.timeAr : config.timeEn) : (isAr ? '48 - 72 ساعة' : '48-72 hours');
  };

  const deliveryFee = getDeliveryFee(city);
  const total = subtotal + deliveryFee;

  // Jordan Mobile format validator
  const validateJordanPhone = (number) => {
    const clean = number.replace(/[\s\-()]/g, '');
    return /^(07[789]\d{7}|\+9627[789]\d{7}|009627[789]\d{7})$/.test(clean);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setCardWarning(method === 'card');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const tempErrors = {};

    // Validation
    const cleanName = sanitize(name);
    const cleanPhone = sanitize(phone);
    const cleanArea = sanitize(area);
    const cleanAddress = sanitize(address);
    const cleanNotes = sanitize(notes);

    if (!cleanName || cleanName.length < 3) {
      tempErrors.name = isAr ? 'الاسم الكامل مطلوب (3 أحرف على الأقل).' : 'Full name is required (min 3 characters).';
    }
    if (!cleanPhone) {
      tempErrors.phone = isAr ? 'رقم الهاتف مطلوب.' : 'Phone number is required.';
    } else if (!validateJordanPhone(cleanPhone)) {
      tempErrors.phone = isAr ? 'يرجى إدخال رقم هاتف أردني صحيح (مثال: 079XXXXXXX).' : 'Please enter a valid Jordanian phone number.';
    }
    if (!city) {
      tempErrors.city = isAr ? 'المدينة مطلوبة.' : 'City is required.';
    }
    if (!cleanArea) {
      tempErrors.area = isAr ? 'المنطقة مطلوبة.' : 'Area is required.';
    }
    if (!cleanAddress || cleanAddress.length < 8) {
      tempErrors.address = isAr ? 'العنوان الكامل مطلوب (8 أحرف على الأقل).' : 'Full address is required (min 8 characters).';
    }
    if (paymentMethod === 'card') {
      tempErrors.payment = isAr ? 'الدفع الإلكتروني غير نشط حالياً. يرجى اختيار الدفع عند الاستلام.' : 'Online payment is not available yet. Please select Cash on Delivery.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      // Scroll to first error
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Generate Order ID (DHB-XXXXXX)
    const orderId = `DHB-${Math.floor(100000 + Math.random() * 900000)}`;

    // Get city label for display
    const cityConfig = DELIVERY_CONFIG[city];
    const cityLabel = cityConfig ? (isAr ? cityConfig.labelAr : cityConfig.labelEn) : city;

    // Create Order Object
    const newOrder = {
      orderId,
      orderDate: new Date().toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US'),
      timestamp: Date.now(),
      customer: {
        name: cleanName,
        phone: cleanPhone,
        whatsapp: sanitize(whatsapp) || cleanPhone,
        city: cityLabel,
        cityKey: city,
        area: cleanArea,
        address: cleanAddress,
        notes: cleanNotes
      },
      paymentMethod,
      items: cartItems.map(item => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
      languageUsed: language
    };

    // Set both id and orderId to ensure compatibility across OrderRepository and success page
    newOrder.id = orderId;

    // Save locally via useOrderStore (handles stock deduction and repository saving)
    useOrderStore.getState().createOrder(newOrder);

    // Clear cart state
    clearCart();

    // Redirect to success
    router.push(`/order-success?orderId=${orderId}`);
  };

  // Cities list from configuration
  const citiesKeys = Object.keys(DELIVERY_CONFIG);

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-28 text-center flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
          <Warning size={28} className="text-[var(--color-text-muted)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {isAr ? 'لا توجد منتجات لتأكيد طلبها' : 'No Items to Checkout'}
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] max-w-sm">
          {isAr ? 'أضف عطورك المفضلة إلى السلة أولاً ثم عد هنا لإتمام الطلب.' : 'Add your favorite fragrances to the cart first, then return here to complete your order.'}
        </p>
        <LuxuryButton href="/shop" variant="primary" className="mt-2">{t('backToShop')}</LuxuryButton>
      </div>
    );
  }

  return (
    <PageContainer size="default" className="py-24 flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
          {t('checkout')}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {isAr ? 'إتمام الطلب' : 'Guest Checkout'}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] font-light max-w-md">
          {isAr ? 'أدخل معلومات الشحن والدفع كزائر لتجهيز الفاتورة وإرسالها مباشرة للواتساب.' : 'Complete your delivery details as a guest to build your invoice.'}
        </p>
      </div>

      {/* Back to cart */}
      <LuxuryButton 
        href="/cart" 
        variant="ghost"
        className="!text-[10px] font-bold !text-[var(--color-text-secondary)] hover:!text-[var(--color-gold)] uppercase tracking-wider self-start"
        iconLeft={ArrowLeft}
      >
        {isAr ? 'العودة للسلة' : 'Back to Cart'}
      </LuxuryButton>

      {/* Split column checkout layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Box: Shipping & Payment details form */}
        <form ref={formRef} onSubmit={handleSubmit} id="checkout-form" className="lg:col-span-7 flex flex-col gap-6 text-start">
          <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 w-full">
            <div className="rounded-[calc(2.5rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 md:p-8 flex flex-col gap-5 shadow-main">
              
              <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
                <Truck size={18} className="text-[var(--color-gold)]" />
                {isAr ? 'معلومات التوصيل والشحن' : 'Delivery Details'}
              </h3>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout-name" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
                <input 
                  id="checkout-name"
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isAr ? 'الاسم الثنائي أو الثلاثي' : 'First and Last name'}
                  className={`form-input text-xs ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  autoComplete="name"
                />
                {errors.name && <span className="text-[10px] text-red-500 font-medium flex items-center gap-1"><Warning size={10} /> {errors.name}</span>}
              </div>

              {/* Phone and Whatsapp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-phone" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                  <input 
                    id="checkout-phone"
                    type="tel" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="07XXXXXXXX"
                    className={`form-input text-xs ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                    autoComplete="tel"
                    dir="ltr"
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 font-medium flex items-center gap-1"><Warning size={10} /> {errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-whatsapp" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'رقم الواتساب (اختياري)' : 'WhatsApp Number (Optional)'}</label>
                  <input 
                    id="checkout-whatsapp"
                    type="tel" 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="07XXXXXXXX"
                    className="form-input text-xs"
                    autoComplete="tel"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* City and Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-city" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'المدينة *' : 'City *'}</label>
                  <select 
                    id="checkout-city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className={`form-input text-xs ${errors.city ? 'border-red-500 focus:border-red-500' : ''}`}
                  >
                    <option value="">{isAr ? 'اختر المدينة' : 'Select City'}</option>
                    {citiesKeys.map(key => (
                      <option key={key} value={key}>
                        {isAr ? DELIVERY_CONFIG[key].labelAr : DELIVERY_CONFIG[key].labelEn}
                        {' — '}
                        {DELIVERY_CONFIG[key].fee.toFixed(2)} JOD
                      </option>
                    ))}
                  </select>
                  {errors.city && <span className="text-[10px] text-red-500 font-medium flex items-center gap-1"><Warning size={10} /> {errors.city}</span>}
                  {city && (
                    <span className="text-[9px] text-emerald-500 font-medium">
                      {isAr ? `التوصيل خلال ${getDeliveryTime(city)}` : `Delivery within ${getDeliveryTime(city)}`}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-area" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'المنطقة / الحي *' : 'Area / District *'}</label>
                  <input 
                    id="checkout-area"
                    type="text" 
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    placeholder={isAr ? 'مثال: الجبيهة، عبدون، الخالدي' : 'e.g., Khalidi, Jubeiha, Abdoun'}
                    className={`form-input text-xs ${errors.area ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.area && <span className="text-[10px] text-red-500 font-medium flex items-center gap-1"><Warning size={10} /> {errors.area}</span>}
                </div>
              </div>

              {/* Address details */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout-address" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'العنوان الكامل وتفاصيل البناء *' : 'Full Address *'}</label>
                <input 
                  id="checkout-address"
                  type="text" 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={isAr ? 'الشارع، اسم البناية، رقم الشقة' : 'Street name, Building number, Apartment details'}
                  className={`form-input text-xs ${errors.address ? 'border-red-500 focus:border-red-500' : ''}`}
                  autoComplete="street-address"
                />
                {errors.address && <span className="text-[10px] text-red-500 font-medium flex items-center gap-1"><Warning size={10} /> {errors.address}</span>}
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout-notes" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'ملاحظات التوصيل (اختياري)' : 'Delivery Notes (Optional)'}</label>
                <textarea 
                  id="checkout-notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={isAr ? 'أوقات تسليم مفضلة أو علامات مميزة للعنوان' : 'Preferred timings or specific delivery landmarks'}
                  className="form-input text-xs h-20 resize-none"
                />
              </div>

            </div>
          </div>

          {/* Payment Method panel - Double Bezel layout */}
          <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 w-full">
            <div className="rounded-[calc(2.5rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 md:p-8 flex flex-col gap-5 shadow-main">
              
              <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--color-gold)]" />
                {isAr ? 'طريقة الدفع' : 'Payment Method'}
              </h3>

              <div className="flex flex-col gap-4">
                {/* Cash on Delivery (COD) */}
                <label 
                  onClick={() => handlePaymentMethodChange('cod')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'cod' 
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold-dim)]' 
                      : 'border-[var(--color-border)] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => handlePaymentMethodChange('cod')}
                      className="accent-[var(--color-gold)]"
                    />
                    <div className="flex flex-col text-start">
                      <span className="text-xs font-bold text-[var(--color-text-primary)]">
                        {isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-light mt-0.5">
                        {isAr ? 'ادفع نقداً عند فحص واستلام عطورك من المندوب.' : 'Pay cash upon courier inspection and receipt.'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[var(--color-gold)]">COD</span>
                </label>

                {/* Visa / Card placeholder */}
                <label 
                  onClick={() => handlePaymentMethodChange('card')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 opacity-70 ${
                    paymentMethod === 'card' 
                      ? 'border-amber-500 bg-amber-500/5' 
                      : 'border-[var(--color-border)] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => handlePaymentMethodChange('card')}
                      className="accent-amber-500"
                    />
                    <div className="flex flex-col text-start">
                      <span className="text-xs font-bold text-[var(--color-text-primary)]">
                        {isAr ? 'بطاقة بنكية / فيزا — قريباً' : 'Card Payment — Coming Soon'}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-light mt-0.5">
                        {isAr ? 'الدفع عبر الإنترنت مغلق مؤقتاً لتطوير حماية المدفوعات.' : 'Online card checkout is temporarily closed for security updates.'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                    {isAr ? 'قريباً' : 'SOON'}
                  </span>
                </label>

                {/* Card payment warnings */}
                {cardWarning && (
                  <div className="flex items-start gap-2.5 bg-amber-500/5 border border-amber-500/20 p-3.5 rounded-xl text-[10px] text-amber-500 leading-relaxed">
                    <Info size={16} className="mt-0.5 shrink-0" />
                    <p>
                      {isAr 
                        ? 'الدفع الإلكتروني عبر بطاقات الفيزا غير نشط حالياً. يرجى اختيار الدفع عند الاستلام (COD) أو متابعة طلبك عبر الواتساب لتأكيده.'
                        : 'Credit/Visa processing is inactive. Please use Cash on Delivery or complete your order via WhatsApp.'
                      }
                    </p>
                  </div>
                )}
                {errors.payment && (
                  <span className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                    <Warning size={10} /> {errors.payment}
                  </span>
                )}
              </div>

            </div>
          </div>
        </form>

        {/* Right Box: Invoice Summary - Double Bezel Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-2 ring-1 ring-black/5 dark:ring-white/10 w-full">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 shadow-main flex flex-col gap-6">
            
            <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 text-start">
              {isAr ? 'ملخص الفاتورة' : 'Invoice Summary'}
            </h3>

            {/* List of checkout items */}
            <div className="flex flex-col gap-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4 text-xs font-light text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/40 pb-3">
                  <div className="flex items-center gap-2.5 text-start min-w-0">
                    <img src={item.thumbnail} alt={t(item.title)} className="w-10 h-10 object-cover rounded bg-[var(--color-bg-primary)] border border-[var(--color-border)] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-[var(--color-text-primary)] truncate">{t(item.title)}</span>
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{item.volume} × {item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-end shrink-0">
                    <span className="font-semibold text-[var(--color-text-primary)]">{(item.price * item.quantity).toFixed(2)} JOD</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary calculation parameters */}
            <div className="flex flex-col gap-3.5 text-xs text-[var(--color-text-secondary)] font-light mt-2">
              <div className="flex justify-between">
                <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-semibold text-[var(--color-text-primary)]">{subtotal.toFixed(2)} JOD</span>
              </div>
              
              <div className="flex justify-between">
                <span>
                  {isAr ? 'رسوم التوصيل' : 'Delivery'}
                  {city && <span className="text-[9px] text-zinc-500"> ({isAr ? DELIVERY_CONFIG[city]?.labelAr : DELIVERY_CONFIG[city]?.labelEn})</span>}
                </span>
                <span className="font-semibold text-[var(--color-text-primary)]">+{deliveryFee.toFixed(2)} JOD</span>
              </div>
              
              <div className="border-t border-[var(--color-border)] pt-4 flex justify-between text-sm font-bold text-[var(--color-text-primary)]">
                <span>{isAr ? 'الإجمالي النهائي' : 'Grand Total'}</span>
                <span className="text-[var(--color-gold)]">{total.toFixed(2)} JOD</span>
              </div>
            </div>

            {/* Submit Button - connected to form */}
            <LuxuryButton 
              type="submit"
              form="checkout-form"
              disabled={paymentMethod === 'card' || isSubmitting}
              loading={isSubmitting}
              variant="primary"
              fullWidth
              className="text-xs font-bold uppercase tracking-[0.15em] !py-4 rounded-full mt-2"
              iconLeft={CheckCircle}
            >
              {isSubmitting ? (isAr ? 'جاري التأكيد...' : 'Processing...') : (isAr ? 'تأكيد وحفظ الطلب' : 'Confirm & Place Order')}
            </LuxuryButton>

            {/* WhatsApp alternative */}
            <LuxuryButton 
              href={`https://wa.me/962785050655?text=${encodeURIComponent(isAr ? 'مرحباً، أحتاج مساعدة لإتمام طلبي من DAHAB PERFUMES.' : 'Hello, I need help completing my DAHAB PERFUMES order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="!text-[10px] font-bold uppercase tracking-wider !text-[#25D366] hover:!text-[#20ba59]"
              iconLeft={(props) => <WhatsappLogo size={14} weight="bold" {...props} />}
            >
              {isAr ? 'أو أكمل طلبك عبر واتساب' : 'Or complete via WhatsApp'}
            </LuxuryButton>

          </div>
        </div>

      </div>

    </PageContainer>
  );
}
