import connectDB, { sequelize } from '../config/db.js';
import models from '../models/index.js';

async function inspectContents() {
  try {
    await connectDB();
    console.log("=== DETAILED TABLE CONTENTS IN cityscene_global ===");
    for (const [modelName, model] of Object.entries(models)) {
      if (modelName !== 'sequelize') {
        const records = await model.findAll({ raw: true });
        console.log(`\n--- ${modelName} (${records.length} records) ---`);
        records.forEach((r, i) => {
          const titleOrName = r.title || r.name || r.heading || r.section || r.email || r.id;
          console.log(`  [${i + 1}] ID: ${r.id} | Name/Title: ${titleOrName} | Created: ${r.createdAt}`);
        });
      }
    }
  } catch (err) {
    console.error("Error inspecting contents:", err);
  } finally {
    await sequelize.close();
  }
}

inspectContents();
