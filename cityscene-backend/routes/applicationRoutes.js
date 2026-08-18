import express from 'express';
import { createApplication, getApplications, getApplicationById, deleteApplication } from '../controllers/applicationController.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// GET /api/applications
router.get('/', getApplications);

// GET /api/applications/:id
router.get('/:id', getApplicationById);

// POST /api/applications
router.post('/', uploadResume, createApplication);

// DELETE /api/applications/:id
router.delete('/:id', deleteApplication);

export default router;
