import mongoose from 'mongoose';

interface Roaster {
  name: string;
}

const roasterSchema = new mongoose.Schema<Roaster>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<Roaster>('Roaster', roasterSchema);
