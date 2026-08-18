import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  displayTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    defaultValue: 'bottom-left'
  },
  shortDesc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  topicName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  heroDesc: {
    type: DataTypes.TEXT,
    allowNull: true
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
  introP1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  introP2: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  whyChooseTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  whyChooseSubtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  whyChooseCards: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  expertiseTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expertiseSubtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expertiseItems: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  processTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  processSteps: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  faqs: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  video: {
    type: DataTypes.STRING,
    defaultValue: ''
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
  tableName: 'services',
  timestamps: true,
  indexes: [
    { fields: ['path'] },
    { fields: ['isActive'] }
  ]
});

export default Service;
