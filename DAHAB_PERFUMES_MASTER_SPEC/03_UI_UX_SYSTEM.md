# 03. UI / UX SYSTEM

This document details the visual rules, layout specifications, and user interactions required to build a premium interface.

---

## 1. UX Principles
* **Quiet Luxury:** Clean space, minimal widgets. Focus strictly on beautiful product imagery, spacious grids, and refined typography.
* **Frictionless Path:** Guest checkout by default. No login gates, password checks, or required emails.
* **Stable Layouts:** The core layout grid remains fixed LTR. Toggling language (AR/EN) switches reading alignment of paragraphs and headings using the `.dir-auto` utility class but **never** mirrors the overall layout columns, navigation pill bars, or order lists.
* **Instant Feedback:** Hover states on buttons, icons, and product cards must trigger immediately with smooth, hardware-accelerated transitions.

---

## 2. Mobile-First Rules
* **Touch Targets:** All buttons, selectors, and triggers must maintain a minimum height and width of 44px to prevent tap overlaps.
* **Product Grids:** Render 2 columns on mobile viewports for compact browsing, wrapping into 3 or 4 columns on larger desktop screens.
* **Navigation Drawer:** Mobile drawer menu slides in from the left containing translation selectors, collection routes, and social media links.
* **Sticky Buy Button:** Product detail views display a sticky button at the bottom of the screen on mobile devices when the main add-to-cart button rolls off-screen.

---

## 3. Luxury Layout Rules
* **Whitespace:** Ensure sections are separated by generous gaps (minimum 64px padding-top/bottom). Do not cram sections.
* **Content Width:** Public page contents must be constrained to a maximum width of `1280px` (`max-w-7xl`) and centered.
* **Symmetry:** Section titles, eyebrows, descriptions, and CTAs must be horizontally centered on the Home page, Category listings, and Boutique maps block.

---

## 4. Header Behavior
* **Structure:** A flat, clean, non-floating layout divided into two layers:
  1. **Utility Bar:** A thin bar containing social media icons on one side, and language switch + admin credentials link on the other.
  2. **Main Navigation:** Grid divided into three columns:
     - Left: Navigation routes (Home, Shop, Our Story, Contact).
     - Center: Centered typography brand logo (`DAHAB PERFUMES` in Cormorant Garamond).
     - Right: Interactive cart bag indicator displaying item count.
* **Sticky behavior:** Pins at the top of the browser viewport when scrolling down, acquiring a solid white background (light mode) or solid obsidian background (dark mode) with a soft shadow.

---

## 5. Footer Behavior
* **Appearance:** Fixed deep charcoal/black background in both dark and light modes.
* **Contrast:** Renders light text (`#A3A3A3` Slate gray) with gold highlights to close the user journey with an elegant, authoritative finish.
* **Information columns:** Divided into brand description, contact numbers, store hours, and useful quick page links.

---

## 6. Cart Drawer UX
* **Trigger:** Clicking the cart bag icon opens a sliding panel from the right.
* **Content:** Displays a vertical list of selected items, quantity step controls, thumbnail, and subtotal calculation.
* **Primary Action:** Proclaims "Order via WhatsApp" with the official WhatsApp green or deep gold color.
* **Empty Cart:** Renders a clean icon, descriptive label, and button redirecting directly back to `/shop`.

---

## 7. Wishlist UX
* **Persistence:** Saved in client state (`localStorage`) without requiring customer login.
* **Indicator:** Clicking the heart icon on any card toggles state, displaying a filled gold heart.
* **Page Route:** `/wishlist` displays a custom grid of all saved items.

---

## 8. State UX Specifications

### Loading State
* Renders a custom full-screen overlay in deep black containing a pulsing gold calligraphy glyph, preventing page layout shifts during initialization.

### Error State
* Renders clear notifications styled with a muted red background, providing the user with corrective feedback.

### Success State
* Displays a green circle checkmark badge, a detailed invoice recap, and an action button allowing users to resend order details to the boutique's WhatsApp line.
