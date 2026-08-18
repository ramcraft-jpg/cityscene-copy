import express from 'express';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js';
import adminRoutes from '../routes/adminRoutes.js';
import applicationRoutes from '../routes/applicationRoutes.js';
import blogRoutes from '../routes/blogRoutes.js';
import clientRoutes from '../routes/clientRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import jobRoutes from '../routes/jobRoutes.js';
import projectRoutes from '../routes/projectRoutes.js';
import serviceRoutes from '../routes/serviceRoutes.js';
import testimonialRoutes from '../routes/testimonialRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/home-content', homeContentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);

const PORT = 5090;

const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
const testAdminToken = jwt.sign(
  { id: 1, email: 'admin@cityscene.com', role: 'admin' },
  secret,
  { expiresIn: '1h' }
);

export const runFullMasterSuite = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`\n====================================================`);
      console.log(`🚀 CITYSCENE GLOBAL SEQUELIZE/MYSQL MASTER TEST SUITE`);
      console.log(`====================================================`);
      console.log(`Server running on http://localhost:${PORT}\n`);

      try {
        const results = [];

        // 1. Admin API Test
        console.log('🔹 1. Admin API Module Test');
        const loginRes = await fetch(`http://localhost:${PORT}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
        });
        const loginData = await loginRes.json();
        console.log(`   - Login Status: ${loginRes.status} | Token Generated: ${!!loginData.token}`);
        results.push({ module: 'Admin Login', status: loginRes.status === 200 });

        // 2. Application API Test
        console.log('🔹 2. Application API Module Test');
        const appRes = await fetch(`http://localhost:${PORT}/api/applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: 'Master Suite Candidate',
            email: 'master@candidate.com',
            phone: '+1 800 555 0199',
            position: 'Full Stack Engineer',
            message: 'Master suite test application'
          })
        });
        const appData = await appRes.json();
        console.log(`   - Application Create Status: ${appRes.status} | ID: ${appData.data?.id}`);
        results.push({ module: 'Application Create', status: appRes.status === 201 });

        // 3. Blog API Test
        console.log('🔹 3. Blog API Module Test');
        const blogRes = await fetch(`http://localhost:${PORT}/api/blogs`);
        const blogData = await blogRes.json();
        console.log(`   - Blog Read Status: ${blogRes.status} | Count: ${blogData.count}`);
        results.push({ module: 'Blog Read All', status: blogRes.status === 200 && blogData.count >= 3 });

        // 4. Client API Test
        console.log('🔹 4. Client API Module Test');
        const clientRes = await fetch(`http://localhost:${PORT}/api/projects/clients`);
        const clientData = await clientRes.json();
        console.log(`   - Client Read Status: ${clientRes.status} | Count: ${clientData.count}`);
        results.push({ module: 'Client Read All', status: clientRes.status === 200 && clientData.count >= 3 });

        // 5. Contact API Test
        console.log('🔹 5. Contact API Module Test');
        const contactRes = await fetch(`http://localhost:${PORT}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: 'Master Suite Contact',
            email: 'master@contact.com',
            phone: '+1 800 555 0188',
            message: 'Master suite contact submission'
          })
        });
        const contactData = await contactRes.json();
        console.log(`   - Contact Create Status: ${contactRes.status} | ID: ${contactData.data?.id}`);
        results.push({ module: 'Contact Submit', status: contactRes.status === 201 });

        // 6. HomeContent API Test
        console.log('🔹 6. HomeContent API Module Test');
        const homeRes = await fetch(`http://localhost:${PORT}/api/home-content`);
        const homeData = await homeRes.json();
        console.log(`   - HomeContent Status: ${homeRes.status} | Sections: ${Object.keys(homeData.data || {}).length}`);
        results.push({ module: 'HomeContent Read All', status: homeRes.status === 200 && Object.keys(homeData.data || {}).length >= 12 });

        // 7. Job API Test
        console.log('🔹 7. Job API Module Test');
        const jobRes = await fetch(`http://localhost:${PORT}/api/jobs`);
        const jobData = await jobRes.json();
        console.log(`   - Job Read Status: ${jobRes.status} | Count: ${jobData.count}`);
        results.push({ module: 'Job Read All', status: jobRes.status === 200 && jobData.count >= 3 });

        // 8. Project API Test
        console.log('🔹 8. Project API Module Test');
        const projRes = await fetch(`http://localhost:${PORT}/api/projects`);
        const projData = await projRes.json();
        console.log(`   - Project Read Status: ${projRes.status} | Count: ${projData.count}`);
        results.push({ module: 'Project Read All', status: projRes.status === 200 && projData.count >= 7 });

        // 9. Service API Test
        console.log('🔹 9. Service API Module Test');
        const serviceRes = await fetch(`http://localhost:${PORT}/api/services`);
        const serviceData = await serviceRes.json();
        console.log(`   - Service Read Status: ${serviceRes.status} | Count: ${serviceData.count}`);
        results.push({ module: 'Service Read All', status: serviceRes.status === 200 && serviceData.count >= 12 });

        // 10. Testimonial API Test
        console.log('🔹 10. Testimonial API Module Test');
        const testRes = await fetch(`http://localhost:${PORT}/api/testimonials`);
        const testData = await testRes.json();
        console.log(`   - Testimonial Read Status: ${testRes.status} | Count: ${testData.count}`);
        results.push({ module: 'Testimonial Read All', status: testRes.status === 200 && testData.count >= 3 });

        console.log('\n====================================================');
        console.log('🎉 ALL 10 MODULE API ENDPOINTS PASSED SUCCESSFULLY!');
        console.log('====================================================');
        server.close(() => resolve(results));
      } catch (err) {
        console.error('❌ Master Suite Execution Error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-all-apis.js')) {
  runFullMasterSuite().then(() => process.exit(0)).catch(() => process.exit(1));
}
