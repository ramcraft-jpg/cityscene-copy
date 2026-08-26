import connectDB, { sequelize } from '../config/db.js';
import models from '../models/index.js';

async function checkIsActive() {
  try {
    await connectDB();
    console.log("=== CHECKING isActive FIELD IN ALL TABLES ===");
    for (const [modelName, model] of Object.entries(models)) {
      if (modelName !== 'sequelize') {
        const records = await model.findAll({ raw: true });
        const inactiveCount = records.filter(r => r.isActive === false || r.isActive === 0).length;
        const activeCount = records.filter(r => r.isActive === true || r.isActive === 1 || r.isActive === undefined).length;
        console.log(`${modelName.padEnd(16)}: Total ${records.length} | Active: ${activeCount} | Inactive (isActive=false): ${inactiveCount}`);
        if (inactiveCount > 0) {
          records.filter(r => r.isActive === false || r.isActive === 0).forEach(r => {
            console.log(`   -> Inactive item ID: ${r.id || r._id} | Title: ${r.title || r.name}`);
          });
        }
      }
    }
  } catch (err) {
    console.error("Error checking isActive:", err);
  } finally {
    await sequelize.close();
  }
}

checkIsActive();
