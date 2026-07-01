# 00. PROJECT OVERVIEW

## 1. Project Summary
**DAHAB PERFUMES** is a premier luxury boutique perfume house located in Downtown Amman, Jordan. The goal of this project is to construct the definitive brand portal and high-end e-commerce experience for the brand on the web. 

This platform will act as an editorial window showcasing the brand's premium craftsmanship, outstanding scent projection, and longevity, while enabling Jordan-wide delivery through a friction-free guest checkout integrated with WhatsApp.

---

## 2. Business Goals
* **Establish Digital Authority:** Position DAHAB PERFUMES visually alongside elite global fragrance houses (e.g., Byredo, Xerjoff, Creed).
* **Convert Digital Browsers to Buyers:** Streamline the path to purchase for local shoppers using a headless-style cart that transfers order payloads directly to WhatsApp.
* **Support Local Delivery Operations:** Systematize incoming Jordan order entries, shipping logistics, and inventory notifications.
* **Amplify Brand Heritage:** Highlight the physical downtown boutique presence and drive foot traffic via digital-to-offline maps redirection.

---

## 3. User Goals
* **Discover Exquisite Fragrances:** Explore highly-detailed descriptions of scent layers (top, heart, and base notes) to confidently buy online without smelling first.
* **Fast Checkout Experience:** Complete purchases as a guest in under 60 seconds without creating passwords or verified email accounts.
* **Instant Support:** Access direct WhatsApp consultations with boutique perfume experts for custom scent suggestions.
* **Bilingual Flexibility:** Navigate smoothly in high-quality Arabic or luxury English without visual layout degradation.

---

## 4. Brand Goals
* **Convey Inherent Value:** Command premium pricing by making quality immediately obvious (within the first 5 seconds of landing on the site).
* **Maintain Consistency:** Solidify brand identity by strictly rendering the logo and navbar branding as **DAHAB PERFUMES** in both language options.
* **Express Warm Luxury:** Merge deep dark themes (Obsidian, Charcoal, Metallic Gold light accents) with clean galleries to feel like a high-end physical boutique.

---

## 5. Technical Goals
* **Core Web Vitals Excellence:** Deliver a Largest Contentful Paint (LCP) under 1.5s, Cumulative Layout Shift (CLS) of 0, and First Input Delay (FID) under 50ms.
* **Decoupled Localized Architecture:** Provide fluid AR/EN switching with stable LTR layout grids, adjusting reading alignment dynamically via typography classes.
* **Offline-Ready Client Cache:** Persist wishlists and shopping carts locally in the client state (LocalStorage) without requiring API sync.
* **Extensible Admin Management:** Construct a secure dashboard to manage products, log statuses, review inventory, and export/import backup ledgers.

---

## 6. Project Scope
The project scope defines all elements to be engineered during the implementation phase:

### Included Features
* **Bilingual Translation Engine:** Custom context provider handling AR/EN localization.
* **Universal Cart & Wishlist:** LocalStorage-based features available to guest users.
* **Visual Olfactory Pyramids:** Interactive design elements presenting top/heart/base notes.
* **WhatsApp Order Gateway:** Automation formatting ordered items, total prices, and delivery addresses into a pre-compiled WhatsApp message.
* **Admin Inventory & Order Control:** Protected administration panel managing stock levels, catalog details, and order histories.
* **Local SEO Schema Markup:** LocalBusiness, Product, and Breadcrumb structured JSON-LD data.
* **Floating Utility Badge:** Responsive WhatsApp consultation trigger on all views.

---

## 7. Excluded Features
To preserve the luxury experience and focus on high-priority deliverables, the following features are **explicitly excluded** from development:
* **No Customer Accounts:** No signups, log-in screens, or password recovery for customers.
* **No Client Coupons:** No discount code inputs or checkout validation modules.
* **No Generic Blog or Newsletters:** Avoid low-value content feeds.
* **No Client comparison tools:** Avoid cheap specs tables.
* **No third-party Live Chats:** All communications are routed via direct WhatsApp.

---

## 8. Success Criteria
* **Visual Sensation:** The site must successfully pass the elite brand aesthetic evaluation (Creed/Byredo level layout).
* **Speed Grade:** 95+ score on PageSpeed Insights for desktop and 85+ for mobile devices.
* **Conversion Usability:** Checkout completed successfully in guest mode in under 60 seconds.
* **SEO Coverage:** 100% indexing indexation of all 9 premium product catalog pages.

---

## 9. Launch Readiness Checklist
- [ ] Production build compiles with zero console warnings/errors.
- [ ] Localized metadata (AR/EN) validated for all public URLs.
- [ ] WhatsApp integration tested with real checkout order payloads.
- [ ] Admin panel auth credentials locked and tested.
- [ ] Database backup/restore JSON pipelines verified.
- [ ] Images compressed and optimized in WebP format.
