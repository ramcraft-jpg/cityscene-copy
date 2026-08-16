import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING ABOUT PAGE API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/home-content', homeContentRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5097, async () => {
    try {
      // 1. Login as Admin
      const resLogin = await fetch('http://localhost:5097/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Token:', !!token);

      // 2. GET /api/home-content/about-hero
      const resHero = await fetch('http://localhost:5097/api/home-content/about-hero');
      const dataHero = await resHero.json();
      console.log('[GET /api/home-content/about-hero] Title:', dataHero.content?.title);

      // 3. PUT /api/home-content/about-hero
      const updatedHero = {
        ...dataHero.content,
        title: 'About CityScene Global'
      };
      const resPutHero = await fetch('http://localhost:5097/api/home-content/about-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: updatedHero })
      });
      const dataPutHero = await resPutHero.json();
      console.log('[PUT /api/home-content/about-hero] Success:', dataPutHero.message);

      // 4. GET /api/home-content/about-values
      const resVal = await fetch('http://localhost:5097/api/home-content/about-values');
      const dataVal = await resVal.json();
      console.log('[GET /api/home-content/about-values] Values count:', dataVal.content?.values?.length);

      // 5. PUT /api/home-content/about-values
      const updatedValues = {
        heading: 'Our Core Values',
        values: [
          ...dataVal.content.values,
          {
            id: 'excellence',
            title: 'Excellence',
            description: 'We strive for superior quality and continuous improvement.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            position: 'bottom-left'
          }
        ]
      };
      const resPutVal = await fetch('http://localhost:5097/api/home-content/about-values', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: updatedValues })
      });
      const dataPutVal = await resPutVal.json();
      console.log('[PUT /api/home-content/about-values] Success:', dataPutVal.message);

      // 6. Re-verify GET /api/home-content/about-values
      const resVal2 = await fetch('http://localhost:5097/api/home-content/about-values');
      const dataVal2 = await resVal2.json();
      console.log('[VERIFY DB UPDATE] New Values Count in DB:', dataVal2.content?.values?.length, 'Heading:', dataVal2.content?.heading);

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
