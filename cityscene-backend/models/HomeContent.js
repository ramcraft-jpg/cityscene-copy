import mongoose from 'mongoose';

const homeContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

const HomeContent = mongoose.model('HomeContent', homeContentSchema);

export default HomeContent;
