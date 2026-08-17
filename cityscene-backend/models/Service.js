import mongoose from 'mongoose';

const whyChooseCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const faqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true }
}, { _id: false });

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true
    },
    displayTitle: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'bottom-left'
    },
    shortDesc: {
      type: String,
      required: true
    },
    topicName: {
      type: String
    },
    heroDesc: {
      type: String
    },
    heroImage: {
      type: String
    },
    backgroundMediaType: {
      type: String,
      default: 'image'
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundVideo: {
      type: String,
      default: ''
    },
    heroVideo: {
      type: String,
      default: ''
    },
    introP1: {
      type: String
    },
    introP2: {
      type: String
    },
    whyChooseTitle: {
      type: String
    },
    whyChooseSubtitle: {
      type: String
    },
    whyChooseCards: [whyChooseCardSchema],
    expertiseTitle: {
      type: String
    },
    expertiseSubtitle: {
      type: String
    },
    expertiseItems: [itemSchema],
    processTitle: {
      type: String
    },
    processSteps: [itemSchema],
    faqs: [faqSchema],
    video: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Service = mongoose.model('Service', serviceSchema);
export default Service;
