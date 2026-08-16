import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import serviceRoutes from '../routes/serviceRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING SERVICES CRUD API INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/services', serviceRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5098, async () => {
    try {
      // 1. GET /api/services
      const resGet = await fetch('http://localhost:5098/api/services');
      const dataGet = await resGet.json();
      console.log('[GET /api/services] Count:', dataGet.count);

      // 2. Login as admin
      const resLogin = await fetch('http://localhost:5098/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Authenticated:', !!token);

      // 3. POST /api/services (Create new test service)
      const newServicePayload = {
        title: 'Quantum Computing Solutions',
        id: 'quantum-computing-solutions',
        displayTitle: 'Quantum Computing Services',
        shortDesc: 'Next-gen quantum processing and algorithm acceleration.',
        position: 'top-left',
        order: 99,
        isActive: true
      };
      const resPost = await fetch('http://localhost:5098/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newServicePayload)
      });
      const dataPost = await resPost.json();
      console.log('[POST /api/services] Success:', dataPost.success, 'Created ID:', dataPost.data?.id);

      // 4. PUT /api/services/:id (Update service)
      const resPut = await fetch('http://localhost:5098/api/services/quantum-computing-solutions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Advanced Quantum Computing' })
      });
      const dataPut = await resPut.json();
      console.log('[PUT /api/services/:id] Success:', dataPut.success, 'Updated Title:', dataPut.data?.title);

      // 5. DELETE /api/services/:id (Delete created service)
      const resDel = await fetch('http://localhost:5098/api/services/quantum-computing-solutions', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dataDel = await resDel.json();
      console.log('[DELETE /api/services/:id] Message:', dataDel.message);

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
