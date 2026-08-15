import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
      trim: true
    },
    image: {
      type: String
    },
    rating: {
      type: Number,
      default: 5
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
