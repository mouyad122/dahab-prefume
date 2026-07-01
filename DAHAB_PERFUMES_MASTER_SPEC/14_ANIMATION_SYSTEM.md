# 14. ANIMATION SYSTEM

This document outlines the animation standards to ensure motion feels smooth, intentional, and luxurious.

---

## 1. Core Motion Principles
* **Subtlety:** Animations should enhance, not distract. Keep movements small and timings short.
* **Natural Easing:** Use smooth, natural easing curves instead of linear transitions:
  - Spring Reveal: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Panel Slide: `cubic-bezier(0.32, 0.72, 0, 1)`
* **Reduced Motion Support:** Respect system settings. If a user has enabled "Reduce Motion" on their device, disable all structural slide and scale transitions, replacing them with simple, instant opacity changes.

---

## 2. Animation Rules per Page Element

### A. Hero Section (Home Page)
* **Background Fade:** The main hero background image fades in slowly over `1.2 seconds`.
* **Atmospheric Gold Lights:** Gold backlighting or background elements shift slowly using hardware-accelerated transitions to simulate smoke or moving light.
* **Text Reveal:** Title and description lines slide up slightly (15px) while fading in.

### B. Product Cards
* **Hover Scale:** Hovering over a card triggers a subtle zoom on the product image (e.g., `scale(1.03)` over `500ms`).
* **Buy/View Actions:** The overlay and quick actions slide up from the bottom with a smooth fade.

### C. Cart Drawer & Mobile Menu
* **Slide Panel:** The panel slides in smoothly from the side over `400ms` using `--ease-drawer`.
* **Backdrop Fade:** The dark backdrop overlay fades in over `300ms` to provide focus.

---

## 3. Implementation Rules
* **Avoid Layout Shifts:** Never animate width, height, margin, or layout positions, as this forces the browser to recalculate the page structure, causing layout shifts and stutter.
* **Prefer CSS Transition:** Use standard CSS properties for simple transitions (like hover states). For complex, sequenced reveals, use Framer Motion.
* **No Clutter:** Do not use bouncy animations, infinite rotations, or fast flashing elements, as they degrade the premium brand feeling.
