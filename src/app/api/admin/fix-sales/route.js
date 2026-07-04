import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // 1. Get the first active employee
    const firstEmployee = await prisma.employee.findFirst({
      where: { is_active: true }
    });

    if (!firstEmployee) {
      return NextResponse.json({ error: 'No active employee found' }, { status: 400 });
    }

    // 2. Find all sales assigned to 'admin' that were made from 'STAFF_POS'
    const adminSales = await prisma.sale.findMany({
      where: {
        seller_user_id: 'admin',
        sale_source: 'STAFF_POS'
      }
    });

    // 3. Update them to belong to the employee
    const updateResult = await prisma.sale.updateMany({
      where: {
        seller_user_id: 'admin',
        sale_source: 'STAFF_POS'
      },
      data: {
        employeeId: firstEmployee.id,
        seller_user_id: firstEmployee.id,
        seller_name_snapshot: firstEmployee.display_name || firstEmployee.username,
        seller_role_snapshot: firstEmployee.role === 'manager' ? 'مدير فرع' : 'موظف كاشير'
      }
    });

    return NextResponse.json({ 
      success: true, 
      count: updateResult.count,
      employee_assigned: firstEmployee.username,
      message: 'Fixed admin sales.' 
    });
  } catch (error) {
    console.error('Fix sales error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
