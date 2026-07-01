# PRODUCTION LIMITATIONS DOCUMENT
### DAHAB PERFUMES — Staging Demo vs. Production Upgrade Requirements

This document clearly outlines the technical architecture limitations of the current demo environment and lists the necessary upgrades required before launching **DAHAB PERFUMES** as a real-world, multi-user production e-commerce application.

---

## 1. Current Demo Architecture (Local/Client-Side Only)

For presentation and feedback, the current build uses a lightweight client-side data layer:
- **Authentication**: Admin auth is validated client-side inside the Zustand store `useAuthStore.js`. Fallback credentials (`admin` / `dahab101`) are checked locally.
- **Data Persistence**: Products, stock levels, and order history are saved in `localStorage` under `dahab_products` and `dahab_orders` keys.
- **Scope**: Changes made in the admin panel (such as editing product prices or restocking items) and orders created during checkout are isolated to the current user's browser cache. If the cache is cleared, the system resets.
- **Card Payment**: The Credit Card payment option is a placeholder only. No gateway integration is active, and no payment details are requested or recorded.

---

## 2. Production Upgrade Requirements

To prepare the application for real customers and multi-admin management, the local storage layer must be replaced with a secure backend server.

### A. Database Layer (Recommended Stack)
A persistent cloud database is required to centralize and share product catalogs and orders across all users.
- **Suggested Database**: **Supabase** (PostgreSQL-based, provides instant REST APIs and real-time triggers) or **PostgreSQL** hosted on Neon/Render.
- **Object Relational Mapper (ORM)**: **Prisma** (simplifies database schemas and TypeScript queries in Next.js).
- **Migration Path**: Rewrite the data methods in `ProductRepository.js` and `OrderRepository.js` to call API routes (e.g. `fetch('/api/products')`) instead of `StorageService`.

### B. Admin Authentication
To prevent unauthorized access, route guards must check server-signed session cookies rather than local variables.
- **Suggested Library**: **Auth.js** (formerly NextAuth.js).
- **Authentication Method**: Email/Password credentials or OAuth logins secured with **HTTP-Only JWT Session Cookies**.
- **Migration Path**: Create API route endpoints under `src/app/api/auth/[...nextauth]` and add Next.js middleware protection (`middleware.js`) to secure the `/admin` routes.

### C. Image Asset Uploads
Currently, image paths in the product CRUD form expect direct URLs. Admins will need to upload images from their devices.
- **Suggested CDN**: **Cloudinary** or **Uploadthing**.
- **Migration Path**: Connect the add/edit product forms to an upload endpoint that saves files to Cloudinary and returns the hosted URL.

### D. Secure Payment Gateways
To accept online Visa/Card payments, integrate a local merchant gateway.
- **Suggested Gateways**: Stripe, Checkout.com, or local Jordanian gateways (e.g. Arab Bank, JoyPay, Zain Cash).
- **Migration Path**: Integrate the gateway SDK on the checkout page, process the checkout session securely via Next.js server actions, and update the order object state once the payment webhooks return success.

---

## 3. Recommended Production Tech Stack Matrix

| Architecture Component | Demo Implementation | Production Recommendation |
|---|---|---|
| **Frontend Framework** | Next.js 15.5 App Router | Next.js 15.5 App Router |
| **Styling Engine** | Tailwind CSS v4.0 | Tailwind CSS v4.0 |
| **Global State** | Zustand v5.0 | Zustand v5.0 |
| **Data Persistence** | `localStorage` | PostgreSQL / Supabase |
| **Data Queries** | Direct JSON arrays | Prisma ORM |
| **Image CDN** | Static Unsplash URLs | Cloudinary / Amazon S3 |
| **Admin Route Guard** | Client `useEffect` redirects | Next.js Middleware + NextAuth |
| **Payment Gateway** | WhatsApp redirect / COD | COD + Zain Cash / Stripe |
| **Staging Hosting** | Vercel (Free tier) | Vercel (Pro tier) |
