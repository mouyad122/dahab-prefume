import { NextResponse } from 'next/server';
import { verifyAdminSession, verifyEmployeeSession } from '../../../../../lib/session';
import { prisma } from '../../../../../lib/prisma';


export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const adminSession = await verifyAdminSession();
    if (adminSession) {
      return NextResponse.json({
        ok: true,
        user: {
          username: adminSession.username || 'admin',
          displayName: 'المدير العام',
          role: 'admin',
          isSuperAdmin: true,
        }
      });
    }

    const empSession = await verifyEmployeeSession();
    if (empSession && empSession.employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { id: empSession.employeeId },
        include: { permissions: true }
      });

      if (employee && employee.is_active) {
        return NextResponse.json({
          ok: true,
          user: {
            id: employee.id,
            username: employee.username,
            displayName: employee.display_name,
            role: employee.role,
            isEmployee: true,
            permissions: employee.permissions ? {
              can_access_counter: employee.permissions.can_access_counter,
              can_view_invoices: employee.permissions.can_view_invoices,
              can_print_reports: employee.permissions.can_print_reports,
              can_add_notes: employee.permissions.can_add_notes,
              can_view_inventory: employee.permissions.can_view_inventory,
              can_manage_products: employee.permissions.can_manage_products,
              can_manage_employees: employee.permissions.can_manage_employees,
              can_view_accounting: employee.permissions.can_view_accounting,
              can_view_settings: employee.permissions.can_view_settings,
            } : {}
          }
        });
      }
    }

    return NextResponse.json(
      { error: 'Unauthorized. No valid session.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('[GET /api/auth/admin/me]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
