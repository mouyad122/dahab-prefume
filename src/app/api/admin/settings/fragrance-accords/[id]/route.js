import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name_ar, name_en, slug, color, sort_order, is_active } = body;

    const existing = await prisma.fragranceAccord.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Accord not found.' }, { status: 404 });
    }

    if (slug && slug !== existing.slug) {
      const slugCheck = await prisma.fragranceAccord.findUnique({ where: { slug } });
      if (slugCheck) {
        return NextResponse.json({ error: 'Slug must be unique.' }, { status: 400 });
      }
    }

    const updated = await prisma.fragranceAccord.update({
      where: { id },
      data: {
        name_ar: name_ar ?? existing.name_ar,
        name_en: name_en !== undefined ? name_en : existing.name_en,
        slug: slug ?? existing.slug,
        color: color ?? existing.color,
        sort_order: sort_order ?? existing.sort_order,
        is_active: is_active ?? existing.is_active,
      }
    });

    return NextResponse.json({ ok: true, accord: updated });
  } catch (error) {
    console.error('[PUT /api/admin/settings/fragrance-accords/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.fragranceAccord.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Accord not found.' }, { status: 404 });
    }

    await prisma.fragranceAccord.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[DELETE /api/admin/settings/fragrance-accords/[id]]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
