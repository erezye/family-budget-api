import { Schema, model } from 'mongoose';
import { User } from '../types';

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  monthlyIncome: { type: Number, default: 30000 }
}, { 
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

export const UserModel = model<User>('User', UserSchema);