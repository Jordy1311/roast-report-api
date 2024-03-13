import mongoose from 'mongoose';

interface User {
  // name: {
  //   first: string;
  //   last: string;
  // };
  email: string;
}

const userSchema = new mongoose.Schema<User>({
  // name: {
  //   type: Object,
  //   properties: {
  //     first: { type: String },
  //     last: { type: String },
  //   },
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<User>('User', userSchema);
