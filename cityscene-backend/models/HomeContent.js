import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const HomeContent = sequelize.define('HomeContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  }
}, {
  tableName: 'home_contents',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['section'] }
  ]
});

export default HomeContent;
