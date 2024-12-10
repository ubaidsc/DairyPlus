import mongoose from 'mongoose';

const CowSchema = new mongoose.Schema({
  cowid: { type: String, required: true, default: () => `COW-${Date.now()}-${Math.floor(Math.random() * 10000)}` },
  cowname: { type: String, required: true },
  amMilk: { type: Number, required: true },
  noonMilk: { type: Number, required: true },
  pmMilk: { type: Number, required: true },
  totalMilk: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Cow = mongoose.models.Cow || mongoose.model('Cow', CowSchema);
export default Cow;
