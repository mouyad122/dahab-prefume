import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // Find all products containing dummy text
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { long_description_ar: { contains: 'يحتاج' } },
          { notes: { contains: 'يحتاج' } }
        ]
      }
    });

    let count = 0;
    
    // Update them
    for (const prod of products) {
      const data = {};
      
      if (prod.notes && prod.notes.includes('يحتاج')) {
        data.notes = null;
      }
      
      if (prod.long_description_ar && prod.long_description_ar.includes('يحتاج')) {
        data.long_description_ar = null;
      }
      
      if (Object.keys(data).length > 0) {
        await prisma.product.update({
          where: { id: prod.id },
          data
        });
        count++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      count,
      message: 'Fixed dummy data in descriptions.' 
    });
  } catch (error) {
    console.error('Fix dummy data error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
