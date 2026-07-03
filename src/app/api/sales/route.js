import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../lib/session';
import { sanitize } from '../../../lib/security';

// ─── GET /api/sales ───────────────────────────────────────────────────────────
// Admin sees all sales; employees see only their own.
// Query params: employeeId, startDate, endDate, status, limit=50, offset=0
export async function GET(request) {
  try {
    // Try admin session first, then employee
    const adminSession = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit  = Math.min(parseInt(searchParams.get('limit')  ?? '50', 10), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') ?? '0',  10), 0);
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate   = searchParams.get('endDate');
    let   reqEmployeeId = searchParams.get('employeeId');

    // Employees can only view their own sales — override any query param
    if (employeeSession) {
      reqEmployeeId = employeeSession.id;
    }

    // Build where clause
    const where = {};

    if (reqEmployeeId) {
      where.employeeId = reqEmployeeId;
    }

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate)   where.created_at.lte = new Date(endDate);
    }

    // Fetch sales + total count + sum in one transaction
    const [sales, total, aggregate] = await prisma.$transaction([
      prisma.sale.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: limit,
        skip: offset,
        include: {
          items: {
            include: {
              product: {
                select: { name_ar: true, name_en: true },
              },
            },
          },
          employee: {
            select: { id: true, display_name: true, username: true },
          },
        },
      }),
      prisma.sale.count({ where }),
      prisma.sale.aggregate({
        where,
        _sum: { total: true },
      }),
    ]);

    return NextResponse.json({
      sales,
      total,
      count: sales.length,
      totalAmount: aggregate._sum.total ?? 0, // in fils
    });
  } catch (error) {
    console.error('[GET /api/sales]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/sales ──────────────────────────────────────────────────────────
// Employee only. Creates a sale and deducts stock.
export async function POST(request) {
  try {
    const session = await verifyEmployeeSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      items,
      subtotal,
      discount_total = 0,
      total,
      amount_received,
      payment_method = 'cash',
      notes,
    } = body;

    // ── Validate required fields ──────────────────────────────────────────────
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Sale must include at least one item' }, { status: 400 });
    }
    if (typeof total !== 'number' || total < 0) {
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 });
    }
    if (typeof amount_received !== 'number' || amount_received < 0) {
      return NextResponse.json({ error: 'Invalid amount_received' }, { status: 400 });
    }
    if (amount_received < total) {
      return NextResponse.json({ error: 'Amount received is less than total' }, { status: 400 });
    }

    for (const item of items) {
      if (!item.product_name_ar || !item.product_sku) {
        return NextResponse.json({ error: 'Each item must have product_name_ar and product_sku' }, { status: 400 });
      }
      if (typeof item.quantity !== 'number' || item.quantity < 1) {
        return NextResponse.json({ error: 'Each item must have a positive quantity' }, { status: 400 });
      }
      if (typeof item.unit_price !== 'number' || item.unit_price < 0) {
        return NextResponse.json({ error: 'Each item must have a valid unit_price in fils' }, { status: 400 });
      }
      if (typeof item.total_price !== 'number' || item.total_price < 0) {
        return NextResponse.json({ error: 'Each item must have a valid total_price in fils' }, { status: 400 });
      }
    }

    // ── Generate Invoice Number with Timezone-Proof startsWith & Retry Loop ──
    let invoice_number = '';
    let sale = null;
    let retries = 3;
    const change_amount = amount_received - total;

    while (retries > 0) {
      const now     = new Date();
      const yyyy    = now.getFullYear();
      const mm      = String(now.getMonth() + 1).padStart(2, '0');
      const dd      = String(now.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}${mm}${dd}`;

      // Query database for the latest invoice number starting with today's dateStr
      const latestSale = await prisma.sale.findFirst({
        where: {
          invoice_number: {
            startsWith: `INV-${dateStr}-`
          }
        },
        orderBy: {
          invoice_number: 'desc'
        },
        select: {
          invoice_number: true
        }
      });

      let nextSeq = 1;
      if (latestSale && latestSale.invoice_number) {
        const parts = latestSale.invoice_number.split('-');
        const lastSeqStr = parts[parts.length - 1];
        const lastSeq = parseInt(lastSeqStr, 10);
        if (!isNaN(lastSeq)) {
          nextSeq = lastSeq + 1;
        }
      }

      const invoiceSeq = String(nextSeq).padStart(4, '0');
      invoice_number = `INV-${dateStr}-${invoiceSeq}`;

      try {
        // Run database transaction
        sale = await prisma.$transaction(async (tx) => {
          // Double check unique constraint within transaction to prevent race conditions
          const conflict = await tx.sale.findUnique({
            where: { invoice_number },
            select: { id: true }
          });
          if (conflict) {
            throw { code: 'P2002', meta: { target: ['invoice_number'] } };
          }

          // Create the sale
          const newSale = await tx.sale.create({
            data: {
              invoice_number,
              employeeId:     session.employeeId,
              subtotal:       Math.round(subtotal),
              discount_total: Math.round(discount_total),
              total:          Math.round(total),
              amount_received: Math.round(amount_received),
              change_amount:  Math.round(change_amount),
              payment_method: sanitize(String(payment_method)),
              status:         'completed',
              notes:          notes ? sanitize(String(notes)) : null,
              items: {
                create: items.map((item) => ({
                  productId:       item.productId ?? null,
                  product_name_ar: sanitize(String(item.product_name_ar)),
                  product_name_en: item.product_name_en ? sanitize(String(item.product_name_en)) : null,
                  product_sku:     sanitize(String(item.product_sku)),
                  quantity:        Math.round(item.quantity),
                  unit_price:      Math.round(item.unit_price),
                  total_price:     Math.round(item.total_price),
                  volume:          item.volume ? sanitize(String(item.volume)) : null,
                })),
              },
            },
            include: {
              items: {
                include: {
                  product: {
                    select: { name_ar: true, name_en: true },
                  },
                },
              },
              employee: {
                select: { id: true, display_name: true, username: true },
              },
            },
          });

          // Deduct stock for each item's specific variant volume
          for (const item of items) {
            if (item.productId && item.volume) {
              const volClean = String(item.volume).replace('ml', '').trim();
              const variant = await tx.productVariant.findUnique({
                where: {
                  productId_volume: {
                    productId: item.productId,
                    volume: volClean
                  }
                }
              });
              if (variant) {
                await tx.productVariant.update({
                  where: { id: variant.id },
                  data: { stock: Math.max(0, variant.stock - item.quantity) },
                });
              }
            }
          }

          return newSale;
        });

        // Success - break retry loop
        break;
      } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('invoice_number')) {
          retries--;
          if (retries === 0) throw error; // Throw after all retries fail
          continue; // Retry next loop iteration with incremented sequence
        }
        throw error; // Throw any other database error
      }
    }

    return NextResponse.json({ ok: true, sale }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/sales]', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('invoice_number')) {
      return NextResponse.json(
        { error: 'Invoice number conflict, please retry' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
