import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'pos1';
  const password = 'pospassword123';
  
  console.log('Hashing password...');
  const password_hash = await bcrypt.hash(password, 10);

  console.log('Creating employee in database...');
  const employee = await prisma.employee.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password_hash,
      display_name: 'POS Cashier 1',
      role: 'employee',
      permissions: {
        create: {
          can_access_counter: true,
          can_view_invoices: true,
          can_print_reports: true,
          can_add_notes: true,
          can_view_inventory: true,
        }
      }
    }
  });
  console.log(`\n✅ Success! Employee created.`);
  console.log(`Username: ${employee.username}`);
  console.log(`Password: ${password}`);
}

main()
  .catch(e => {
    console.error('Error creating employee:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
