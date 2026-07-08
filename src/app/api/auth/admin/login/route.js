import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createAdminSession, createEmployeeSession } from '@/lib/session';
import {
  checkBruteForce,
  isIpBlocked,
  recordLoginAttempt,
  rateLimit,
  sanitize,
  getClientIp,
} from '@/lib/security';

export const dynamic = 'force-dynamic';

const ADMIN_PERMISSION_FIELDS = [
  'can_access_counter',
  'can_view_invoices',
  'can_print_reports',
  'can_add_notes',
  'can_view_inventory',
  'can_manage_products',
  'can_manage_employees',
  'can_view_accounting',
  'can_view_settings',
  'can_manage_raw_materials',
  'can_adjust_raw_material_stock',
  'can_view_raw_material_movements',
  'can_manage_product_formulas',
  'can_view_consumption_reports',
];

function allAdminPermissions() {
  return Object.fromEntries(ADMIN_PERMISSION_FIELDS.map((field) => [field, true]));
}

async function bootstrapAdminFromEnv(username, password) {
  const bootstrapUsername = process.env.ADMIN_USERNAME;
  const bootstrapPassword = process.env.ADMIN_PASSWORD;

  if (!bootstrapUsername || !bootstrapPassword || username !== bootstrapUsername || password !== bootstrapPassword) {
    return null;
  }

  const existingAdmin = await prisma.employee.findFirst({ where: { role: 'admin' } });
  if (existingAdmin) return null;

  const password_hash = await bcrypt.hash(password, 12);

  return await prisma.$transaction(async (tx) => {
    const admin = await tx.employee.create({
      data: {
        username,
        password_hash,
        display_name: 'المدير العام',
        role: 'admin',
        is_active: true,
      },
    });

    await tx.employeePermission.create({
      data: {
        employeeId: admin.id,
        ...allAdminPermissions(),
      },
    });

    return { ...admin, permissions: allAdminPermissions() };
  });
}

export async function POST(request) {
  const ip = getClientIp(request);

  try {
    // ── 1. IP Block Check ─────────────────────────────────────────────────────
    const blocked = await isIpBlocked(ip);
    if (blocked) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Your IP has been temporarily blocked.' },
        { status: 429 }
      );
    }

    // ── 2. Rate Limit (5 requests / 60s per IP) ───────────────────────────────
    const rl = rateLimit(ip, 5, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please slow down.',
          retryAfter: rl.retryAfter,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rl.retryAfter ?? 60) },
        }
      );
    }

    // ── 3. Parse + Sanitize Body ──────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const username = sanitize(body?.username ?? '');
    const password = body?.password ?? ''; // don't sanitize – passwords are compared raw

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // ── 4. Validate Against Hashed DB Password ────────────────────────────────
    try {
      let employee = await prisma.employee.findUnique({
        where: { username },
        include: { permissions: true },
      });

      if (!employee) {
        employee = await bootstrapAdminFromEnv(username, password);
      }

      if (employee && employee.is_active) {
        const passwordMatch = await bcrypt.compare(password, employee.password_hash);
        if (passwordMatch) {
          if (employee.role === 'admin') {
            await createAdminSession({ username: employee.username, role: 'admin', employeeId: employee.id });
          } else {
            await createEmployeeSession({
              employeeId: employee.id,
              username: employee.username,
              displayName: employee.display_name,
              role: employee.role,
            });
          }

          await recordLoginAttempt({
            ip,
            username: employee.username,
            userType: employee.role === 'admin' ? 'admin' : 'employee',
            success: true,
            employeeId: employee.id,
          });
          return NextResponse.json({ ok: true, isEmployee: employee.role !== 'admin' });
        }
      }
    } catch (e) {
      console.warn('Employee DB lookup skipped (DB uninitialized or read-only):', e.message);
    }

    // If both failed:
    await recordLoginAttempt({
      ip,
      username,
      userType: 'admin',
      success: false,
    });

    const bruteCheck = await checkBruteForce(ip, 'admin');
    if (bruteCheck.blocked) {
      return NextResponse.json(
        {
          error:
            'Account locked due to too many failed attempts. Try again in 15 minutes.',
        },
        { status: 429 }
      );
    }

    const attemptsLeft = Math.max(0, 5 - bruteCheck.attemptsCount);
    return NextResponse.json(
      {
        error: 'Invalid username or password.',
        attemptsRemaining: attemptsLeft,
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('[POST /api/auth/admin/login]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
