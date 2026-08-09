import express from 'express';
import { getBlogs, getBlogBySlug } from '../controllers/blogController.js';

const router = express.Router();

// GET /api/blogs
router.get('/', getBlogs);

// GET /api/blogs/:slug
router.get('/:slug', getBlogBySlug);

export default router;
