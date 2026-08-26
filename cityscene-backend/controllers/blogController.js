import { Op } from 'sequelize';
import { Blog } from '../models/Blog.js';
import { initialBlogs } from '../services/seedService.js';

/**
 * Ensure seed blogs exist in MySQL database
 */
const ensureSeedBlogs = async () => {
  try {
    if (!initialBlogs || initialBlogs.length === 0) return;
    const count = await Blog.count();
    if (count === 0) {
      await Blog.bulkCreate(initialBlogs);
    }
  } catch (error) {
    console.error('[Blog Seed Sync Error]:', error.message);
  }
};

/**
 * @desc    Get all blog articles (Public / Admin)
 * @route   GET /api/blogs
 * @access  Public (if all=true, returns draft/inactive blogs too for admin)
 */
export const getBlogs = async (req, res, next) => {
  try {
    await ensureSeedBlogs();
    const showAll = req.query.all === 'true';
    const category = req.query.category;

    const whereClause = {};
    if (!showAll) {
      whereClause.isActive = true;
    }
    if (category) {
      whereClause.category = category.trim();
    }

    const blogs = await Blog.findAll({
      where: whereClause,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single blog post by slug or ID
 * @route   GET /api/blogs/:slug
 * @access  Public
 */
export const getBlogBySlug = async (req, res, next) => {
  try {
    await ensureSeedBlogs();
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Blog slug parameter is required.' });
    }

    const cleanSlug = slug.trim().toLowerCase();
    const blog = await Blog.findOne({
      where: {
        [Op.or]: [
          { slug: cleanSlug },
          { id: slug.trim() }
        ]
      }
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: `Blog post with slug '${slug}' not found.` });
    }

    return res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new blog article
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
export const createBlog = async (req, res, next) => {
  try {
    await ensureSeedBlogs();
    const { title, id, slug, category, summary, content, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Blog title is required.' });
    }

    const blogId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const blogSlug = (slug || blogId).trim().toLowerCase();

    const existingBlog = await Blog.findOne({
      where: {
        [Op.or]: [
          { id: blogId },
          { slug: blogSlug }
        ]
      }
    });

    if (existingBlog) {
      return res.status(400).json({ success: false, message: `A blog post with ID or Slug '${blogSlug}' already exists.` });
    }

    const newBlog = await Blog.create({
      ...req.body,
      id: blogId,
      slug: blogSlug,
      title: title.trim(),
      category: (category || 'Artificial Intelligence').trim(),
      date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: req.body.readTime || '5 min read',
      image: image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      summary: (summary || 'Insightful analysis by CityScene Global engineering team.').trim(),
      content: (content || summary || 'Full article content text goes here.').trim(),
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully.',
      data: newBlog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing blog post
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */
export const updateBlog = async (req, res, next) => {
  try {
    await ensureSeedBlogs();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const blog = await Blog.findOne({
      where: {
        [Op.or]: [
          { id: cleanId },
          { slug: cleanId }
        ]
      }
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: `Blog with ID '${id}' not found.` });
    }

    await blog.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully.',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete blog post
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
export const deleteBlog = async (req, res, next) => {
  try {
    await ensureSeedBlogs();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const blog = await Blog.findOne({
      where: {
        [Op.or]: [
          { id: cleanId },
          { slug: cleanId }
        ]
      }
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: `Blog with ID '${id}' not found.` });
    }

    await blog.destroy();

    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
