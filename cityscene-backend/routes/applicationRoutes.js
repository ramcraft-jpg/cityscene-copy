import express from 'express';
import { createApplication, getApplications } from '../controllers/applicationController.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// GET /api/applications
router.get('/', getApplications);

// POST /api/applications
router.post('/', uploadResume, createApplication);

export default router;

