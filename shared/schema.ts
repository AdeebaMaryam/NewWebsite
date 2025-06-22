import { z } from "zod";

// User schema
export const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  profile: z.object({
    avatar: z.string().optional(),
    bio: z.string().max(500).optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
  education: z.object({
    college: z.string(),
    collegeType: z.enum(['Campus', 'Constituent', 'Affiliated', 'Autonomous']),
    department: z.string(),
    degree: z.string(),
    graduationYear: z.number().min(1918).max(2030),
    rollNumber: z.string().optional(),
  }),
  professional: z.object({
    currentPosition: z.string().optional(),
    currentCompany: z.string().optional(),
    industry: z.string().optional(),
    experience: z.number().min(0).optional(),
    skills: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
  }).optional(),
  preferences: z.object({
    privacy: z.enum(['public', 'alumni', 'private']).default('alumni'),
    notifications: z.object({
      email: z.boolean().default(true),
      sms: z.boolean().default(false),
      push: z.boolean().default(true),
    }).default({}),
  }).optional(),
  isVerified: z.boolean().default(false),
  role: z.enum(['student', 'alumni', 'faculty', 'admin']).default('alumni'),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// College schema
export const collegeSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1).max(200),
  shortName: z.string().max(20).optional(),
  type: z.enum(['Campus', 'Constituent', 'Affiliated', 'Autonomous']),
  established: z.number().min(1918).optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  departments: z.array(z.string()),
  description: z.string().max(1000).optional(),
  alumniCount: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Event schema
export const eventSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  type: z.enum(['reunion', 'networking', 'seminar', 'cultural', 'sports', 'professional', 'social']),
  startDate: z.date(),
  endDate: z.date(),
  location: z.object({
    venue: z.string(),
    address: z.string().optional(),
    city: z.string(),
    isVirtual: z.boolean().default(false),
    meetingLink: z.string().url().optional(),
  }),
  organizer: z.string(), // User ID
  college: z.string().optional(), // College ID
  capacity: z.number().min(1).optional(),
  registrationDeadline: z.date().optional(),
  fees: z.number().min(0).default(0),
  tags: z.array(z.string()).optional(),
  attendees: z.array(z.string()).default([]), // User IDs
  isPublic: z.boolean().default(true),
  status: z.enum(['draft', 'published', 'cancelled', 'completed']).default('draft'),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Donation schema
export const donationSchema = z.object({
  _id: z.string().optional(),
  donor: z.string(), // User ID
  campaign: z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(1000),
    target: z.number().min(1),
    raised: z.number().min(0).default(0),
    category: z.enum(['infrastructure', 'education', 'technology', 'sports', 'cultural', 'research']),
    college: z.string().optional(), // College ID
    endDate: z.date().optional(),
    isActive: z.boolean().default(true),
  }),
  amount: z.number().min(1),
  currency: z.string().default('INR'),
  paymentMethod: z.enum(['upi', 'card', 'netbanking', 'wallet']),
  transactionId: z.string(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).default('pending'),
  isAnonymous: z.boolean().default(false),
  message: z.string().max(500).optional(),
  taxReceiptGenerated: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Chat schema
export const chatSchema = z.object({
  _id: z.string().optional(),
  type: z.enum(['direct', 'group']),
  participants: z.array(z.string()).min(2), // User IDs
  name: z.string().max(100).optional(), // For group chats
  description: z.string().max(500).optional(),
  avatar: z.string().optional(),
  college: z.string().optional(), // College ID for college-specific groups
  isPublic: z.boolean().default(false),
  admins: z.array(z.string()).default([]), // User IDs
  lastMessage: z.object({
    content: z.string(),
    sender: z.string(), // User ID
    timestamp: z.date(),
    type: z.enum(['text', 'image', 'file', 'link']).default('text'),
  }).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Post schema
export const postSchema = z.object({
  _id: z.string().optional(),
  author: z.string(), // User ID
  content: z.string().min(1).max(5000),
  type: z.enum(['text', 'image', 'video', 'link', 'poll', 'job', 'announcement']).default('text'),
  media: z.array(z.object({
    type: z.enum(['image', 'video', 'document']),
    url: z.string().url(),
    caption: z.string().max(200).optional(),
  })).optional(),
  college: z.string().optional(), // College ID
  tags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(), // User IDs
  visibility: z.enum(['public', 'alumni', 'college', 'connections']).default('public'),
  engagement: z.object({
    likes: z.array(z.string()).default([]), // User IDs
    comments: z.array(z.object({
      _id: z.string().optional(),
      author: z.string(), // User ID
      content: z.string().min(1).max(1000),
      timestamp: z.date().default(() => new Date()),
      likes: z.array(z.string()).default([]), // User IDs
    })).default([]),
    shares: z.array(z.string()).default([]), // User IDs
  }).default({}),
  isPinned: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Connection schema
export const connectionSchema = z.object({
  _id: z.string().optional(),
  requester: z.string(), // User ID
  recipient: z.string(), // User ID
  status: z.enum(['pending', 'accepted', 'declined', 'blocked']).default('pending'),
  message: z.string().max(500).optional(),
  commonConnections: z.array(z.string()).default([]), // User IDs
  connectionStrength: z.number().min(0).max(100).default(50),
  tags: z.array(z.string()).optional(), // e.g., 'colleague', 'classmate', 'mentor'
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Message schema for chat messages
export const messageSchema = z.object({
  _id: z.string().optional(),
  chat: z.string(), // Chat ID
  sender: z.string(), // User ID
  content: z.string().min(1).max(2000),
  type: z.enum(['text', 'image', 'file', 'link', 'system']).default('text'),
  media: z.object({
    url: z.string().url(),
    type: z.string(),
    size: z.number().optional(),
    caption: z.string().optional(),
  }).optional(),
  replyTo: z.string().optional(), // Message ID
  readBy: z.array(z.object({
    user: z.string(), // User ID
    timestamp: z.date(),
  })).default([]),
  editedAt: z.date().optional(),
  deletedAt: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
});

// Export insert schemas
export const insertUserSchema = userSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertCollegeSchema = collegeSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertEventSchema = eventSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertDonationSchema = donationSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertChatSchema = chatSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertPostSchema = postSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertConnectionSchema = connectionSchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const insertMessageSchema = messageSchema.omit({ _id: true, createdAt: true });

// Export types
export type User = z.infer<typeof userSchema>;
export type College = z.infer<typeof collegeSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Donation = z.infer<typeof donationSchema>;
export type Chat = z.infer<typeof chatSchema>;
export type Post = z.infer<typeof postSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type Message = z.infer<typeof messageSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCollege = z.infer<typeof insertCollegeSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertChat = z.infer<typeof insertChatSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertConnection = z.infer<typeof insertConnectionSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
