import express from 'express';
import { getJobs } from '../controllers/jobController.js';

const router = express.Router();

// GET /api/jobs
router.get('/', getJobs);

export default router;
