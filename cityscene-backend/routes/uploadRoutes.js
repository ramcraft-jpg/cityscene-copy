import express from 'express';
import { uploadMedia } from '../middleware/uploadMiddleware.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @desc    Universal Flash API media file upload
 * @route   POST /api/uploads
 * @access  Private (Admin)
 */
router.post('/', protectAdmin, uploadMedia, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file was uploaded.'
      });
    }

    const relativePath = `/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: 'Media uploaded successfully via Flash API.',
      fileUrl: relativePath,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    console.error('[Upload Flash API Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'File upload failed.'
    });
  }
});

export default router;
