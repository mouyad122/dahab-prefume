# 18. TESTING AND VERIFICATION STRATEGY

This document outlines the testing protocols required to verify features, performance, and accessibility.

---

## 1. Automated Testing Requirements
* **Production Build Check:** Execute production compilation checks before deployment:
  ```bash
  npm run build
  ```
  The build must complete successfully with zero bundle errors.

---

## 2. Manual Verification Checklists

### A. Localization & Visual Stability Test
- [ ] Toggle languages (AR <-> EN).
- [ ] Verify that typography direction updates correctly (`dir="rtl"` / `dir="ltr"`).
- [ ] Confirm layout structures (columns, navbars) do not flip or break alignment.
- [ ] Check text rendering for both Arabic (Tajawal) and English (Jost, Cormorant Garamond) fonts.

### B. Theme Mode Test
- [ ] Toggle dark and light modes.
- [ ] Verify background contrast: dark mode looks premium, light mode looks clean and readable.
- [ ] Ensure all text, buttons, borders, and icons update their colors correctly, leaving no invisible elements.

### C. E-Commerce Cart & Checkout Test
- [ ] Add products to cart, verifying quantity limits are respected.
- [ ] Confirm adding a product automatically triggers the side cart drawer.
- [ ] Test the checkout form validation (e.g., entering incorrect phone formats throws errors).
- [ ] Click "Confirm Order" to verify redirection to WhatsApp generates the correct message payload with items and pricing.

### D. Admin Control Panel Test
- [ ] Access `/admin/login` and verify incorrect credentials block entry.
- [ ] Authenticate with credentials (`admin` / `dahab101`) to confirm successful login.
- [ ] Add a new product to verify it seeds the database and lists in the catalog.
- [ ] Update product stock levels to verify status updates (e.g., from low-stock to out-of-stock).
- [ ] Test the database backup functionality: export as JSON, make a change, import backup, and verify state restores.
