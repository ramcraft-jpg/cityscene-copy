import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  displayTitle: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cardImage: {
    type: DataTypes.TEXT,
    allowNull: true
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
    type: DataTypes.TEXT,
    allowNull: true
  },
  heroDesc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  heroImage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contentImage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  backgroundMediaType: {
    type: DataTypes.STRING,
    defaultValue: 'image'
  },
  backgroundImage: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  backgroundVideo: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  heroVideo: {
    type: DataTypes.TEXT,
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
    type: DataTypes.TEXT,
    allowNull: true
  },
  whyChooseSubtitle: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  whyChooseImage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  whyChooseUsBackgroundImage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  whyChooseCards: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  whyChooseBottomText: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  expertiseTitle: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  expertiseSubtitle: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  expertiseItems: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  processTitle: {
    type: DataTypes.TEXT,
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
  industriesTitle: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  industriesSubtitle: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  industriesGridCols: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  industries: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  ctaHeading: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ctaDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ctaButtonText: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ctaButtonLink: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  video: {
    type: DataTypes.TEXT,
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
