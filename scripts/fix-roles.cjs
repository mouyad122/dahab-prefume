const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing employee roles in DB...');
  const result = await prisma.employee.updateMany({
    where: {
      role: {
        notIn: ['employee', 'manager']
      }
    },
    data: {
      role: 'manager' // Elevate any unknown roles like 'admin' to manager
    }
  });
  console.log(`Updated ${result.count} employee roles to manager.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
