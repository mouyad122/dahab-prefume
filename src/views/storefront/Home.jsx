import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Home() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center gap-6">
      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--color-gold)]">
        {isAr ? 'عطور نيش فاخرة' : 'Luxury Niche Fragrances'}
      </span>
      
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide uppercase leading-tight max-w-3xl">
        {isAr ? 'الرائحة التي تنشر تأثيرك' : 'Let your scent spread your influence'}
      </h1>

      <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-light max-w-xl leading-relaxed">
        {isAr 
          ? 'اكتشف مجموعتنا الحصرية من معطرات الشعر المغذية والعطور الشرقية والخاصة المستوحاة من الأصالة والمعاصرة.'
          : 'Discover our exclusive collection of nourishing hair mists, private blends, and Middle Eastern scents crafted with heritage.'
        }
      </p>

      <div className="flex gap-4 mt-4">
        <a href="/shop" className="btn-primary">
          {isAr ? 'تسوق المجموعة' : 'Shop Collection'}
        </a>
        <a href="/about" className="btn-secondary">
          {isAr ? 'قصتنا' : 'Our Story'}
        </a>
      </div>
    </div>
  );
}
