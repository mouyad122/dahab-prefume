import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV === 'production') {
  console.error('ERROR: This script is for local development/testing only and cannot be run in production.');
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log('====================================================');
  console.log('DEV SUPPORT: Hiding All Products / Resetting Database');
  console.log('====================================================\n');

  const result = await prisma.product.updateMany({
    data: {
      visible_on_website: false,
      featured_on_frontend: false
    }
  });

  console.log(`Updated ${result.count} products to hidden and unfeatured.`);

  const visTrue = await prisma.product.count({ where: { visible_on_website: true } });
  const visFalse = await prisma.product.count({ where: { visible_on_website: false } });
  const featTrue = await prisma.product.count({ where: { featured_on_frontend: true } });

  console.log('\nFinal Database Visibility Counts:');
  console.log('----------------------------------------------------');
  console.log(`  visible_on_website = true:  ${visTrue}`);
  console.log(`  visible_on_website = false: ${visFalse}`);
  console.log(`  featured_on_frontend = true: ${featTrue}`);
  console.log('====================================================\n');
}

main()
  .catch(e => {
    console.error('Error running script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
