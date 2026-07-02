'use client';

import React from 'react';

/**
 * JSON-LD Structured Data component for SEO optimization.
 * Renders semantic schemas (Organization, LocalBusiness, Product, BreadcrumbList)
 * to enhance search engine visibility and support rich snippets.
 */
export default function JSONLD({ type, data }) {
  let schema = null;

  if (type === 'organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'DAHAB PERFUMES',
      'url': 'https://dahabperfume.com',
      'logo': 'https://dahabperfume.com/brand/dahab-logo.png',
      'sameAs': [
        'https://www.instagram.com/dahabperfumes.jo/',
        'https://www.facebook.com/profile.php?id=61560946288673'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+962-7-8505-0655',
        'contactType': 'customer service',
        'areaServed': 'JO',
        'availableLanguage': ['Arabic', 'English']
      }
    };
  }

  if (type === 'local-business') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'PerfumeStore', // Specific LocalBusiness type
      'name': 'DAHAB PERFUMES',
      'image': data?.image || 'https://dahabperfume.com/images/background.jpg',
      'priceRange': '$$',
      'telephone': '+962785050655',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Downtown Amman, Al-Hashimi Street',
        'addressLocality': 'Amman',
        'addressRegion': 'Amman Governorate',
        'addressCountry': 'JO'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '31.9522', // Amman Center coordinates
        'longitude': '35.9392'
      },
      'url': 'https://dahabperfume.com',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        'opens': '10:00',
        'closes': '22:00'
      }
    };
  }

  if (type === 'product' && data) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': data.title?.en || data.title,
      'image': [data.thumbnail],
      'description': data.shortDescription?.en || data.shortDescription,
      'sku': data.sku,
      'mpn': data.sku,
      'brand': {
        '@type': 'Brand',
        'name': 'DAHAB PERFUMES'
      },
      'offers': {
        '@type': 'Offer',
        'url': `https://dahabperfume.com/products/${data.slug}`,
        'priceCurrency': 'JOD',
        'price': data.price,
        'priceValidUntil': '2027-12-31',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': data.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'shippingDetails': {
          '@type': 'OfferShippingDetails',
          'shippingRate': {
            '@type': 'MonetaryAmount',
            'value': '2.00',
            'currency': 'JOD'
          },
          'shippingDestination': {
            '@type': 'DefinedRegion',
            'addressCountry': 'JO'
          }
        }
      }
    };
  }

  if (type === 'breadcrumb' && data?.items) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': data.items.map((item, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': item.name,
        'item': `https://dahabperfume.com${item.link}`
      }))
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
