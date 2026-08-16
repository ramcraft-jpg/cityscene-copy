import express from 'express';
import connectDB from '../config/db.js';
import projectRoutes from '../routes/projectRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING PORTFOLIO CASE STUDY FULL SECTIONS SAVING ===');
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use('/api/projects', projectRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5300, async () => {
    try {
      const resProjects = await fetch('http://localhost:5300/api/projects');
      const dataProjects = await resProjects.json();
      const testProject = dataProjects.data[0];

      const resLogin = await fetch('http://localhost:5300/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;

      const resPut = await fetch(`http://localhost:5300/api/projects/${testProject.id || testProject.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titleSystem: 'HealthConnect Enterprise Suite',
          modulesTitle: 'Core HealthConnect Modules',
          capabilities: [
            { title: 'Patient Telemetry', description: 'Real-time vital signs monitoring.' }
          ],
          valuePropositions: [
            { title: 'HIPAA Compliant Architecture', description: 'Zero-trust cloud data security.' }
          ],
          executionTitle: 'Clinical Workflow Analytics',
          executionFeatures: [
            { title: 'Predictive Triage', description: 'AI-assisted emergency room queueing.' }
          ]
        })
      });
      const dataPut = await resPut.json();
      console.log('[PUT /api/projects/:id] Result:', dataPut.message);

      const resGet = await fetch(`http://localhost:5300/api/projects/${testProject.slug}`);
      const dataGet = await resGet.json();
      console.log('[GET /api/projects/:slug] Title System:', dataGet.data?.titleSystem);
      console.log('[GET /api/projects/:slug] Capabilities count:', dataGet.data?.capabilities?.length);
      console.log('[GET /api/projects/:slug] Value Props count:', dataGet.data?.valuePropositions?.length);
      console.log('[GET /api/projects/:slug] Execution Features count:', dataGet.data?.executionFeatures?.length);

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
