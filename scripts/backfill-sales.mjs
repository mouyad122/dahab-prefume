import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function backfillSales() {
  console.log('Starting backfill for existing sales...');
  const sales = await prisma.sale.findMany({
    include: { employee: true }
  });

  let updatedCount = 0;

  for (const sale of sales) {
    let sellerName = sale.seller_name_snapshot;
    let sellerRole = sale.seller_role_snapshot;
    let sellerId = sale.seller_user_id;

    if (!sellerName) {
      if (sale.employee) {
        sellerName = sale.employee.display_name || sale.employee.username;
        sellerRole = sale.employee.role === 'manager' ? 'مدير' : 'موظف كاشير';
        sellerId = sale.employee.id;
      } else {
        sellerName = 'غير محدد';
        sellerRole = 'كاشير';
        sellerId = sale.employeeId || null;
      }

      await prisma.sale.update({
        where: { id: sale.id },
        data: {
          seller_name_snapshot: sellerName,
          seller_role_snapshot: sellerRole,
          seller_user_id: sellerId,
          sale_source: sale.sale_source || 'STAFF_POS'
        }
      });
      updatedCount++;
    }
  }

  console.log(`Successfully backfilled ${updatedCount} sales records.`);
  await prisma.$disconnect();
}

backfillSales().catch((err) => {
  console.error('Backfill failed:', err);
  prisma.$disconnect();
  process.exit(1);
});
