import { model, models, Schema, Document } from 'mongoose';

interface ICow extends Document {
  cowId: string;
  cowName: string;
  earTag: string;
  color: string;
  breed: string;
  dateOfBirth: Date;
  age: number;
  weightAtBirth: number;
  pasture: string;
}

const CowSchema: Schema = new Schema({
  cowId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: () => `COW-${Date.now()}-${Math.floor(Math.random() * 10000)}` 
  },
  cowName: { type: String, required: true },
  earTag: { type: String, required: true },
  color: { type: String, required: true },
  breed: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true },
  weightAtBirth: { type: Number, required: true },
  pasture: { type: String, required: true },
});

const Cow = models.Cow || model<ICow>('Cow', CowSchema);

export default Cow;
