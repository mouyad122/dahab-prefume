'use client';

import React, { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';

import PageContainer from '../../components/layout/PageContainer';

export default function StaticPages() {
  const pathname = usePathname();
  const { language, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  const [mapEmbedUrl, setMapEmbedUrl] = useState("https://maps.google.com/maps?q=Dahab%20Perfumes,%20Prince%20Mohammad%20Street,%20Amman&t=&z=16&ie=UTF8&iwloc=&output=embed");
  const [mapsLink, setMapsLink] = useState(brandConfig.googleMapsLink);
  const [storeAddressAr, setStoreAddressAr] = useState('');
  const [storeAddressEn, setStoreAddressEn] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        const mapsUrl = data?.contact?.store_google_maps_url;
        const embedUrl = data?.contact?.store_map_embed_url;

        if (mapsUrl) {
          setMapsLink(mapsUrl);
        }
        if (embedUrl) {
          setMapEmbedUrl(embedUrl);
        } else if (mapsUrl) {
          setMapEmbedUrl(`https://maps.google.com/maps?q=${encodeURIComponent(mapsUrl)}&t=&z=16&ie=UTF8&iwloc=&output=embed`);
        }

        if (data?.contact?.address_ar) {
          setStoreAddressAr(data.contact.address_ar);
        }
        if (data?.contact?.address_en) {
          setStoreAddressEn(data.contact.address_en);
        }
      })
      .catch(() => {});
  }, []);

  const getPageContent = () => {
    switch (pathname) {
      case '/about':
        return {
          title: t('about'),
          eyebrow: isAr ? 'قصتنا وتاريخنا' : 'Our Story & Heritage',
          desc: isAr 
            ? 'منذ عام 2007، حُفرت رحلتنا بالشغف والإبداع والتميّز. بدأت الحكاية من متجر صغير في وسط البلد تحت اسم "دهب"، حيث أصبح وجهة لعشاق العطور وخلطات العطور الفريدة.\n\nمع مرور الوقت، توسّعنا، لنبدأ فصلًا جديدًا من النمو والتميّز. واليوم، نحن إحدى كبرى محلات العطور في المملكة الأردنية الهاشمية، شهادةً على عقود من العمل المتفاني والالتزام بالجودة.\n\nنستمدّ إرثنا من علاقتنا العميقة مع عملائنا. بالأمس، قدمنا أجود العطور المصممة لتتناسب مع ذائقتكم الفريدة. واليوم، أعدنا تعريف هويتنا باسم "DAHAB"، رمزًا للابتكار وسهولة الوصول، لضمان بقاء اسمنا في الذاكرة وإرثنا في القلوب.\n\nمع "DAHAB"، نواصل ريادتنا في فن العطور، ونرسم معايير جديدة للتميّز، ونلهم عصرًا جديدًا من الأناقة العطرية.\n\nمن نحن:\nنحن عشاق العطور وصناع الذكريات، نؤمن بأن كل عطر يحمل قصة، وكل شعور له نفحة.\nنمزج بين أصالة تراثنا وشغفنا بالابتكار لنخلق روائح تلامس القلب وتبقى للأبد.'
            : 'Since 2007, our journey has been engraved with passion, creativity, and excellence. The story began in a small shop in Downtown Amman under the name "Dahab", becoming a destination for perfume lovers. Today, we are one of the leading perfume houses in Jordan. We blend our authentic heritage with a passion for innovation to create scents that touch the heart forever.'
        };

      case '/location':
      case '/store-location':
        return {
          title: t('storeLocation'),
          eyebrow: isAr ? 'عنوان المعرض' : 'Boutique Location',
          desc: isAr
            ? (storeAddressAr || `معرض دهب للعطور يرحب بكم في قلب وسط البلد، شارع الأمير محمد، مقابل زقاق سينما البتراء سابقاً، عمّان.`)
            : (storeAddressEn || `Visit the DAHAB PERFUMES showroom in Downtown Amman, Prince Muhammad Street, opposite the historic Petra Cinema alley.`)
        };
      case '/reviews':
        return {
          title: t('reviews'),
          eyebrow: isAr ? 'ماذا يقول عملاؤنا' : 'Customer Feedback',
          desc: isAr
            ? `فخورون بتقييم 4.7 نجوم بناءً على أكثر من 216 تقييم حقيقي على جوجل ماب لثبات عطورنا الاستثنائي وجودة خدمتنا.`
            : `Proudly rated 4.7 stars based on over 216+ real Google Maps reviews praising our fragrance performance and premium service.`
        };
      case '/faq':
        return {
          title: t('faq'),
          eyebrow: isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
          desc: isAr
            ? 'كم يدوم ثبات معطر الشعر؟ يدوم لأكثر من 48 ساعة بفضل تركيبة زيت الأرجان وجوز الهند المغذي. هل يتوفر التوصيل؟ نعم، نوفر التوصيل لجميع محافظات المملكة الأردنية الهاشمية.'
            : 'How long does the hair mist last? It lasts over 48 hours. Do you offer delivery? Yes, we provide fast delivery across all cities in Jordan.'
        };
      case '/shipping':
        return {
          title: t('shipping'),
          eyebrow: isAr ? 'معلومات التوصيل والشحن' : 'Shipping & Logistics',
          desc: isAr
            ? 'رسوم التوصيل: عمان 2.00 دينار، باقي المحافظات (الزرقاء، إربد، السلط) 3.00 دينار، العقبة والمناطق النائية 4.00 دينار. مدة التوصيل خلال 24 إلى 48 ساعة عمل.'
            : 'Delivery Fees: Amman 2.00 JOD, other major cities (Zarqa, Irbid, Salt) 3.00 JOD, Aqaba & remote areas 4.00 JOD. Delivery timeline is 24-48 business hours.'
        };
      case '/returns':
        return {
          title: t('returns'),
          eyebrow: isAr ? 'سياسة الاستبدال والاسترجاع' : 'Returns & Exchange Policy',
          desc: isAr
            ? 'نثق بجودة عطورنا، ولذلك نتيح للعميل فحص واختبار العطر مباشرة عند الاستلام مع موظف التوصيل وقبل دفع الحساب.'
            : 'We trust our quality. Customers are welcome to inspect and test the fragrance with the delivery agent prior to paying.'
        };
      case '/privacy':
      case '/privacy-policy':
        return {
          title: t('privacy'),
          eyebrow: isAr ? 'سياسة الخصوصية' : 'Privacy Statement',
          desc: isAr
            ? 'نحن نحترم خصوصيتك بالكامل. لا نقوم بتخزين أي بيانات شخصية أو بنكية دائمة للعملاء؛ الطلبات تُعالج كزائر وتمريرها مباشرة إلى الواتساب.'
            : 'We respect your privacy. No personal checkout details are stored permanently on our servers; guest checkouts are routed directly to WhatsApp.'
        };
      case '/terms':
      case '/terms-and-conditions':
        return {
          title: t('terms'),
          eyebrow: isAr ? 'الشروط والأحكام' : 'Terms of Service',
          desc: isAr
            ? 'استخدامك لمتجر دهب للعطور يعني موافقتك على شروط التوصيل المحلي داخل الأردن وتأكيد طلبك عبر الواتساب لإتمامه.'
            : 'By using DAHAB PERFUMES store, you agree to local shipping parameters in Jordan and order confirmation via WhatsApp.'
        };
      default:
        return {
          title: 'DAHAB PERFUMES',
          eyebrow: 'Luxury Fragrance House',
          desc: ''
        };
    }
  };

  const content = getPageContent();

  return (
    <PageContainer size="narrow" className="py-28 flex flex-col items-center justify-center text-center gap-8">
      {/* Eyebrow badge */}
      <span className="rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold-dim)]">
        {content.eyebrow}
      </span>
      
      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
        {content.title}
      </h1>

      {/* Double-Bezel Premium Enclosure */}
      <div className="rounded-[2rem] bg-black/5 dark:bg-white/5 p-2.5 ring-1 ring-black/5 dark:ring-white/10 max-w-3xl w-full mt-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01]">
        <div className="rounded-[calc(2rem-0.625rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-12 shadow-main text-center flex flex-col items-center gap-6">
          <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-light leading-relaxed dir-auto whitespace-pre-line text-center">
            {content.desc}
          </p>
          {(pathname === '/store-location' || pathname === '/location') && (
            <div className="mt-4 flex flex-col gap-4">
              <div className="relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden border border-[var(--color-border)]">
                <iframe 
                  src={mapEmbedUrl} 
                  className="w-full h-full border-0 grayscale invert contrast-[0.9] opacity-80 hover:grayscale-0 hover:invert-0 transition-all duration-500"
                  allowFullScreen="" 
                  loading="lazy"
                  title="Dahab Perfumes Location Map"
                />
              </div>
              <a 
                href={mapsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary w-full text-center py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'افتح الموقع الجغرافي في خرائط Google' : 'Open Location in Google Maps'}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
