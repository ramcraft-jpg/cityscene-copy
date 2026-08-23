import { Service } from '../models/Service.js';
import { initialServices } from '../services/seedService.js';
import { sequelize } from '../config/db.js';

async function forceReseedServices() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connected. Reseeding/Updating all 12 services with unique datasets...');

    for (const srvData of initialServices) {
      const targetId = srvData.id;
      
      const existing = await Service.findOne({
        where: { id: targetId }
      });

      if (existing) {
        console.log(`Updating service: ${targetId} (${srvData.displayTitle || srvData.title})...`);
        await existing.update(srvData);
      } else {
        console.log(`Creating service: ${targetId} (${srvData.displayTitle || srvData.title})...`);
        await Service.create(srvData);
      }
    }

    console.log('✅ ALL 12 SERVICES UPDATED IN DATABASE SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database reseed error:', err);
    process.exit(1);
  }
}

forceReseedServices();
