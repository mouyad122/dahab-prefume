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

    // 2. Find all sales made today from STAFF_POS that are NOT assigned to this employee
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // 3. Update them to belong to the employee
    const updateResult = await prisma.sale.updateMany({
      where: {
        sale_source: 'STAFF_POS',
        created_at: {
          gte: startOfToday
        },
        // Only update if it wasn't already assigned to this employee
        seller_user_id: {
          not: firstEmployee.id
        }
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
      message: 'Fixed sales assignment.' 
    });
  } catch (error) {
    console.error('Fix sales error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
