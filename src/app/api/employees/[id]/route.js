import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyAdminSession } from '../../../../lib/session';
import { prisma } from '../../../../lib/prisma';
import { sanitize } from '../../../../lib/security';

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

const ALLOWED_ROLES = ['admin', 'manager', 'employee', 'inventory', 'accountant'];

export async function GET(request, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { permissions: true },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found.' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      employee: {
        id:           employee.id,
        username:     employee.username,
        display_name: employee.display_name,
        role:         employee.role,
        is_active:    employee.is_active,
        created_at:   employee.created_at,
        updated_at:   employee.updated_at,
        permissions:  employee.permissions
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
            }
          : null,
      },
    });
  } catch (error) {
    console.error('[GET /api/employees/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.employee.findUnique({
      where: { id },
      include: { permissions: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 404 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const employeeData = {};

    if (body.display_name !== undefined) {
      const display_name = sanitize(body.display_name);
      if (!display_name) {
        return NextResponse.json({ error: 'Display name cannot be empty.' }, { status: 400 });
      }
      employeeData.display_name = display_name;
    }

    if (body.role !== undefined) {
      const rawRole = typeof body.role === 'string' ? body.role : 'employee';
      const role = sanitize(rawRole) || 'employee';
      if (!ALLOWED_ROLES.includes(role)) {
        return NextResponse.json({ error: `Role must be one of: ${ALLOWED_ROLES.join(', ')}` }, { status: 400 });
      }
      employeeData.role = role;
    }

    if (body.is_active !== undefined) {
      if (typeof body.is_active !== 'boolean') {
        return NextResponse.json({ error: 'is_active must be a boolean.' }, { status: 400 });
      }
      employeeData.is_active = body.is_active;
    }

    if (body.password !== undefined) {
      const password = body.password;
      if (typeof password !== 'string' || password.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters.' }, { status: 400 });
      }
      employeeData.password_hash = await bcrypt.hash(password, 12);
    }

    const permissionsData = {};
    if (body.permissions && typeof body.permissions === 'object') {
      for (const field of PERMISSION_FIELDS) {
        if (body.permissions[field] !== undefined) {
          if (typeof body.permissions[field] !== 'boolean') {
            return NextResponse.json({ error: `Permission field "${field}" must be a boolean.` }, { status: 400 });
          }
          permissionsData[field] = body.permissions[field];
        }
      }
    }

    if (Object.keys(employeeData).length === 0 && Object.keys(permissionsData).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided for update.' }, { status: 400 });
    }

    const updatedEmployee = await prisma.$transaction(async (tx) => {
      let emp = existing;

      if (Object.keys(employeeData).length > 0) {
        emp = await tx.employee.update({
          where: { id },
          data: employeeData,
        });
      }

      let perms = existing.permissions;
      if (Object.keys(permissionsData).length > 0) {
        if (perms) {
          perms = await tx.employeePermission.update({
            where: { employeeId: id },
            data: permissionsData,
          });
        } else {
          const fullPerms = {};
          for (const field of PERMISSION_FIELDS) {
            fullPerms[field] = permissionsData[field] ?? (emp.role === 'admin');
          }
          perms = await tx.employeePermission.create({
            data: { employeeId: id, ...fullPerms },
          });
        }
      }

      return { emp, perms };
    });

    const { emp, perms } = updatedEmployee;

    return NextResponse.json({
      ok: true,
      employee: {
        id:           emp.id,
        username:     emp.username,
        display_name: emp.display_name,
        role:         emp.role,
        is_active:    emp.is_active,
        updated_at:   emp.updated_at,
        permissions:  perms
          ? {
              can_access_counter:   perms.can_access_counter,
              can_view_invoices:    perms.can_view_invoices,
              can_print_reports:    perms.can_print_reports,
              can_add_notes:        perms.can_add_notes,
              can_view_inventory:   perms.can_view_inventory,
              can_manage_products:  perms.can_manage_products,
              can_manage_employees: perms.can_manage_employees,
              can_view_accounting:  perms.can_view_accounting,
              can_view_settings:    perms.can_view_settings,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('[PUT /api/employees/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 404 });
    }

    if (!existing.is_active) {
      return NextResponse.json({ error: 'Account is already deactivated.' }, { status: 409 });
    }

    await prisma.employee.update({
      where: { id },
      data: { is_active: false },
    });

    return NextResponse.json({
      ok: true,
      message: `Account "${existing.display_name}" has been deactivated.`,
    });
  } catch (error) {
    console.error('[DELETE /api/employees/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
