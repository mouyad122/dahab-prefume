import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyAdminSession } from '../../../../lib/session';
import { sanitize } from '../../../../lib/security';

// ─── DELETE /api/security/unblock ────────────────────────────────────────────
// Admin only — unblocks an IP address by setting is_blocked=false
// on all matching SecurityEvent records.
// Body: { ip_address: string }
export async function DELETE(request) {
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

    // Validate basic IP format (IPv4 or IPv6)
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^[0-9a-fA-F:]+$/;
    if (!ipv4Pattern.test(cleanIp) && !ipv6Pattern.test(cleanIp)) {
      return NextResponse.json({ error: 'Invalid IP address format' }, { status: 400 });
    }

    // Check if there are any blocked events for this IP
    const existingBlocked = await prisma.securityEvent.count({
      where: { ip_address: cleanIp, is_blocked: true },
    });

    if (existingBlocked === 0) {
      return NextResponse.json(
        { error: `No active blocks found for IP: ${cleanIp}` },
        { status: 404 }
      );
    }

    // Unblock: set is_blocked=false on all matching SecurityEvent rows
    const result = await prisma.securityEvent.updateMany({
      where: { ip_address: cleanIp, is_blocked: true },
      data:  { is_blocked: false },
    });

    console.info(`[DELETE /api/security/unblock] Admin unblocked IP: ${cleanIp} (${result.count} records updated)`);

    return NextResponse.json({
      ok: true,
      ip_address: cleanIp,
      records_updated: result.count,
    });
  } catch (error) {
    console.error('[DELETE /api/security/unblock]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
