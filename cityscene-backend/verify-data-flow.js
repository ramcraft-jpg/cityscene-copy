import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Blog from './models/Blog.js';
import Contact from './models/Contact.js';
import { seedDatabase } from './services/seedService.js';

dotenv.config();

const verifyFlow = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('=== END-TO-END MONGODB DATA FLOW VERIFICATION ===');
  console.log('[Verification] Connecting to MongoDB URI...');

  try {
    await mongoose.connect(uri);
    console.log('[Verification] Connected to DB:', mongoose.connection.name);

    // 1. Seed database to ensure baseline records
    console.log('\n--- 1. SEEDING & VERIFYING SERVICES ---');
    await seedDatabase();

    const services = await Service.find({});
    console.log(`[Services] Total services in MongoDB: ${services.length}`);
    if (services.length === 0) throw new Error('No services found in MongoDB!');
    console.log(`[Services] First Service title: "${services[0].displayTitle}" (ID: ${services[0].id})`);

    const singleService = await Service.findOne({ id: 'mobile-app-development' });
    if (!singleService) throw new Error('Single service lookup failed for mobile-app-development');
    console.log(`[Services] Single service lookup succeeded: "${singleService.displayTitle}"`);

    // 2. Verify Blogs
    console.log('\n--- 2. VERIFYING BLOGS ---');
    const blogs = await Blog.find({});
    console.log(`[Blogs] Total blogs in MongoDB: ${blogs.length}`);
    if (blogs.length === 0) throw new Error('No blogs found in MongoDB!');
    console.log(`[Blogs] First Blog title: "${blogs[0].title}" (Slug: ${blogs[0].slug})`);

    const singleBlog = await Blog.findOne({ slug: blogs[0].slug });
    if (!singleBlog) throw new Error(`Single blog lookup failed for slug: ${blogs[0].slug}`);
    console.log(`[Blogs] Single blog lookup succeeded: "${singleBlog.title}"`);

    // 3. Verify Contact Creation (WRITE -> MONGODB)
    console.log('\n--- 3. VERIFYING CONTACT SUBMISSION (WRITE -> MONGODB) ---');
    const testContactData = {
      fullName: 'Verification Tester',
      email: 'verifier.test@citysceneglobal.com',
      phone: '+1 555-0199',
      message: 'Testing complete end-to-end data flow from API to MongoDB Atlas.'
    };

    const createdContact = await Contact.create(testContactData);
    console.log(`[Contact] Document created successfully in MongoDB! ID: ${createdContact._id}`);

    // Verify Read back
    const retrievedContact = await Contact.findById(createdContact._id);
    if (!retrievedContact) throw new Error('Failed to retrieve newly created contact from MongoDB!');
    console.log(`[Contact] Document retrieved from MongoDB: Name="${retrievedContact.fullName}", Email="${retrievedContact.email}"`);

    // Clean up test contact
    await Contact.deleteOne({ _id: createdContact._id });
    console.log('[Contact] Cleaned up test contact document.');

    await mongoose.disconnect();
    console.log('\n==================================================');
    console.log('SUCCESS: ALL MONGODB DATA FLOW TESTS PASSED!');
    console.log('==================================================');
    process.exit(0);
  } catch (err) {
    console.error('\n[Verification FAILED]:', err);
    process.exit(1);
  }
};

verifyFlow();
