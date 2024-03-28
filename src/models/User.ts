import mongoose from 'mongoose';

interface User {
  email: String;
  password: String;
}

export interface UserTokenPayload {
  id: String;
  email: String;
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
