import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    let hasAccess = false;
    const adminSession = await verifyAdminSession();
    if (adminSession) {
      hasAccess = true;
    } else {
      const empSession = await verifyEmployeeSession();
      if (empSession) {
        const employee = await prisma.employee.findUnique({
          where: { id: empSession.employeeId },
          include: { permissions: true }
        });
        if (employee?.permissions?.can_view_raw_material_movements || employee?.permissions?.can_manage_raw_materials || employee?.permissions?.can_view_inventory) {
          hasAccess = true;
        }
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const materialId = searchParams.get('material_id');

    const where = {};
    if (materialId) {
      where.raw_material_id = materialId;
    }

    const movements = await prisma.rawMaterialMovement.findMany({
      where,
      include: {
        raw_material: true,
      },
      orderBy: { created_at: 'desc' },
      take: 100 // Limit for performance, maybe implement pagination later
    });

    return NextResponse.json({ ok: true, movements });
  } catch (error) {
    console.error('[GET /api/admin/inventory/raw-materials/movements]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
