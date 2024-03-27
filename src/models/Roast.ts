import mongoose from 'mongoose';

interface Roast {
  composition?: string;
  name: string;
  origin?: string;
  processMethod?: string;
  roastedFor?: string;
  tastingNotes?: [String];
}

const roastSchema = new mongoose.Schema<Roast>({
  composition: String,
  name: {
    type: String,
    required: true,
  },
  origin: String,
  processMethod: String,
  roastedFor: String,
  tastingNotes: [String],
});

export default mongoose.model<Roast>('Roast', roastSchema);
