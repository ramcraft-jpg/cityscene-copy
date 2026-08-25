import { sequelize } from '../config/db.js';
import { Service } from '../models/Service.js';
import { initialServices } from '../services/seedService.js';

async function sync() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    await Service.sync({ alter: true });
    await Service.destroy({ where: {} });
    await Service.bulkCreate(initialServices);
    console.log('Successfully synced all services in MySQL database!');
    process.exit(0);
  } catch (err) {
    console.error('Error syncing services:', err);
    process.exit(1);
  }
}

sync();
