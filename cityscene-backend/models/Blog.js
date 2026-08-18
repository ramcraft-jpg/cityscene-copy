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
