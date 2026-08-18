import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'jobs',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  resumePath: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  resumeOriginalName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'applications',
  timestamps: true
});

export default Application;
