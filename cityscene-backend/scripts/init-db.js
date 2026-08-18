import { sequelize } from '../config/db.js';
import '../models/index.js';

/**
 * Controlled Non-Destructive Database Initialization Script
 */
export const initializeDatabase = async () => {
  try {
    console.log('🔄 Authenticating MySQL Connection...');
    await sequelize.authenticate();
    console.log('✅ Connection to MySQL database "cityscene_global" established successfully.');

    console.log('🔄 Initializing SQL tables non-destructively...');
    // sequelize.sync() creates tables if they do not exist; never uses force:true
    await sequelize.sync({ force: false });
    console.log('✅ All SQL tables and indexes synchronized successfully.');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

if (process.argv[1].endsWith('init-db.js')) {
  initializeDatabase().then(() => process.exit(0));
}
