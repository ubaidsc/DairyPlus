import mongoose from 'mongoose';

const BreedingSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  cowName: { type: String, required: true },
  heatDate: { type: Date, required: true },
  breedDate: { type: Date, required: true },
  pregnancyDate: { type: Date, required: true },
  expectedDateToCalve: { type: Date, required: true },
  dateCalved: { type: Date, required: true },
  cowAge: { type: Number, required: true },
  remarks: { type: String, required: true },
});

const Breeding = mongoose.models.Breeding || mongoose.model('Breeding', BreedingSchema);
export default Breeding;
