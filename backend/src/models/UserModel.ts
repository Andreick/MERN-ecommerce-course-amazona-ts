import { model, Schema, Types } from 'mongoose';

export interface UserPayload {
  _id: Types.ObjectId;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
