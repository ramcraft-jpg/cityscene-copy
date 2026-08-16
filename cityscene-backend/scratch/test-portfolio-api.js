import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import projectRoutes from '../routes/projectRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING PORTFOLIO PAGE API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/home-content', homeContentRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5097, async () => {
    try {
      // 1. Admin login
      const resLogin = await fetch('http://localhost:5097/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Token:', !!token);

      // 2. GET & PUT Portfolio Hero
      const resHero = await fetch('http://localhost:5097/api/home-content/portfolio-hero');
      const dataHero = await resHero.json();
      console.log('[GET /api/home-content/portfolio-hero] Title:', dataHero.content?.title);

      const resPutHero = await fetch('http://localhost:5097/api/home-content/portfolio-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: { ...dataHero.content, title: 'Engineering High Impact Projects' } })
      });
      const dataPutHero = await resPutHero.json();
      console.log('[PUT /api/home-content/portfolio-hero] Result:', dataPutHero.message);

      // 3. GET /api/projects
      const resProjects = await fetch('http://localhost:5097/api/projects');
      const dataProjects = await resProjects.json();
      console.log('[GET /api/projects] Initial Projects Count:', dataProjects.count);

      // 4. POST /api/projects
      const newProjPayload = {
        title: 'Quantum Financial Core',
        id: 'quantum-financial-core',
        slug: 'quantum-financial-core',
        category: 'Fintech & Blockchain',
        client: 'Apex Capital',
        duration: '12 Months',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        shortDesc: 'Next-gen high frequency algorithmic transaction processing platform.',
        fullDesc: 'Complete case study architecture for Quantum Financial Core.'
      };
      const resPostProj = await fetch('http://localhost:5097/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProjPayload)
      });
      const dataPostProj = await resPostProj.json();
      console.log('[POST /api/projects] Success:', dataPostProj.success, 'Created Project:', dataPostProj.data?.title);

      // 5. DELETE /api/projects/:id
      const resDelProj = await fetch('http://localhost:5097/api/projects/quantum-financial-core', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataDelProj = await resDelProj.json();
      console.log('[DELETE /api/projects/:id] Result:', dataDelProj.message);

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
