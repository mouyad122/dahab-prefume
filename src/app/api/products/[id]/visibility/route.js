import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';
import { invalidateProduct } from '@/lib/cache';


export const dynamic = 'force-dynamic';
export async function PATCH(req, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { visible } = body;

    if (typeof visible !== 'boolean') {
      return NextResponse.json({ error: 'visible must be a boolean' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { 
        visible, 
        visible_on_website: visible,
        ready_for_storefront: visible
      }
    });

    await invalidateProduct(id);

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product visibility:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
