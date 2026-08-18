import express from 'express';
import http from 'http';
import adminRoutes from '../routes/adminRoutes.js';
import connectDB from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/api/admin', adminRoutes);

const PORT = 5099;

export const runAdminTests = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`🧪 Test server listening on http://localhost:${PORT}`);
      try {
        const testTimestamp = Date.now();
        const testAdmin = {
          name: 'Test Engineer Admin',
          email: `testadmin_${testTimestamp}@cityscene.com`,
          password: 'Password123!'
        };

        // 1. Test POST /api/admin/register
        console.log('\n--- Test 1: POST /api/admin/register ---');
        const regRes = await fetch(`http://localhost:${PORT}/api/admin/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testAdmin)
        });
        const regData = await regRes.json();
        console.log(`Status: ${regRes.status}`);
        console.log('Response:', regData);
        if (regRes.status !== 201 || !regData.success || !regData.token) {
          throw new Error('Register test failed!');
        }

        // 2. Test POST /api/admin/register duplicate email
        console.log('\n--- Test 2: POST /api/admin/register (Duplicate Email Validation) ---');
        const dupRes = await fetch(`http://localhost:${PORT}/api/admin/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testAdmin)
        });
        const dupData = await dupRes.json();
        console.log(`Status: ${dupRes.status}`);
        console.log('Response:', dupData);
        if (dupRes.status !== 400 || dupData.success) {
          throw new Error('Duplicate email test failed!');
        }

        // 3. Test POST /api/admin/login
        console.log('\n--- Test 3: POST /api/admin/login ---');
        const loginRes = await fetch(`http://localhost:${PORT}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: testAdmin.email, password: testAdmin.password })
        });
        const loginData = await loginRes.json();
        console.log(`Status: ${loginRes.status}`);
        console.log('Response:', loginData);
        if (loginRes.status !== 200 || !loginData.success || !loginData.token) {
          throw new Error('Login test failed!');
        }

        const authToken = loginData.token;

        // 4. Test GET /api/admin/me
        console.log('\n--- Test 4: GET /api/admin/me ---');
        const profileRes = await fetch(`http://localhost:${PORT}/api/admin/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        const profileData = await profileRes.json();
        console.log(`Status: ${profileRes.status}`);
        console.log('Response:', profileData);
        if (profileRes.status !== 200 || !profileData.success || profileData.admin.email !== testAdmin.email) {
          throw new Error('Profile test failed!');
        }

        console.log('\n✅ ALL ADMIN API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ Test execution error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-admin-apis.js')) {
  runAdminTests().then(() => process.exit(0)).catch(() => process.exit(1));
}
