import express from 'express';
import jwt from 'jsonwebtoken';
import contactRoutes from '../routes/contactRoutes.js';
import connectDB from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/api/contact', contactRoutes);

const PORT = 5095;

// Generate test admin token
const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
const testAdminToken = jwt.sign(
  { id: 1, email: 'admin@cityscene.com', role: 'admin' },
  secret,
  { expiresIn: '1h' }
);

export const runContactTests = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`🧪 Contact Test server listening on http://localhost:${PORT}`);
      try {
        const testContact = {
          fullName: 'Alexander Wright',
          email: 'alex.wright@enterprise.org',
          phone: '+1 415 889 1204',
          message: 'Interested in smart city digital infrastructure solutions for urban renewal project.'
        };

        // 1. Create Contact Inquiry (POST /api/contact)
        console.log('\n--- Test 1: POST /api/contact (Submit Contact Inquiry) ---');
        const createRes = await fetch(`http://localhost:${PORT}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testContact)
        });
        const createData = await createRes.json();
        console.log(`Status: ${createRes.status}`);
        console.log('Response:', createData);
        if (createRes.status !== 201 || !createData.success || !createData.data.id) {
          throw new Error('Create contact test failed!');
        }

        const createdId = createData.data.id;

        // 2. Read All Contacts (GET /api/contact as Admin)
        console.log('\n--- Test 2: GET /api/contact (Read All Contacts as Admin) ---');
        const getAllRes = await fetch(`http://localhost:${PORT}/api/contact`, {
          headers: { 'Authorization': `Bearer ${testAdminToken}` }
        });
        const getAllData = await getAllRes.json();
        console.log(`Status: ${getAllRes.status}`);
        console.log(`Count: ${getAllData.count}`);
        console.log('Sample Contact Names:', getAllData.data.map(c => c.fullName));
        if (getAllRes.status !== 200 || !getAllData.success || !Array.isArray(getAllData.data)) {
          throw new Error('Read all contacts test failed!');
        }

        // 3. Read Single Contact (GET /api/contact/:id as Admin)
        console.log(`\n--- Test 3: GET /api/contact/${createdId} (Read Single Contact) ---`);
        const getSingleRes = await fetch(`http://localhost:${PORT}/api/contact/${createdId}`, {
          headers: { 'Authorization': `Bearer ${testAdminToken}` }
        });
        const getSingleData = await getSingleRes.json();
        console.log(`Status: ${getSingleRes.status}`);
        console.log('Response FullName:', getSingleData.data?.fullName);
        if (getSingleRes.status !== 200 || !getSingleData.success || getSingleData.data.id !== createdId) {
          throw new Error('Read single contact test failed!');
        }

        // 4. Delete Contact Inquiry (DELETE /api/contact/:id as Admin)
        console.log(`\n--- Test 4: DELETE /api/contact/${createdId} (Delete Contact Inquiry) ---`);
        const deleteRes = await fetch(`http://localhost:${PORT}/api/contact/${createdId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${testAdminToken}` }
        });
        const deleteData = await deleteRes.json();
        console.log(`Status: ${deleteRes.status}`);
        console.log('Response:', deleteData);
        if (deleteRes.status !== 200 || !deleteData.success) {
          throw new Error('Delete contact test failed!');
        }

        console.log('\n✅ ALL CONTACT API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ Contact Test execution error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-contact-apis.js')) {
  runContactTests().then(() => process.exit(0)).catch(() => process.exit(1));
}
