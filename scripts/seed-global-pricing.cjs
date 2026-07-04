const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding GlobalPricingSettings...');
  const existing = await prisma.globalPricingSettings.findFirst();
  if (!existing) {
    await prisma.globalPricingSettings.create({
      data: {
        price_50ml_fils: 10000,
        price_100ml_fils: 16000,
        price_200ml_fils: 28000,
        currency: 'JOD',
        active: true
      }
    });
    console.log('Global pricing seeded successfully!');
  } else {
    console.log('Global pricing already exists:', existing);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
