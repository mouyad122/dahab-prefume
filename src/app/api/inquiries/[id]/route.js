import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../../lib/session';
import { sanitize } from '../../../../lib/security';


export const dynamic = 'force-dynamic';
// ─── PATCH /api/inquiries/[id] (Update status or notes) ──────────────────────
export async function PATCH(request, { params }) {
  try {
    const adminSession = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
      return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    let { status, notes } = body;

    const existing = await prisma.contactInquiry.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'الاستفسار غير موجود' }, { status: 404 });
    }

    const updateData = {};

    if (status) {
      const validStatuses = ['new', 'read', 'replied', 'archived'];
      if (validStatuses.includes(status)) {
        updateData.status = status;
      }
    }

    if (notes !== undefined) {
      updateData.notes = notes ? sanitize(String(notes).trim()) : null;
    }

    const updatedInquiry = await prisma.contactInquiry.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      inquiry: updatedInquiry
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'فشل في تحديث الاستفسار' }, { status: 500 });
  }
}

// ─── DELETE /api/inquiries/[id] (Delete inquiry) ─────────────────────────────
export async function DELETE(request, { params }) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ error: 'غير مصرح بالوصول - يتطلب حساب مسؤول' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.contactInquiry.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'الاستفسار غير موجود' }, { status: 404 });
    }

    await prisma.contactInquiry.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'تم حذف الاستفسار بنجاح'
    });

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json({ error: 'فشل في حذف الاستفسار' }, { status: 500 });
  }
}
