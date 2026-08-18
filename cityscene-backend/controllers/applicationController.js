import { Application } from '../models/Application.js';

export const createApplication = async (req, res, next) => {
  try {
    const { fullName, email, phone, position, message } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'Full Name is required.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    if (!position || !position.trim() || position === 'Select Position') {
      return res.status(400).json({ success: false, message: 'Please select a position.' });
    }

    const resumeFile = req.file;

    const savedApp = await Application.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      message: message ? message.trim() : '',
      resumePath: resumeFile ? `/uploads/${resumeFile.filename}` : null,
      resumeOriginalName: resumeFile ? resumeFile.originalname : null
    });

    return res.status(201).json({
      success: true,
      message: 'Your application has been submitted successfully! Our HR team will get in touch with you shortly.',
      data: savedApp
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.findAll({
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    return res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    await application.destroy();

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
