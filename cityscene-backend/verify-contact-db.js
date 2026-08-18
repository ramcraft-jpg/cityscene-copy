import connectDB from './config/db.js';
import { Contact } from './models/Contact.js';

const verifySubmittedContact = async () => {
  try {
    await connectDB();
    const count = await Contact.count();
    console.log(`✅ [Verification Script] MySQL Contact records verified. Total inquiries in DB: ${count}`);
  } catch (error) {
    console.error('❌ [Verification Script] Error:', error.message);
  }
};

verifySubmittedContact();
