import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyAdminSession } from '../../../lib/session';

// ─── GET /api/security ────────────────────────────────────────────────────────
// Admin only.
// Query params:
//   type = 'attempts' | 'events' | 'blocked'   (default: 'attempts')
//   limit = number (default 100, max 500)
export async function GET(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type  = searchParams.get('type') ?? 'attempts';
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100', 10), 500);

    if (!['attempts', 'events', 'blocked'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "attempts", "events", or "blocked"' },
        { status: 400 }
      );
    }

    if (type === 'attempts') {
      // Return login attempts, newest first, with linked employee info
      const attempts = await prisma.loginAttempt.findMany({
        orderBy: { created_at: 'desc' },
        take: limit,
        include: {
          employee: {
            select: { id: true, display_name: true, username: true },
          },
        },
      });

      // Aggregate stats
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
      // Return all security events (brute force lockouts, etc.)
      const events = await prisma.securityEvent.findMany({
        orderBy: { created_at: 'desc' },
        take: limit,
      });

      return NextResponse.json({ type: 'events', events });

    } else if (type === 'blocked') {
      // Return only currently active IP blocks
      const now = new Date();
      const blocked = await prisma.securityEvent.findMany({
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

      return NextResponse.json({ type: 'blocked', blocked, count: blocked.length });
    }

  } catch (error) {
    console.error('[GET /api/security]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
