# 11. PERFORMANCE ENGINEERING

This specification outlines the technical rules to maintain a fast, highly-responsive client experience.

---

## 1. Core Web Vitals Targets
Every public page must meet these performance thresholds under average network conditions:
* **Largest Contentful Paint (LCP):** Less than `1.5 seconds`.
* **First Input Delay (FID):** Less than `50 milliseconds`.
* **Cumulative Layout Shift (CLS):** Exactly `0.0`.
* **First Contentful Paint (FCP):** Less than `0.8 seconds`.

---

## 2. Image Optimization Rules
Images are typically the heaviest assets in e-commerce sites. Ensure these standards are met:
* **WebP Format Only:** Convert all graphics, photography assets, and thumbnails to `.webp` format. Avoid uploading raw `.png` or `.jpg` files.
* **Responsive Sizes:** Generate multiple resolutions of product images (e.g., 600px for catalog cards, 1200px for zoom detail galleries).
* **Lazy Loading:** Apply native `loading="lazy"` attributes on all images below the fold. Hero and main gallery images must load eagerly (`loading="eager"`).
* **Explicit Width & Height:** Always define explicit width and height dimensions to prevent layout shifts.

---

## 3. Web Font Optimization
* **Self-Hosting or Google Font preconnect:** If using external fonts (Cormorant Garamond, Jost, Tajawal), inject preconnect directives in the HTML header:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
* **Font-Display Swap:** Always declare `font-display: swap` in `@font-face` rules to allow the browser to display fallback fonts instantly while downloading primary families.

---

## 4. Javascript Optimization
* **Code Splitting:** Implement lazy loading on page components using dynamic imports (e.g., loading administrative dashboard panels only when `/admin` is accessed).
* **Bundle Minification:** Minify all JS and CSS assets during the build process.
* **Component Render Limits:** Optimize state selectors in Zustand stores to prevent unnecessary React re-renders.

---

## 5. Performance Acceptance Criteria
* The production build must compile without generating bundle warnings.
* All animations (hero triggers, cart drawer panels, card hovers) must achieve a consistent 60 FPS using hardware-accelerated CSS properties (`transform`, `opacity`).
