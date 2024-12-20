import { model, models, Schema, Document } from 'mongoose';

interface IIncome extends Document {
  date: Date;
  type: string;
  amount: number;
}

const IncomeSchema: Schema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Income = models.Income || model<IIncome>('Income', IncomeSchema);

export default Income;
