import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const variants = await prisma.productVariant.findMany();
    
    const movements = variants.map(v => ({
      productId: v.productId,
      variantId: v.id,
      old_quantity: v.stock || 0,
      new_quantity: (v.stock || 0) + 10,
      quantity_change: 10,
      reason: 'إضافة 10 حبات لكل المنتجات والأحجام (Force Script)',
      adjusted_by: 'المدير'
    }));

    // Perform updates in a transaction
    await prisma.$transaction([
      prisma.productVariant.updateMany({
        data: {
          stock: { increment: 10 }
        }
      }),
      prisma.inventoryMovement.createMany({
        data: movements
      })
    ]);

    return NextResponse.json({ success: true, count: variants.length, message: 'Added 10 pieces to all variants.' });
  } catch (error) {
    console.error('Force stock error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
