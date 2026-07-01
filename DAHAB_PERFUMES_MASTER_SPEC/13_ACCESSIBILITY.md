# 13. ACCESSIBILITY (a11y) STANDARDS

The website must be fully usable for all individuals, complying with WCAG 2.1 AA guidelines.

---

## 1. Document Structure & Localization A11y
* **Language Indicators:** The HTML root tag must dynamically reflect the active language (`<html lang="ar">` or `<html lang="en">`).
* **Visual Reading Direction:** Applying `dir="rtl"` (Arabic) or `dir="ltr"` (English) must only adjust text blocks, preventing structural elements (navbars, drawers, grids) from flipping.
* **Readable Fonts:** Arabic copy must render in Tajawal or IBM Plex Sans Arabic at a minimum font size of `12px` to ensure readability.

---

## 2. Keyboard Navigation
* **Logical Tab Sequencing:** Users must be able to navigate the entire site (header links, product grids, forms, checkout paths) using the Tab key.
* **Visual Focus Indicators:** Interactive elements must display a distinct visual ring when focused.
* **Modal Constraints:** When the cart drawer or mobile menu opens, focus must be locked inside the active panel. Pressing the Escape (`Esc`) key must close the panel and return focus to the original button.

---

## 3. Visual Contrast
* **Text Contrast:** Body copy and links must maintain a contrast ratio of at least 4.5:1 against their backgrounds.
* **Color Independence:** Critical information (such as out-of-stock indicators or form validation errors) must not rely on color alone, providing accompanying icons or text labels.

---

## 4. Screen Readers & Assistive Technologies
* **Image Alt Text:** Provide descriptive alt tags on all images. For decorative illustrations, use empty alt attributes (`alt=""`) so screen readers skip them.
* **Semantic Markups:** Use standard semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`) instead of nested `<div>` blocks.
* **Aria Labels:** Use custom `aria-label` attributes on textless buttons (like the shopping bag icon or social links).
  - AR: `<button aria-label="سلة المشتريات">`
  - EN: `<button aria-label="Shopping Cart">`
