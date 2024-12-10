import { model, models, Schema, Document } from 'mongoose';

interface IEmployee extends Document {
  userName: string;
  name: string;
  phone: string;
  gender: string;
  address: string;
  dob: Date;
  password: string;
}

const EmployeeSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
});

const Employee = models.Employee || model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
