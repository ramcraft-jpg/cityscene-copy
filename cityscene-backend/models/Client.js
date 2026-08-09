import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Client = mongoose.model('Client', clientSchema);
export default Client;
