import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testMongo = async () => {
  let uri = process.env.MONGODB_URI;
  if (uri && !uri.includes('cluster0.rwxb8ic.mongodb.net/cityscene')) {
    uri = uri.replace('cluster0.rwxb8ic.mongodb.net/', 'cluster0.rwxb8ic.mongodb.net/cityscene');
  }
  console.log('[Test Script] Connecting to URI:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'NO URI');

  try {
    const conn = await mongoose.connect(uri);
    console.log('[Test Script] Successfully connected to MongoDB!');
    console.log('[Test Script] Host:', conn.connection.host);
    console.log('[Test Script] DB Name:', conn.connection.name);

    // Test Schema
    const TestSchema = new mongoose.Schema({ name: String, createdAt: { type: Date, default: Date.now } });
    const TestModel = mongoose.models.TestCollection || mongoose.model('TestCollection', TestSchema);

    // Create test document
    const testDoc = await TestModel.create({ name: 'Connection Test Document' });
    console.log('[Test Script] Created document:', testDoc._id);

    // Read test document
    const foundDoc = await TestModel.findById(testDoc._id);
    console.log('[Test Script] Retrieved document:', foundDoc.name);

    // Cleanup
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('[Test Script] Cleaned up test document.');

    await mongoose.disconnect();
    console.log('[Test Script] MONGODB CONNECTION TEST PASSED SUCCESSFULLY');
    process.exit(0);
  } catch (err) {
    console.error('[Test Script ERROR] MongoDB connection failed:', err);
    process.exit(1);
  }
};

testMongo();
