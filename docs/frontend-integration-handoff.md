# Dahab Perfumes — Frontend Integration Handoff

This document outlines the official backend integration steps, endpoints, and architectural rules for frontend developers.

---

## 1. Official API Endpoints

The frontend must fetch product catalog data exclusively from these public HTTP endpoints:

* **`GET /api/products`**  
  Returns a paginated list of public-safe products.  
  *Query Parameters:* `page`, `limit` (max 100), `q` (search query), `main_category`, `gender`, `season`, `family_tag`, `featured` ('true'), `sort` (`name_asc`, `name_desc`, `sku_asc`, `sku_desc`, `newest`, `oldest`).

* **`GET /api/products/[slug]`**  
  Returns a single public-safe product object matching the slug. Returns `404` if the product is hidden or does not exist.

* **`GET /api/products/featured`**  
  Returns featured public-safe products.  
  *Query Parameters:* `limit` (max 50, defaults to 12).

* **`GET /api/products/filters`**  
  Returns all distinct filter categories derived from the active visible products catalog: `main_categories`, `genders`, `seasons`, `family_tags`.

---

## 2. Product API Contract Reference

For the exact JSON request/response schema, please refer to the backend API specification document:  
[Dahab Perfumes — Public Product API Contract](file:///c:/Users/DELL%205500/OneDrive/Desktop/perfume/docs/backend-product-contract.md)

> [!IMPORTANT]  
> Do not use mock or static data files with different field names or nested structures (e.g. initial static objects). Any development mocks or state management objects used during frontend building must align 100% with the schemas outlined in the product contract.

---

## 3. Product Visibility Rules

* **All products are currently hidden** (`visible_on_website = false`) in the database by default.
* The public API endpoints only return products where `visible_on_website = true`.

### Local Frontend Testing with Real API Data
For local development and testing of the public catalog APIs, the following controlled dev-only scripts are provided:

1. **Expose Sample Products:**
   ```bash
   npm run dev:show-sample-products
   ```
   This updates the database to make a small selected sample of products visible (`DHB-0002`, `DHB-0004`, `DHB-0005`, `DHB-0006`, `DHB-0007`, `DHB-0008`, `DHB-0009`, `DHB-0010`) and marks `DHB-0004` (عود ملكي) as featured to let you test custom pricing and featured layout sections. It skips all Needs Review products and retains the `image_filename = "missing"` and `needs_image = true` constraints.

2. **Hide/Reset Database:**
   ```bash
   npm run dev:hide-all-products
   ```
   This resets all products in the database back to hidden and unfeatured.

> [!WARNING]  
> These visibility control scripts are development-only support utilities. They refuse to run in production (`NODE_ENV === "production"`). Frontend developers must continue to fetch real API products from `/api/products` endpoints and must not use mock files as the source of truth.


---

## 4. Missing Product Images

* Currently, all 331 products in the database have `image_filename = "missing"` and `needs_image = true`.
* **Frontend Requirement:** The frontend must detect this condition and display a premium/luxury placeholder image instead of showing a broken image icon.

---

## 5. Checkout Flow

* **WhatsApp-Only Checkout:** There is no online payment system (Stripe, PayPal, etc.).
* The frontend must build a WhatsApp checkout URL that opens a chat with the shop manager:  
  `https://wa.me/962785050655?text=...`
* The `text` query param must contain a formatted, readable Arabic message listing:
  1. The selected products (names, SKUs, and sizes: 50ml/100ml/200ml)
  2. The quantities of each item
  3. The final total price in JOD

---

## 6. Frontend Features (Client-Side Only)

* **Cart:** The shopping cart state, items addition, and quantity modifications must be handled entirely client-side (e.g. via Zustand, React Context, or LocalStorage).
* **Wishlist:** Favorite items must be saved client-side only.

---

## 7. UI Design Guidelines

* **Arabic-only / RTL:** The entire website must be fully optimized for Arabic text direction (Right-to-Left).
* **Luxury Theme:** Dark mode or elegant white combined with gold accents (`#D4AF37`, etc.), premium typography, spacious layouts, and smooth animations.
