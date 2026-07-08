import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';
import { sanitize } from '@/lib/security';


export const dynamic = 'force-dynamic';
// ─── GET /api/security ────────────────────────────────────────────────────────
export async function GET(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type  = searchParams.get('type') ?? 'attempts';
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100', 10), 500);

    if (type === 'attempts') {
      const attempts = await prisma.loginAttempt.findMany({
        orderBy: { created_at: 'desc' },
        take: limit,
        include: {
          employee: {
            select: { id: true, display_name: true, username: true },
          },
        },
      });

      const totalAttempts  = await prisma.loginAttempt.count();
      const failedAttempts = await prisma.loginAttempt.count({ where: { success: false } });

      return NextResponse.json({
        type: 'attempts',
        attempts,
        stats: {
          total:   totalAttempts,
          failed:  failedAttempts,
          success: totalAttempts - failedAttempts,
        },
      });

    } else if (type === 'events') {
      const events = await prisma.securityEvent.findMany({
        orderBy: { created_at: 'desc' },
        take: limit,
      });

      return NextResponse.json({ type: 'events', events });

    } else if (type === 'blocked') {
      const now = new Date();
      
      const blockedIps = await prisma.blockedIP.findMany({
        where: {
          OR: [
            { expires_at: null },
            { expires_at: { gt: now } }
          ]
        },
        orderBy: { created_at: 'desc' },
        take: limit
      });

      const blockedEvents = await prisma.securityEvent.findMany({
        where: {
          is_blocked: true,
          OR: [
            { expires_at: null },
            { expires_at: { gt: now } },
          ],
        },
        orderBy: { created_at: 'desc' },
        take: limit,
      });

      return NextResponse.json({ 
        type: 'blocked', 
        blocked: blockedIps.length > 0 ? blockedIps : blockedEvents, 
        count: Math.max(blockedIps.length, blockedEvents.length) 
      });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  } catch (error) {
    console.error('[GET /api/security]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/security (Block IP) ───────────────────────────────────────────
export async function POST(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ip_address, reason = 'حظر يدوي من الإدارة', durationHours = 24 } = body;

    if (!ip_address || typeof ip_address !== 'string' || !ip_address.trim()) {
      return NextResponse.json({ error: 'عنوان IP مطلوب' }, { status: 400 });
    }

    const cleanIp = sanitize(ip_address.trim());
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

    const blocked = await prisma.blockedIP.upsert({
      where: { ip_address: cleanIp },
      update: {
        reason: sanitize(reason),
        blocked_by: session.username || 'admin',
        expires_at: expiresAt
      },
      create: {
        ip_address: cleanIp,
        reason: sanitize(reason),
        blocked_by: session.username || 'admin',
        expires_at: expiresAt
      }
    });

    await prisma.securityEvent.create({
      data: {
        ip_address: cleanIp,
        event_type: 'MANUAL_BLOCK',
        details: reason,
        is_blocked: true,
        expires_at: expiresAt
      }
    });

    return NextResponse.json({ success: true, blocked });

  } catch (error) {
    console.error('[POST /api/security]', error);
    return NextResponse.json({ error: 'فشل حظر عنوان الـ IP' }, { status: 500 });
  }
}
