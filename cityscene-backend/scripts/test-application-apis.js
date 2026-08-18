import express from 'express';
import applicationRoutes from '../routes/applicationRoutes.js';
import connectDB from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/api/applications', applicationRoutes);

const PORT = 5098;

export const runApplicationTests = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`🧪 Application Test server listening on http://localhost:${PORT}`);
      try {
        const testApp = {
          fullName: 'Jane Doe Candidate',
          email: 'janedoe@example.com',
          phone: '+1 555 019 2831',
          position: 'Full Stack Engineer',
          message: 'Excited to apply for the Full Stack Engineer role at CityScene Global!'
        };

        // 1. Create Application (POST /api/applications)
        console.log('\n--- Test 1: POST /api/applications (Create Application) ---');
        const createRes = await fetch(`http://localhost:${PORT}/api/applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testApp)
        });
        const createData = await createRes.json();
        console.log(`Status: ${createRes.status}`);
        console.log('Response:', createData);
        if (createRes.status !== 201 || !createData.success || !createData.data.id) {
          throw new Error('Create application test failed!');
        }

        const createdId = createData.data.id;

        // 2. Read All Applications (GET /api/applications)
        console.log('\n--- Test 2: GET /api/applications (Read All Applications) ---');
        const getAllRes = await fetch(`http://localhost:${PORT}/api/applications`);
        const getAllData = await getAllRes.json();
        console.log(`Status: ${getAllRes.status}`);
        console.log(`Count: ${getAllData.count}`);
        console.log('Data:', getAllData.data);
        if (getAllRes.status !== 200 || !getAllData.success || !Array.isArray(getAllData.data)) {
          throw new Error('Read all applications test failed!');
        }

        // 3. Read Single Application (GET /api/applications/:id)
        console.log(`\n--- Test 3: GET /api/applications/${createdId} (Read Single Application) ---`);
        const getSingleRes = await fetch(`http://localhost:${PORT}/api/applications/${createdId}`);
        const getSingleData = await getSingleRes.json();
        console.log(`Status: ${getSingleRes.status}`);
        console.log('Response:', getSingleData);
        if (getSingleRes.status !== 200 || !getSingleData.success || getSingleData.data.id !== createdId) {
          throw new Error('Read single application test failed!');
        }

        // 4. Delete Application (DELETE /api/applications/:id)
        console.log(`\n--- Test 4: DELETE /api/applications/${createdId} (Delete Application) ---`);
        const deleteRes = await fetch(`http://localhost:${PORT}/api/applications/${createdId}`, {
          method: 'DELETE'
        });
        const deleteData = await deleteRes.json();
        console.log(`Status: ${deleteRes.status}`);
        console.log('Response:', deleteData);
        if (deleteRes.status !== 200 || !deleteData.success) {
          throw new Error('Delete application test failed!');
        }

        console.log('\n✅ ALL APPLICATION API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ Application Test execution error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-application-apis.js')) {
  runApplicationTests().then(() => process.exit(0)).catch(() => process.exit(1));
}
