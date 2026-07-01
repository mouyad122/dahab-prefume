# 07. ADMIN PANEL

This document defines the interface rules, layout specifications, and security scopes of the DAHAB PERFUMES Admin Portal.

---

## 1. Authentication & Security Gateway
* **Route:** `/admin/login`.
* **Visual style:** Extremely clean, centered layout using a dark background. Only renders standard text input fields for Username and Password.
* **Credentials (Static Seed):**
  - Username: `admin`
  - Password: `dahab101`
* **Session Persistence:** Authenticating correctly saves a token to the client state (`localStorage` or `sessionStorage`). Navigating to any `/admin` path without a valid session token triggers an immediate redirection to `/admin/login`.

---

## 2. Dashboard View
* **Route:** `/admin`.
* **Interface Layout:** Renders three key blocks:
  1. **Analytics Summary Row:** Displays:
     - Total Order Count
     - Total catalog item count
     - Low Stock triggers
     - Out of Stock items
     - Revenue calculation placeholder (subtotal of confirmed and delivered orders)
  2. **Alerts Panel:** Dynamic block listing products whose stock quantities have fallen below the predefined low-stock threshold (default: 5 units).
  3. **Recent Invoices Table:** Logs the last 5 submitted orders with indicators for status updates.

---

## 3. Product Catalog CRUD Panel
* **Route:** `/admin/products`.
* **Inventory Spreadsheet Grid:** Displays columns for:
  - Product Thumbnail
  - Name (AR/EN)
  - SKU
  - Price & Compare Price
  - Stock Count
  - Status Indicators (Featured, New, Bestseller, Hidden)
  - Edit / Delete triggers
* **Interactive Modals:**
  - **Create / Edit Form:** Custom modal to add or edit product fields (SKU, pricing, descriptions, notes, and tags).
  - **Delete Action:** Prompts for confirmation to prevent accidental data loss.

---

## 4. Inventory Controller
* **Route:** `/admin/inventory`.
* **Quick Updates:** A streamlined grid showing product stock counts with simple stepper inputs (`+` / `-`) to adjust numbers instantly.
* **Low Stock threshold settings:** Allows editing warning limits per product ID.

---

## 5. Order Management & Invoices
* **Route:** `/admin/orders`.
* **Overview Grid:** Displays columns for Order ID, Date, Customer Name, Phone, City, Total price, and Status.
* **Filter options:** Filters order logs by status (Pending, Confirmed, Preparing, Out for Delivery, Delivered, Cancelled) or customer name/phone.
* **Detail view modal:** Opens a summary listing the exact products ordered, totals, customer notes, and payment status, with a dropdown to update order state.

---

## 6. Admin Panel UX & Form Integrity
* **Form Fields:** Use placeholders and labels in both Arabic and English.
* **Validations:** Require standard checks (e.g., prices must be positive numbers, SKUs must be unique strings).
* **Language Switcher:** Renders in the footer of the admin page shell to allow editing content in either language.
* **Local Backups:** A settings section allowing the administrator to download the complete database (products, inventory, and order tables) as a single `.json` backup file, upload a previously saved file, or perform a factory reset to restore default seeds.
