import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── Image domains ──────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    // Prevent hotlinking of optimized images
    minimumCacheTTL: 60,
  },

  outputFileTracingRoot: __dirname,

  // ── Disable X-Powered-By header (hides Next.js fingerprint) ───────────────
  poweredByHeader: false,

  // ── Security Headers ───────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer info leakage
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Disable browser features not needed
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // XSS Protection (legacy browsers)
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // DNS Prefetch control
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          // HSTS - force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Cross-Origin policies
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
      // ── API routes: strict CORS + no caching ──────────────────────────────
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private' },
          { key: 'Pragma', value: 'no-cache' },
          // Block API access from external origins in production
          ...(isDev ? [] : [
            { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_SITE_URL || 'https://dahab-perfumes.com' },
          ]),
        ],
      },
    ];
  },
};

export default nextConfig;
