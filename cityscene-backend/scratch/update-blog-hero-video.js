import { HomeContent } from '../models/HomeContent.js';
import { sequelize } from '../config/db.js';

async function checkAndUpdateBlogHero() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const record = await HomeContent.findOne({ where: { section: 'blog-hero' } });
    if (record) {
      console.log('Current blog-hero record content:', record.content);
      const content = record.content || {};
      content.bgVideo = 'https://citysceneglobal.com/files/vd14.mp4';
      content.backgroundVideo = 'https://citysceneglobal.com/files/vd14.mp4';
      content.backgroundMediaType = 'video';
      content.bgImage = content.bgImage && content.bgImage.endsWith('.mp4') ? '' : content.bgImage;

      await record.update({ content });
      console.log('✅ Updated blog-hero record in database:', record.content);
    } else {
      console.log('No blog-hero record found.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkAndUpdateBlogHero();
