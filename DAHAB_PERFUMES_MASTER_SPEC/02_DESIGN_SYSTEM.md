# 02. DESIGN SYSTEM

This design system defines the precise color, typography, spacing, border-radius, shadow, and UI component design tokens that must be declared in the global styles.

---

## 1. Design Tokens: Colors

### Dark Mode Base (Main Luxury Experience)
* `--color-bg-primary-dark`: `#0B0B0B` (Midnight Obsidian)
* `--color-bg-secondary-dark`: `#141414` (Soft Charcoal)
* `--color-bg-surface-dark`: `#1C1C1C` (Graphite Sheet)
* `--color-text-primary-dark`: `#FAFAF7` (Muted Off-White)
* `--color-text-secondary-dark`: `#A3A3A3` (Muted Slate)
* `--color-text-muted-dark`: `#5E5E5E` (Warm Gray)
* `--color-border-dark`: `rgba(255, 255, 255, 0.05)`
* `--color-border-strong-dark`: `rgba(255, 255, 255, 0.12)`

### Light Mode Base (Cosmetics Gallery Experience)
* `--color-bg-primary-light`: `#F7F5F1` (Warm Alabaster Cream)
* `--color-bg-secondary-light`: `#EEE4D2` (Soft Beige Sand)
* `--color-bg-surface-light`: `#FFFFFF` (Solid White)
* `--color-text-primary-light`: `#0D0D0D` (Charcoal Black)
* `--color-text-secondary-light`: `#4D4D4D` (Deep Stone Gray)
* `--color-text-muted-light`: `#8C8C8C` (Muted Gray)
* `--color-border-light`: `rgba(0, 0, 0, 0.06)`
* `--color-border-strong-light`: `rgba(0, 0, 0, 0.14)`

### The Accent Gold Palette
* `--color-gold`: `#C99B36` (Rich Metallic Gold)
* `--color-gold-light`: `#E7C873` (Champagne Accent)
* `--color-gold-dark`: `#A77A2A` (Antique Gold)
* `--color-gold-dim`: `rgba(201, 155, 54, 0.06)`
* `--color-gold-glow`: `rgba(201, 155, 54, 0.15)`

---

## 2. Design Tokens: Typography

### Font Families
* `--font-display`: `'Cormorant Garamond', Georgia, serif` (Editorial Display)
* `--font-sans-en`: `'Jost', -apple-system, sans-serif` (Clean Sans-Serif)
* `--font-sans-ar`: `'Tajawal', 'Cairo', sans-serif` (Clean Arabic Sans-Serif)

### Size Hierarchy (Modular Scale)
* `--text-hero`: `clamp(2.25rem, 5vw, 5rem)` (Hero headings)
* `--text-section`: `clamp(1.75rem, 3.5vw, 2.75rem)` (Section title)
* `--text-subheader`: `clamp(1.2rem, 2vw, 1.5rem)` (Cards / Details title)
* `--text-body`: `0.875rem` / `14px` (General body descriptions)
* `--text-meta`: `0.75rem` / `12px` (Labels / SKUs)
* `--text-eyebrow`: `10px` (All caps, generous tracking)

### Letter Spacing (Tracking)
* `--tracking-display`: `0.06em`
* `--tracking-eyebrow`: `0.25em`
* `--tracking-button`: `0.15em`

---

## 3. Spacing System
All grid gaps, margins, and paddings must adhere strictly to this scale to ensure design rhythm:
* `--space-xs`: `0.5rem` (8px) - inner elements / labels
* `--space-sm`: `1rem` (16px) - text gaps / buttons
* `--space-md`: `2.0rem` (32px) - card padding / row gaps
* `--space-lg`: `4.0rem` (64px) - section blocks
* `--space-xl`: `8.0rem` (128px) - top hero margins

---

## 4. Border Radius (Luxury Sharp Cuts)
Avoid cheap rounded card styles (e.g., 24px/32px radius feels like a web game). Use sharp, clean cuts:
* `--radius-sm`: `2px` (tag badges)
* `--radius-md`: `4px` (buttons / inputs)
* `--radius-lg`: `8px` (cards / drawers)
* `--radius-pill`: `9999px` (wishlist / navigation indicators)

---

## 5. Shadows
* `--shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.05)`
* `--shadow-md`: `0 10px 30px rgba(0, 0, 0, 0.08)`
* `--shadow-lg`: `0 20px 50px rgba(0, 0, 0, 0.15)`
* `--shadow-inset`: `inset 0 1px 1px rgba(255, 255, 255, 0.03)`

---

## 6. Base UI Components Specifications

### Buttons
* **Primary Gold Button:** Solid gold background, black text. Height 48px, sharp 4px radius. Font-weight bold, size 11px, all-caps, tracking 0.15em. On hover, background shifts to champagne gold with a subtle gold glow.
* **Secondary Black/Beige Button:** Transparent background, thin border (border-strong). White text (dark mode) or black text (light mode). Same dimensions and fonts as primary. On hover, background fills with transparent gold-dim.

### Cards
* Background: `--color-bg-secondary` in dark mode, `--color-bg-surface` in light mode.
* Border: `--color-border`.
* Shadow: `--shadow-md`.
* Padding: `--space-md`.

### Inputs & Forms
* Background: `--color-bg-surface` (dark mode) or `--color-bg-secondary` (light mode).
* Border: `--color-border`.
* Focus State: Border color transitions to `--color-gold` with custom glow ring. No heavy browser blue rings.
* Height: 44px for inputs, textareas are fixed height resizable.
* Padding: 12px horizontal.
