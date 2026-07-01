# 04. INFORMATION ARCHITECTURE

This file maps the route tree, sitemap, page metadata structures, and link connections.

---

## 1. Route Table & Page Hierarchy

```mermaid
graph TD
    Root[/] --> Home[Home /]
    Root --> Shop[Shop /shop]
    Root --> ProductDetail[Product Detail /products/:slug]
    Root --> Collections[Collections /collections]
    Root --> Static[Static Pages /about, /contact, /shipping, etc.]
    Root --> Cart[Cart /cart]
    Root --> Checkout[Checkout /checkout]
    Root --> Success[Order Success /order-success]
    Root --> Admin[Admin Portal /admin]
```

### Route Index Table
| URL Path | View Component | Target Audience | Access Gate | SEO Indexing |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Home` | Public | Open | Index, Follow |
| `/shop` | `Shop` | Public | Open | Index, Follow |
| `/products/:slug` | `ProductDetail` | Public | Open | Index, Follow |
| `/collections` | `CollectionsList` | Public | Open | Index, Follow |
| `/collections/:slug` | `CollectionDetail` | Public | Open | Index, Follow |
| `/about` | `StaticPage(about)` | Public | Open | Index, Follow |
| `/contact` | `StaticPage(contact)` | Public | Open | Index, Follow |
| `/store-location` | `StaticPage(location)` | Public | Open | Index, Follow |
| `/reviews` | `ReviewsList` | Public | Open | Index, Follow |
| `/faq` | `StaticPage(faq)` | Public | Open | Index, Follow |
| `/shipping` | `StaticPage(shipping)` | Public | Open | Index, Follow |
| `/returns` | `StaticPage(returns)` | Public | Open | Index, Follow |
| `/privacy-policy` | `StaticPage(privacy)` | Public | Open | Index, Follow |
| `/terms-and-conditions` | `StaticPage(terms)`| Public | Open | Index, Follow |
| `/wishlist` | `Wishlist` | Public | Open | Noindex, Follow |
| `/cart` | `Cart` | Public | Open | Noindex, Follow |
| `/checkout` | `Checkout` | Public | Open | Noindex, Follow |
| `/order-success` | `OrderSuccess` | Public | Open | Noindex, Follow |
| `/admin/login` | `AdminLogin` | Admin | Open | Noindex, Nofollow |
| `/admin` | `AdminDashboard` | Admin | Authenticated | Noindex, Nofollow |
| `/admin/products` | `AdminProducts` | Admin | Authenticated | Noindex, Nofollow |
| `/admin/inventory` | `AdminInventory` | Admin | Authenticated | Noindex, Nofollow |
| `/admin/orders` | `AdminOrders` | Admin | Authenticated | Noindex, Nofollow |

---

## 2. Page Metadata Structure

Every route **must** inject customized page elements. 

### Page Metadata Matrix
* **Home:**
  * EN Title: `DAHAB PERFUMES | Luxury Fragrance Boutique - Downtown Amman`
  * AR Title: `DAHAB PERFUMES | متجر عطور فاخرة - وسط البلد، عمان`
  * Description: `Experience exquisite perfume oils and nourishing hair mists handcrafted in Jordan. Scent longevity & projection guaranteed.`
* **Shop:**
  * EN Title: `Shop Fine Perfumes & Scented Hair Mists | DAHAB PERFUMES`
  * AR Title: `تسوق العطور الفاخرة ومعطرات الشعر | DAHAB PERFUMES`
  * Description: `Explore our collection of long-lasting hair mists, private blends, and classic Middle Eastern fragrances. Delivery across Jordan.`
* **Product Detail Pages:**
  * EN Title: `[Product Name] - Luxury Perfume | DAHAB PERFUMES`
  * AR Title: `[Arabic Product Name] - عطر فاخر | DAHAB PERFUMES`
  * Description: `Discover the olfactory notes, longevity specs, and pricing for [Product Name]. Hand-blended for unmatched presence.`
* **Boutique Location:**
  * EN Title: `Find Our Boutique in Downtown Amman | DAHAB PERFUMES`
  * AR Title: `موقع معرضنا في وسط البلد، عمان | DAHAB PERFUMES`
  * Description: `Visit us opposite Petra Cinema Alley on Prince Muhammad Street. View working hours, map directions, and contact details.`

---

## 3. Breadcrumb Rules
* Breadcrumbs must be rendered on all public sub-routes (e.g., `/shop`, `/products/:slug`, `/collections/:slug`).
* Format: `Home > Shop > Category > Product Name` (translated to the active language).
* Separator: A clean angle bracket or bullet point (`>` or `·`).

---

## 4. Internal Linking Rules
* **No Broken Links:** Every route must be mapped to valid page endpoints. 
* **Canonical Navigation:** Anchor tags (`<a>` or React `Link` instances) must be used instead of custom JavaScript redirection functions (`window.location`) to ensure search engine spiders can easily trace pathways.
* **Semantic Anchor Markup:** Apply informative `aria-label` metadata tags on textless links (such as image blocks or raw social media icons).
