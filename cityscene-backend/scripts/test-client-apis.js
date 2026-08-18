import express from 'express';
import jwt from 'jsonwebtoken';
import projectRoutes from '../routes/projectRoutes.js';
import clientRoutes from '../routes/clientRoutes.js';
import connectDB from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);

const PORT = 5096;

// Generate test admin token
const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
const testAdminToken = jwt.sign(
  { id: 1, email: 'admin@cityscene.com', role: 'admin' },
  secret,
  { expiresIn: '1h' }
);

export const runClientTests = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`🧪 Client Test server listening on http://localhost:${PORT}`);
      try {
        // 1. Read All Clients via /api/projects/clients (GET /api/projects/clients)
        console.log('\n--- Test 1: GET /api/projects/clients (Read All Clients & Seed Verification) ---');
        const getAllRes = await fetch(`http://localhost:${PORT}/api/projects/clients`);
        const getAllData = await getAllRes.json();
        console.log(`Status: ${getAllRes.status}`);
        console.log(`Count: ${getAllData.count}`);
        console.log('Sample Data Names:', getAllData.data.map(c => c.name));
        if (getAllRes.status !== 200 || !getAllData.success || getAllData.count < 3) {
          throw new Error('Read all clients test failed!');
        }

        // 2. Create Client (POST /api/clients)
        const testTimestamp = Date.now();
        const testClient = {
          id: `client-test-${testTimestamp}`,
          name: 'Acme Enterprise Solutions',
          logo: 'https://via.placeholder.com/150x50?text=AcmeEnterprise'
        };

        console.log('\n--- Test 2: POST /api/clients (Create New Client) ---');
        const createRes = await fetch(`http://localhost:${PORT}/api/clients`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testAdminToken}`
          },
          body: JSON.stringify(testClient)
        });
        const createData = await createRes.json();
        console.log(`Status: ${createRes.status}`);
        console.log('Response:', createData);
        if (createRes.status !== 201 || !createData.success || !createData.data.id) {
          throw new Error('Create client test failed!');
        }

        const createdId = createData.data.id;

        // 3. Read Single Client by ID (GET /api/clients/:id)
        console.log(`\n--- Test 3: GET /api/clients/${createdId} (Read Single Client by ID) ---`);
        const getSingleRes = await fetch(`http://localhost:${PORT}/api/clients/${createdId}`);
        const getSingleData = await getSingleRes.json();
        console.log(`Status: ${getSingleRes.status}`);
        console.log('Response Name:', getSingleData.data?.name);
        if (getSingleRes.status !== 200 || !getSingleData.success || getSingleData.data.id !== createdId) {
          throw new Error('Read single client test failed!');
        }

        // 4. Update Client (PUT /api/clients/:id)
        console.log(`\n--- Test 4: PUT /api/clients/${createdId} (Update Client) ---`);
        const updateRes = await fetch(`http://localhost:${PORT}/api/clients/${createdId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testAdminToken}`
          },
          body: JSON.stringify({
            name: 'Acme Global Enterprise Inc'
          })
        });
        const updateData = await updateRes.json();
        console.log(`Status: ${updateRes.status}`);
        console.log('Response Name:', updateData.data?.name);
        if (updateRes.status !== 200 || !updateData.success || updateData.data.name !== 'Acme Global Enterprise Inc') {
          throw new Error('Update client test failed!');
        }

        // 5. Delete Client (DELETE /api/clients/:id)
        console.log(`\n--- Test 5: DELETE /api/clients/${createdId} (Delete Client) ---`);
        const deleteRes = await fetch(`http://localhost:${PORT}/api/clients/${createdId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${testAdminToken}`
          }
        });
        const deleteData = await deleteRes.json();
        console.log(`Status: ${deleteRes.status}`);
        console.log('Response:', deleteData);
        if (deleteRes.status !== 200 || !deleteData.success) {
          throw new Error('Delete client test failed!');
        }

        console.log('\n✅ ALL CLIENT API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ Client Test execution error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-client-apis.js')) {
  runClientTests().then(() => process.exit(0)).catch(() => process.exit(1));
}
