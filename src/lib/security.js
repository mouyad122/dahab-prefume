/**
 * Security utility — rate limiting, brute force protection, CSRF, sanitization
 */
import { prisma } from './prisma';

// ─── RATE LIMITER (in-memory for edge compat) ──────────────────────────────
const rateLimitMap = new Map();

export function rateLimit(ip, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const key = ip;
  const record = rateLimitMap.get(key);

  if (!record || now - record.windowStart > windowMs) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return { ok: true, remaining: maxRequests - 1 };
  }

  record.count++;
  const remaining = maxRequests - record.count;

  if (record.count > maxRequests) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((record.windowStart + windowMs - now) / 1000) };
  }

  return { ok: true, remaining };
}

// ─── BRUTE FORCE CHECK ──────────────────────────────────────────────────────
export async function checkBruteForce(ip, userType = 'admin') {
  try {
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;
    const since = new Date(Date.now() - windowMs);

    const attempts = await prisma.loginAttempt.count({
      where: {
        ip_address: ip,
        user_type: userType,
        success: false,
        created_at: { gte: since },
      },
    });

    if (attempts >= maxAttempts) {
      const existing = await prisma.securityEvent.findFirst({
        where: {
          ip_address: ip,
          event_type: 'brute_force_lockout',
          is_blocked: true,
          expires_at: { gt: new Date() },
        },
      });

      if (!existing) {
        await prisma.securityEvent.create({
          data: {
            ip_address: ip,
            event_type: 'brute_force_lockout',
            details: `${attempts} failed login attempts in 15 minutes`,
            is_blocked: true,
            expires_at: new Date(Date.now() + windowMs),
          },
        });
      }

      return { blocked: true, attemptsCount: attempts };
    }

    return { blocked: false, attemptsCount: attempts };
  } catch (e) {
    console.warn('BruteForce check skipped (read-only storage):', e.message);
    return { blocked: false, attemptsCount: 0 };
  }
}

// ─── CHECK IF IP IS BLOCKED ─────────────────────────────────────────────────
export async function isIpBlocked(ip) {
  try {
    const blocked = await prisma.securityEvent.findFirst({
      where: {
        ip_address: ip,
        is_blocked: true,
        expires_at: { gt: new Date() },
      },
    });
    return !!blocked;
  } catch {
    return false;
  }
}

// ─── RECORD LOGIN ATTEMPT ───────────────────────────────────────────────────
export async function recordLoginAttempt({ ip, username, userType, success, employeeId }) {
  try {
    await prisma.loginAttempt.create({
      data: {
        ip_address: ip,
        username: username || null,
        user_type: userType || 'admin',
        success: !!success,
        employeeId: employeeId || null,
      },
    });
  } catch (e) {
    console.warn('Could not record login attempt (read-only filesystem or DB issue):', e.message);
  }
}

// ─── XSS SANITIZATION ───────────────────────────────────────────────────────
export function sanitize(val) {
  if (typeof val !== 'string') return val;
  return val
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') result[key] = sanitize(val);
    else if (typeof val === 'object' && val !== null) result[key] = sanitizeObject(val);
    else result[key] = val;
  }
  return result;
}

// ─── GET CLIENT IP ──────────────────────────────────────────────────────────
export function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

// ─── CSRF TOKEN (simple stateless) ─────────────────────────────────────────
export function generateCsrfToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}
