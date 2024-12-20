import { model, models, Schema, Document } from 'mongoose';

interface IExpenditure extends Document {
  date: Date;
  purpose: string;
  amount: number;
}

const ExpenditureSchema: Schema = new Schema({
  date: { type: Date, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expenditure = models.Expenditure || model<IExpenditure>('Expenditure', ExpenditureSchema);

export default Expenditure;
