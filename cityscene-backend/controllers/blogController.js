import Blog from '../models/Blog.js';

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
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

    const blog = await Blog.findOne({
      $or: [
        { slug: slug.toLowerCase() },
        { id: slug }
      ]
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
