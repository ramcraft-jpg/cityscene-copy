import express from 'express';
import { createApplication } from '../controllers/applicationController.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// POST /api/applications
router.post('/', uploadResume, createApplication);

export default router;
