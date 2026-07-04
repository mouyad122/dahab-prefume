import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '../../../../../lib/session';
import { sanitize } from '../../../../../lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    const empSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !empSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, variantId, newStock, lowStockThreshold, reason } = body;

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    if (typeof newStock !== 'number' || newStock < 0) {
      return NextResponse.json({ error: 'Valid newStock quantity is required' }, { status: 400 });
    }

    if (!reason || !reason.trim()) {
      return NextResponse.json({ error: 'سبب تعديل المخزون مطلوب' }, { status: 400 });
    }

    const adjustedBy = adminSession 
      ? (adminSession.displayName || adminSession.username || 'المدير العام') 
      : (empSession.username || 'موظف');

    const result = await prisma.$transaction(async (tx) => {
      // Find product
      const product = await tx.product.findUnique({
        where: { id: productId },
        include: { variants: true }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      // If threshold updated
      if (typeof lowStockThreshold === 'number' && lowStockThreshold >= 0) {
        await tx.product.update({
          where: { id: productId },
          data: { low_stock_threshold: lowStockThreshold }
        });
      }

      let targetVariant = null;
      if (variantId) {
        targetVariant = product.variants.find(v => v.id === variantId);
      } else if (product.variants.length > 0) {
        targetVariant = product.variants[0];
      }

      if (!targetVariant) {
        throw new Error('No valid variant found to adjust');
      }

      const oldStock = targetVariant.stock;
      const quantityChange = newStock - oldStock;

      // Update variant stock
      const updatedVariant = await tx.productVariant.update({
        where: { id: targetVariant.id },
        data: { stock: newStock }
      });

      // Create InventoryMovement log
      const movement = await tx.inventoryMovement.create({
        data: {
          productId: product.id,
          variantId: targetVariant.id,
          old_quantity: oldStock,
          new_quantity: newStock,
          quantity_change: quantityChange,
          reason: sanitize(reason.trim()),
          adjusted_by: adjustedBy
        }
      });

      return { updatedVariant, movement };
    });

    return NextResponse.json({ success: true, ...result });

  } catch (error) {
    console.error('[POST /api/admin/inventory/adjust]', error);
    return NextResponse.json({ error: error.message || 'Failed to adjust stock' }, { status: 500 });
  }
}
