import mongoose from "mongoose";

interface User {
  email: string;
}

export interface UserTokenPayload {
  id: string;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

export default mongoose.model<User>("User", userSchema);
