import mongoose from "mongoose";

interface Roast {
  composition?: string;
  name: string;
  notes?: string;
  origin?: [string];
  processMethod?: string;
  rating?: number;
  roastedFor?: [string];
  roaster: string;
  tastingNotes?: [string];
  userId: string;
  deleted: boolean;
}

const roastSchema = new mongoose.Schema<Roast>({
  composition: String,
  name: {
    type: String,
    required: true,
  },
  notes: String,
  origin: {
    type: [String],
    default: undefined,
  },
  processMethod: String,
  rating: Number,
  roastedFor: {
    type: [String],
    default: undefined,
  },
  roaster: {
    type: String,
    required: true,
    index: true,
  },
  tastingNotes: {
    type: [String],
    default: undefined,
  },
  userId: {
    type: String,
    index: true,
  },
  deleted: {
    type: Boolean,
    index: true,
  }
}, { timestamps: true });

roastSchema.index({ _id: 1, userId: 1 })

export default mongoose.model<Roast>("Roast", roastSchema);
