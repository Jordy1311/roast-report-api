import { Request } from 'express';
import mongoose from 'mongoose';

interface User {
  email: string;
  password: string;
}

export interface UserTokenPayload {
  email: string;
}

export interface RequestWithUserPayload extends Request {
  user: UserTokenPayload;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>('User', userSchema);
