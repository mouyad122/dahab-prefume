import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';
import { getRedisClient } from '@/lib/redis';


export const dynamic = 'force-dynamic';
/**
 * GET /api/admin/stats
 * Returns comprehensive admin dashboard statistics in a single DB round-trip.
 * Measures Prisma execution time for the Performance/Health page.
 */
export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const t0 = Date.now();

  // ── Date boundaries ───────────────────────────────────────────────────────
  const now = new Date();

  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startWeek  = new Date(startToday);
  startWeek.setDate(startToday.getDate() - startToday.getDay());   // Sunday
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // ── Parallel queries (single transaction) ────────────────────────────────
  const [
    todaySales,
    weekSales,
    monthSales,
    recentSales,
    totalProducts,
    lowStockVariants,
    newInquiries,
    activeEmployees,
    dailySalesLast7,
  ] = await prisma.$transaction([

    // 1. Today's sales aggregate
    prisma.sale.aggregate({
      where: { created_at: { gte: startToday }, status: 'completed' },
      _sum:   { total: true },
      _count: { id: true },
    }),

    // 2. This week's aggregate
    prisma.sale.aggregate({
      where: { created_at: { gte: startWeek }, status: 'completed' },
      _sum:   { total: true },
      _count: { id: true },
    }),

    // 3. This month's aggregate
    prisma.sale.aggregate({
      where: { created_at: { gte: startMonth }, status: 'completed' },
      _sum:   { total: true },
      _count: { id: true },
    }),

    // 4. Recent 6 sales (for dashboard table)
    prisma.sale.findMany({
      where:   { status: 'completed' },
      orderBy: { created_at: 'desc' },
      take: 6,
      select: {
        id: true,
        invoice_number: true,
        total: true,
        payment_method: true,
        created_at: true,
        employee: { select: { display_name: true } },
      },
    }),

    // 5. Total visible products
    prisma.product.count({ where: { visible: true } }),

    // 6. Low-stock product variants (stock <= low_stock_threshold)
    prisma.productVariant.findMany({
      where: {
        stock: { lte: 5 },   // approximate threshold — refined per product below
      },
      select: {
        id: true,
        volume: true,
        stock: true,
        productId: true,
        product: {
          select: {
            id: true,
            name_ar: true,
            sku: true,
            low_stock_threshold: true,
          },
        },
      },
      orderBy: { stock: 'asc' },
      take: 20,
    }),

    // 7. Unread contact inquiries
    prisma.contactInquiry.count({ where: { status: 'new' } }),

    // 8. Active (enabled) employees
    prisma.employee.count({ where: { is_active: true } }),

    // 9. Daily totals for the last 7 days (for CSS bar chart)
    prisma.sale.groupBy({
      by: ['created_at'],
      where: {
        created_at: { gte: startWeek },
        status: 'completed',
      },
      _sum: { total: true },
    }),
  ]);

  const queryMs = Date.now() - t0;

  // ── Redis health ping ────────────────────────────────────────────────────
  let redisStatus = 'not_configured';
  let redisPingMs = null;
  const redis = getRedisClient();
  if (redis) {
    try {
      const rt = Date.now();
      await redis.ping();
      redisPingMs  = Date.now() - rt;
      redisStatus  = 'ok';
    } catch {
      redisStatus = 'error';
    }
  }

  // ── Filter low-stock by actual product threshold ─────────────────────────
  const realLowStock = lowStockVariants.filter(
    v => v.stock <= (v.product?.low_stock_threshold ?? 5)
  );

  // ── Build day-by-day chart data for last 7 days ──────────────────────────
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(startToday);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString('ar-JO', { weekday: 'short' });
    const dateStr = d.toISOString().slice(0, 10);

    // Sum all sales on this day (groupBy returns full datetime, so match by date prefix)
    const dayTotal = dailySalesLast7
      .filter(s => new Date(s.created_at).toISOString().slice(0, 10) === dateStr)
      .reduce((sum, s) => sum + (s._sum.total ?? 0), 0);

    days.push({ label, dateStr, total_fils: dayTotal });
  }

  return NextResponse.json({
    today: {
      sales_fils:  todaySales._sum.total  ?? 0,
      invoices:    todaySales._count.id   ?? 0,
    },
    week: {
      sales_fils:  weekSales._sum.total   ?? 0,
      invoices:    weekSales._count.id    ?? 0,
    },
    month: {
      sales_fils:  monthSales._sum.total  ?? 0,
      invoices:    monthSales._count.id   ?? 0,
    },
    recent_sales:       recentSales,
    total_products:     totalProducts,
    low_stock_count:    realLowStock.length,
    low_stock_items:    realLowStock,
    new_inquiries:      newInquiries,
    active_employees:   activeEmployees,
    chart_days:         days,
    _meta: {
      query_ms:    queryMs,
      redis_status: redisStatus,
      redis_ping_ms: redisPingMs,
      generated_at: new Date().toISOString(),
    },
  });
}
