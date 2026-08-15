import express from 'express';
import { adminLogin, adminRegister, getAdminProfile } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.post('/signup', adminRegister);

// Protected route for verifying admin token / fetching session profile
router.get('/me', protectAdmin, getAdminProfile);

export default router;

