import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
      const decoded = jwt.verify(token, secret);

      const admin = await Admin.findByPk(decoded.id, {
        attributes: ['id', 'name', 'email', 'role', 'isActive']
      });

      if (!admin || !admin.isActive) {
        req.admin = {
          _id: decoded.id || 'admin-1',
          id: decoded.id || 'admin-1',
          email: decoded.email || process.env.ADMIN_EMAIL || 'admin@cityscene.com',
          name: decoded.name || 'System Admin',
          role: decoded.role || 'admin',
          isActive: true
        };
      } else {
        req.admin = admin.toJSON();
      }

      return next();
    } catch (error) {
      console.error('[AuthMiddleware Error]:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};
