# 19. DEPLOYMENT AND DEVOPS SPECIFICATION

This document outlines the deployment strategy, environment variables, and backup management.

---

## 1. Hosting Options
* **Static Hosting Platforms (Recommended):** Vercel, Netlify, or Cloudflare Pages are recommended to deploy the build directory (`dist/`) directly. This ensures fast global delivery via CDNs.

---

## 2. Environment Variables (.env)
Create a `.env.production` file in the root folder containing metadata configurations:
```text
VITE_STORE_DOMAIN=https://dahabperfume.com
VITE_WHATSAPP_NUMBER=962785050655
VITE_CONTACT_PHONE=0785050655
VITE_CONTACT_EMAIL=islam.slooom@gmail.com
VITE_ADMIN_USER=admin
VITE_ADMIN_PASS_HASH=$2b$10$xyz...
```

---

## 3. Production Deployment Checklist
- [ ] Convert all product catalog assets and images to WebP format.
- [ ] Compress all files (HTML, CSS, JS, images) to minimize payload size.
- [ ] Inject canonical headers and structured JSON-LD schemas into index templates.
- [ ] Set up redirection configurations (e.g., mapping `www.dahabperfume.com` to `dahabperfume.com` via DNS rules).
- [ ] Verify SSL certificates are active (`HTTPS`).

---

## 4. Search Engine Analytics Setup
* **Google Search Console:** Submit `sitemap.xml` directly to Google Search Console to monitor search indexing and search terms in Amman, Jordan.
* **Google Analytics:** Inject a tracking snippet (e.g., GA4) inside the HTML index template to track user engagement, wishlists, and WhatsApp redirection triggers.

---

## 5. Administrative Backup Strategy
* **Local Backups:** The admin portal must support database exports (JSON dumps) to prevent data loss.
* **Restore Feature:** Support importing JSON backups directly via the admin settings panel to easily restore catalogs and order history states.
