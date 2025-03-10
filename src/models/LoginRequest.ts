import mongoose from "mongoose";

interface LoginRequest {
  email: string;
  confirmationCode: string;
}

const loginRequestSchema = new mongoose.Schema<LoginRequest>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  confirmationCode: {
    type: String,
    required: true,
    unique: true,
    length: 6,
  },
}, {
  timestamps: true,
  expireAfterSeconds: 900, // 15 minutes
});

loginRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

export default mongoose.model<LoginRequest>("LoginRequest", loginRequestSchema);
