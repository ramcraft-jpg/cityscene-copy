import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';

dotenv.config();

const verifySubmittedContact = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const doc = await Contact.findOne({ email: 'e2e@cityscene.com' });
    if (doc) {
      console.log('=== CONFIRMED CONTACT RECORD IN MONGODB ATLAS ===');
      console.log('ID:', doc._id.toString());
      console.log('Full Name:', doc.fullName);
      console.log('Email:', doc.email);
      console.log('Phone:', doc.phone);
      console.log('Message:', doc.message);
      console.log('Created At:', doc.createdAt);
      console.log('================================================');
    } else {
      console.error('Record not found in MongoDB!');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error querying MongoDB:', err);
  }
};

verifySubmittedContact();
