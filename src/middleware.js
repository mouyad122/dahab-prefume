import { NextResponse } from 'next/server';

// ─── ROUTE PROTECTION CONFIG ────────────────────────────────────────────────
const ADMIN_ROUTES = ['/admin'];
const POS_ROUTES = ['/pos'];
const ADMIN_PUBLIC = ['/admin/login'];
const POS_PUBLIC = ['/pos/login'];

// In-memory rate limiter for middleware (edge-compatible)
const rateLimitStore = new Map();

function rateLimitEdge(ip, max = 20, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now - record.start > windowMs) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return false; // not limited
  }
  record.count++;
  return record.count > max;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get client IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // ─── Rate limit API auth routes ───────────────────────────────────────────
  if (pathname.startsWith('/api/auth')) {
    const limited = rateLimitEdge(ip, 10, 60000); // 10 req/min
    if (limited) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

  // ─── Security headers for all responses ───────────────────────────────────
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js needs this
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://via.placeholder.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // ─── Admin route protection ───────────────────────────────────────────────
  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname.startsWith(route)
  );
  const isAdminPublic = ADMIN_PUBLIC.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  if (isAdminRoute && !isAdminPublic) {
    const adminToken = request.cookies.get('dahab_admin_session');
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /admin/login if already logged in (admin)
  if (isAdminPublic) {
    const adminToken = request.cookies.get('dahab_admin_session');
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  // ─── POS route protection ─────────────────────────────────────────────────
  const isPosRoute = POS_ROUTES.some((route) => pathname.startsWith(route));
  const isPosPublic = POS_PUBLIC.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  if (isPosRoute && !isPosPublic) {
    const employeeToken = request.cookies.get('dahab_employee_session');
    if (!employeeToken) {
      const loginUrl = new URL('/pos/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /pos/login if already logged in (employee)
  if (isPosPublic) {
    const employeeToken = request.cookies.get('dahab_employee_session');
    if (employeeToken) {
      return NextResponse.redirect(new URL('/pos/counter', request.url));
    }
  }

  // ─── Redirect /admin → /admin/dashboard ──────────────────────────────────
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // ─── Redirect /pos → /pos/counter ────────────────────────────────────────
  if (pathname === '/pos') {
    return NextResponse.redirect(new URL('/pos/counter', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/pos/:path*',
    '/api/auth/:path*',
    '/api/employees/:path*',
    '/api/sales/:path*',
    '/api/reports/:path*',
    '/api/settings/:path*',
    '/api/security/:path*',
  ],
};
