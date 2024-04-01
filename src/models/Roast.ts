import mongoose from 'mongoose';

interface Roast {
  composition?: string;
  name: string;
  origin?: [string];
  processMethod?: string;
  roastedFor?: [string];
  roaster: string;
  tastingNotes?: [string];
  userId: string;
}

const roastSchema = new mongoose.Schema<Roast>({
  composition: String,
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: [String],
    default: undefined,
  },
  processMethod: String,
  roastedFor: {
    type: [String],
    default: undefined,
  },
  roaster: {
    type: String,
    required: true,
  },
  tastingNotes: {
    type: [String],
    default: undefined,
  },
  userId: String,
});

export default mongoose.model<Roast>('Roast', roastSchema);
