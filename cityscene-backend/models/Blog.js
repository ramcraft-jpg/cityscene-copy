import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Blog = sequelize.define('Blog', {
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
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  readTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  video: {
    type: DataTypes.STRING,
    defaultValue: ''
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
  author: {
    type: DataTypes.STRING,
    defaultValue: 'CityScene Tech Team'
  },
  authorAvatar: {
    type: DataTypes.STRING,
    defaultValue: '/assets/images/author-vishwambhar.png'
  },
  authorRole: {
    type: DataTypes.STRING,
    defaultValue: 'Senior Tech Lead & Solution Architect'
  },
  authorBio: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  blocks: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  ctaHeading: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  ctaDescription: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  ctaButtonText: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  ctaButtonLink: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  seoTitle: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  seoDescription: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  focusKeyword: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  seoKeywords: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  canonicalUrl: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  ogTitle: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  ogDescription: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  ogImage: {
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
  tableName: 'blogs',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['slug'] },
    { fields: ['category'] },
    { fields: ['isActive'] }
  ]
});

export default Blog;
