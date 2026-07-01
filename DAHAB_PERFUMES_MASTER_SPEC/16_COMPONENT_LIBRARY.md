# 16. COMPONENT LIBRARY SPECIFICATION

This specification outlines the reusable UI components required for the DAHAB PERFUMES frontend.

---

## 1. Layout Components

### `RootLayout`
* **Purpose:** The shell wrapper rendering the page navigation, footer, cart drawer, and main content routing.
* **API Props:** None (wraps `<Outlet />`).

### `Header`
* **Purpose:** The global navigation bar.
* **State Access:** Uses `LanguageContext` (translation toggle) and `useCartStore` (cart item count).
* **Key Features:** Utility bar, centered brand logo, navigation links, cart button, mobile drawer menu.

### `Footer`
* **Purpose:** The global site footer.
* **Styling:** Forced dark theme in both modes.

---

## 2. Product Components

### `ProductCard`
* **Purpose:** Renders a product preview card.
* **API Props:**
  - `product` (Object): The product data model.
  - `index` (Number): Used to offset the entry animation delay.
* **Key Features:** Image hover zoom, gold wishlist heart toggle, quick-add action, price and compare-price badges.

### `OlfactoryPyramid`
* **Purpose:** Interactive section on the details page displaying scent layers.
* **API Props:**
  - `notes` (Object: `top` Array, `heart` Array, `base` Array).
* **Key Features:** Tab selections showing top, heart, and base notes with dynamic icons and custom color matching.

---

## 3. Cart & Checkout Components

### `CartDrawer`
* **Purpose:** Pinned side panel displaying the shopping cart.
* **State Access:** Connects to `useCartStore` for cart actions and items list.
* **Key Features:** Slide-in panel, item listing, quantity selectors, trash removal, subtotal display, and "Order via WhatsApp" button.

### `CheckoutForm`
* **Purpose:** Delivery form for ordering.
* **State Access:** Connects to `useCartStore` (subtotal and items) and `useOrderStore` (submit action).
* **Key Features:** Form inputs for guest checkout, validation errors, and success state redirection to WhatsApp.

---

## 4. Reusable Shared UI Components

### `LoadingOverlay`
* **Purpose:** Fullscreen initial loader.
* **Key Features:** Dark theme, pulsing gold calligraphy emblem, absolute positioning.

### `Badge`
* **Purpose:** Small status indicator.
* **API Props:**
  - `variant` (String): `gold | white | red`.
  - `children` (Node): Text content.

### `InputField`
* **Purpose:** Accessible form input.
* **API Props:**
  - `label` (String).
  - `error` (String): Error validation message.
  - `register` (Object): React Hook Form register bindings.
