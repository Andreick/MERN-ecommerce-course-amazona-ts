import jwt from 'jsonwebtoken';
import { UserPayload } from './models/UserModel';

export const generateToken = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '30d' });
};
