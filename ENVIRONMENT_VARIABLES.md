# ENVIRONMENT VARIABLES GUIDE
### DAHAB PERFUMES — Staging & Production Configuration

This document lists the environment variables configured in the DAHAB PERFUMES application, distinguishing between demo fallbacks and production parameters.

---

## 1. Active Client Variables

The following variables are configured in the current Next.js code. 

```env
# The base URL of the deployed application (used for canonical tags and dynamic sitemaps)
NEXT_PUBLIC_SITE_URL=https://dahabperfume.com

# Staging/Demo Admin credentials (used by useAuthStore for validation check)
# WARNING: These are fallback values for client review and are NOT production safe.
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=admin
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=dahab101

# The store owner WhatsApp contact number (used for checkout order confirmation redirection)
NEXT_PUBLIC_WHATSAPP_NUMBER=962785050655
```

---

## 2. Configuration Matrix

| Variable | Scope | Required | Demo Fallback | Production Recommendation |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public SEO | Yes | `http://localhost:3000` | `https://dahabperfume.com` |
| `NEXT_PUBLIC_DEMO_ADMIN_EMAIL` | Admin Auth | Yes | `admin` | Set custom credentials for presentation |
| `NEXT_PUBLIC_DEMO_ADMIN_PASSWORD` | Admin Auth | Yes | `dahab101` | Set strong alphanumeric key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Checkout Flow | Yes | `962785050655` | The merchant official WhatsApp phone |

---

## 3. Recommended Production Variables (Backend Integration)

When migrating from the local browser storage (`localStorage`) to a real database, add the following backend configurations:

```env
# Database Connection String (e.g. Supabase, PostgreSQL)
DATABASE_URL=postgresql://postgres:[password]@db.supabase.co:5432/postgres

# NextAuth Secret (used to cryptographically sign admin session tokens)
NEXTAUTH_SECRET=your_32_character_random_string_secret

# Image Upload Server (e.g. Cloudinary, AWS S3)
CLOUDINARY_URL=cloudinary://[api_key]:[api_secret]@[cloud_name]

# SMTP Mail Server (for automated customer receipts or admin order notifications)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

---

## 4. How to Configure in Vercel
1. Go to your **Vercel Dashboard** and select your project.
2. Navigate to **Settings** > **Environment Variables**.
3. Add the key-value pairs listed in Section 1.
4. Redeploy the application for the changes to take effect.
