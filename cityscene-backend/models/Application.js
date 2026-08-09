import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true
    },
    message: {
      type: String,
      trim: true,
      default: ''
    },
    resumePath: {
      type: String,
      default: null
    },
    resumeOriginalName: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const Application = mongoose.model('Application', applicationSchema);
export default Application;
