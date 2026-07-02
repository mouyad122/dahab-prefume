import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../../lib/prisma';
import { createAdminSession, createEmployeeSession } from '../../../../../lib/session';
import {
  checkBruteForce,
  isIpBlocked,
  recordLoginAttempt,
  rateLimit,
  sanitize,
  getClientIp,
} from '../../../../../lib/security';

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

    // ── 4. Validate Against Env Vars ──────────────────────────────────────────
    const validUsername =
      process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const validPassword =
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'dahab101';

    const credentialsMatch =
      username === validUsername && password === validPassword;

    if (credentialsMatch) {
      await createAdminSession({ username, role: 'admin' });
      await recordLoginAttempt({
        ip,
        username,
        userType: 'admin',
        success: true,
      });
      return NextResponse.json({ ok: true });
    }

    // Check Employee Table
    const employee = await prisma.employee.findUnique({
      where: { username },
      include: { permissions: true },
    });

    if (employee && employee.is_active) {
      const passwordMatch = await bcrypt.compare(password, employee.password_hash);
      if (passwordMatch) {
        await createEmployeeSession({
          employeeId: employee.id,
          username: employee.username,
          displayName: employee.display_name,
          role: employee.role,
        });
        await recordLoginAttempt({
          ip,
          username: employee.username,
          userType: 'employee',
          success: true,
          employeeId: employee.id,
        });
        return NextResponse.json({ ok: true, isEmployee: true });
      }
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
