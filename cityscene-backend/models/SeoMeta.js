import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const SeoMeta = sequelize.define('SeoMeta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pageKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pageName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pageGroup: {
    type: DataTypes.STRING, // 'main', 'service', 'blog', 'portfolio'
    allowNull: false,
    defaultValue: 'main'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'CityScene Global'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  keywords: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  canonicalUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  ogTitle: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  ogDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  ogImage: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  robots: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'index, follow'
  }
}, {
  tableName: 'seo_metas',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['pageKey'] },
    { fields: ['pageGroup'] }
  ]
});

export default SeoMeta;
