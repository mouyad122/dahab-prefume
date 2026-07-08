import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

async function checkAccess() {
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
  return { hasAccess, employeeId };
}

export async function PUT(request, { params }) {
  try {
    const { hasAccess } = await checkAccess();
    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { sku, name_ar, name_en, type, unit, cost_per_unit, low_stock_threshold } = body;

    const existing = await prisma.rawMaterial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Material not found.' }, { status: 404 });
    }

    if (sku && sku !== existing.sku) {
      const skuCheck = await prisma.rawMaterial.findUnique({ where: { sku } });
      if (skuCheck) {
        return NextResponse.json({ error: 'SKU must be unique.' }, { status: 400 });
      }
    }

    // Do NOT update stock_quantity directly via PUT. Use movement API for stock adjustments.
    const updated = await prisma.rawMaterial.update({
      where: { id },
      data: {
        sku: sku ?? existing.sku,
        name_ar: name_ar ?? existing.name_ar,
        name_en: name_en !== undefined ? name_en : existing.name_en,
        type: type ?? existing.type,
        unit: unit ?? existing.unit,
        cost_per_unit: cost_per_unit !== undefined ? cost_per_unit : existing.cost_per_unit,
        low_stock_threshold: low_stock_threshold !== undefined ? low_stock_threshold : existing.low_stock_threshold,
      }
    });

    return NextResponse.json({ ok: true, rawMaterial: updated });
  } catch (error) {
    console.error('[PUT /api/admin/inventory/raw-materials/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { hasAccess } = await checkAccess();
    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.rawMaterial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Material not found.' }, { status: 404 });
    }

    // Checking if raw material is used in any formulas
    const usage = await prisma.productFormulaItem.findFirst({
      where: { raw_material_id: id }
    });

    if (usage) {
      return NextResponse.json({ error: 'Cannot delete material used in product formulas.' }, { status: 400 });
    }

    await prisma.rawMaterial.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[DELETE /api/admin/inventory/raw-materials/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
