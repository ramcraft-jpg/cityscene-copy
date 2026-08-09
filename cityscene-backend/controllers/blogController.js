import Blog from '../models/Blog.js';
import { initialBlogs } from '../services/seedService.js';

export const getBlogs = async (req, res, next) => {
  try {
    let blogs = [];
    try {
      blogs = await Blog.find({}).sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn('[Blog Controller] DB fetch warning:', dbErr.message);
    }

    if (!blogs || blogs.length === 0) {
      blogs = initialBlogs;
    }

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Blog slug parameter is required.' });
    }

    let blog = null;
    try {
      blog = await Blog.findOne({
        $or: [
          { slug: slug.toLowerCase() },
          { id: slug }
        ]
      });
    } catch (dbErr) {
      console.warn('[Blog Controller] DB slug lookup warning:', dbErr.message);
    }

    if (!blog) {
      blog = initialBlogs.find(
        (b) => b.slug.toLowerCase() === slug.toLowerCase() || b.id === slug
      );
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }

    return res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};
