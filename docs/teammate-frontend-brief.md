# DAHAB PERFUMES — Teammate Frontend Integration Brief

This document serves as the integration brief for the frontend developer. It describes the completed backend API layer, public schemas, and rules for fetching and rendering the product catalog.

---

## 1. Backend Status & Architecture

* **Database Source of Truth:** The SQLite database (via Prisma) is the official source of product data.
* **Decoupled API:** The public API is completely frontend-agnostic and returns public-safe JSON payloads.
* **Legacy Mocks Deprecated:** The files `src/data/initialProducts.js` and `src/repositories/ProductRepository.js` are **legacy mock files only** and must not be used as the product source of truth. All product fetching must migrate to the `/api/products` endpoints.

---

## 2. Local Testing (Exposing Products)

By default, all 331 products in the database are hidden (`visible_on_website = false`). To test the catalog locally with real API data, use these dev-only scripts:

* **Expose 8 Sample Products:**
  ```bash
  npm run dev:show-sample-products
  ```
  Exposes a controlled test sample (`DHB-0002` to `DHB-0010`, excluding Needs Review items). This also marks `DHB-0004` (عود ملكي) as featured to verify custom pricing and featured layout behavior.
  
* **Reset Database (Hide All):**
  ```bash
  npm run dev:hide-all-products
  ```
  Resets all products back to hidden and unfeatured.

*These scripts are guarded and will immediately abort in production (`NODE_ENV === "production"`).*

---

## 3. Official API Endpoints

All endpoints support generic error handling (return `500` with `{ "error": "Internal server error" }` on server failure) and set public caching headers.

* **`GET /api/products`**  
  Returns a paginated list of visible products.  
  *Query Params:* `page`, `limit` (max 100, defaults to 24), `q` (search query), `main_category`, `gender`, `season`, `family_tag`, `featured` (`true`), `sort` (`name_asc`, `name_desc`, `sku_asc`, `sku_desc`, `newest`, `oldest`).

* **`GET /api/products/[slug]`**  
  Returns a single product by slug. Returns `404` if the product is hidden or doesn't exist.

* **`GET /api/products/featured`**  
  Returns only products that are both visible and marked as featured.  
  *Query Params:* `limit` (max 50, defaults to 12).

* **`GET /api/products/filters`**  
  Returns distinct filter arrays derived from active visible products: `main_categories`, `genders`, `seasons`, `family_tags`.

---

## 4. Public Product Shape

All queries return only public-safe objects. Internal/admin columns (like `id`, `inspired_by`, `notes`, `research_confidence`, `source_excel_row`, `needs_review`, etc.) are stripped at the database service layer and never exposed.

```json
{
  "sku": "DHB-0002",
  "slug": "عطر-اسم",
  "name_ar": "اسم العطر",
  "main_category": "عطور",
  "gender": "للجنسين",
  "season": "جميع المواسم",
  "fragrance_family_raw": "شرقية، خشبية",
  "family_tags": ["شرقية", "خشبية"],
  "accords": [
    { "position": 1, "name_ar": "عود", "strength": 95 },
    { "position": 2, "name_ar": "مسك", "strength": 85 }
  ],
  "short_description_ar": "...",
  "keywords_ar": "...",
  "image_filename": "missing",
  "needs_image": true,
  "visible_on_website": true,
  "featured_on_frontend": false,
  "uses_general_pricing": true,
  "prices": {
    "currency": "JOD",
    "sizes": {
      "50ml": { "fils": 10000, "jod": 10 },
      "100ml": { "fils": 15000, "jod": 15 },
      "200ml": { "fils": 25000, "jod": 25 }
    }
  }
}
```

---

## 5. Integration Rules

### 1. Mock Deprecation
Migrate the product catalog and detail pages away from `ProductRepository` or `initialProducts.js`. If you use mock structures during state initializations, ensure they align exactly with the schema in section 4.

### 2. State & Storage
* **Cart & Wishlist:** Can remain entirely client-side (handled via stores like Zustand, React Context, or LocalStorage) as no backend storage is built for these yet.

### 3. Image Handling
* All 331 products currently have `image_filename = "missing"` and `needs_image = true`.
* **Requirement:** The UI must display a premium/luxury placeholder image instead of showing a broken image.
* **Future Assets Path:** Once images are ready, they will be served from `/images/products/{image_filename}`.

### 4. Pricing
* **General Pricing (330 products):** 10 JOD (50ml) / 15 JOD (100ml) / 25 JOD (200ml).
* **Custom Pricing (1 product - `DHB-0004` / عود ملكي):** 12 JOD (50ml) / 18 JOD (100ml) / 30 JOD (200ml).
* **UI Display:** Always use `prices.sizes["50ml"].jod` (or `.fils` if doing sub-currency math) for display. Do **not** hardcode pricing matrices or expose raw database `price_*_fils` fields.

### 5. Accord Strengths
* Accord `strength` values represent intensity percentages (e.g. 70, 75, 80, 85, 90, 95).
* **Requirement:** Treat this as a progress or strength indicator (e.g. intensity bar, progress bar, or a percentage label). Do **not** map or normalize these values to 1–5 star ratings.

### 6. WhatsApp Checkout
* There is no online checkout page or payment gateway.
* Checkout must build a WhatsApp message URL: `https://wa.me/962785050655?text={urlencoded_message}`
* The message must be formatted in clear Arabic, specifying the cart items (Product Name, SKU, Size, Quantity) and the total order value in JOD.

### 7. Localization & Styling
* **Design Theme:** Premium Arabic luxury. RTL-first layout, elegant typography, utilizing black, white, and gold (`#D4AF37`) color palette.
* **Store Name:** DAHAB PERFUMES.

---

## 6. JavaScript Fetch Examples

### 1. Fetch Paginated Products
```javascript
async function fetchProducts(page = 1, limit = 24, filters = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...filters
  });
  
  const res = await fetch(`/api/products?${params}`);
  if (!res.ok) throw new Error('Failed to load products');
  
  const { products, total, totalPages } = await res.json();
  return { products, total, totalPages };
}
```

### 2. Fetch Product by Slug
```javascript
async function fetchProductBySlug(slug) {
  const res = await fetch(`/api/products/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null; // Product is hidden or does not exist
  if (!res.ok) throw new Error('Failed to load product');
  
  const { product } = await res.json();
  return product;
}
```

### 3. Fetch Featured Products
```javascript
async function fetchFeaturedProducts(limit = 12) {
  const res = await fetch(`/api/products/featured?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to load featured products');
  
  const { products } = await res.json();
  return products;
}
```

### 4. Fetch Active Filters
```javascript
async function fetchFilters() {
  const res = await fetch('/api/products/filters');
  if (!res.ok) throw new Error('Failed to load filters');
  
  const { main_categories, genders, seasons, family_tags } = await res.json();
  return { main_categories, genders, seasons, family_tags };
}
```
