import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db.js';
import { seedDatabase } from './services/seedService.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import contactRoutes from './routes/contactRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import homeContentRoutes from './routes/homeContentRoutes.js';
import seoMetaRoutes from './routes/seoMetaRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Environment-aware CORS configuration
const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman, same-origin)
    if (!origin || allowedOrigin === '*' || allowedOrigin === origin || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy error: Origin ${origin} is not allowed.`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')), (req, res) => {
  res.status(404).json({ success: false, message: 'Uploaded file not found' });
});

// Health Check API for Flash API monitor
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'CityScene Universal Flash API Backend',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Universal Flash API Route Registrations & Aliases
app.use('/api/contact', contactRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', projectRoutes); // Alias for Flash API portfolio endpoints
app.use('/api/jobs', jobRoutes);
app.use('/api/career', jobRoutes); // Alias for Flash API career endpoints
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', adminRoutes); // Alias for Flash API auth endpoints
app.use('/api/home-content', homeContentRoutes);
app.use('/api/home', homeContentRoutes); // Alias for Flash API home endpoints
app.use('/api/clients', clientRoutes);
app.use('/api/seo', seoMetaRoutes);
app.use('/api/uploads', uploadRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize Database connection, Seed datasets, then Start Express Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`[CityScene Flash API] Server running on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
    });
  } catch (error) {
    console.error('❌ Failed to start CityScene Flash API server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
