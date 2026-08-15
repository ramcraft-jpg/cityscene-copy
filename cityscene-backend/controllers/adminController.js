import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

/**
 * @desc    Authenticate Admin & get token
 * @route   POST /api/admin/login
 * @access  Public
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Find admin by email
    const admin = await Admin.findOne({ email: cleanEmail });

    // 2. Check if admin exists
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 3. Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 4. Compare password securely
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 5. Generate JWT token
    const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      secret,
      { expiresIn: '7d' }
    );

    // 6. Return authentication result
    return res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('[Admin Login Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

/**
 * @desc    Register a new Admin & get token
 * @route   POST /api/admin/register
 * @access  Public
 */
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: cleanEmail });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'An admin with this email already exists.'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    // Generate token
    const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    console.error('[Admin Register Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration.'
    });
  }
};

/**
 * @desc    Get logged in admin details
 * @route   GET /api/admin/me
 * @access  Private (Admin)
 */
export const getAdminProfile = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        isActive: req.admin.isActive
      }
    });
  } catch (error) {
    console.error('[Admin Profile Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving admin profile'
    });
  }
};

