import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'clients',
  timestamps: true
});

export default Client;
