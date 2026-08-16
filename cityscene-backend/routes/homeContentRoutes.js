import express from 'express';
import {
  getAllHomeContent,
  getHomeSectionContent,
  updateHomeSectionContent,
  uploadHomeMedia
} from '../controllers/homeContentController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { uploadMedia } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllHomeContent);
router.get('/:section', getHomeSectionContent);

// Private Admin routes
router.put('/:section', protectAdmin, updateHomeSectionContent);
router.post('/upload-media', protectAdmin, uploadMedia, uploadHomeMedia);

export default router;
