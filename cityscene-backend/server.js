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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Seed initial data
connectDB().then(() => {
  seedDatabase();
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'CityScene Backend API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/admin', adminRoutes);


app.use('/api/clients', (req, res) => {
  res.redirect(307, '/api/projects/clients');
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start listening
const server = app.listen(PORT, () => {
  console.log(`[CityScene Backend] Server running on http://localhost:${PORT}`);
});

export default app;
