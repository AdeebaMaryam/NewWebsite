import mongoose, { Schema, Document } from 'mongoose';
import type { Event } from '@shared/schema';

interface IEvent extends Omit<Event, '_id' | 'organizer' | 'college' | 'attendees'>, Document {
  organizer: mongoose.Types.ObjectId;
  college?: mongoose.Types.ObjectId;
  attendees: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true, minlength: 1, maxlength: 200 },
  description: { type: String, required: true, maxlength: 2000 },
  type: { 
    type: String, 
    enum: ['reunion', 'networking', 'seminar', 'cultural', 'sports', 'professional', 'social'],
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: {
    venue: { type: String, required: true },
    address: { type: String },
    city: { type: String, required: true },
    isVirtual: { type: Boolean, default: false },
    meetingLink: { type: String },
  },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  college: { type: Schema.Types.ObjectId, ref: 'College' },
  capacity: { type: Number, min: 1 },
  registrationDeadline: { type: Date },
  fees: { type: Number, min: 0, default: 0 },
  tags: [{ type: String }],
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isPublic: { type: Boolean, default: true },
  status: { type: String, enum: ['draft', 'published', 'cancelled', 'completed'], default: 'draft' },
}, {
  timestamps: true,
  collection: 'events'
});

// Indexes for search and filtering
eventSchema.index({ startDate: 1, status: 1 });
eventSchema.index({ organizer: 1, college: 1 });
eventSchema.index({ type: 1, isPublic: 1 });
eventSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IEvent>('Event', eventSchema);
