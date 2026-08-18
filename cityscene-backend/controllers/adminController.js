import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

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
    const envEmail = (process.env.ADMIN_EMAIL || 'admin@cityscene.com').toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD || 'Admin@cityscene2025';

    let targetAdmin = await Admin.findOne({ where: { email: cleanEmail } });

    if (targetAdmin) {
      const isMatch = await bcrypt.compare(password, targetAdmin.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }
    } else if (cleanEmail === envEmail) {
      const isMatch = password === envPassword || await bcrypt.compare(password, await bcrypt.hash(envPassword, 10));
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const hashedPassword = await bcrypt.hash(envPassword, 10);
      [targetAdmin] = await Admin.findOrCreate({
        where: { email: envEmail },
        defaults: {
          name: 'System Admin',
          email: envEmail,
          password: hashedPassword,
          role: 'admin',
          isActive: true
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (!targetAdmin || !targetAdmin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
    const token = jwt.sign(
      { id: targetAdmin.id, email: targetAdmin.email, role: targetAdmin.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      admin: {
        id: targetAdmin.id,
        name: targetAdmin.name,
        email: targetAdmin.email,
        role: targetAdmin.role
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
    const existing = await Admin.findOne({ where: { email: cleanEmail } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An admin with this email already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
    const token = jwt.sign(
      { id: newAdmin.id, email: newAdmin.email, role: newAdmin.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: {
        id: newAdmin.id,
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

    const admin = await Admin.findByPk(req.admin.id, {
      attributes: ['id', 'name', 'email', 'role', 'isActive']
    });

    const targetAdmin = admin || req.admin;

    return res.status(200).json({
      success: true,
      admin: {
        id: targetAdmin.id,
        name: targetAdmin.name,
        email: targetAdmin.email,
        role: targetAdmin.role,
        isActive: targetAdmin.isActive
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
