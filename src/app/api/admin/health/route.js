import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyAdminSession } from '../../../../lib/session';
import { getRedisClient } from '../../../../lib/redis';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/health
 * Returns system health metrics:
 *   - DB response time (measured via Prisma)
 *   - Redis ping latency
 *   - Record counts for key tables
 *   - Node.js process memory usage
 */
export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const checks = {};

  // ── 1. Database latency (measure a trivial query) ────────────────────────
  let dbMs = null;
  let dbStatus = 'error';
  try {
    const t0 = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbMs = Date.now() - t0;
    dbStatus = 'ok';
  } catch (e) {
    dbStatus = 'error';
  }
  checks.database = { status: dbStatus, ping_ms: dbMs };

  // ── 2. Redis latency ─────────────────────────────────────────────────────
  let redisMs = null;
  let redisStatus = 'not_configured';
  const redis = getRedisClient();
  if (redis) {
    try {
      const t0 = Date.now();
      await redis.ping();
      redisMs = Date.now() - t0;
      redisStatus = 'ok';
    } catch {
      redisStatus = 'error';
    }
  }
  checks.redis = { status: redisStatus, ping_ms: redisMs };

  // ── 3. Key table counts (one transaction) ────────────────────────────────
  let counts = {};
  try {
    const t0 = Date.now();
    const [products, employees, sales, inquiries, settings] = await prisma.$transaction([
      prisma.product.count(),
      prisma.employee.count(),
      prisma.sale.count(),
      prisma.contactInquiry.count(),
      prisma.siteSettings.count(),
    ]);
    const queryMs = Date.now() - t0;
    counts = { products, employees, sales, inquiries, settings, query_ms: queryMs };
  } catch (e) {
    counts = { error: e.message };
  }

  // ── 4. Slow query simulation — fetch last 50 sales ───────────────────────
  let salesQueryMs = null;
  try {
    const t0 = Date.now();
    await prisma.sale.findMany({
      take: 50,
      orderBy: { created_at: 'desc' },
      select: { id: true, total: true, created_at: true },
    });
    salesQueryMs = Date.now() - t0;
  } catch {}

  // ── 5. Memory stats (Node.js process) ───────────────────────────────────
  const mem = process.memoryUsage();
  const memory = {
    heap_used_mb:  Math.round(mem.heapUsed  / 1024 / 1024),
    heap_total_mb: Math.round(mem.heapTotal / 1024 / 1024),
    rss_mb:        Math.round(mem.rss       / 1024 / 1024),
  };

  return NextResponse.json({
    status: dbStatus === 'ok' ? 'healthy' : 'degraded',
    generated_at: new Date().toISOString(),
    checks,
    counts,
    benchmarks: {
      db_ping_ms:     dbMs,
      sales_query_ms: salesQueryMs,
    },
    memory,
  });
}
