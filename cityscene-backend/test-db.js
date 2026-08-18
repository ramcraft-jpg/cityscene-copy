import connectDB, { sequelize } from './config/db.js';

const testDatabaseConnection = async () => {
  try {
    await connectDB();
    const [results] = await sequelize.query('SELECT 1 + 1 AS result');
    console.log('✅ [Database Test] MySQL Connection & Query Execution OK:', results[0].result === 2);
  } catch (error) {
    console.error('❌ [Database Test] Connection Error:', error);
  }
};

testDatabaseConnection();
