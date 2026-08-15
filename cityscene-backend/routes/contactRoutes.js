import express from 'express';
import { createContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// GET /api/contact
router.get('/', getContacts);

// POST /api/contact
router.post('/', createContact);

export default router;

