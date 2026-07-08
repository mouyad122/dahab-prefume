import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const result = await prisma.category.deleteMany({
    where: {
      OR: [
        { slug: 'private' },
        { slug: { contains: 'private' } },
        { name_ar: { contains: 'الخاصة' } },
        { name_en: { contains: 'Private' } },
      ]
    }
  });
  console.log('Deleted:', result.count, 'categories');
  const remaining = await prisma.category.findMany({ select: { slug: true, name_ar: true } });
  console.log('Remaining:', remaining.map(c => `${c.slug} (${c.name_ar})`).join(', '));
}
main().catch(console.error).finally(() => prisma.$disconnect());
