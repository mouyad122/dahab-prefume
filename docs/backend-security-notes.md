# Dahab Perfumes — Backend Security Notes

## Database
- **Local development:** SQLite via Prisma (file: `prisma/dev.db`).
- **Production:** Must use managed PostgreSQL (Neon, Supabase, Prisma Postgres, or similar).
- SQLite file storage is NOT recommended for production/serverless deployment.
- Database URL must not be hardcoded in source code.

## Environment Variables
- `.env` must NOT be committed to version control.
- `.env` is listed in `.gitignore`.
- `prisma/dev.db` is also in `.gitignore`.
- Do not use `NEXT_PUBLIC_` prefix for secrets or database URLs.
- Use `.env.example` as a template for required variables.

## HTTPS
- Production deployment must use HTTPS.
- All API endpoints should be served over HTTPS in production.

## Public API Privacy Rules
Public product API endpoints must NEVER expose:
- `inspired_by`
- `notes`
- `research_confidence`
- `source_excel_row`
- `needs_review`
- `id` (internal UUID)
- `created_at`, `updated_at`
- Raw price fields (`price_50ml_fils`, etc.)
- Any internal relation IDs

This is enforced by `ProductDbService.toPublicSafe()` which constructs a new object with only allowed fields.

## Admin Routes
- Admin API routes are NOT yet implemented.
- Admin service methods exist in `ProductDbService` (prefixed with `admin` or `getAdmin`).
- These methods must be gated behind authentication/authorization before being exposed via API routes.
- TODO: Implement admin login with rate limiting.
- TODO: Implement session-based or JWT-based admin auth.

## Security Headers
The following security headers are configured in `next.config.js`:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`

## Input Validation
- All API query parameters are validated and sanitized.
- `page` defaults to 1 if invalid.
- `limit` is clamped to configured max (100 for products, 50 for featured).
- `sort` is restricted to an allowlist.
- `q` (search) is trimmed and length-limited to 200 characters.
- Unknown or malformed query values do not crash the API.

## Error Handling
- Internal errors (Prisma, database) are caught and logged server-side.
- Public API responses return generic error messages: `{ "error": "Internal server error" }`.
- No stack traces, no Prisma error details are exposed to clients.

## OWASP Baseline
- Input validation on all endpoints.
- No SQL injection risk (Prisma ORM handles parameterization).
- No hardcoded secrets.
- Content-Type enforcement via `X-Content-Type-Options: nosniff`.
- Clickjacking prevention via `X-Frame-Options: DENY`.
- TODO: Implement CSRF protection for admin write operations.
- TODO: Implement rate limiting on admin login.
- TODO: Implement Content Security Policy header.

## Rate Limiting
- Not yet implemented.
- Required when admin login is built.
- Consider using middleware or edge functions for rate limiting.
