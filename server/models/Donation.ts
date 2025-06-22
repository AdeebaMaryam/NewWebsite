import mongoose, { Schema, Document } from 'mongoose';
import type { Donation } from '@shared/schema';

interface IDonation extends Omit<Donation, '_id' | 'donor'>, Document {
  donor: mongoose.Types.ObjectId;
}

const donationSchema = new Schema<IDonation>({
  donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  campaign: {
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    description: { type: String, required: true, maxlength: 1000 },
    target: { type: Number, required: true, min: 1 },
    raised: { type: Number, min: 0, default: 0 },
    category: { 
      type: String, 
      enum: ['infrastructure', 'education', 'technology', 'sports', 'cultural', 'research'],
      required: true 
    },
    college: { type: Schema.Types.ObjectId, ref: 'College' },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  amount: { type: Number, required: true, min: 1 },
  currency: { type: String, default: 'INR' },
  paymentMethod: { type: String, enum: ['upi', 'card', 'netbanking', 'wallet'], required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  isAnonymous: { type: Boolean, default: false },
  message: { type: String, maxlength: 500 },
  taxReceiptGenerated: { type: Boolean, default: false },
}, {
  timestamps: true,
  collection: 'donations'
});

// Indexes for analytics and search
donationSchema.index({ donor: 1, status: 1 });
donationSchema.index({ 'campaign.college': 1, status: 1 });
donationSchema.index({ 'campaign.category': 1, createdAt: -1 });
donationSchema.index({ transactionId: 1 });

export default mongoose.model<IDonation>('Donation', donationSchema);
