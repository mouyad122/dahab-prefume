import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  checkBruteForce,
  isIpBlocked,
  recordLoginAttempt,
  rateLimit,
  sanitize,
  getClientIp,
} from '@/lib/security';
import { createEmployeeSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
    const password = body?.password ?? ''; // raw – compared against hash

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // ── 4. Fetch Employee From DB ─────────────────────────────────────────────
    const employee = await prisma.employee.findUnique({
      where: { username },
      include: { permissions: true },
    });

    // Helper: handle auth failure uniformly
    const handleFailure = async (reason) => {
      await recordLoginAttempt({
        ip,
        username,
        userType: 'employee',
        success: false,
        employeeId: employee?.id ?? null,
      });

      const bruteCheck = await checkBruteForce(ip, 'employee');
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
        { error: reason, attemptsRemaining: attemptsLeft },
        { status: 401 }
      );
    };

    // Employee not found
    if (!employee) {
      return await handleFailure('Invalid username or password.');
    }

    // Employee is deactivated
    if (!employee.is_active) {
      return await handleFailure('This account has been deactivated. Contact your administrator.');
    }

    // Wrong password
    const passwordMatch = await bcrypt.compare(password, employee.password_hash);
    if (!passwordMatch) {
      return await handleFailure('Invalid username or password.');
    }

    // ── 5. Create Session ─────────────────────────────────────────────────────
    await createEmployeeSession({
      employeeId: employee.id,
      username: employee.username,
      displayName: employee.display_name,
      role: employee.role,
    });

    // Record successful login
    await recordLoginAttempt({
      ip,
      username: employee.username,
      userType: 'employee',
      success: true,
      employeeId: employee.id,
    });

    // ── 6. Build Permissions Response ─────────────────────────────────────────
    const permissions = employee.permissions
      ? {
          can_access_counter:   employee.permissions.can_access_counter,
          can_view_invoices:    employee.permissions.can_view_invoices,
          can_print_reports:    employee.permissions.can_print_reports,
          can_add_notes:        employee.permissions.can_add_notes,
          can_view_inventory:   employee.permissions.can_view_inventory,
          can_manage_products:  employee.permissions.can_manage_products,
          can_manage_employees: employee.permissions.can_manage_employees,
          can_view_accounting:  employee.permissions.can_view_accounting,
          can_view_settings:    employee.permissions.can_view_settings,
          can_manage_raw_materials: employee.permissions.can_manage_raw_materials,
          can_adjust_raw_material_stock: employee.permissions.can_adjust_raw_material_stock,
          can_view_raw_material_movements: employee.permissions.can_view_raw_material_movements,
          can_manage_product_formulas: employee.permissions.can_manage_product_formulas,
          can_view_consumption_reports: employee.permissions.can_view_consumption_reports,
        }
      : null;

    return NextResponse.json({
      ok: true,
      employee: {
        id:           employee.id,
        username:     employee.username,
        display_name: employee.display_name,
        role:         employee.role,
      },
      permissions,
    });
  } catch (error) {
    console.error('[POST /api/auth/employee/login]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
