import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { User } from '@shared/schema';

interface IUser extends Omit<User, '_id'>, Document {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true, minlength: 1, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 1, maxlength: 50 },
  profile: {
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
  },
  education: {
    college: { type: String, required: true },
    collegeType: { type: String, enum: ['Campus', 'Constituent', 'Affiliated', 'Autonomous'], required: true },
    department: { type: String, required: true },
    degree: { type: String, required: true },
    graduationYear: { type: Number, required: true, min: 1918, max: 2030 },
    rollNumber: { type: String },
  },
  professional: {
    currentPosition: { type: String },
    currentCompany: { type: String },
    industry: { type: String },
    experience: { type: Number, min: 0 },
    skills: [{ type: String }],
    achievements: [{ type: String }],
  },
  preferences: {
    privacy: { type: String, enum: ['public', 'alumni', 'private'], default: 'alumni' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
    },
  },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['student', 'alumni', 'faculty', 'admin'], default: 'alumni' },
}, {
  timestamps: true,
  collection: 'users'
});

// Index for search performance
userSchema.index({ username: 1, email: 1 });
userSchema.index({ 'education.college': 1, 'education.graduationYear': 1 });
userSchema.index({ 'professional.currentCompany': 1, 'professional.industry': 1 });
userSchema.index({ firstName: 'text', lastName: 'text', 'professional.currentCompany': 'text' });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
