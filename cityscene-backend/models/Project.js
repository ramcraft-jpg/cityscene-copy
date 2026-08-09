import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    client: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    shortDesc: {
      type: String,
      required: true
    },
    fullDesc: {
      type: String,
      required: true
    },
    services: [String],
    technologies: [String],
    keyFeatures: [String],
    liveLink: {
      type: String,
      default: '#'
    }
  },
  {
    timestamps: true
  }
);

export const Project = mongoose.model('Project', projectSchema);
export default Project;
