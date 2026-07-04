import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

export async function PATCH(req, { params }) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { visible_on_website } = body;

    if (typeof visible_on_website !== 'boolean') {
      return NextResponse.json({ error: 'visible_on_website must be a boolean' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { visible_on_website }
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product visibility:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
