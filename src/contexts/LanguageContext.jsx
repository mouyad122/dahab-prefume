'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const cookieLang = getCookie('dahab_lang');
    if (cookieLang === 'ar' || cookieLang === 'en') {
      setLanguage(cookieLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language, mounted]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    const currentPath = pathname.replace(/^\/en/, '') || '/';
    const targetPath = newLang === 'en' ? '/en' + currentPath : currentPath;
    router.push(targetPath);
  }, [language, pathname, router]);

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
