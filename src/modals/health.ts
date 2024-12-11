import mongoose from 'mongoose';

const healthSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  cowName: { type: String, required: true },
  event: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  costOfTreatment: { type: Number, required: true },
  vetName: { type: String, required: true },
}, { timestamps: true });

const Health = mongoose.model('Health', healthSchema);

export default Health;
