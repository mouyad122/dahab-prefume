'use client';

import React, { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  ar: {
    home: 'الرئيسية',
    shop: 'المتجر',
    collections: 'المجموعات',
    about: 'عن دهب',
    contact: 'تواصل معنا',
    storeLocation: 'موقع المعرض',
    reviews: 'آراء العملاء',
    faq: 'الأسئلة الشائعة',
    shipping: 'الشحن والتوصيل',
    returns: 'الاستبدال والإرجاع',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    wishlist: 'المفضلة',
    cart: 'السلة',
    checkout: 'إتمام الطلب',
    admin: 'لوحة التحكم',
    backToShop: 'العودة للمتجر',
    whatsappInquiry: 'طلب عبر واتساب',
    addToCart: 'أضف للسلة',
    outOfStock: 'غير متوفر',
    lowStock: 'كمية محدودة',
    available: 'متوفر',
    currency: 'دينار',
  },
  en: {
    home: 'Home',
    shop: 'Shop',
    collections: 'Collections',
    about: 'About',
    contact: 'Contact',
    storeLocation: 'Store Location',
    reviews: 'Reviews',
    faq: 'FAQ',
    shipping: 'Shipping',
    returns: 'Returns',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    wishlist: 'Wishlist',
    cart: 'Cart',
    checkout: 'Checkout',
    admin: 'Dashboard',
    backToShop: 'Back to Shop',
    whatsappInquiry: 'Order on WhatsApp',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    lowStock: 'Low Stock',
    available: 'Available',
    currency: 'JOD',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('dahab_lang');
    if (savedLang === 'ar' || savedLang === 'en') {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('dahab_lang', language);
    }

    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = key => {
    if (typeof key === 'object' && key !== null) {
      return key[language] || key.en || '';
    }

    return translations[language]?.[key] || translations.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
