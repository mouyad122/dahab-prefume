const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  const seasonCount = await prisma.product.count({
    where: { NOT: { season_slug: null } }
  });
  console.log(`Total Products: ${count}`);
  console.log(`Seasons Processed: ${seasonCount}`);
}
main().finally(() => prisma.$disconnect());
