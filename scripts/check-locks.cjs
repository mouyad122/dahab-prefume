const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const res = await prisma.$queryRaw`SELECT pid, state, wait_event_type, wait_event, query FROM pg_stat_activity WHERE state != 'idle';`;
  console.log(res);
  
  // Kill hanging transactions
  for (const row of res) {
    if (row.state === 'active' && row.query.includes('UPDATE "Product"')) {
       console.log('Killing PID', row.pid);
       await prisma.$queryRawUnsafe(`SELECT pg_terminate_backend(${row.pid})`);
    }
    if (row.state === 'idle in transaction') {
       console.log('Killing PID', row.pid);
       await prisma.$queryRawUnsafe(`SELECT pg_terminate_backend(${row.pid})`);
    }
  }
}
main().finally(() => process.exit(0));
