import { sequelize } from './database/db.js';


try {
  await sequelize.query(`
    ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS role VARCHAR(255) NOT NULL DEFAULT 'user';
  `);
  console.log('✅ role column added!');
  process.exit(0);
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}