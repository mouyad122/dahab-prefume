import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';
import { sanitize } from '@/lib/security';
import { parseVolumeMl } from '@/lib/inventory';


export const dynamic = 'force-dynamic';
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
      if (reqEmployeeId === 'admin') {
        where.employeeId = null; // Admin sales have no linked employee ID
      } else {
        where.OR = [
          { employeeId: reqEmployeeId },
          { seller_user_id: reqEmployeeId }
        ];
      }
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

    if (sale_source === 'STAFF_POS' && employeeSession) {
      const emp = await prisma.employee.findUnique({
        where: { id: employeeSession.employeeId }
      });
      if (emp) {
        employeeIdVal = emp.id;
        sellerUserId = emp.id;
        sellerNameSnapshot = emp.display_name || emp.username;
        sellerRoleSnapshot = emp.role === 'manager' ? 'مدير فرع' : 'موظف كاشير';
      }
      controlledSaleSource = 'STAFF_POS';
    } else if (adminSession) {
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
    const rawMaterialRequirements = new Map();
    const bulkLiquidRequirements = new Map();

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
          },
          include: {
            product: { select: { inventory_mode: true, bulk_stock_ml: true } },
            formulas: { include: { items: { include: { raw_material: true } } } }
          }
        });

        if (!dbVariant) {
          return NextResponse.json({ 
            error: `المنتج (${item.product_name_ar}) بالحجم (${item.volume}) غير متوفر في النظام` 
          }, { status: 400 });
        }

        if (dbVariant.product.inventory_mode === 'FORMULA_BASED') {
          const formula = dbVariant.formulas[0];
          if (!formula || !formula.items || formula.items.length === 0) {
            return NextResponse.json({ 
              error: `المنتج (${item.product_name_ar}) لم يتم إعداد تركيبة (Formula) له في النظام` 
            }, { status: 400 });
          }
          for (const fItem of formula.items) {
            const required = (fItem.quantity_ml || 0) * item.quantity;
            const rmId = fItem.raw_material.id;
            const currentReq = rawMaterialRequirements.get(rmId) || { 
              req: 0, 
              stock: fItem.raw_material.current_quantity, 
              name: fItem.raw_material.name_ar 
            };
            rawMaterialRequirements.set(rmId, {
              req: currentReq.req + required,
              stock: currentReq.stock,
              name: currentReq.name
            });
          }
        } else if (dbVariant.product.inventory_mode === 'BULK_LIQUID') {
          const mlPerUnit = parseVolumeMl(volClean, 0);
          if (!mlPerUnit) {
            return NextResponse.json({ 
              error: `حجم المنتج (${item.product_name_ar}) غير صحيح` 
            }, { status: 400 });
          }
          const required = mlPerUnit * item.quantity;
          const currentReq = bulkLiquidRequirements.get(item.productId) || {
            req: 0,
            stock: dbVariant.product.bulk_stock_ml || 0,
            name: item.product_name_ar
          };
          bulkLiquidRequirements.set(item.productId, {
            req: currentReq.req + required,
            stock: currentReq.stock,
            name: currentReq.name
          });
        } else {
          if (dbVariant.stock < item.quantity) {
            return NextResponse.json({ 
              error: `الكمية المطلوبة من (${item.product_name_ar}) غير متوفرة حالياً في المخزن (المتوفر الحقيقي: ${dbVariant.stock})` 
            }, { status: 400 });
          }
        }
      }
    }

    // Check aggregated raw material requirements
    for (const [rmId, data] of rawMaterialRequirements.entries()) {
      if (data.stock < data.req) {
        return NextResponse.json({ 
          error: `إجمالي الكمية المطلوبة من المادة الخام (${data.name}) غير متوفرة (المطلوب: ${data.req} مل, المتوفر: ${data.stock} مل)` 
        }, { status: 400 });
      }
    }

    // Check aggregated bulk liquid requirements
    for (const [prodId, data] of bulkLiquidRequirements.entries()) {
      if (data.stock < data.req) {
        return NextResponse.json({ 
          error: `إجمالي الكمية المطلوبة من العطر السائل (${data.name}) غير متوفرة (المطلوب: ${data.req} مل, المتوفر: ${data.stock} مل)` 
        }, { status: 400 });
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
                },
                include: {
                  product: { select: { id: true, name_ar: true, inventory_mode: true, bulk_stock_ml: true } },
                  formulas: { include: { items: { include: { raw_material: true } } } }
                }
              });
              if (variant) {
                if (variant.product.inventory_mode === 'FORMULA_BASED') {
                  const formula = variant.formulas[0];
                  if (formula && formula.items) {
                    for (const fItem of formula.items) {
                      const qtyToDeduct = (fItem.quantity_ml || 0) * item.quantity;
                      const rmStock = fItem.raw_material.current_quantity || 0;
                      
                      if (rmStock < qtyToDeduct) {
                        throw new Error(`نفذت الكمية للمادة الخام: ${fItem.raw_material.name_ar}`);
                      }
                       
                      const updated = await tx.rawMaterial.updateMany({
                        where: { id: fItem.raw_material_id, current_quantity: { gte: qtyToDeduct } },
                        data: { current_quantity: { decrement: qtyToDeduct } }
                      });

                      if (updated.count !== 1) {
                        throw new Error(`نفذت الكمية للمادة الخام: ${fItem.raw_material.name_ar}`);
                      }
                      
                      // Create movement log
                      await tx.rawMaterialMovement.create({
                        data: {
                          raw_material_id: fItem.raw_material_id,
                          movement_type: 'SALE_CONSUMPTION',
                          quantity_change: -qtyToDeduct,
                          quantity_before: rmStock,
                          quantity_after: rmStock - qtyToDeduct,
                          unit: 'ML',
                          reason: `مبيع نقطة بيع - فاتورة ${invoice_number}`,
                          reference_type: 'SALE',
                          reference_id: newSale.id,
                          created_by: sellerUserId || 'SYSTEM'
                        }
                      });
                    }
                  }
                } else if (variant.product.inventory_mode === 'BULK_LIQUID') {
                  const qtyToDeduct = parseVolumeMl(volClean, 0) * item.quantity;
                  const currentStock = variant.product.bulk_stock_ml || 0;
                  
                  if (currentStock < qtyToDeduct) {
                    throw new Error(`نفذت كمية العطر السائل: ${variant.product.name_ar || item.product_name_ar}`);
                  }
                   
                  const updated = await tx.product.updateMany({
                    where: { id: variant.productId, bulk_stock_ml: { gte: qtyToDeduct } },
                    data: { bulk_stock_ml: { decrement: qtyToDeduct } }
                  });

                  if (updated.count !== 1) {
                    throw new Error(`نفذت كمية العطر السائل: ${variant.product.name_ar || item.product_name_ar}`);
                  }
                  
                  // Log InventoryMovement
                  await tx.inventoryMovement.create({
                    data: {
                      productId: variant.productId,
                      variantId: variant.id,
                      old_quantity: Math.round(currentStock),
                      new_quantity: Math.round(currentStock - qtyToDeduct),
                      quantity_change: -Math.round(qtyToDeduct),
                      reason: `مبيع عطر صب - فاتورة ${invoice_number}`,
                      adjusted_by: sellerUserId || 'SYSTEM'
                    }
                  });
                } else {
                  await tx.productVariant.update({
                    where: { id: variant.id },
                    data: { stock: Math.max(0, variant.stock - item.quantity) },
                  });
                }
              }
            }
          }

          return newSale;
        }, { timeout: 30000, maxWait: 15000 });

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
    return NextResponse.json({ error: process.env.NODE_ENV === 'production' ? 'خطأ داخلي في الخادم' : (error.message || 'خطأ داخلي') }, { status: 500 });
  }
}
