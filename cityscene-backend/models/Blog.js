import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true
    },
    readTime: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    video: {
      type: String,
      default: ''
    },
    backgroundMediaType: {
      type: String,
      default: 'image'
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundVideo: {
      type: String,
      default: ''
    },
    heroVideo: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: 'CityScene Tech Team'
    },
    authorAvatar: {
      type: String,
      default: '/assets/images/author-vishwambhar.png'
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
