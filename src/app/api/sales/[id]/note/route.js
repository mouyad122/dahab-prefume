import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyEmployeeSession } from '@/lib/session';
import { sanitize } from '@/lib/security';


export const dynamic = 'force-dynamic';
// ─── PUT /api/sales/[id]/note ─────────────────────────────────────────────────
// Employees can add or edit a note on their own completed sales.
// Voided sales cannot be edited.
export async function PUT(request, { params }) {
  try {
    const session = await verifyEmployeeSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Sale ID is required' }, { status: 400 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { employee_note } = body;

    if (typeof employee_note !== 'string') {
      return NextResponse.json({ error: 'employee_note must be a string' }, { status: 400 });
    }

    // Fetch the existing sale to verify ownership and status
    const existing = await prisma.sale.findUnique({
      where: { id },
      select: { id: true, employeeId: true, status: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    }

    // Employees can only edit notes on their own sales
    if (existing.employeeId !== session.employeeId) {
      return NextResponse.json({ error: 'Forbidden: not your sale' }, { status: 403 });
    }

    // Cannot edit voided sales
    if (existing.status === 'voided') {
      return NextResponse.json({ error: 'Cannot edit notes on a voided sale' }, { status: 422 });
    }

    const sanitizedNote = employee_note.trim() ? sanitize(employee_note.trim()) : null;

    const updatedSale = await prisma.sale.update({
      where: { id },
      data: { employee_note: sanitizedNote },
      include: {
        items: {
          include: {
            product: {
              select: { name_ar: true, name_en: true },
            },
          },
        },
        employee: {
          select: { id: true, display_name: true, username: true },
        },
      },
    });

    return NextResponse.json({ ok: true, sale: updatedSale });
  } catch (error) {
    console.error('[PUT /api/sales/[id]/note]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
