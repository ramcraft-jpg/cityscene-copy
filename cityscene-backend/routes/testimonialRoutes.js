import express from 'express';
import { getTestimonials } from '../controllers/testimonialController.js';

const router = express.Router();

// GET /api/testimonials
router.get('/', getTestimonials);

export default router;
