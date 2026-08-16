import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING CONTACT PAGE API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/home-content', homeContentRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5099, async () => {
    try {
      // 1. Admin login
      const resLogin = await fetch('http://localhost:5099/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Token:', !!token);

      // 2. GET & PUT Contact Details
      const resDetails = await fetch('http://localhost:5099/api/home-content/contact-details');
      const dataDetails = await resDetails.json();
      console.log('[GET /api/home-content/contact-details] Initial Email:', dataDetails.content?.email);

      const resPutDetails = await fetch('http://localhost:5099/api/home-content/contact-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: { ...dataDetails.content, email: 'contact@citysceneglobal.com' } })
      });
      const dataPutDetails = await resPutDetails.json();
      console.log('[PUT /api/home-content/contact-details] Result:', dataPutDetails.message);

      // 3. Public Visitor Form Submission POST /api/contact
      const formPayload = {
        fullName: 'Alex Mercer',
        email: 'alex.mercer@techfirm.io',
        phone: '+1-555-019823',
        message: 'Hello, we are interested in your AI enterprise transformation services for Q4.'
      };
      const resForm = await fetch('http://localhost:5099/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload)
      });
      const dataForm = await resForm.json();
      console.log('[POST /api/contact] Success:', dataForm.success, 'Message:', dataForm.message);
      const createdInquiryId = dataForm.data?._id;

      // 4. Admin GET /api/contact
      const resInquiries = await fetch('http://localhost:5099/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataInquiries = await resInquiries.json();
      console.log('[GET /api/contact] Admin Inquiries Count:', dataInquiries.count);

      // 5. Admin DELETE /api/contact/:id
      if (createdInquiryId) {
        const resDel = await fetch(`http://localhost:5099/api/contact/${createdInquiryId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataDel = await resDel.json();
        console.log('[DELETE /api/contact/:id] Result:', dataDel.message);
      }

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
