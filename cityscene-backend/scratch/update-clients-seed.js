import { Client } from '../models/Client.js';
import { initialClients } from '../services/seedService.js';
import { sequelize } from '../config/db.js';

async function syncClientsSeed() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    for (const cData of initialClients) {
      const [record, created] = await Client.findOrCreate({
        where: { id: cData.id },
        defaults: cData
      });

      if (!created) {
        await record.update(cData);
      }
    }

    const allClients = await Client.findAll();
    console.log('✅ Synchronized MySQL clients:', allClients.map(c => ({ id: c.id, name: c.name, logo: c.logo })));
    process.exit(0);
  } catch (err) {
    console.error('Error syncing clients:', err);
    process.exit(1);
  }
}

syncClientsSeed();
