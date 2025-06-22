import mongoose, { Schema, Document } from 'mongoose';
import type { Post } from '@shared/schema';

interface IPost extends Omit<Post, '_id' | 'author' | 'college' | 'mentions'>, Document {
  author: mongoose.Types.ObjectId;
  college?: mongoose.Types.ObjectId;
  mentions?: mongoose.Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, minlength: 1, maxlength: 5000 },
  type: { 
    type: String, 
    enum: ['text', 'image', 'video', 'link', 'poll', 'job', 'announcement'], 
    default: 'text' 
  },
  media: [{
    type: { type: String, enum: ['image', 'video', 'document'], required: true },
    url: { type: String, required: true },
    caption: { type: String, maxlength: 200 },
  }],
  college: { type: Schema.Types.ObjectId, ref: 'College' },
  tags: [{ type: String }],
  mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  visibility: { 
    type: String, 
    enum: ['public', 'alumni', 'college', 'connections'], 
    default: 'public' 
  },
  engagement: {
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
      _id: { type: Schema.Types.ObjectId, auto: true },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true, minlength: 1, maxlength: 1000 },
      timestamp: { type: Date, default: Date.now },
      likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }],
    shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  isPinned: { type: Boolean, default: false },
}, {
  timestamps: true,
  collection: 'posts'
});

// Indexes for feed and search
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ college: 1, visibility: 1, createdAt: -1 });
postSchema.index({ content: 'text', tags: 'text' });
postSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model<IPost>('Post', postSchema);
