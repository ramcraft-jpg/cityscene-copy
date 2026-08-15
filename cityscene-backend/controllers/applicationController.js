import Application from '../models/Application.js';

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
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    if (!position || !position.trim() || position === 'Select Position') {
      return res.status(400).json({ success: false, message: 'Please select a position.' });
    }

    const resumeFile = req.file;

    let savedApp = null;
    try {
      savedApp = await Application.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        position: position.trim(),
        message: message ? message.trim() : '',
        resumePath: resumeFile ? `/uploads/${resumeFile.filename}` : null,
        resumeOriginalName: resumeFile ? resumeFile.originalname : null
      });
    } catch (dbErr) {
      console.warn('[Application Controller] DB Save Warning:', dbErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Your application has been submitted successfully! Our HR team will get in touch with you shortly.',
      data: savedApp || {
        fullName,
        email,
        phone,
        position,
        message,
        resumeName: resumeFile ? resumeFile.originalname : null
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

