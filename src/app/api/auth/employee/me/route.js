import { NextResponse } from 'next/server';
import { verifyEmployeeSession } from '../../../../../lib/session';
import { prisma } from '../../../../../lib/prisma';


export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    // ── 1. Verify Session ─────────────────────────────────────────────────────
    const session = await verifyEmployeeSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. No valid employee session.' },
        { status: 401 }
      );
    }

    // ── 2. Fetch Fresh Employee Data From DB ──────────────────────────────────
    const employee = await prisma.employee.findUnique({
      where: { id: session.employeeId },
      include: { permissions: true },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee account not found.' },
        { status: 401 }
      );
    }

    if (!employee.is_active) {
      return NextResponse.json(
        { error: 'This account has been deactivated.' },
        { status: 403 }
      );
    }

    // ── 3. Build Permissions Object ───────────────────────────────────────────
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
        }
      : null;

    return NextResponse.json({
      ok: true,
      employee: {
        id:           employee.id,
        username:     employee.username,
        display_name: employee.display_name,
        role:         employee.role,
        is_active:    employee.is_active,
        created_at:   employee.created_at,
      },
      permissions,
    });
  } catch (error) {
    console.error('[GET /api/auth/employee/me]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
