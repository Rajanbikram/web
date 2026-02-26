import sequelize from './database/db.js';

await sequelize.query('ALTER TABLE "Skills" DROP CONSTRAINT IF EXISTS "Skills_userId_fkey"');
await sequelize.query('ALTER TABLE "Skills" ADD CONSTRAINT "Skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE');
console.log('Fixed!');
process.exit(0);