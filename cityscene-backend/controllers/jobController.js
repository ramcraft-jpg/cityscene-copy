import Job from '../models/Job.js';
import { initialJobs } from '../services/seedService.js';

/**
 * @desc    Get all job openings (Public / Admin)
 * @route   GET /api/jobs
 * @access  Public (if all=true, returns inactive jobs too for admin)
 */
export const getJobs = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: { $ne: false } };
    let jobs = await Job.find(filter).sort({ order: 1, createdAt: 1 });

    if (!jobs || jobs.length === 0) {
      // Fallback seed if DB is empty
      jobs = initialJobs;
    }

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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Job ID parameter is required.' });
    }

    const cleanId = id.trim().toLowerCase();
    const job = await Job.findOne({
      $or: [{ id: cleanId }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

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
    const { title, id, description, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Job title is required.' });
    }

    const jobId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();

    const existingJob = await Job.findOne({ id: jobId });
    if (existingJob) {
      return res.status(400).json({ success: false, message: `A job with ID '${jobId}' already exists.` });
    }

    const newJob = await Job.create({
      ...req.body,
      id: jobId,
      title: title.trim(),
      description: (description || 'Join our team and build the future of technology with us.').trim(),
      image: image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
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
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const job = await Job.findOne({
      $or: [{ id: cleanId }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!job) {
      return res.status(404).json({ success: false, message: `Job with ID '${id}' not found.` });
    }

    Object.assign(job, req.body);
    const updatedJob = await job.save();

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully.',
      data: updatedJob
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
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const job = await Job.findOneAndDelete({
      $or: [{ id: cleanId }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!job) {
      return res.status(404).json({ success: false, message: `Job with ID '${id}' not found.` });
    }

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
