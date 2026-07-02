# ENVIRONMENT VARIABLES GUIDE
### DAHAB PERFUMES — Staging & Production Configuration

This project uses server-side authentication with HttpOnly cookies for admin and employee sessions. Do not use public/demo client variables for admin or POS authentication.

---

## Active Variables

```env
# Public site URL
NEXT_PUBLIC_SITE_URL=https://dahabperfume.com

# Admin credentials used by /api/auth/admin/login
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=dahab101

# JWT signing secrets for HttpOnly session cookies
ADMIN_JWT_SECRET=replace-with-a-long-random-secret
EMPLOYEE_JWT_SECRET=replace-with-a-long-random-secret

# Store WhatsApp number
NEXT_PUBLIC_WHATSAPP_NUMBER=962785050655

# Database
DATABASE_URL="file:./dev.db"
```

---

## Configuration Matrix

| Variable | Scope | Required | Local Fallback | Production Recommendation |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public SEO | Yes | `http://localhost:3000` | `https://dahabperfume.com` |
| `NEXT_PUBLIC_ADMIN_USERNAME` | Admin Auth API | Yes | `admin` | Private admin username |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin Auth API | Yes | `dahab101` | Strong password, rotate before launch |
| `ADMIN_JWT_SECRET` | Admin Session | Yes | Development fallback exists | Long random secret |
| `EMPLOYEE_JWT_SECRET` | Employee Session | Yes | Development fallback exists | Long random secret |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Storefront Ordering | Yes | `962785050655` | Official merchant WhatsApp |
| `DATABASE_URL` | Prisma | Yes | SQLite local file | PostgreSQL for production |

---

## Production Notes

- Admin and employee sessions must remain HttpOnly cookies.
- Do not store admin sessions, employee sessions, invoices, sales, inventory, reports, or permissions in `localStorage`.
- `localStorage` is acceptable only for low-risk customer preferences such as language, theme, and a temporary public cart.
- Rotate the default admin password before deployment.
