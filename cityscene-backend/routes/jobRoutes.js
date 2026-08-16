import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Admin protected routes
router.post('/', protectAdmin, createJob);
router.put('/:id', protectAdmin, updateJob);
router.delete('/:id', protectAdmin, deleteJob);

export default router;
