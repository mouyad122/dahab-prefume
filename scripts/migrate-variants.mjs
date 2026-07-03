import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: Product flat fields -> ProductVariant');
  
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products to migrate.`);

  let migratedCount = 0;
  
  for (const product of products) {
    // Check if variants already exist to prevent duplicate key errors if rerun
    const existingVariants = await prisma.productVariant.findMany({
      where: { productId: product.id }
    });

    if (existingVariants.length > 0) {
      console.log(`Product "${product.name_ar}" already has variants. Skipping.`);
      continue;
    }

    const variantsToCreate = [];

    // Migrate 50ml
    if (product.price_50ml_fils !== null && product.price_50ml_fils !== undefined) {
      variantsToCreate.push({
        volume: '50',
        price: product.price_50ml_fils,
        stock: product.stock // Primary stock goes to 50ml
      });
    }

    // Migrate 100ml
    if (product.price_100ml_fils !== null && product.price_100ml_fils !== undefined) {
      variantsToCreate.push({
        volume: '100',
        price: product.price_100ml_fils,
        stock: 0
      });
    }

    // Migrate 200ml
    if (product.price_200ml_fils !== null && product.price_200ml_fils !== undefined) {
      variantsToCreate.push({
        volume: '200',
        price: product.price_200ml_fils,
        stock: 0
      });
    }

    if (variantsToCreate.length > 0) {
      console.log(`Migrating product "${product.name_ar}" with ${variantsToCreate.length} variants...`);
      for (const variant of variantsToCreate) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            volume: variant.volume,
            price: variant.price,
            stock: variant.stock
          }
        });
      }
      migratedCount++;
    } else {
      // Default fallback if no pricing is set (create a default 100ml variant with price 0)
      console.log(`Product "${product.name_ar}" has no size prices. Creating default 100ml variant.`);
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          volume: '100',
          price: 0,
          stock: product.stock
        }
      });
      migratedCount++;
    }
  }

  console.log(`Migration completed successfully. Migrated ${migratedCount} products.`);
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
