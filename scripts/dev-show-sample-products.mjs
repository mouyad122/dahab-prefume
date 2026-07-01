import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV === 'production') {
  console.error('ERROR: This script is for local development/testing only and cannot be run in production.');
  process.exit(1);
}

const prisma = new PrismaClient();

const SAMPLE_SKUS = [
  'DHB-0002',
  'DHB-0004',
  'DHB-0005',
  'DHB-0006',
  'DHB-0007',
  'DHB-0008',
  'DHB-0009',
  'DHB-0010'
];

const FEATURED_SKUS = ['DHB-0004'];

// Banned Needs Review SKUs
const BANNED_SKUS = ['DHB-0157', 'DHB-0269', 'DHB-0285'];

async function main() {
  console.log('====================================================');
  console.log('DEV SUPPORT: Showing Sample Products for Frontend Testing');
  console.log('====================================================\n');

  // First, hide all products to start from a clean state
  await prisma.product.updateMany({
    data: {
      visible_on_website: false,
      featured_on_frontend: false
    }
  });

  console.log('Reset all products to invisible/unfeatured.');

  const changedProducts = [];
  const skippedProducts = [];

  for (const sku of SAMPLE_SKUS) {
    if (BANNED_SKUS.includes(sku)) {
      console.log(`Skipped banned SKU (Needs Review): ${sku}`);
      skippedProducts.push(sku);
      continue;
    }

    const product = await prisma.product.findUnique({
      where: { sku }
    });

    if (!product) {
      console.log(`Skipped non-existent SKU: ${sku}`);
      skippedProducts.push(sku);
      continue;
    }

    const featured = FEATURED_SKUS.includes(sku);

    const updated = await prisma.product.update({
      where: { sku },
      data: {
        visible_on_website: true,
        featured_on_frontend: featured
      }
    });

    changedProducts.push(updated);
  }

  console.log('\nVisibility Update Report:');
  console.log('----------------------------------------------------');
  for (const p of changedProducts) {
    console.log(`  SKU: ${p.sku} | Name: ${p.name_ar} | Visible: ${p.visible_on_website} | Featured: ${p.featured_on_frontend}`);
  }
  
  if (skippedProducts.length > 0) {
    console.log(`\nSkipped SKUs: ${skippedProducts.join(', ')}`);
  }

  console.log('\n====================================================');
  console.log(`Successfully made ${changedProducts.length} sample products visible.`);
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
