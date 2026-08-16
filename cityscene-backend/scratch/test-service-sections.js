import express from 'express';
import connectDB from '../config/db.js';
import serviceRoutes from '../routes/serviceRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING SERVICE DETAIL FULL SECTIONS SAVING ===');
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use('/api/services', serviceRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5200, async () => {
    try {
      const resLogin = await fetch('http://localhost:5200/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;

      const resPut = await fetch('http://localhost:5200/api/services/mobile-app-development', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          whyChooseTitle: 'Why Choose CityScene?',
          whyChooseCards: [
            { title: 'Native iOS & Android Speed', desc: 'Optimized C++ & Swift engine.' }
          ],
          expertiseTitle: 'Mobile App Engineering Mastery',
          expertiseItems: [
            { title: 'Swift & Kotlin Architecture', desc: 'Built for enterprise security.' }
          ],
          processTitle: 'Our Agile App Sprint Process',
          processSteps: [
            { title: 'Discovery & Wireframing', desc: 'Collaborative UX workshops.' }
          ],
          faqs: [
            { q: 'How long does app development take?', a: 'Typically 8 to 16 weeks depending on scale.' }
          ]
        })
      });
      const dataPut = await resPut.json();
      console.log('[PUT /api/services/:id] Result:', dataPut.message);

      const resGet = await fetch('http://localhost:5200/api/services/mobile-app-development');
      const dataGet = await resGet.json();
      console.log('[GET /api/services/:id] Why Choose Cards count:', dataGet.data?.whyChooseCards?.length);
      console.log('[GET /api/services/:id] Expertise Items count:', dataGet.data?.expertiseItems?.length);
      console.log('[GET /api/services/:id] Process Steps count:', dataGet.data?.processSteps?.length);
      console.log('[GET /api/services/:id] FAQs count:', dataGet.data?.faqs?.length);

      server.close();
      process.exit(0);
    } catch (err) {
      console.error(err);
      server.close();
      process.exit(1);
    }
  });
};

runTest();
