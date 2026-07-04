const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const p = await prisma.product.findFirst({
    where: { slug: { contains: 'dhb-0198' } }
  });
  console.log(p);
}
main().finally(() => prisma.$disconnect());
