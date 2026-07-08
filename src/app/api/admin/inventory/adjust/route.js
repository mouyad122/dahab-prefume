import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';
import { sanitize } from '@/lib/security';
import { DEFAULT_LOW_STOCK_THRESHOLD_ML } from '@/lib/inventory';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    const empSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !empSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, newBulkMl, deltaMl, lowStockThreshold, reason, variantId, newStock } = body;

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    if (!reason || !reason.trim()) {
      return NextResponse.json({ error: 'سبب تعديل المخزون مطلوب' }, { status: 400 });
    }

    const adjustedBy = adminSession
      ? (adminSession.displayName || adminSession.username || 'المدير العام')
      : (empSession.username || 'موظف');

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
        include: { variants: true }
      });

      if (!product) throw new Error('Product not found');

      // Update low stock threshold if provided
      const resolvedLowStockThreshold = Number(lowStockThreshold);
      if (Number.isFinite(resolvedLowStockThreshold) && resolvedLowStockThreshold >= 0) {
        await tx.product.update({
          where: { id: productId },
          data: { low_stock_threshold: resolvedLowStockThreshold || DEFAULT_LOW_STOCK_THRESHOLD_ML }
        });
      }

      // ── BULK_LIQUID ml-based adjustment ──────────────────────────────
      if (product.inventory_mode === 'BULK_LIQUID' || newBulkMl !== undefined || deltaMl !== undefined) {
        const oldMl = product.bulk_stock_ml || 0;
        let resolvedNewMl;

        if (deltaMl !== undefined) {
          resolvedNewMl = Math.max(0, oldMl + deltaMl);
        } else if (newBulkMl !== undefined) {
          resolvedNewMl = Math.max(0, newBulkMl);
        } else if (newStock !== undefined) {
          // Legacy: newStock interpreted as ml for BULK_LIQUID
          resolvedNewMl = Math.max(0, newStock);
        } else {
          throw new Error('No quantity provided');
        }

        const updatedProduct = await tx.product.update({
          where: { id: productId },
          data: { bulk_stock_ml: resolvedNewMl }
        });

        // Log movement
        const movement = await tx.inventoryMovement.create({
          data: {
            productId: product.id,
            variantId: null,
            old_quantity: Math.round(oldMl),
            new_quantity: Math.round(resolvedNewMl),
            quantity_change: Math.round(resolvedNewMl - oldMl),
            reason: sanitize(reason.trim()),
            adjusted_by: adjustedBy
          }
        });

        return { updatedProduct, movement, mode: 'bulk_liquid' };
      }

      // ── FINISHED_PRODUCT variant-based adjustment ─────────────────────
      let targetVariant = null;
      if (variantId) {
        targetVariant = product.variants.find(v => v.id === variantId);
      } else if (product.variants.length > 0) {
        targetVariant = product.variants[0];
      }

      if (!targetVariant) throw new Error('No valid variant found to adjust');

      const oldStock = targetVariant.stock;
      const resolvedNewStock = typeof newStock === 'number' ? newStock : oldStock;
      const quantityChange = resolvedNewStock - oldStock;

      const updatedVariant = await tx.productVariant.update({
        where: { id: targetVariant.id },
        data: { stock: resolvedNewStock }
      });

      const movement = await tx.inventoryMovement.create({
        data: {
          productId: product.id,
          variantId: targetVariant.id,
          old_quantity: oldStock,
          new_quantity: resolvedNewStock,
          quantity_change: quantityChange,
          reason: sanitize(reason.trim()),
          adjusted_by: adjustedBy
        }
      });

      return { updatedVariant, movement, mode: 'finished_product' };
    });

    return NextResponse.json({ success: true, ...result });

  } catch (error) {
    console.error('[POST /api/admin/inventory/adjust]', error);
    return NextResponse.json({ error: error.message || 'Failed to adjust stock' }, { status: 500 });
  }
}
