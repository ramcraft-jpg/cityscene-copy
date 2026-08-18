import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'clients',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortDesc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fullDesc: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  services: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  technologies: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  keyFeatures: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  liveLink: {
    type: DataTypes.STRING,
    defaultValue: '#'
  },
  video: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  heroImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  backgroundMediaType: {
    type: DataTypes.STRING,
    defaultValue: 'image'
  },
  backgroundImage: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  backgroundVideo: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  heroVideo: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  titleSystem: {
    type: DataTypes.STRING,
    allowNull: true
  },
  systemOverview: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  modulesTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  summaryNote: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  capabilities: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  valuePropositions: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  executionTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  executionFeatures: {
    type: DataTypes.JSON,
    defaultValue: []
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
  tableName: 'projects',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['slug'] },
    { fields: ['category'] },
    { fields: ['isActive'] }
  ]
});

export default Project;
