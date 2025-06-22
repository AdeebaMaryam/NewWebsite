import mongoose, { Schema, Document } from 'mongoose';
import type { College } from '@shared/schema';

interface ICollege extends Omit<College, '_id'>, Document {}

const collegeSchema = new Schema<ICollege>({
  name: { type: String, required: true, minlength: 1, maxlength: 200 },
  shortName: { type: String, maxlength: 20 },
  type: { type: String, enum: ['Campus', 'Constituent', 'Affiliated', 'Autonomous'], required: true },
  established: { type: Number, min: 1918 },
  location: { type: String },
  website: { type: String },
  departments: [{ type: String, required: true }],
  description: { type: String, maxlength: 1000 },
  alumniCount: { type: Number, min: 0, default: 0 },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
  collection: 'colleges'
});

// Indexes for search performance
collegeSchema.index({ name: 'text', shortName: 'text' });
collegeSchema.index({ type: 1, isActive: 1 });
collegeSchema.index({ departments: 1 });

export default mongoose.model<ICollege>('College', collegeSchema);
