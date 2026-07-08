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
        if (employee?.permissions?.can_manage_raw_materials || employee?.permissions?.can_view_inventory) {
          hasAccess = true;
        }
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const rawMaterials = await prisma.rawMaterial.findMany({
      where: {
        OR: [
          { name_ar: { contains: search, mode: 'insensitive' } },
          { name_en: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ]
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ ok: true, rawMaterials });
  } catch (error) {
    console.error('[GET /api/admin/inventory/raw-materials]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(request) {
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
        if (employee?.permissions?.can_manage_raw_materials) {
          hasAccess = true;
        }
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { sku, name_ar, name_en, type, unit, cost_per_unit, initial_stock, low_stock_threshold } = body;

    if (!sku || !name_ar || !type || !unit) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Check SKU uniqueness
    const existing = await prisma.rawMaterial.findUnique({ where: { sku } });
    if (existing) {
      return NextResponse.json({ error: 'SKU must be unique.' }, { status: 400 });
    }

    const newMaterial = await prisma.$transaction(async (tx) => {
      const material = await tx.rawMaterial.create({
        data: {
          sku,
          name_ar,
          name_en,
          type,
          unit,
          cost_per_unit: cost_per_unit || 0,
          current_quantity: initial_stock || 0,
          low_stock_threshold: low_stock_threshold || 0
        }
      });

      if (initial_stock && initial_stock > 0) {
        await tx.rawMaterialMovement.create({
          data: {
            raw_material_id: material.id,
            movement_type: 'INITIAL',
            quantity_change: initial_stock,
            quantity_before: 0,
            quantity_after: initial_stock,
            unit: material.unit,
            reason: 'Initial stock',
            created_by: employeeId || 'admin'
          }
        });
      }

      return material;
    });

    return NextResponse.json({ ok: true, rawMaterial: newMaterial }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/admin/inventory/raw-materials]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
