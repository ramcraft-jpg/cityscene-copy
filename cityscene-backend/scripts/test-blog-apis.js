import express from 'express';
import jwt from 'jsonwebtoken';
import blogRoutes from '../routes/blogRoutes.js';
import connectDB from '../config/db.js';

const app = express();
app.use(express.json());
app.use('/api/blogs', blogRoutes);

const PORT = 5097;

// Generate test admin token
const secret = process.env.JWT_SECRET || 'cityscene_admin_secret_jwt_key_2025';
const testAdminToken = jwt.sign(
  { id: 1, email: 'admin@cityscene.com', role: 'admin' },
  secret,
  { expiresIn: '1h' }
);

export const runBlogTests = async () => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, async () => {
      console.log(`🧪 Blog Test server listening on http://localhost:${PORT}`);
      try {
        // 1. Read All Blogs (GET /api/blogs)
        console.log('\n--- Test 1: GET /api/blogs (Read All Blogs & Seed Verification) ---');
        const getAllRes = await fetch(`http://localhost:${PORT}/api/blogs`);
        const getAllData = await getAllRes.json();
        console.log(`Status: ${getAllRes.status}`);
        console.log(`Count: ${getAllData.count}`);
        console.log('Sample Data Titles:', getAllData.data.map(b => b.title));
        if (getAllRes.status !== 200 || !getAllData.success || getAllData.count < 3) {
          throw new Error('Read all blogs test failed!');
        }

        // 2. Create Blog (POST /api/blogs)
        const testTimestamp = Date.now();
        const testBlog = {
          title: `Autonomous AI Systems ${testTimestamp}`,
          slug: `autonomous-ai-systems-${testTimestamp}`,
          category: 'Artificial Intelligence',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          summary: 'An in-depth study on autonomous agentic workflows.',
          content: 'Full article body discussing autonomous AI agents and modern web development.'
        };

        console.log('\n--- Test 2: POST /api/blogs (Create New Blog) ---');
        const createRes = await fetch(`http://localhost:${PORT}/api/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testAdminToken}`
          },
          body: JSON.stringify(testBlog)
        });
        const createData = await createRes.json();
        console.log(`Status: ${createRes.status}`);
        console.log('Response:', createData);
        if (createRes.status !== 201 || !createData.success || !createData.data.id) {
          throw new Error('Create blog test failed!');
        }

        const createdSlug = createData.data.slug;

        // 3. Read Single Blog by Slug (GET /api/blogs/:slug)
        console.log(`\n--- Test 3: GET /api/blogs/${createdSlug} (Read Single Blog by Slug) ---`);
        const getSingleRes = await fetch(`http://localhost:${PORT}/api/blogs/${createdSlug}`);
        const getSingleData = await getSingleRes.json();
        console.log(`Status: ${getSingleRes.status}`);
        console.log('Response Title:', getSingleData.data?.title);
        if (getSingleRes.status !== 200 || !getSingleData.success || getSingleData.data.slug !== createdSlug) {
          throw new Error('Read single blog test failed!');
        }

        // 4. Update Blog (PUT /api/blogs/:id)
        console.log(`\n--- Test 4: PUT /api/blogs/${createdSlug} (Update Blog) ---`);
        const updateRes = await fetch(`http://localhost:${PORT}/api/blogs/${createdSlug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testAdminToken}`
          },
          body: JSON.stringify({
            summary: 'Updated summary note for autonomous AI systems post.'
          })
        });
        const updateData = await updateRes.json();
        console.log(`Status: ${updateRes.status}`);
        console.log('Response Summary:', updateData.data?.summary);
        if (updateRes.status !== 200 || !updateData.success || updateData.data.summary !== 'Updated summary note for autonomous AI systems post.') {
          throw new Error('Update blog test failed!');
        }

        // 5. Category Search/Filter Test (GET /api/blogs?category=Artificial%20Intelligence)
        console.log('\n--- Test 5: GET /api/blogs?category=Artificial Intelligence (Category Filter) ---');
        const filterRes = await fetch(`http://localhost:${PORT}/api/blogs?category=${encodeURIComponent('Artificial Intelligence')}`);
        const filterData = await filterRes.json();
        console.log(`Status: ${filterRes.status}`);
        console.log(`Filtered Count: ${filterData.count}`);
        if (filterRes.status !== 200 || !filterData.success || filterData.count === 0) {
          throw new Error('Filter blogs test failed!');
        }

        // 6. Delete Blog (DELETE /api/blogs/:id)
        console.log(`\n--- Test 6: DELETE /api/blogs/${createdSlug} (Delete Blog) ---`);
        const deleteRes = await fetch(`http://localhost:${PORT}/api/blogs/${createdSlug}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${testAdminToken}`
          }
        });
        const deleteData = await deleteRes.json();
        console.log(`Status: ${deleteRes.status}`);
        console.log('Response:', deleteData);
        if (deleteRes.status !== 200 || !deleteData.success) {
          throw new Error('Delete blog test failed!');
        }

        console.log('\n✅ ALL BLOG API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
        server.close(() => resolve());
      } catch (err) {
        console.error('❌ Blog Test execution error:', err);
        server.close(() => reject(err));
      }
    });
  });
};

if (process.argv[1].endsWith('test-blog-apis.js')) {
  runBlogTests().then(() => process.exit(0)).catch(() => process.exit(1));
}
