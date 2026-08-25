import express from 'express';
import {
  getAllSeoMeta,
  getSeoMetaByPageKey,
  updateSeoMeta,
  deleteSeoMeta
} from '../controllers/seoMetaController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes for fetching SEO
router.get('/', getAllSeoMeta);
router.get('/:pageKey', getSeoMetaByPageKey);

// Protected routes for modifying SEO
router.put('/:pageKey', protectAdmin, updateSeoMeta);
router.post('/', protectAdmin, updateSeoMeta);
router.delete('/:pageKey', protectAdmin, deleteSeoMeta);

export default router;
