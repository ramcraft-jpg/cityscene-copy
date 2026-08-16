import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  getClients,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/clients', getClients);
router.get('/:slug', getProjectBySlug);

// Admin protected routes
router.post('/', protectAdmin, createProject);
router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
