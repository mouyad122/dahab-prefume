import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const accords = await prisma.fragranceAccord.findMany({
      orderBy: { sort_order: 'asc' }
    });

    return NextResponse.json({ ok: true, accords });
  } catch (error) {
    console.error('[GET /api/admin/settings/fragrance-accords]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    // check if employee has settings/product perms
    const employee = await prisma.employee.findUnique({
      where: { id: session.employeeId || '' },
      include: { permissions: true }
    });
    if (!session.isSuperAdmin && !employee?.permissions?.can_manage_products && !employee?.permissions?.can_view_settings) {
       return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const body = await request.json();
    const { name_ar, name_en, slug, color, sort_order, is_active } = body;

    if (!name_ar || !slug) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const existing = await prisma.fragranceAccord.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug must be unique.' }, { status: 400 });
    }

    const accord = await prisma.fragranceAccord.create({
      data: {
        name_ar,
        name_en: name_en || null,
        slug,
        color: color || '#000000',
        sort_order: sort_order || 0,
        is_active: is_active ?? true,
      }
    });

    return NextResponse.json({ ok: true, accord }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/admin/settings/fragrance-accords]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
