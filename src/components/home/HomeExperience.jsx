'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomeWatermarkVideo from './HomeWatermarkVideo';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, MapPin, Phone, Sparkle, Star, WhatsappLogo } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';

export default function HomeExperience() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(isAr ? 'مرحبًا، أريد ترشيح عطر مناسب من دهب.' : 'Hello, I would like a Dahab fragrance recommendation.')}`;

  // Map state — loaded from settings
  const [mapEmbedUrl, setMapEmbedUrl] = useState(
    'https://maps.google.com/maps?q=Dahab%20Perfumes%2C%20Prince%20Mohammad%20Street%2C%20Amman&t=&z=16&ie=UTF8&iwloc=&output=embed'
  );
  const [mapsLink, setMapsLink] = useState(brandConfig.googleMapsLink);
  const [addressAr, setAddressAr] = useState('شارع الأمير محمد، مقابل زقاق سينما البتراء، وسط البلد، عمّان');
  const [addressEn, setAddressEn] = useState('Prince Muhammad Street, opposite the historic Petra Cinema alley, Downtown Amman');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.contact?.store_google_maps_url) setMapsLink(data.contact.store_google_maps_url);
        if (data?.contact?.store_map_embed_url) {
          setMapEmbedUrl(data.contact.store_map_embed_url);
        } else if (data?.contact?.store_google_maps_url) {
          setMapEmbedUrl(`https://maps.google.com/maps?q=${encodeURIComponent(data.contact.store_google_maps_url)}&t=&z=16&ie=UTF8&iwloc=&output=embed`);
        }
        if (data?.contact?.address_ar) setAddressAr(data.contact.address_ar);
        if (data?.contact?.address_en) setAddressEn(data.contact.address_en);
      })
      .catch(() => {});
  }, []);

  const collections = [
    {
      title: isAr ? 'رجالي' : 'Men',
      text: isAr ? 'عطور رجالية بحضور فخم وثبات يدوم طويلاً.' : "Men's fragrances with a luxurious presence and long-lasting sillage.",
      href: '/collections/men',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900',
    },
    {
      title: isAr ? 'نسائي' : 'Women',
      text: isAr ? 'تركيبات ناعمة وجذابة تناسب كافة المناسبات.' : 'Soft and attractive compositions suitable for all occasions.',
      href: '/collections/women',
      image: 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&q=80&w=900',
    },
    {
      title: isAr ? 'عود' : 'Oud',
      text: isAr ? 'عود، عنبر، مسك وتوابل دافئة بحضور واضح.' : 'Oud, amber, musk, and warm spices with a confident trail.',
      href: '/collections/oud',
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=900',
    },
  ];

  const proof = [
    isAr ? 'ترشيح حسب الذوق والمناسبة' : 'Personal scent matching',
    isAr ? 'تجربة في المعرض قبل الشراء' : 'In-store testing before purchase',
    isAr ? 'طلب سريع عبر واتساب' : 'Fast WhatsApp ordering',
  ];

  const storyHighlights = [
    {
      icon: <Clock size={22} />,
      title: isAr ? 'منذ عام 2007' : 'Since 2007',
      text: isAr ? 'رحلة من الشغف والإبداع في قلب عمّان.' : 'A journey of passion and creativity in the heart of Amman.',
    },
    {
      icon: <Star size={22} weight="fill" />,
      title: isAr ? `${brandConfig.rating.score} نجوم` : `${brandConfig.rating.score} Stars`,
      text: isAr ? `${brandConfig.rating.reviewsCount}+ تقييم حقيقي على جوجل` : `${brandConfig.rating.reviewsCount}+ real Google reviews`,
    },
    {
      icon: <MapPin size={22} />,
      title: isAr ? 'وسط البلد' : 'Downtown Amman',
      text: isAr ? 'شارع الأمير محمد، عمّان.' : 'Prince Mohammad Street, Amman.',
    },
  ];

  return (
    <main className={`dahab-home relative overflow-hidden ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <HomeWatermarkVideo />
      <div className="relative z-10">
      {/* ── Hero ── */}
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="premium-container home-hero-grid">
          <div className="home-hero-copy">
            <div className="eyebrow">
              <Sparkle size={15} weight="fill" />
              <span>{isAr ? 'دار عطور فاخرة في عمّان' : 'Luxury fragrance house in Amman'}</span>
            </div>
            <h1 id="home-hero-title">{isAr ? 'DAHAB PERFUMES' : 'DAHAB PERFUMES'}</h1>
            <p>
              {isAr
                ? 'عطور شرقية وعالمية مختارة بعناية، مصممة لحضور يدوم من أول لقاء وحتى آخر أثر.'
                : 'Eastern and international fragrances curated for presence, longevity, and a lasting final impression.'}
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn-primary">
                <span>{isAr ? 'تسوّق العطور' : 'Shop Fragrances'}</span>
                <ArrowIcon size={18} />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <WhatsappLogo size={18} weight="bold" />
                <span>{isAr ? 'اطلب ترشيحًا' : 'Get a recommendation'}</span>
              </a>
            </div>
            <div className="hero-proof">
              {proof.map((item) => (
                <span key={item}>
                  <CheckCircle size={16} weight="fill" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-product-stage">
            <div className="hero-rating">
              <Star size={16} weight="fill" />
              <strong>{brandConfig.rating.score}</strong>
              <span>{isAr ? `${brandConfig.rating.reviewsCount} تقييم` : `${brandConfig.rating.reviewsCount} reviews`}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collections Band ── */}
      <section className="home-band">
        <div className="premium-container section-heading">
          <span>{isAr ? 'اختيارات منظّمة' : 'Curated Lines'}</span>
          <h2>{isAr ? 'اختر العطر حسب الحالة، لا حسب الزحمة.' : 'Choose by mood, not by noise.'}</h2>
        </div>
        <div className="premium-container collection-grid">
          {collections.map((collection) => (
            <Link key={collection.href} href={collection.href} className="collection-tile">
              <img src={collection.image} alt={collection.title} />
              <div>
                <h3>{collection.title}</h3>
                <p>{collection.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Editorial ── */}
      <section className="home-editorial">
        <div className="premium-container editorial-grid">
          <div>
            <span className="section-label">{isAr ? 'تجربة شراء أهدأ' : 'A calmer buying experience'}</span>
            <h2>{isAr ? 'لا تحتاج أن تعرف أسماء النوتات. نساعدك تختار الأثر.' : 'You do not need to know every note. We help you choose the impression.'}</h2>
          </div>
          <div className="editorial-panel">
            <p>
              {isAr
                ? 'في دهب، الاختيار يبدأ من المناسبة، قوة الحضور، وذوقك الشخصي. يمكنك زيارة المعرض أو إرسال رسالة واتساب ليقترح لك الفريق خيارات مناسبة.'
                : 'At Dahab, selection starts with occasion, presence, and personal taste. Visit the store or message us on WhatsApp for a focused recommendation.'}
            </p>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-gold-light)]">
              <MapPin size={17} />
              <span>{isAr ? 'افتح موقع المعرض' : 'Open store location'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── About Dahab Section ── */}
      <section className="home-about" aria-labelledby="about-dahab-title">
        <div className="premium-container">
          <div className="about-header">
            <span className="section-label">
              <Sparkle size={14} weight="fill" />
              {isAr ? 'قصتنا' : 'Our Story'}
            </span>
            <h2 id="about-dahab-title">
              {isAr ? 'عن دهب للعطور' : 'About Dahab Perfumes'}
            </h2>
            <p className="about-subtitle">
              {isAr
                ? 'رحلة من الشغف والإبداع في قلب وسط البلد، عمّان.'
                : 'A journey of passion and creativity in the heart of Downtown Amman.'}
            </p>
          </div>

          <div className="about-grid">
            <div className="about-story-panel">
              <div className="about-story-inner">
                <p>
                  {isAr
                    ? 'منذ عام 2007، حُفرت رحلتنا بالشغف والإبداع والتميّز. بدأت الحكاية من متجر صغير في وسط البلد تحت اسم "دهب"، حيث أصبح وجهة لعشاق العطور وخلطات العطور الفريدة.'
                    : 'Since 2007, our journey has been engraved with passion, creativity, and excellence. The story began in a small shop in Downtown Amman under the name "Dahab", becoming a destination for perfume lovers and unique fragrance blends.'}
                </p>
                <p>
                  {isAr
                    ? 'مع مرور الوقت، توسّعنا لنبدأ فصلاً جديداً من النمو والتميّز. واليوم، نحن إحدى كبرى محلات العطور في المملكة الأردنية الهاشمية، شهادةً على عقود من العمل المتفاني والالتزام بالجودة.'
                    : "Over time, we expanded to begin a new chapter of growth and excellence. Today, we are one of Jordan's leading perfume houses — a testament to decades of dedicated work and commitment to quality."}
                </p>
                <p>
                  {isAr
                    ? 'نمزج بين أصالة تراثنا وشغفنا بالابتكار لنخلق روائح تلامس القلب وتبقى للأبد.'
                    : 'We blend our authentic heritage with a passion for innovation to create scents that touch the heart and last forever.'}
                </p>

                <div className="about-actions">
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <MapPin size={18} />
                    <span>{isAr ? 'زيارة المعرض' : 'Visit Our Showroom'}</span>
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <Phone size={18} />
                    <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="about-highlights">
              {storyHighlights.map((item, i) => (
                <div key={i} className="about-highlight-card">
                  <div className="about-highlight-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
              <blockquote className="about-quote">
                {isAr
                  ? '"نحن عشاق العطور وصناع الذكريات، نؤمن بأن كل عطر يحمل قصة، وكل شعور له نفحة."'
                  : '"We are perfume lovers and memory makers — we believe every fragrance holds a story, and every feeling has a scent."'}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── Store Location & Map ── */}
      <section className="home-location" aria-labelledby="location-title">
        <div className="premium-container">
          {/* Header */}
          <div className="location-header">
            <span className="section-label">
              <MapPin size={14} weight="fill" />
              {isAr ? 'موقعنا' : 'Find Us'}
            </span>
            <h2 id="location-title">
              {isAr ? 'زيارة المعرض' : 'Visit Our Showroom'}
            </h2>
            <p className="location-subtitle">
              {isAr ? addressAr : addressEn}
            </p>
          </div>

          {/* Map + Info Grid */}
          <div className="location-grid">
            {/* Map */}
            <div className="location-map-wrap rounded-xl overflow-hidden border border-[var(--color-gold)] bg-[#050505]">
              <iframe
                title="موقع DAHAB PERFUMES في عمّان"
                src="https://www.google.com/maps?q=XW2J%2BRM%20Amman&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 min-h-[300px]"
              />
              {/* Overlay tint that lifts on hover */}
              <div className="location-map-overlay" aria-hidden="true" />
            </div>

            {/* Info Panel */}
            <div className="location-info-panel">
              <div className="location-info-row">
                <div className="location-info-icon">
                  <MapPin size={20} weight="fill" />
                </div>
                <div>
                  <strong>{isAr ? 'العنوان' : 'Address'}</strong>
                  <span>{isAr ? addressAr : addressEn}</span>
                </div>
              </div>

              <div className="location-info-row">
                <div className="location-info-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <strong>{isAr ? 'أوقات العمل' : 'Working Hours'}</strong>
                  <span>{isAr ? 'يومياً: 10:00 صباحاً – 10:00 مساءً' : 'Daily: 10:00 AM – 10:00 PM'}</span>
                </div>
              </div>

              <div className="location-info-row">
                <div className="location-info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <strong>{isAr ? 'تواصل معنا' : 'Contact'}</strong>
                  <span dir="ltr">{brandConfig.phoneLocal}</span>
                </div>
              </div>

              <div className="location-cta-group">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MapPin size={18} />
                  <span>{isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Phone size={18} />
                  <span>{isAr ? 'اسأل عن الطريق' : 'Ask for Directions'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="home-final">
        <div className="premium-container final-inner">
          <h2>{isAr ? 'ابدأ من العطر الذي يشبه حضورك.' : 'Start with the scent that feels like your presence.'}</h2>
          <Link href="/shop" className="btn-primary">
            <span>{isAr ? 'عرض المجموعة الكاملة' : 'View full collection'}</span>
            <ArrowIcon size={18} />
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}
