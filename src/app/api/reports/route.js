import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../lib/session';


export const dynamic = 'force-dynamic';
// ─── GET /api/reports ─────────────────────────────────────────────────────────
export async function GET(request) {
  try {
    const adminSession    = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (employeeSession) {
      const employee = await prisma.employee.findUnique({
        where: { id: employeeSession.employeeId },
        include: { permissions: true },
      });
      if (!employee || !employee.is_active) {
        return NextResponse.json({ error: 'Account not active' }, { status: 403 });
      }
      if (!employee.permissions?.can_print_reports) {
        return NextResponse.json({ error: 'Forbidden: reports permission required' }, { status: 403 });
      }
    }

    const { searchParams } = new URL(request.url);
    const groupBy   = searchParams.get('groupBy');
    const startDate = searchParams.get('startDate');
    const endDate   = searchParams.get('endDate');
    let reqEmployeeId = searchParams.get('employeeId') || searchParams.get('sellerUserId');

    if (employeeSession) {
      reqEmployeeId = employeeSession.employeeId;
    }

    const where = {
      status: { not: 'voided' },
    };

    if (reqEmployeeId && reqEmployeeId !== 'all') {
      where.OR = [
        { employeeId: reqEmployeeId },
        { seller_user_id: reqEmployeeId }
      ];
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate)   where.created_at.lte = new Date(endDate);
    }

    const sales = await prisma.sale.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: { name_ar: true, name_en: true, sku: true },
            },
          },
        },
        employee: {
          select: { id: true, display_name: true, username: true },
        },
      },
    });

    const total_sales_fils   = sales.reduce((sum, s) => sum + (s.total ?? 0), 0);
    const total_invoices     = sales.length;
    const total_items_sold   = sales.reduce((sum, s) => {
      return sum + s.items.reduce((itemSum, i) => itemSum + (i.quantity ?? 0), 0);
    }, 0);
    const average_invoice_fils = total_invoices > 0
      ? Math.round(total_sales_fils / total_invoices)
      : 0;

    const summary = {
      total_sales_fils,
      total_invoices,
      total_items_sold,
      average_invoice_fils,
    };

    let grouped = undefined;

    if (groupBy === 'day') {
      const byDay = {};
      for (const sale of sales) {
        const date = sale.created_at.toISOString().slice(0, 10);
        if (!byDay[date]) {
          byDay[date] = {
            date,
            total_sales_fils: 0,
            total_invoices:   0,
            total_items_sold: 0,
          };
        }
        byDay[date].total_sales_fils += sale.total ?? 0;
        byDay[date].total_invoices   += 1;
        byDay[date].total_items_sold += sale.items.reduce((s, i) => s + (i.quantity ?? 0), 0);
      }
      grouped = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));

    } else if (groupBy === 'employee') {
      const byEmployee = {};
      for (const sale of sales) {
        const eId = sale.seller_name_snapshot || sale.employee?.display_name || 'غير محدد';
        if (!byEmployee[eId]) {
          byEmployee[eId] = {
            employeeId:       eId,
            display_name:     eId,
            username:         sale.employee?.username ?? '',
            total_sales_fils: 0,
            total_invoices:   0,
            total_items_sold: 0,
          };
        }
        byEmployee[eId].total_sales_fils += sale.total ?? 0;
        byEmployee[eId].total_invoices   += 1;
        byEmployee[eId].total_items_sold += sale.items.reduce((s, i) => s + (i.quantity ?? 0), 0);
      }
      grouped = Object.values(byEmployee).sort((a, b) =>
        b.total_sales_fils - a.total_sales_fils
      );
    }

    const response = { summary, sales };
    if (grouped !== undefined) response.grouped = grouped;

    return NextResponse.json(response);
  } catch (error) {
    console.error('[GET /api/reports]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
