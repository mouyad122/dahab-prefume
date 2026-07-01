# FINAL CLIENT DEMO CHECKLIST
### DAHAB PERFUMES — Verification Protocols for Client Presentation

Use this checklist to verify storefront and admin features on your staging URL before presenting the project to the DAHAB PERFUMES owner.

---

## 1. Storefront Public Experience

### 1.1. Homepage (`/`)
- [ ] Cinematic hero slides load correctly with high contrast.
- [ ] Swapping language (AR ⇄ EN) works. DAHAB PERFUMES remains English.
- [ ] Swapping theme (Light ⇄ Dark) updates colors instantly.
- [ ] Trust assurances ( longevity, sillage, free checkout tests) are readable.
- [ ] Customer Google reviews carousel scrolls.
- [ ] Store map location coordinates and addresses display correctly.

### 1.2. Scent Shop (`/shop`)
- [ ] Grid displays all 9 official products with correct thumbnail images.
- [ ] Category buttons (Hair Mists, Private, Middle Eastern) filter list.
- [ ] Search input matches items on name or SKU.
- [ ] Strikethrough pricing shows only on discounted products:
  - Musk Vanilla (22.00 ⇄ 18.00 JOD)
  - Eragon (55.00 ⇄ 45.00 JOD)
  - Arabian Oud Kalemat (42.00 ⇄ 35.00 JOD)

### 1.3. Scent Details (`/products/[slug]`)
- [ ] Navigating to product details is fast (SSG pre-rendered).
- [ ] Price tags, volume (e.g. 50ml), and notes top/heart/base are accurate.
- [ ] Longevity and sillage metrics render properly.
- [ ] Quantity selector clamps inputs between 1 and max stock.
- [ ] Related products carousel loads matching categories.
- [ ] Entering an invalid URL path shows the styled bilingual 404 page.

### 1.4. Personal Wishlist (`/wishlist`)
- [ ] Bookmarking a product adds it to the list.
- [ ] Bookmark counts in the header update.
- [ ] Clicking "Move to Cart" inserts the item into the cart and removes it from the wishlist.

### 1.5. Shopping Cart (`/cart` & Drawer)
- [ ] Adding products slides open the Cart Drawer.
- [ ] Qty controls update prices.
- [ ] Deleting items clears them from lists.
- [ ] Drawer footer proceed button links to checkout.
- [ ] Shipping label states: "Calculated at checkout" (preventing user confusion).

### 1.6. Checkout & WhatsApp Handoff
- [ ] Submitting empty checkout fields triggers validation notices.
- [ ] Phone validation rejects non-Jordanian strings but accepts valid configurations (e.g. `0785050655`).
- [ ] Selecting different cities dynamically alters delivery fees:
  - Amman: 2.00 JOD
  - Salt / Zarqa / Irbid: 3.00 JOD
  - Aqaba / Mafraq / Karak: 4.00 JOD
- [ ] Visa card selection displays warning banner and blocks submission.
- [ ] Cash on Delivery submits successfully, clearing the cart and routing to `/order-success`.
- [ ] WhatsApp confirmation button generates a pre-formatted message listing Order ID, items, quantities, delivery address, notes, and grand total. Message loads direct link to `wa.me/962785050655`.

---

## 2. Administrative Portal Experience

### 2.1. Admin Access & Login (`/admin/login`)
- [ ] Accessing `/admin` routes directly without login redirects to login.
- [ ] Submitting invalid logins shows error banner.
- [ ] Demo credentials (`admin` / `dahab101`) log in successfully.
- [ ] Sign-out button clears session and redirects to login.

### 2.2. Overview KPIs
- [ ] Total products, low stock, out of stock, and invoices widgets show accurate numbers.
- [ ] Total revenue sum matches all uncancelled orders.
- [ ] Recent invoices feed displays the 5 most recent checkouts.
- [ ] Top Selling Scents ranks popular products correctly.

### 2.3. Catalog CRUD (`/admin/products`)
- [ ] Add Scent modal saves new products.
- [ ] Edit Scent modal updates titles, pricing, slug, notes, and metrics.
- [ ] Empty names or negative prices fail validation.
- [ ] Duplicate slugs are blocked.
- [ ] Deleting a product prompts confirmation before archiving.

### 2.4. Inventory Qty Control (`/admin/inventory`)
- [ ] Product status badges update (Available, Low Stock, Out of Stock).
- [ ] Typing new stock levels on input blur saves changes.
- [ ] Quick restock buttons ("Set sold-out", "Restock to 10") adjust stock levels instantly.

### 2.5. Order Management (`/admin/orders`)
- [ ] New checkout orders appear in the log.
- [ ] Clickable phone copy copies phone to clipboard.
- [ ] WhatsApp icon opens direct chat with customer.
- [ ] Details modal shows address, notes, items breakdown, and status selector.
- [ ] **Cancellation Stock Test**:
  - Setting status to `cancelled` restores item quantities to inventory levels.
  - Setting status back to `confirmed` re-deducts inventory levels.
  - Toggling status repeatedly does not double-restore stock.

---

## 3. Responsive & Device QA
- [ ] **Mobile**: Hamburger menu slides. Cart drawer takes full screen. Table columns do not clip.
- [ ] **Desktop**: Header navigation, sidebar tabs, and details modals render cleanly.
