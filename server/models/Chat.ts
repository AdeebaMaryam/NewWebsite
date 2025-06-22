import mongoose, { Schema, Document } from 'mongoose';
import type { Chat } from '@shared/schema';

interface IChat extends Omit<Chat, '_id' | 'participants' | 'college' | 'admins'>, Document {
  participants: mongoose.Types.ObjectId[];
  college?: mongoose.Types.ObjectId;
  admins: mongoose.Types.ObjectId[];
}

const chatSchema = new Schema<IChat>({
  type: { type: String, enum: ['direct', 'group'], required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  name: { type: String, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  avatar: { type: String },
  college: { type: Schema.Types.ObjectId, ref: 'College' },
  isPublic: { type: Boolean, default: false },
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, required: true },
    type: { type: String, enum: ['text', 'image', 'file', 'link'], default: 'text' },
  },
}, {
  timestamps: true,
  collection: 'chats'
});

// Indexes for chat queries
chatSchema.index({ participants: 1 });
chatSchema.index({ college: 1, isPublic: 1 });
chatSchema.index({ 'lastMessage.timestamp': -1 });

export default mongoose.model<IChat>('Chat', chatSchema);
