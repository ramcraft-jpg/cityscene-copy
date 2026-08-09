import Job from '../models/Job.js';
import { initialJobs } from '../services/seedService.js';

export const getJobs = async (req, res, next) => {
  try {
    let jobs = [];
    try {
      jobs = await Job.find({});
    } catch (dbErr) {
      console.warn('[Job Controller] DB fetch warning:', dbErr.message);
    }

    if (!jobs || jobs.length === 0) {
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
