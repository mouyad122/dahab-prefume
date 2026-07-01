# 10. SEO STRATEGY

This document outlines the optimization strategy to rank DAHAB PERFUMES search terms highly on Google Amman.

---

## 1. High-Priority Keywords

### Arabic Target Keywords
* `دهب للعطور` (Brand terms)
* `عطور في عمان` (Perfumes in Amman)
* `عطور في وسط البلد` (Downtown perfumes)
* `محل عطور في عمان` (Perfume shop in Amman)
* `معطرات شعر` (Hair mists Jordan)
* `عطور ثبات عالي` (High longevity fragrances)
* `عطور فواحة` (High projection perfumes)

### English Target Keywords
* `Dahab Perfumes` (Primary brand keyword)
* `Perfumes in Amman`
* `Perfume store Amman Jordan`
* `Hair mist Jordan`
* `Luxury perfumes Jordan`
* `Middle Eastern perfume shop Amman`

---

## 2. Structured Schema Markup (JSON-LD JSON)
Inject these structured data scripts into index headers:

### A. Local Business Schema (Home & Location routes)
```json
{
  "@context": "https://schema.org",
  "@type": "PerfumeStore",
  "name": "DAHAB PERFUMES",
  "image": "https://dahabperfume.com/logo.png",
  "url": "https://dahabperfume.com",
  "telephone": "+962785050655",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Prince Muhammad Street, Downtown",
    "addressLocality": "Amman",
    "addressCountry": "JO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.9548",
    "longitude": "35.9328"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday"],
      "opens": "09:00",
      "closes": "01:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "02:00"
    }
  ],
  "sameAs": [
    "https://web.facebook.com/Dahbperfume/",
    "https://www.instagram.com/dahabperfume/"
  ]
}
```

### B. Product Detail Schema
Automatically generate this schema for every product page:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Musk Dahab Hair Mist",
  "image": "https://dahabperfume.com/images/hair-mist-dahab.jpg",
  "description": "Luxurious hair mist enriched with Argan and Coconut oils.",
  "sku": "DAHAB-HM-DH05",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "JOD",
    "price": "20.00",
    "availability": "https://schema.org/InStock",
    "url": "https://dahabperfume.com/products/musk-dahab-hair-mist"
  }
}
```

---

## 3. Crawl & Index Optimizations
* **Canonical Headers:** Ensure every URL renders a `<link rel="canonical" href="https://dahabperfume.com/..." />` pointing to its primary domain source to prevent duplicate content flags on localized versions.
* **Sitemap.xml:** Automatically generates and indexes all active routes, catalog links, and collection categories.
* **Robots.txt:** Allow access to all public catalog items while blocking admin paths:
  ```text
  User-agent: *
  Disallow: /admin/
  Disallow: /checkout/
  Sitemap: https://dahabperfume.com/sitemap.xml
  ```
* **Image Alt Tags:** Use descriptive, keyword-rich alt attributes for all product thumbnails (e.g., `alt="Musk Vanilla Hair Mist bottle - DAHAB PERFUMES"`).
