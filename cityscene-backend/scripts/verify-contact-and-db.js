import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import { Contact } from '../models/Contact.js';
import contactRoutes from '../routes/contactRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/contact', contactRoutes);

const PORT = 5089;

export const runContactVerification = async () => {
  await connectDB();
  await seedDatabase();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`\n🧪 Contact & MySQL Verification listening on http://localhost:${PORT}`);
      try {
        const testTimestamp = Date.now();
        const contactPayload = {
          fullName: `Verifier Candidate ${testTimestamp}`,
          email: `verifier_${testTimestamp}@citysceneglobal.org`,
          phone: '+1 650 555 0199',
          message: 'Automated verification test of Contact submission saved in cityscene_global.contacts.'
        };

        // 1. Submit Contact Form via HTTP POST
        console.log('\n--- Step 1: Submitting Contact Form via HTTP POST /api/contact ---');
        const res = await fetch(`http://localhost:${PORT}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactPayload)
        });
        const data = await res.json();
        console.log(`HTTP Status: ${res.status}`);
        console.log('HTTP Response:', data);

        if (res.status !== 201 || !data.success || !data.data?.id) {
          throw new Error('Contact submission HTTP POST failed!');
        }

        const savedId = data.data.id;

        // 2. Direct MySQL Query via Sequelize Contact Model
        console.log('\n--- Step 2: Querying MySQL cityscene_global.contacts table for Record ---');
        const dbRecord = await Contact.findByPk(savedId);

        if (!dbRecord) {
          throw new Error(`Record with ID ${savedId} not found in MySQL cityscene_global.contacts table!`);
        }

        console.log('✅ Found Record in MySQL Database (cityscene_global.contacts):');
        console.log({
          id: dbRecord.id,
          fullName: dbRecord.fullName,
          email: dbRecord.email,
          phone: dbRecord.phone,
          message: dbRecord.message,
          createdAt: dbRecord.createdAt,
          updatedAt: dbRecord.updatedAt
        });

        if (dbRecord.email !== contactPayload.email.toLowerCase()) {
          throw new Error('Email mismatch in database record!');
        }

        console.log('\n====================================================');
        console.log('🎉 AUTOMATIC MYSQL CONNECTION & CONTACT PERSISTENCE VERIFIED!');
        console.log('====================================================');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ Verification Error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('verify-contact-and-db.js')) {
  runContactVerification().then(() => process.exit(0)).catch(() => process.exit(1));
}
