import express from 'express';
import { createContact, getContacts, deleteContact } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for form submission
router.post('/', createContact);

// Admin protected routes for reviewing inquiries
router.get('/', protectAdmin, getContacts);
router.delete('/:id', protectAdmin, deleteContact);

export default router;
