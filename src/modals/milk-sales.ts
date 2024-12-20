import _ from 'lodash';
import mongoose from 'mongoose';

const MilkSalesSchema = new mongoose.Schema({
  milkSalesId: { type: String, required: true, default: () => `MILK-${Date.now()}-${Math.floor(Math.random() * 10000)}` },
  employeeId: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  quality: { type: String, required: true },
  total: { type: Number, required: true },
});

const MilkSales = mongoose.model('MilkSales', MilkSalesSchema);

export default MilkSales;
