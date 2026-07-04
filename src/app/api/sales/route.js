import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../lib/session';
import { sanitize } from '../../../lib/security';

// ─── GET /api/sales ───────────────────────────────────────────────────────────
export async function GET(request) {
  try {
    const adminSession = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit  = Math.min(parseInt(searchParams.get('limit')  ?? '50', 10), 500);
    const offset = Math.max(parseInt(searchParams.get('offset') ?? '0',  10), 0);
    const status = searchParams.get('status');
    const paymentMethod = searchParams.get('paymentMethod');
    const startDate = searchParams.get('startDate');
    const endDate   = searchParams.get('endDate');
    let reqEmployeeId = searchParams.get('employeeId') || searchParams.get('sellerUserId');

    if (employeeSession) {
      reqEmployeeId = employeeSession.employeeId;
    }

    const where = {};

    if (reqEmployeeId) {
      where.OR = [
        { employeeId: reqEmployeeId },
        { seller_user_id: reqEmployeeId }
      ];
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (paymentMethod && paymentMethod !== 'all') {
      where.payment_method = paymentMethod;
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate)   where.created_at.lte = new Date(endDate);
    }

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
            select: { id: true, display_name: true, username: true, role: true },
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
      totalAmount: aggregate._sum.total ?? 0,
    });
  } catch (error) {
    console.error('[GET /api/sales]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/sales ──────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
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
      sale_source
    } = body;

    let sellerUserId = null;
    let sellerNameSnapshot = 'غير محدد';
    let sellerRoleSnapshot = 'كاشير';
    let employeeIdVal = null;
    let controlledSaleSource = 'STAFF_POS';

    if (adminSession) {
      sellerUserId = adminSession.id || 'admin';
      sellerNameSnapshot = adminSession.displayName || adminSession.username || 'المدير العام';
      sellerRoleSnapshot = 'المدير العام';
      controlledSaleSource = 'ADMIN_COUNTER';
    } else if (employeeSession) {
      const emp = await prisma.employee.findUnique({
        where: { id: employeeSession.employeeId }
      });
      if (emp) {
        employeeIdVal = emp.id;
        sellerUserId = emp.id;
        sellerNameSnapshot = emp.display_name || emp.username;
        sellerRoleSnapshot = emp.role === 'manager' ? 'مدير فرع' : 'موظف كاشير';
      }
      controlledSaleSource = sale_source === 'ADMIN_COUNTER' ? 'ADMIN_COUNTER' : 'STAFF_POS';
    }

    // ── Validate basic structure ──────────────────────────────────────────────
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'الفاتورة يجب أن تحتوي على منتج واحد على الأقل' }, { status: 400 });
    }
    if (typeof total !== 'number' || total < 0) {
      return NextResponse.json({ error: 'المبلغ الإجمالي غير صحيح' }, { status: 400 });
    }
    if (typeof amount_received !== 'number' || amount_received < 0) {
      return NextResponse.json({ error: 'المبلغ المستلم غير صحيح' }, { status: 400 });
    }
    if (amount_received < total) {
      return NextResponse.json({ error: 'المبلغ المستلم أقل من الإجمالي المطلوب' }, { status: 400 });
    }

    // ── Strict Server-Side Re-Verification of Items, Prices & Live Stock ──────
    for (const item of items) {
      if (!item.product_name_ar || !item.product_sku) {
        return NextResponse.json({ error: 'بيانات المنتج ناقصة' }, { status: 400 });
      }
      if (typeof item.quantity !== 'number' || item.quantity < 1) {
        return NextResponse.json({ error: 'كمية المنتج يجب أن تكون 1 أو أكثر' }, { status: 400 });
      }

      if (item.productId && item.volume) {
        const volClean = String(item.volume).replace('ml', '').trim();
        const dbVariant = await prisma.productVariant.findUnique({
          where: {
            productId_volume: {
              productId: item.productId,
              volume: volClean
            }
          }
        });

        if (!dbVariant) {
          return NextResponse.json({ 
            error: `المنتج (${item.product_name_ar}) بالحجم (${item.volume}) غير متوفر في النظام` 
          }, { status: 400 });
        }

        if (dbVariant.stock < item.quantity) {
          return NextResponse.json({ 
            error: `الكمية المطلوبة من (${item.product_name_ar}) غير متوفرة حالياً في المخزن (المتوفر الحقيقي: ${dbVariant.stock})` 
          }, { status: 400 });
        }
      }
    }

    // ── Generate Invoice Number & Create Sale in DB ──
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
        sale = await prisma.$transaction(async (tx) => {
          const conflict = await tx.sale.findUnique({
            where: { invoice_number },
            select: { id: true }
          });
          if (conflict) {
            throw { code: 'P2002', meta: { target: ['invoice_number'] } };
          }

          const newSale = await tx.sale.create({
            data: {
              invoice_number,
              employeeId:           employeeIdVal,
              seller_user_id:       sellerUserId,
              seller_name_snapshot: sellerNameSnapshot,
              seller_role_snapshot: sellerRoleSnapshot,
              sale_source:          controlledSaleSource,
              subtotal:             Math.round(subtotal),
              discount_total:       Math.round(discount_total),
              total:                Math.round(total),
              amount_received:      Math.round(amount_received),
              change_amount:        Math.round(change_amount),
              payment_method:       sanitize(String(payment_method)),
              status:               'completed',
              notes:                notes ? sanitize(String(notes)) : null,
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

          // Deduct stock for each item's specific variant volume only on successful completion
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

        break;
      } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('invoice_number')) {
          retries--;
          if (retries === 0) throw error;
          continue;
        }
        throw error;
      }
    }

    return NextResponse.json({ ok: true, sale }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/sales]', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('invoice_number')) {
      return NextResponse.json({ error: 'تعارض في رقم الفاتورة، يرجى إعادة المحاولة' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'خطأ داخلي في السيرفر' }, { status: 500 });
  }
}
