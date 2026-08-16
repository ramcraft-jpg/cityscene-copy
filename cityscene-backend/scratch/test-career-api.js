import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import jobRoutes from '../routes/jobRoutes.js';
import applicationRoutes from '../routes/applicationRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING CAREER PAGE API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/home-content', homeContentRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5096, async () => {
    try {
      // 1. Admin login
      const resLogin = await fetch('http://localhost:5096/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Token:', !!token);

      // 2. GET & PUT Career Hero
      const resHero = await fetch('http://localhost:5096/api/home-content/career-hero');
      const dataHero = await resHero.json();
      console.log('[GET /api/home-content/career-hero] Title:', dataHero.content?.title);

      const resPutHero = await fetch('http://localhost:5096/api/home-content/career-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: { ...dataHero.content, title: 'Build the Future With Us' } })
      });
      const dataPutHero = await resPutHero.json();
      console.log('[PUT /api/home-content/career-hero] Result:', dataPutHero.message);

      // 3. GET /api/jobs
      const resJobs = await fetch('http://localhost:5096/api/jobs');
      const dataJobs = await resJobs.json();
      console.log('[GET /api/jobs] Initial Jobs Count:', dataJobs.count);

      // 4. POST /api/jobs
      const newJobPayload = {
        title: 'AI Robotics Engineer',
        id: 'ai-robotics-engineer',
        description: 'Design autonomous robotics workflows and smart AI agents.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        location: 'Bengaluru, India',
        type: 'Full Time'
      };
      const resPostJob = await fetch('http://localhost:5096/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newJobPayload)
      });
      const dataPostJob = await resPostJob.json();
      console.log('[POST /api/jobs] Success:', dataPostJob.success, 'Created Job:', dataPostJob.data?.title);

      // 5. DELETE /api/jobs/:id
      const resDelJob = await fetch('http://localhost:5096/api/jobs/ai-robotics-engineer', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataDelJob = await resDelJob.json();
      console.log('[DELETE /api/jobs/:id] Result:', dataDelJob.message);

      // 6. GET /api/applications
      const resApps = await fetch('http://localhost:5096/api/applications');
      const dataApps = await resApps.json();
      console.log('[GET /api/applications] Candidate Applications Count:', dataApps.count);

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
