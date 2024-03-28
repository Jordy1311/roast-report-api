import mongoose from 'mongoose';

interface Roast {
  composition?: String;
  name: String;
  origin?: String;
  processMethod?: String;
  roastedFor?: String;
  roaster: String;
  tastingNotes?: [String];
  userId: String;
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
  roaster: {
    type: String,
    required: true,
  },
  tastingNotes: [String],
  userId: String,
});

export default mongoose.model<Roast>('Roast', roastSchema);
