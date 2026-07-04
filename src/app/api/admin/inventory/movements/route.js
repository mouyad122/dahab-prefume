import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../../../lib/session';


export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const adminSession = await verifyAdminSession();
    const empSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !empSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const movements = await prisma.inventoryMovement.findMany({
      take: 100,
      orderBy: { created_at: 'desc' },
      include: {
        product: {
          select: { name_ar: true, name_en: true, sku: true }
        }
      }
    });

    return NextResponse.json({ success: true, movements });
  } catch (error) {
    console.error('[GET /api/admin/inventory/movements]', error);
    return NextResponse.json({ error: 'Failed to fetch movements' }, { status: 500 });
  }
}
