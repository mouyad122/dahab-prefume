'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, MagnifyingGlass, Sparkle } from '@phosphor-icons/react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { getProductImageSrc } from '../../../lib/productDisplay';
import PageContainer from '../../../components/layout/PageContainer';

const fallbackImage = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=700';

function price(product) {
  if (product.variants && product.variants.length > 0) {
    return product.variants[0].price;
  }
  return 0;
}

function formatJOD(fils) {
  return `${(fils / 1000).toFixed(3)} JOD`;
}

export default function CollectionDetailClient({ category, products = [] }) {
  const { language } = useContext(LanguageContext);
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;
  const title = (isAr ? category.name_ar : category.name_en) || category.name_ar || category.name_en;
  const description = (isAr ? category.description_ar : category.description_en) || category.description_ar || category.description_en;

  return (
    <main className={`shop-page ${isAr ? 'dir-ar' : 'dir-en'}`}>
      <section className="shop-hero">
        <PageContainer size="default" className="py-0">
          <Link href="/collections" className="product-back">
            <BackIcon size={15} />
            <span>{isAr ? 'العودة للمجموعات' : 'Back to collections'}</span>
          </Link>
          <div className="shop-hero-inner">
            <div>
              <div className="eyebrow">
                <Sparkle size={15} weight="fill" />
                <span>{isAr ? 'مجموعة عطرية' : 'Fragrance collection'}</span>
              </div>
              <h1>{title}</h1>
              <p>{description || (isAr ? 'مجموعة مختارة من عطور دهب.' : 'A curated Dahab fragrance line.')}</p>
            </div>
            <div className="shop-count">
              <strong>{products.length}</strong>
              <span>{isAr ? 'منتج' : 'products'}</span>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer as="section" size="default" className="pb-20 pt-8">
        {products.length === 0 ? (
          <div className="empty-state">
            <MagnifyingGlass size={42} />
            <p>{isAr ? 'لا توجد منتجات منشورة في هذه المجموعة حاليًا.' : 'No published products in this collection yet.'}</p>
            <Link href="/shop" className="btn-primary">{isAr ? 'عرض المتجر' : 'View shop'}</Link>
          </div>
        ) : (
          <div className="shop-grid">
            {products.map((product) => {
              const productName = (isAr ? product.name_ar : product.name_en) || product.name_ar || product.name_en;
              const image = getProductImageSrc(product, fallbackImage);
                const totalStock = (product.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
                return (
                  <Link href={`/products/${product.slug}`} key={product.id} className="fragrance-card">
                    <div className="fragrance-image">
                      <Image 
                        src={image} 
                        alt={`${product.name_ar || productName} من DAHAB PERFUMES`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                      {product.media_display_type === 'ai_360' && (
                        <span className="media-pill">{isAr ? 'عرض 360' : '360 View'}</span>
                      )}
                      {totalStock <= 0 && (
                        <span className="stock-pill">{isAr ? 'متوفر للطلب' : 'Available to order'}</span>
                      )}
                    </div>
                    <div className="fragrance-body">
                      <span>{title}</span>
                      <h2>{productName}</h2>
                      <div>
                        <strong>{formatJOD(price(product))}</strong>
                        <small>{totalStock > 0 ? (isAr ? 'متوفر الآن' : 'Available now') : (isAr ? 'متوفر للطلب' : 'Available to order')}</small>
                      </div>
                    </div>
                  </Link>
                );
            })}
          </div>
        )}
      </PageContainer>
    </main>
  );
}
