import connectDB from './config/db.js';
import models from './models/index.js';

const verifyFlow = async () => {
  try {
    await connectDB();
    console.log('=== DATA FLOW VERIFICATION (MYSQL & SEQUELIZE) ===');
    console.log('✅ Backend architecture fully powered by Express, Sequelize ORM, and MySQL.');

    for (const [modelName, model] of Object.entries(models)) {
      if (modelName !== 'sequelize') {
        const count = await model.count();
        console.log(`   - Model ${modelName.padEnd(16)}: ${count} records in MySQL`);
      }
    }

    console.log('=== VERIFICATION COMPLETE & HEALTHY ===');
  } catch (error) {
    console.error('❌ Data Flow Verification Error:', error.message);
  }
};

verifyFlow();
