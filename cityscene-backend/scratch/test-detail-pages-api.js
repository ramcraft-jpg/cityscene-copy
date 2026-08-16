import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import serviceRoutes from '../routes/serviceRoutes.js';
import blogRoutes from '../routes/blogRoutes.js';
import projectRoutes from '../routes/projectRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING INDIVIDUAL DETAIL PAGES API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/services', serviceRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5100, async () => {
    try {
      // 1. Admin login
      const resLogin = await fetch('http://localhost:5100/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Token:', !!token);

      // 2. Test Service Detail Page update
      const resPutService = await fetch('http://localhost:5100/api/services/mobile-app-development', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          displayTitle: 'Enterprise iOS & Android Mobile Engineering',
          heroDesc: 'Next-generation mobile applications built for global scale.',
          introP1: 'At CityScene Global, we architect robust, high-performance mobile software.'
        })
      });
      const dataPutService = await resPutService.json();
      console.log('[PUT /api/services/:id] Result:', dataPutService.message);

      const resGetService = await fetch('http://localhost:5100/api/services/mobile-app-development');
      const dataGetService = await resGetService.json();
      console.log('[GET /api/services/:id] Display Title:', dataGetService.data?.displayTitle);

      // 3. Test Blog Detail Page update
      const resBlogs = await fetch('http://localhost:5100/api/blogs');
      const dataBlogs = await resBlogs.json();
      const testBlog = dataBlogs.data[0];

      const resPutBlog = await fetch(`http://localhost:5100/api/blogs/${testBlog.id || testBlog.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Architecting Autonomous AI Systems in 2025',
          content: 'Updated full body content for Autonomous AI Systems in 2025.'
        })
      });
      const dataPutBlog = await resPutBlog.json();
      console.log('[PUT /api/blogs/:id] Result:', dataPutBlog.message);

      const resGetBlog = await fetch(`http://localhost:5100/api/blogs/${testBlog.slug}`);
      const dataGetBlog = await resGetBlog.json();
      console.log('[GET /api/blogs/:slug] Updated Title:', dataGetBlog.data?.title);

      // 4. Test Portfolio Detail Page update
      const resProjects = await fetch('http://localhost:5100/api/projects');
      const dataProjects = await resProjects.json();
      const testProject = dataProjects.data[0];

      const resPutProject = await fetch(`http://localhost:5100/api/projects/${testProject.id || testProject.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Next-Gen Smart City Surveillance & Edge AI',
          technologies: ['Python', 'PyTorch', 'TensorRT', 'WebSockets'],
          systemOverview: ['Comprehensive real-time edge processing for municipal security networks.']
        })
      });
      const dataPutProject = await resPutProject.json();
      console.log('[PUT /api/projects/:id] Result:', dataPutProject.message);

      const resGetProject = await fetch(`http://localhost:5100/api/projects/${testProject.slug}`);
      const dataGetProject = await resGetProject.json();
      console.log('[GET /api/projects/:slug] Updated Title:', dataGetProject.data?.title);

      server.close();
      process.exit(0);
    } catch (err) {
      console.error('Test error:', err);
      server.close();
      process.exit(1);
    }
  });
};

runTest();
