import express from 'express';
import jwt from 'jsonwebtoken';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import connectDB from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/api/home-content', homeContentRoutes);

const PORT = 5094;

// Generate test admin token
const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
const testAdminToken = jwt.sign(
  { id: 1, email: 'admin@cityscene.com', role: 'admin' },
  secret,
  { expiresIn: '1h' }
);

export const runHomeContentTests = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`🧪 HomeContent Test server listening on http://localhost:${PORT}`);
      try {
        // 1. Read All Home Content (GET /api/home-content)
        console.log('\n--- Test 1: GET /api/home-content (Read All Sections & Seed Verification) ---');
        const getAllRes = await fetch(`http://localhost:${PORT}/api/home-content`);
        const getAllData = await getAllRes.json();
        console.log(`Status: ${getAllRes.status}`);
        console.log('Sections Present:', Object.keys(getAllData.data || {}));
        if (getAllRes.status !== 200 || !getAllData.success || !getAllData.data.hero) {
          throw new Error('Read all home content test failed!');
        }

        // 2. Read Single Section (GET /api/home-content/hero)
        console.log('\n--- Test 2: GET /api/home-content/hero (Read Single Section) ---');
        const getHeroRes = await fetch(`http://localhost:${PORT}/api/home-content/hero`);
        const getHeroData = await getHeroRes.json();
        console.log(`Status: ${getHeroRes.status}`);
        console.log('Hero Section Title Line 1:', getHeroData.content?.slides?.[0]?.titleLine1);
        if (getHeroRes.status !== 200 || !getHeroData.success || getHeroData.section !== 'hero') {
          throw new Error('Read single section test failed!');
        }

        // 3. Update Section (PUT /api/home-content/about)
        console.log('\n--- Test 3: PUT /api/home-content/about (Update Section Content) ---');
        const updateRes = await fetch(`http://localhost:${PORT}/api/home-content/about`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testAdminToken}`
          },
          body: JSON.stringify({
            content: {
              badge: 'Who We Are Test',
              heading: 'About CityScene Global MySQL',
              paragraph1: 'Updated paragraph content in MySQL database.',
              buttonText: 'Learn More',
              buttonLink: '/about'
            }
          })
        });
        const updateData = await updateRes.json();
        console.log(`Status: ${updateRes.status}`);
        console.log('Updated Heading:', updateData.content?.heading);
        if (updateRes.status !== 200 || !updateData.success || updateData.content?.heading !== 'About CityScene Global MySQL') {
          throw new Error('Update section test failed!');
        }

        // 4. Verify Updated Section Persisted (GET /api/home-content/about)
        console.log('\n--- Test 4: GET /api/home-content/about (Verify Persistence) ---');
        const verifyRes = await fetch(`http://localhost:${PORT}/api/home-content/about`);
        const verifyData = await verifyRes.json();
        console.log(`Status: ${verifyRes.status}`);
        console.log('Persisted Heading:', verifyData.content?.heading);
        if (verifyRes.status !== 200 || verifyData.content?.heading !== 'About CityScene Global MySQL') {
          throw new Error('Verify persistence test failed!');
        }

        console.log('\n✅ ALL HOMECONTENT API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ HomeContent Test execution error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-home-content-apis.js')) {
  runHomeContentTests().then(() => process.exit(0)).catch(() => process.exit(1));
}
