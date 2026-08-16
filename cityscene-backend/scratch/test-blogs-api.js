import express from 'express';
import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import homeContentRoutes from '../routes/homeContentRoutes.js';
import blogRoutes from '../routes/blogRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  console.log('=== TESTING BLOGS PAGE API & MONGODB INTEGRATION ===');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(express.json());
  app.use('/api/home-content', homeContentRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/admin', adminRoutes);

  const server = app.listen(5098, async () => {
    try {
      // 1. Admin login
      const resLogin = await fetch('http://localhost:5098/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cityscene.com', password: 'Admin@cityscene2025' })
      });
      const dataLogin = await resLogin.json();
      const token = dataLogin.token;
      console.log('[POST /api/admin/login] Token:', !!token);

      // 2. GET & PUT Blog Hero
      const resHero = await fetch('http://localhost:5098/api/home-content/blog-hero');
      const dataHero = await resHero.json();
      console.log('[GET /api/home-content/blog-hero] Title:', dataHero.content?.title);

      const resPutHero = await fetch('http://localhost:5098/api/home-content/blog-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: { ...dataHero.content, title: 'Architecting Future Tech Solutions' } })
      });
      const dataPutHero = await resPutHero.json();
      console.log('[PUT /api/home-content/blog-hero] Result:', dataPutHero.message);

      // 3. GET /api/blogs
      const resBlogs = await fetch('http://localhost:5098/api/blogs');
      const dataBlogs = await resBlogs.json();
      console.log('[GET /api/blogs] Initial Blogs Count:', dataBlogs.count);

      // 4. POST /api/blogs
      const newBlogPayload = {
        title: 'Generative AI Workflows in Modern DevOps',
        id: 'generative-ai-workflows-devops',
        slug: 'generative-ai-workflows-devops',
        category: 'Artificial Intelligence',
        author: 'CityScene AI Labs',
        readTime: '6 min read',
        date: 'October 25, 2024',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        summary: 'How autonomous LLM pipelines enhance continuous deployment resilience.',
        content: 'Detailed article body for Generative AI Workflows in Modern DevOps.'
      };
      const resPostBlog = await fetch('http://localhost:5098/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBlogPayload)
      });
      const dataPostBlog = await resPostBlog.json();
      console.log('[POST /api/blogs] Success:', dataPostBlog.success, 'Created Blog:', dataPostBlog.data?.title);

      // 5. DELETE /api/blogs/:id
      const resDelBlog = await fetch('http://localhost:5098/api/blogs/generative-ai-workflows-devops', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataDelBlog = await resDelBlog.json();
      console.log('[DELETE /api/blogs/:id] Result:', dataDelBlog.message);

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
