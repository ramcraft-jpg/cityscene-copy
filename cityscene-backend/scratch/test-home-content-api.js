import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';
import HomeContent from '../models/HomeContent.js';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING HOME CONTENT API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/home-content', homeContentRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5099, async () => {
    try {
      // 1. GET /api/home-content
      const resAll = await fetch('http://localhost:5099/api/home-content');
      const dataAll = await resAll.json();
      console.log('[GET /api/home-content] Success:', dataAll.success, 'Sections count:', Object.keys(dataAll.data).length);

      // 2. GET /api/home-content/hero
      const resHero = await fetch('http://localhost:5099/api/home-content/hero');
      const dataHero = await resHero.json();
      console.log('[GET /api/home-content/hero] Success:', dataHero.success, 'Slides:', dataHero.content.slides?.length);

      // 3. Login to get token
      const resLogin = await fetch('http://localhost:5099/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      console.log('[POST /api/admin/login] Authenticated token:', !!dataLogin.token);

      // 4. PUT /api/home-content/hero
      const updatedHero = {
        ...dataHero.content,
        button1Text: 'Explore About'
      };
      const resPut = await fetch('http://localhost:5099/api/home-content/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dataLogin.token}`
        },
        body: JSON.stringify({ content: updatedHero })
      });
      const dataPut = await resPut.json();
      console.log('[PUT /api/home-content/hero] Message:', dataPut.message);

      // 5. Re-fetch GET /api/home-content/hero to verify DB update
      const resHero2 = await fetch('http://localhost:5099/api/home-content/hero');
      const dataHero2 = await resHero2.json();
      console.log('[VERIFY DB UPDATE] Button 1 Text in DB:', dataHero2.content.button1Text);

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
