import { Schema, model } from 'mongoose';
import { Budget, BudgetItem } from '../types';

const budgetItemSchema = new Schema<BudgetItem>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  isIncome: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
}, { _id: true });

export const BudgetSchema = new Schema<Budget>({
  userId: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  income: { type: Number, default: 30000 },
  expenses: { type: Number, default: 0 },
  items: [budgetItemSchema]
}, { 
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

BudgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export const BudgetModel = model<Budget>('Budget', BudgetSchema);