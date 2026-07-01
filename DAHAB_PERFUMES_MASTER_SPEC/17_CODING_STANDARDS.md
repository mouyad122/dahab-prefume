# 17. CODING STANDARDS AND GUIDELINES

This document establishes the code quality and structural guidelines to build a clean, maintainable codebase.

---

## 1. Folder Structure
The codebase must follow a modular, component-based folder structure:
```text
src/
├── components/          # Shared components (ProductCard, Layouts)
│   └── layout/          # Header, Footer, RootLayout
├── contexts/            # LanguageContext
├── data/                # Product seed datasets
├── features/            # Feature directories (e.g., cart, orders, admin)
│   ├── cart/components/ # CartDrawer
│   └── admin/pages/     # Admin views
├── pages/               # Page components
│   └── storefront/      # Home, Shop, ProductDetail, Checkout
├── repositories/        # ProductRepository, OrderRepository
├── services/            # StorageService, WhatsAppService
├── stores/              # Zustand stores (useCartStore, etc.)
├── App.jsx              # Main routing
├── index.css            # Stylesheets
└── main.jsx             # Entry point
```

---

## 2. Naming Standards
* **Components:** PascalCase (e.g., `ProductCard.jsx`, `CartDrawer.jsx`).
* **Hooks & Stores:** camelCase starting with `use` (e.g., `useCartStore.js`, `useProductStore.js`).
* **Utility Files & Repositories:** PascalCase or camelCase (e.g., `ProductRepository.js`, `WhatsAppService.js`).
* **Styles:** kebab-case for custom CSS classes (e.g., `.nav-pill`, `.dir-auto`).

---

## 3. Code Quality Principles
* **Single Responsibility Principle (SRP):** Keep components focused. A UI component should only handle styling and rendering, while business logic is delegated to repositories, services, or Zustand stores.
* **No Inline Styles:** Use Tailwind CSS utility classes. Avoid inline `style={{ ... }}` blocks unless dynamically calculating offsets (e.g., scroll positions or dynamic colors in the olfactory pyramid).
* **DRY (Don't Repeat Yourself):** Re-use components (like `ProductCard`) across pages. Avoid duplicating identical code structures.
* **Semantic HTML:** Ensure markup uses semantic elements (`<header>`, `<main>`, `<section>`) for structure and accessibility.
* **Zustand Selectors:** Always use targeted selectors when subscribing to Zustand store state to prevent unnecessary component re-renders:
  ```javascript
  // Correct selector usage
  const items = useCartStore(state => state.items);
  
  // Incorrect usage (triggers re-renders on any store update)
  const { items } = useCartStore();
  ```
