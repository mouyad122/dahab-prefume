# Dahab Perfumes — Public Product API Contract

## Source of Truth
The database is the official source of product data. Do NOT use mock data with different field names. If temporary mock data is needed during development, it must exactly match this public product contract.

## Public Product Shape
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

## Forbidden Public Fields
These fields must NEVER appear in public API responses:
- `id` (internal database UUID)
- `inspired_by` (internal/admin)
- `notes` (internal)
- `research_confidence` (internal)
- `source_excel_row` (internal)
- `needs_review` (internal/admin)
- `created_at` (internal)
- `updated_at` (internal)
- `price_50ml_fils` (raw — use resolved `prices` instead)
- `price_100ml_fils` (raw)
- `price_200ml_fils` (raw)
- `productId` (relation ID)

## Pricing Resolution
- 330 products use **general pricing** from GlobalPricingSettings.
- 1 product (Row 4 / DHB-0004 / عود ملكي) uses **custom pricing**.
- The `prices` object is always resolved by the API — the frontend does NOT need to query GlobalPricingSettings separately.
- `uses_general_pricing` is included so the frontend knows the pricing source.

## API Endpoints

### GET /api/products
Paginated public product list.

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| page | int | 1 | >= 1 |
| limit | int | 24 | 1-100 |
| q | string | — | Search by name/keywords, max 200 chars |
| main_category | string | — | Filter |
| gender | string | — | Filter |
| season | string | — | Filter |
| family_tag | string | — | Filter |
| featured | boolean | — | 'true' to filter featured only |
| sort | string | sku_asc | Allowed: name_asc, name_desc, sku_asc, sku_desc, newest, oldest |

Response:
```json
{
  "products": [...],
  "total": 331,
  "page": 1,
  "totalPages": 14
}
```

### GET /api/products/[slug]
Single product by slug.

Response (200):
```json
{ "product": { ... } }
```

Response (404):
```json
{ "error": "Product not found" }
```

### GET /api/products/featured
Featured products.

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| limit | int | 12 | 1-50 |

Response:
```json
{ "products": [...] }
```

### GET /api/products/filters
Filter options derived from visible products.

Response:
```json
{
  "main_categories": ["عطور", ...],
  "genders": ["رجالي", "نسائي", "للجنسين"],
  "seasons": ["جميع المواسم", ...],
  "family_tags": ["خشبية", "شرقية", ...]
}
```

## Image Placeholder Rule
- If `image_filename === "missing"` or `needs_image === true`, the frontend must display a luxury placeholder image.
- Do NOT show a broken image icon.
- All 331 products currently have `image_filename = "missing"`.

## WhatsApp Checkout
- No online payment is currently implemented.
- Checkout should build a WhatsApp URL:
  `https://wa.me/962785050655?text=...`
- The text should include selected products, sizes, and total price.

## Frontend Integration Notes
- Always fetch from `/api/products` — the database is the source of truth.
- Match field names exactly as documented.
- Do not invent additional fields.
- Prices are always pre-resolved in the `prices` object.
- Currency is always JOD (Jordanian Dinar), subdivided into 1000 fils.
- **Fragrance Accords Strength:** The `strength` field in each accord represents the intensity level as imported from the official catalog (percentage-like integer values, typically ranging from 70 to 95, e.g., 70, 75, 80, 85, 90, 95). The frontend should treat this as a progress or intensity indicator (e.g., rendering a progress bar or strength percentage) and must NOT attempt to normalize or map it to a 1–5 star rating.

