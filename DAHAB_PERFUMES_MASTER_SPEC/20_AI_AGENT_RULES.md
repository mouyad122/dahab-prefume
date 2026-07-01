# 20. CONSTRAINTS AND CODING AGENT RULES

This document establishes the strict rules that any developer or AI coding agent must follow when building this website.

---

## 1. Core Implementation Constraints
* **Read First:** Never write code before opening, reading, and understanding every specification file inside the `DAHAB_PERFUMES_MASTER_SPEC` folder.
* **No Placeholders:** Do not use "Lorem Ipsum" or random placeholder texts under any circumstances. All copy, descriptions, and details must use the default bilingual data seeded in the specification files.
* **No Code Duplication:** Before creating any new component, check the existing directory to see if a reusable module already exists.
* **Strict Route Tree:** Do not create single-page landing templates. Every route specified in the route architecture file must resolve to its own dedicated view component and URL path.

---

## 2. Naming & Identity Constraints
* **Brand Integrity:** The primary brand name logo and navbar text **must** be rendered as `DAHAB PERFUMES` (English letters, Cormorant Garamond font) in both Arabic and English modes.
* **No translation:** Do not translate the main brand name logo text into "دهب للعطور".

---

## 3. Bilingual & Theme Support
* **Arabic Default:** The website must default to Arabic.
* **Alignment Rules:** Toggling languages changes text alignment (`dir="rtl"` / `dir="ltr"`) but **never** mirrors the overall layout columns or grid systems.
* **Main Theme (Dark):** Dark mode is the primary luxury experience, resembling a high-end physical boutique at night.
* **Alternative Theme (Light):** Light mode must be designed properly, using warm cream backgrounds and clean gray borders instead of flat inverted white.

---

## 4. Feature Integrity
* **No Excluded Features:** Do not build login flows for customers, coupon code systems, comparison lists, or custom blogs.
* **Required Features:** You must implement guest-checkout-only, wishlists using local storage, floating WhatsApp assistance, and the admin control panel.
* **Database Backup:** The admin portal must support JSON exports and imports to backup and restore the database state.

---

## 5. Priority of Specifications
If you encounter conflicting details across documents, resolve them based on this priority order:
1. **20_AI_AGENT_RULES.md** (This document)
2. **MASTER_PROMPT.md**
3. **Other master specification markdown files**
