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

// Clean up old rate limit entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitStore.entries()) {
      if (now - val.start > 120000) rateLimitStore.delete(key);
    }
  }, 300000);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isEnPath = pathname === '/en' || pathname.startsWith('/en/');
  if (isEnPath) {
    const strippedPath = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');
    // Redirect /en/admin and /en/pos to non-prefixed versions (admin is always Arabic)
    if (strippedPath.startsWith('/admin') || strippedPath.startsWith('/pos')) {
      const url = request.nextUrl.clone();
      url.pathname = strippedPath;
      const response = NextResponse.redirect(url);
      response.cookies.set('dahab_lang', 'ar', { path: '/', httpOnly: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
      return response;
    }
    const url = request.nextUrl.clone();
    url.pathname = strippedPath;
    const response = NextResponse.rewrite(url);
    response.cookies.set('dahab_lang', 'en', { path: '/', httpOnly: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // Get client IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // ─── Block common attack patterns ─────────────────────────────────────────
  const suspiciousPatterns = [
    /\.\.\//,                    // Path traversal
    /<script/i,                  // XSS attempt in URL
    /union.*select/i,            // SQL injection attempt
    /exec\s*\(/i,               // Code execution attempt
    /base64_decode/i,            // PHP injection
    /\/etc\/passwd/,             // File inclusion
    /wp-admin/,                  // WordPress scanner
    /\.php$/,                    // PHP file requests (not a PHP app)
    /\.env$/,                    // .env file exposure attempt
    /xmlrpc\.php/,               // WordPress xmlrpc scanner
  ];

  if (suspiciousPatterns.some(p => p.test(pathname))) {
    return new NextResponse(null, { status: 400 });
  }

  // ─── Rate limit API auth routes (strict: 10/min) ──────────────────────────
  if (pathname.startsWith('/api/auth')) {
    const limited = rateLimitEdge(`auth:${ip}`, 10, 60000);
    if (limited) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }

  // ─── Rate limit all API routes (general: 60/min) ──────────────────────────
  if (pathname.startsWith('/api/')) {
    const limited = rateLimitEdge(`api:${ip}`, 60, 60000);
    if (limited) {
      return new NextResponse(
        JSON.stringify({ error: 'طلبات كثيرة جداً، حاول لاحقاً.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }

  // ─── Block direct access to admin API from non-admin sessions ────────────
  if (pathname.startsWith('/api/admin/')) {
    const adminToken = request.cookies.get('dahab_admin_session');
    const empToken = request.cookies.get('dahab_employee_session');
    if (!adminToken && !empToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // ─── Security headers for all responses ───────────────────────────────────
  const response = NextResponse.next();

  // Set default language cookie only if none exists (preserves user's choice)
  const existingLang = request.cookies.get('dahab_lang');
  if (!existingLang) {
    response.cookies.set('dahab_lang', 'ar', { path: '/', httpOnly: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
  }

  // Core security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Remove server fingerprinting headers
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js requires these
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co https://via.placeholder.com",
      "connect-src 'self' https://wa.me",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
  );

  // Cache control for API responses
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Surrogate-Control', 'no-store');
  }

  // ─── Admin route protection ───────────────────────────────────────────────
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isAdminPublic = ADMIN_PUBLIC.some(route => pathname === route || pathname.startsWith(route + '/'));

  if (isAdminRoute && !isAdminPublic) {
    const adminToken = request.cookies.get('dahab_admin_session');
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /admin/login if already logged in
  if (isAdminPublic) {
    const adminToken = request.cookies.get('dahab_admin_session');
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  // ─── POS route protection ─────────────────────────────────────────────────
  const isPosRoute = POS_ROUTES.some(route => pathname.startsWith(route));
  const isPosPublic = POS_PUBLIC.some(route => pathname === route || pathname.startsWith(route + '/'));

  if (isPosRoute && !isPosPublic) {
    const employeeToken = request.cookies.get('dahab_employee_session');
    if (!employeeToken) {
      const loginUrl = new URL('/pos/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /pos/login if already logged in
  if (isPosPublic) {
    const employeeToken = request.cookies.get('dahab_employee_session');
    if (employeeToken) {
      return NextResponse.redirect(new URL('/pos/counter', request.url));
    }
  }

  // ─── Canonical redirects ──────────────────────────────────────────────────
  if (pathname === '/admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  if (pathname === '/pos') return NextResponse.redirect(new URL('/pos/counter', request.url));

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/pos/:path*',
    '/api/:path*',
    '/en/:path*',
  ],
};
