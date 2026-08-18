import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Bengaluru, India'
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'Full Time'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'jobs',
  timestamps: true
});

export default Job;
