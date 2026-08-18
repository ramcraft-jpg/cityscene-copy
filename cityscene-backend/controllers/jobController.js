import { Job } from '../models/Job.js';
import { initialJobs } from '../services/seedService.js';

/**
 * Ensure seed jobs exist in MySQL database
 */
const ensureSeedJobs = async () => {
  try {
    const count = await Job.count();
    if (count === 0 && initialJobs && initialJobs.length > 0) {
      await Job.bulkCreate(initialJobs, { ignoreDuplicates: true });
    }
  } catch (error) {
    console.error('[Job Seed Sync Error]:', error.message);
  }
};

/**
 * @desc    Get all job openings (Public / Admin)
 * @route   GET /api/jobs
 * @access  Public (if all=true, returns inactive jobs too for admin)
 */
export const getJobs = async (req, res, next) => {
  try {
    await ensureSeedJobs();
    const showAll = req.query.all === 'true';

    const whereClause = {};
    if (!showAll) {
      whereClause.isActive = true;
    }

    const jobs = await Job.findAll({
      where: whereClause,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single job by ID or slug
 * @route   GET /api/jobs/:id
 * @access  Public
 */
export const getJobById = async (req, res, next) => {
  try {
    await ensureSeedJobs();
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Job ID parameter is required.' });
    }

    const cleanId = id.trim().toLowerCase();
    const job = await Job.findByPk(cleanId);

    if (!job) {
      return res.status(404).json({ success: false, message: `Job with ID '${id}' not found.` });
    }

    return res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new job opening
 * @route   POST /api/jobs
 * @access  Private (Admin)
 */
export const createJob = async (req, res, next) => {
  try {
    await ensureSeedJobs();
    const { title, id, description, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Job title is required.' });
    }

    const jobId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();

    const existingJob = await Job.findByPk(jobId);
    if (existingJob) {
      return res.status(400).json({ success: false, message: `A job with ID '${jobId}' already exists.` });
    }

    const newJob = await Job.create({
      ...req.body,
      id: jobId,
      title: title.trim(),
      description: (description || 'Join our team and build the future of technology with us.').trim(),
      image: image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      location: req.body.location || 'Bengaluru, India',
      type: req.body.type || 'Full Time',
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully.',
      data: newJob
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing job opening
 * @route   PUT /api/jobs/:id
 * @access  Private (Admin)
 */
export const updateJob = async (req, res, next) => {
  try {
    await ensureSeedJobs();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const job = await Job.findByPk(cleanId);

    if (!job) {
      return res.status(404).json({ success: false, message: `Job with ID '${id}' not found.` });
    }

    await job.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully.',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete job opening
 * @route   DELETE /api/jobs/:id
 * @access  Private (Admin)
 */
export const deleteJob = async (req, res, next) => {
  try {
    await ensureSeedJobs();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const job = await Job.findByPk(cleanId);

    if (!job) {
      return res.status(404).json({ success: false, message: `Job with ID '${id}' not found.` });
    }

    await job.destroy();

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
