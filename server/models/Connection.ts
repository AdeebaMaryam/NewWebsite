import mongoose, { Schema, Document } from 'mongoose';
import type { Connection } from '@shared/schema';

interface IConnection extends Omit<Connection, '_id' | 'requester' | 'recipient' | 'commonConnections'>, Document {
  requester: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  commonConnections: mongoose.Types.ObjectId[];
}

const connectionSchema = new Schema<IConnection>({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined', 'blocked'], 
    default: 'pending' 
  },
  message: { type: String, maxlength: 500 },
  commonConnections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  connectionStrength: { type: Number, min: 0, max: 100, default: 50 },
  tags: [{ type: String }],
}, {
  timestamps: true,
  collection: 'connections'
});

// Indexes for connection queries
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });
connectionSchema.index({ recipient: 1, status: 1 });
connectionSchema.index({ requester: 1, status: 1 });

export default mongoose.model<IConnection>('Connection', connectionSchema);
