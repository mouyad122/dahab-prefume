import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  try {
    let hasAccess = false;
    let employeeId = null;
    const adminSession = await verifyAdminSession();
    if (adminSession) {
      hasAccess = true;
    } else {
      const empSession = await verifyEmployeeSession();
      if (empSession) {
        employeeId = empSession.employeeId;
        const employee = await prisma.employee.findUnique({
          where: { id: employeeId },
          include: { permissions: true }
        });
        if (employee?.permissions?.can_adjust_raw_material_stock) {
          hasAccess = true;
        }
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { quantity_changed, movement_type, reference_note } = body;

    // Validate type
    const validTypes = ['MANUAL_ADD', 'MANUAL_SUBTRACT', 'DAMAGE', 'LOSS'];
    if (!validTypes.includes(movement_type)) {
      return NextResponse.json({ error: 'Invalid movement type.' }, { status: 400 });
    }

    if (!quantity_changed || quantity_changed <= 0) {
      return NextResponse.json({ error: 'Quantity must be greater than 0.' }, { status: 400 });
    }

    const material = await prisma.rawMaterial.findUnique({ where: { id } });
    if (!material) {
      return NextResponse.json({ error: 'Material not found.' }, { status: 404 });
    }

    const change = (movement_type === 'MANUAL_ADD') ? quantity_changed : -quantity_changed;

    if (material.current_quantity + change < 0) {
      return NextResponse.json({ error: 'Insufficient stock to perform this adjustment.' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedMaterial = await tx.rawMaterial.update({
        where: { id },
        data: {
          current_quantity: { increment: change }
        }
      });

      const movement = await tx.rawMaterialMovement.create({
        data: {
          raw_material_id: id,
          movement_type,
          quantity_change: change,
          quantity_before: material.current_quantity,
          quantity_after: material.current_quantity + change,
          unit: material.unit,
          reason: reference_note || null,
          created_by: employeeId || 'admin'
        }
      });

      return { updatedMaterial, movement };
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('[POST /api/admin/inventory/raw-materials/[id]/adjust]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
