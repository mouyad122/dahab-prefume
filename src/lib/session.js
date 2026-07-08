/**
 * Session management using jose (JWT) with HttpOnly cookies
 */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

function getRequiredSecret(name) {
  const value = process.env[name];
  if (!value || value.length < 32) {
    throw new Error(`${name} must be set to a strong secret of at least 32 characters.`);
  }
  return new TextEncoder().encode(value);
}

const ADMIN_SECRET = getRequiredSecret('ADMIN_JWT_SECRET');
const EMPLOYEE_SECRET = getRequiredSecret('EMPLOYEE_JWT_SECRET');

const ADMIN_COOKIE = 'dahab_admin_session';
const EMPLOYEE_COOKIE = 'dahab_employee_session';

// ─── ADMIN SESSION ──────────────────────────────────────────────────────────
export async function createAdminSession(payload = {}) {
  const token = await new SignJWT({ ...payload, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(ADMIN_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return token;
}

export async function verifyAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

// ─── EMPLOYEE SESSION ────────────────────────────────────────────────────────
export async function createEmployeeSession(payload = {}) {
  const token = await new SignJWT({ ...payload, role: 'employee' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10h') // 10 hour session as requested
    .sign(EMPLOYEE_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(EMPLOYEE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 10, // 10 hours
  });

  return token;
}

export async function verifyEmployeeSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(EMPLOYEE_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, EMPLOYEE_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function destroyEmployeeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(EMPLOYEE_COOKIE);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export function sessionResponse(data, status = 200) {
  return Response.json(data, { status });
}

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

export function forbidden() {
  return Response.json({ error: 'Forbidden' }, { status: 403 });
}
