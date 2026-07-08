import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Convert all non-BULK_LIQUID products to BULK_LIQUID with 1000ml default
  const result1 = await prisma.product.updateMany({
    where: { NOT: { inventory_mode: 'BULK_LIQUID' } },
    data: { inventory_mode: 'BULK_LIQUID', bulk_stock_ml: 1000 }
  });
  console.log(`Converted ${result1.count} products → BULK_LIQUID @ 1000ml`);

  // Fix any BULK_LIQUID products sitting at 0ml
  const result2 = await prisma.product.updateMany({
    where: { inventory_mode: 'BULK_LIQUID', bulk_stock_ml: { lte: 0 } },
    data: { bulk_stock_ml: 1000 }
  });
  console.log(`Fixed ${result2.count} products with 0ml → 1000ml`);

  const total = await prisma.product.count({ where: { inventory_mode: 'BULK_LIQUID' } });
  console.log(`✓ Total BULK_LIQUID products: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
