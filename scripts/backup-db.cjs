const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function backup() {
  console.log('--- DB BACKUP ---');
  try {
    const backupData = {
      timestamp: new Date().toISOString(),
      products: await prisma.product.findMany(),
      categories: await prisma.category.findMany(),
      variants: await prisma.productVariant.findMany(),
      accords: await prisma.productAccord.findMany(),
      familyTags: await prisma.productFamilyTag.findMany(),
      globalPricing: await prisma.globalPricingSettings.findMany()
    };

    const importDir = path.join(process.cwd(), 'import');
    if (!fs.existsSync(importDir)) {
      fs.mkdirSync(importDir, { recursive: true });
    }

    const backupPath = path.join(importDir, 'db-backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    console.log(`Backup successful. Saved to ${backupPath}`);
    console.log(`Products backed up: ${backupData.products.length}`);
    console.log(`Categories backed up: ${backupData.categories.length}`);
    console.log(`Variants backed up: ${backupData.variants.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('BACKUP FAILED:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

backup();
