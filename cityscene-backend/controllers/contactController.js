import Contact from '../models/Contact.js';

export const createContact = async (req, res, next) => {
  try {
    const { fullName, email, phone, message } = req.body;

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

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    let savedContact = null;
    try {
      savedContact = await Contact.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message.trim()
      });
    } catch (dbErr) {
      console.warn('[Contact Controller] DB Save Warning:', dbErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting CityScene Global. Our team will get back to you shortly.',
      data: savedContact || { fullName, email, phone, message }
    });
  } catch (error) {
    next(error);
  }
};
