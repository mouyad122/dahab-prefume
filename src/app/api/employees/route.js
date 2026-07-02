import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyAdminSession } from '../../../lib/session';
import { prisma } from '../../../lib/prisma';
import { sanitize } from '../../../lib/security';

// ─── PERMISSION FIELDS ────────────────────────────────────────────────────────
const PERMISSION_FIELDS = [
  'can_access_counter',
  'can_view_invoices',
  'can_print_reports',
  'can_add_notes',
  'can_view_inventory',
  'can_manage_products',
  'can_manage_employees',
  'can_view_accounting',
  'can_view_settings',
];

/**
 * Extracts and validates permission flags from a raw permissions object.
 * Defaults to false for any missing field.
 */
function parsePermissions(raw = {}) {
  const result = {};
  for (const field of PERMISSION_FIELDS) {
    result[field] = raw[field] === true;
  }
  return result;
}

// ─── GET /api/employees ───────────────────────────────────────────────────────
export async function GET() {
  try {
    // Admin only
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const employees = await prisma.employee.findMany({
      orderBy: { created_at: 'asc' },
      include: { permissions: true },
    });

    const data = employees.map((emp) => ({
      id:           emp.id,
      username:     emp.username,
      display_name: emp.display_name,
      role:         emp.role,
      is_active:    emp.is_active,
      created_at:   emp.created_at,
      updated_at:   emp.updated_at,
      permissions:  emp.permissions
        ? {
            can_access_counter:   emp.permissions.can_access_counter,
            can_view_invoices:    emp.permissions.can_view_invoices,
            can_print_reports:    emp.permissions.can_print_reports,
            can_add_notes:        emp.permissions.can_add_notes,
            can_view_inventory:   emp.permissions.can_view_inventory,
            can_manage_products:  emp.permissions.can_manage_products,
            can_manage_employees: emp.permissions.can_manage_employees,
            can_view_accounting:  emp.permissions.can_view_accounting,
            can_view_settings:    emp.permissions.can_view_settings,
          }
        : null,
    }));

    return NextResponse.json({ ok: true, employees: data });
  } catch (error) {
    console.error('[GET /api/employees]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// ─── POST /api/employees ──────────────────────────────────────────────────────
export async function POST(request) {
  try {
    // Admin only
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    // ── Validate required fields ──────────────────────────────────────────────
    const username     = sanitize(body?.username ?? '').toLowerCase();
    const password     = body?.password ?? '';
    const display_name = sanitize(body?.display_name ?? '');
    const role         = sanitize(body?.role ?? 'employee');
    const permissions  = body?.permissions ?? {};

    if (!username) {
      return NextResponse.json({ error: 'Username is required.' }, { status: 400 });
    }
    if (username.length < 3 || username.length > 50) {
      return NextResponse.json(
        { error: 'Username must be between 3 and 50 characters.' },
        { status: 400 }
      );
    }
    if (!/^[a-z0-9_]+$/.test(username)) {
      return NextResponse.json(
        { error: 'Username may only contain lowercase letters, numbers, and underscores.' },
        { status: 400 }
      );
    }
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }
    if (!display_name) {
      return NextResponse.json({ error: 'Display name is required.' }, { status: 400 });
    }
    const safeRole = role || 'employee';
    if (!['employee', 'manager'].includes(safeRole)) {
      return NextResponse.json(
        { error: 'Role must be "employee" or "manager".' },
        { status: 400 }
      );
    }

    // ── Check for duplicate username ──────────────────────────────────────────
    const existing = await prisma.employee.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { error: 'An employee with this username already exists.' },
        { status: 409 }
      );
    }

    // ── Hash Password ─────────────────────────────────────────────────────────
    const password_hash = await bcrypt.hash(password, 12);

    // ── Create Employee + Permissions in Transaction ───────────────────────────
    const parsedPerms = parsePermissions(permissions);

    const employee = await prisma.$transaction(async (tx) => {
      const newEmployee = await tx.employee.create({
        data: {
          username,
          password_hash,
          display_name,
          role: safeRole,
        },
      });

      await tx.employeePermission.create({
        data: {
          employeeId: newEmployee.id,
          ...parsedPerms,
        },
      });

      return newEmployee;
    });

    return NextResponse.json(
      {
        ok: true,
        employee: {
          id:           employee.id,
          username:     employee.username,
          display_name: employee.display_name,
          role:         employee.role,
          is_active:    employee.is_active,
          created_at:   employee.created_at,
          permissions:  parsedPerms,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/employees]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
