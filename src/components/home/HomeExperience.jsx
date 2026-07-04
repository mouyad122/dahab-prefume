'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Sparkle, Star, WhatsappLogo } from '@phosphor-icons/react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { brandConfig } from '../../config/brand';

export default function HomeExperience() {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const whatsappUrl = `https://wa.me/${brandConfig.whatsappNumberClean}?text=${encodeURIComponent(isAr ? 'مرحبًا، أريد ترشيح عطر مناسب من دهب.' : 'Hello, I would like a Dahab fragrance recommendation.')}`;

  const collections = [
    {
      title: isAr ? 'العطور الشرقية' : 'Oriental Signatures',
      text: isAr ? 'عود، عنبر، مسك وتوابل دافئة بحضور واضح.' : 'Oud, amber, musk, and warm spices with a confident trail.',
      href: '/collections/oud',
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=900',
    },
    {
      title: isAr ? 'المجموعة الخاصة' : 'Private Collection',
      text: isAr ? 'اختيارات أكثر تركيزًا للمناسبات والحضور المسائي.' : 'Deeper blends for evenings, occasions, and memorable entrances.',
      href: '/collections/private-collection',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900',
    },
    {
      title: isAr ? 'معطرات الشعر' : 'Hair Mists',
      text: isAr ? 'رائحة ناعمة على الشعر دون ثقل، مناسبة للاستخدام اليومي.' : 'Soft fragrance for hair, light enough for daily wear.',
      href: '/collections/hair-mists',
      image: 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&q=80&w=900',
    },
  ];

  const proof = [
    isAr ? 'ترشيح حسب الذوق والمناسبة' : 'Personal scent matching',
    isAr ? 'تجربة في المعرض قبل الشراء' : 'In-store testing before purchase',
    isAr ? 'طلب سريع عبر واتساب' : 'Fast WhatsApp ordering',
  ];

  return (
    <main className={`dahab-home ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero-bg" aria-hidden="true">
          <img
            src="/images/background.jpg"
            alt=""
            className="home-hero-bg-image"
            loading="eager"
            fetchPriority="high"
          />
        </div>
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
            <img
              src="/brand/dahab-logo.png"
              alt=""
              aria-hidden="true"
              className="hero-showcase-logo"
              loading="eager"
            />
            <div className="hero-rating">
              <Star size={16} weight="fill" />
              <strong>{brandConfig.rating.score}</strong>
              <span>{isAr ? `${brandConfig.rating.reviewsCount} تقييم` : `${brandConfig.rating.reviewsCount} reviews`}</span>
            </div>
          </div>
        </div>
      </section>

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
            <a href={brandConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-gold-light)]">
              <MapPin size={17} />
              <span>{isAr ? 'افتح موقع المعرض' : 'Open store location'}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div className="premium-container final-inner">
          <h2>{isAr ? 'ابدأ من العطر الذي يشبه حضورك.' : 'Start with the scent that feels like your presence.'}</h2>
          <Link href="/shop" className="btn-primary">
            <span>{isAr ? 'عرض المجموعة الكاملة' : 'View full collection'}</span>
            <ArrowIcon size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
