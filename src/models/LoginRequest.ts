import mongoose from "mongoose";

interface LoginRequest {
  email: string;
  confirmationCode: string;
}

export const confirmationCodeLength = 16;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const loginRequestSchema = new mongoose.Schema<LoginRequest>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex,
    index: true,
  },
  confirmationCode: {
    type: String,
    required: true,
    unique: true,
    length: confirmationCodeLength,
    index: true,
  },
}, {
  timestamps: true,
  expireAfterSeconds: 900, // 15 minutes
});

loginRequestSchema.index({ email: 1, confirmationCode: 1 });

loginRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

export default mongoose.model<LoginRequest>("LoginRequest", loginRequestSchema);
