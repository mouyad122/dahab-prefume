import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../../lib/session';


export const dynamic = 'force-dynamic';
// ─── GET /api/sales/[id] ──────────────────────────────────────────────────────
// Returns a single sale with full items and employee info.
// Employees can only view their own sales.
export async function GET(request, { params }) {
  try {
    const adminSession    = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Sale ID is required' }, { status: 400 });
    }

    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: { name_ar: true, name_en: true, sku: true, image_name: true },
            },
          },
        },
        employee: {
          select: { id: true, display_name: true, username: true },
        },
      },
    });

    if (!sale) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    }

    // Employees can only view their own sales
    if (employeeSession && sale.employeeId !== employeeSession.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ sale });
  } catch (error) {
    console.error('[GET /api/sales/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
