import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyAdminSession } from '../../../../lib/session';
import { sanitize } from '../../../../lib/security';

export async function POST(request) {
  return handleUnblock(request);
}

export async function DELETE(request) {
  return handleUnblock(request);
}

async function handleUnblock(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { ip_address } = body;
    if (!ip_address || typeof ip_address !== 'string' || !ip_address.trim()) {
      return NextResponse.json({ error: 'ip_address is required' }, { status: 400 });
    }

    const cleanIp = sanitize(ip_address.trim());

    // Delete from BlockedIP table if present
    await prisma.blockedIP.deleteMany({
      where: { ip_address: cleanIp }
    });

    // Unblock in SecurityEvent table
    const result = await prisma.securityEvent.updateMany({
      where: { ip_address: cleanIp, is_blocked: true },
      data:  { is_blocked: false },
    });

    return NextResponse.json({
      ok: true,
      ip_address: cleanIp,
      message: `تم إلغاء حظر الـ IP (${cleanIp}) بنجاح.`
    });
  } catch (error) {
    console.error('[UNBLOCK IP]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
