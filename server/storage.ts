import mongoose from "mongoose";
import User from "./models/User";
import College from "./models/College";
import Event from "./models/Event";
import Donation from "./models/Donation";
import Chat from "./models/Chat";
import Post from "./models/Post";
import Connection from "./models/Connection";
import type {
  User as UserType,
  College as CollegeType,
  Event as EventType,
  Donation as DonationType,
  Chat as ChatType,
  Post as PostType,
  Connection as ConnectionType,
  InsertUser,
  InsertCollege,
  InsertEvent,
  InsertDonation,
  InsertChat,
  InsertPost,
  InsertConnection,
} from "@shared/schema";
import dotenv from "dotenv";
dotenv.config();
export interface IStorage {
  // User operations
  getUser(id: string): Promise<UserType | null>;
  getUserByUsername(username: string): Promise<UserType | null>;
  getUserByEmail(email: string): Promise<UserType | null>;
  createUser(user: InsertUser): Promise<UserType>;
  updateUser(id: string, updates: Partial<UserType>): Promise<UserType | null>;
  searchUsers(query: string, filters?: any): Promise<UserType[]>;

  // College operations
  getCollege(id: string): Promise<CollegeType | null>;
  getColleges(filters?: any): Promise<CollegeType[]>;
  createCollege(college: InsertCollege): Promise<CollegeType>;
  updateCollege(
    id: string,
    updates: Partial<CollegeType>,
  ): Promise<CollegeType | null>;

  // Event operations
  getEvent(id: string): Promise<EventType | null>;
  getEvents(filters?: any): Promise<EventType[]>;
  createEvent(event: InsertEvent): Promise<EventType>;
  updateEvent(
    id: string,
    updates: Partial<EventType>,
  ): Promise<EventType | null>;
  deleteEvent(id: string): Promise<boolean>;

  // Donation operations
  getDonation(id: string): Promise<DonationType | null>;
  getDonations(filters?: any): Promise<DonationType[]>;
  createDonation(donation: InsertDonation): Promise<DonationType>;
  updateDonation(
    id: string,
    updates: Partial<DonationType>,
  ): Promise<DonationType | null>;

  // Chat operations
  getChat(id: string): Promise<ChatType | null>;
  getUserChats(userId: string): Promise<ChatType[]>;
  createChat(chat: InsertChat): Promise<ChatType>;
  updateChat(id: string, updates: Partial<ChatType>): Promise<ChatType | null>;

  // Post operations
  getPost(id: string): Promise<PostType | null>;
  getPosts(filters?: any): Promise<PostType[]>;
  createPost(post: InsertPost): Promise<PostType>;
  updatePost(id: string, updates: Partial<PostType>): Promise<PostType | null>;
  deletePost(id: string): Promise<boolean>;

  // Connection operations
  getConnection(id: string): Promise<ConnectionType | null>;
  getUserConnections(userId: string): Promise<ConnectionType[]>;
  createConnection(connection: InsertConnection): Promise<ConnectionType>;
  updateConnection(
    id: string,
    updates: Partial<ConnectionType>,
  ): Promise<ConnectionType | null>;

  // Analytics
  getNetworkStats(): Promise<any>;
  getDashboardData(userId: string): Promise<any>;
}

export class MongoStorage implements IStorage {
  private static instance: MongoStorage;

  constructor() {
    this.initializeConnection();
  }

  public static getInstance(): MongoStorage {
    if (!MongoStorage.instance) {
      MongoStorage.instance = new MongoStorage();
    }
    return MongoStorage.instance;
  }

  private async initializeConnection() {
    try {
      const mongoUri = process.env.MONGODB_URI;

      if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
      }

      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  // Helper method to convert MongoDB documents to proper types
  private convertDocToType<T>(doc: any): T | null {
    if (!doc) return null;

    // Convert ObjectIds to strings recursively
    const convertObjectIds = (obj: any): any => {
      if (!obj) return obj;

      if (Array.isArray(obj)) {
        return obj.map(convertObjectIds);
      }

      if (typeof obj === "object") {
        // Check if it's an ObjectId
        if (obj._id && typeof obj._id.toString === "function") {
          obj._id = obj._id.toString();
        }

        // Handle specific ObjectId properties
        const converted: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (
            value &&
            typeof value === "object" &&
            value.toString &&
            value.constructor &&
            value.constructor.name === "ObjectId"
          ) {
            converted[key] = value.toString();
          } else if (Array.isArray(value)) {
            converted[key] = value.map((item) =>
              item &&
              typeof item === "object" &&
              item.toString &&
              item.constructor &&
              item.constructor.name === "ObjectId"
                ? item.toString()
                : convertObjectIds(item),
            );
          } else if (typeof value === "object") {
            converted[key] = convertObjectIds(value);
          } else {
            converted[key] = value;
          }
        }
        return converted;
      }

      return obj;
    };

    return convertObjectIds(JSON.parse(JSON.stringify(doc))) as T;
  }

  // User operations
  async getUser(id: string): Promise<UserType | null> {
    try {
      const user = await User.findById(id).lean();
      return this.convertDocToType<UserType>(user);
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<UserType | null> {
    try {
      const user = await User.findOne({ username }).lean();
      return this.convertDocToType<UserType>(user);
    } catch (error) {
      console.error("Error getting user by username:", error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserType | null> {
    try {
      const user = await User.findOne({ email }).lean();
      return this.convertDocToType<UserType>(user);
    } catch (error) {
      console.error("Error getting user by email:", error);
      return null;
    }
  }

  async createUser(user: InsertUser): Promise<UserType> {
    try {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      return this.convertDocToType<UserType>(savedUser.toObject())!;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async updateUser(
    id: string,
    updates: Partial<UserType>,
  ): Promise<UserType | null> {
    try {
      const user = await User.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return this.convertDocToType<UserType>(user);
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

  async searchUsers(query: string, filters: any = {}): Promise<UserType[]> {
    try {
      const searchCriteria: any = {
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } },
          { "professional.currentCompany": { $regex: query, $options: "i" } },
          { "professional.skills": { $regex: query, $options: "i" } },
        ],
      };

      if (filters.college) {
        searchCriteria["education.college"] = filters.college;
      }
      if (filters.graduationYear) {
        searchCriteria["education.graduationYear"] = filters.graduationYear;
      }
      if (filters.department) {
        searchCriteria["education.department"] = filters.department;
      }

      const users = await User.find(searchCriteria).limit(50).lean();
      return users
        .map((user) => this.convertDocToType<UserType>(user))
        .filter(Boolean) as UserType[];
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  }

  // College operations
  async getCollege(id: string): Promise<CollegeType | null> {
    try {
      const college = await College.findById(id).lean();
      return college as any;
    } catch (error) {
      console.error("Error getting college:", error);
      return null;
    }
  }

  async getColleges(filters: any = {}): Promise<CollegeType[]> {
    try {
      const query = filters.type
        ? { type: filters.type, isActive: true }
        : { isActive: true };
      const colleges = await College.find(query).sort({ name: 1 }).lean();
      return colleges as any;
    } catch (error) {
      console.error("Error getting colleges:", error);
      return [];
    }
  }

  async createCollege(college: InsertCollege): Promise<CollegeType> {
    try {
      const newCollege = new College(college);
      const savedCollege = await newCollege.save();
      return savedCollege.toObject() as any;
    } catch (error) {
      console.error("Error creating college:", error);
      throw error;
    }
  }

  async updateCollege(
    id: string,
    updates: Partial<CollegeType>,
  ): Promise<CollegeType | null> {
    try {
      const updated = await College.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return updated as any;
    } catch (error) {
      console.error("Error updating college:", error);
      return null;
    }
  }

  // Event operations
  async getEvent(id: string): Promise<EventType | null> {
    try {
      const event = await Event.findById(id)
        .populate("organizer", "firstName lastName username")
        .populate("college", "name type")
        .lean();
      return event as any;
    } catch (error) {
      console.error("Error getting event:", error);
      return null;
    }
  }

  async getEvents(filters: any = {}): Promise<EventType[]> {
    try {
      const query: any = { status: "published" };

      if (filters.type) query.type = filters.type;
      if (filters.college) query.college = filters.college;
      if (filters.startDate) {
        query.startDate = { $gte: new Date(filters.startDate) };
      }

      const events = await Event.find(query)
        .populate("organizer", "firstName lastName username")
        .populate("college", "name type")
        .sort({ startDate: 1 })
        .lean();
      return events as any;
    } catch (error) {
      console.error("Error getting events:", error);
      return [];
    }
  }

  async createEvent(event: InsertEvent): Promise<EventType> {
    try {
      const newEvent = new Event(event);
      const savedEvent = await newEvent.save();
      return savedEvent.toObject() as any;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  async updateEvent(
    id: string,
    updates: Partial<EventType>,
  ): Promise<EventType | null> {
    try {
      const updated = await Event.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return updated as any;
    } catch (error) {
      console.error("Error updating event:", error);
      return null;
    }
  }

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const result = await Event.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  }

  // Donation operations
  async getDonation(id: string): Promise<DonationType | null> {
    try {
      const donation = await Donation.findById(id)
        .populate("donor", "firstName lastName username")
        .lean();
      return donation as any;
    } catch (error) {
      console.error("Error getting donation:", error);
      return null;
    }
  }

  async getDonations(filters: any = {}): Promise<DonationType[]> {
    try {
      const query: any = {};

      if (filters.donor) query.donor = filters.donor;
      if (filters.status) query.status = filters.status;
      if (filters.category) query["campaign.category"] = filters.category;

      const donations = await Donation.find(query)
        .populate("donor", "firstName lastName username")
        .sort({ createdAt: -1 })
        .lean();
      return donations as any;
    } catch (error) {
      console.error("Error getting donations:", error);
      return [];
    }
  }

  async createDonation(donation: InsertDonation): Promise<DonationType> {
    try {
      const newDonation = new Donation(donation);
      const savedDonation = await newDonation.save();
      return savedDonation.toObject() as any;
    } catch (error) {
      console.error("Error creating donation:", error);
      throw error;
    }
  }

  async updateDonation(
    id: string,
    updates: Partial<DonationType>,
  ): Promise<DonationType | null> {
    try {
      const updated = await Donation.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return updated as any;
    } catch (error) {
      console.error("Error updating donation:", error);
      return null;
    }
  }

  // Chat operations
  async getChat(id: string): Promise<ChatType | null> {
    try {
      const chat = await Chat.findById(id)
        .populate("participants", "firstName lastName username profile.avatar")
        .lean();
      return chat as any;
    } catch (error) {
      console.error("Error getting chat:", error);
      return null;
    }
  }

  async getUserChats(userId: string): Promise<ChatType[]> {
    try {
      const chats = await Chat.find({ participants: userId })
        .populate("participants", "firstName lastName username profile.avatar")
        .sort({ "lastMessage.timestamp": -1 })
        .lean();
      return chats as any;
    } catch (error) {
      console.error("Error getting user chats:", error);
      return [];
    }
  }

  async createChat(chat: InsertChat): Promise<ChatType> {
    try {
      const newChat = new Chat(chat);
      const savedChat = await newChat.save();
      return savedChat.toObject() as any;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  async updateChat(
    id: string,
    updates: Partial<ChatType>,
  ): Promise<ChatType | null> {
    try {
      const updated = await Chat.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return updated as any;
    } catch (error) {
      console.error("Error updating chat:", error);
      return null;
    }
  }

  // Post operations
  async getPost(id: string): Promise<PostType | null> {
    try {
      const post = await Post.findById(id)
        .populate("author", "firstName lastName username profile.avatar")
        .populate("college", "name type")
        .lean();
      return post as any;
    } catch (error) {
      console.error("Error getting post:", error);
      return null;
    }
  }

  async getPosts(filters: any = {}): Promise<PostType[]> {
    try {
      const query: any = {};

      if (filters.author) query.author = filters.author;
      if (filters.college) query.college = filters.college;
      if (filters.type) query.type = filters.type;
      if (filters.visibility) query.visibility = filters.visibility;

      const posts = await Post.find(query)
        .populate("author", "firstName lastName username profile.avatar")
        .populate("college", "name type")
        .sort({ createdAt: -1 })
        .limit(filters.limit || 50)
        .lean();
      return posts as any;
    } catch (error) {
      console.error("Error getting posts:", error);
      return [];
    }
  }

  async createPost(post: InsertPost): Promise<PostType> {
    try {
      const newPost = new Post(post);
      const savedPost = await newPost.save();
      return savedPost.toObject() as any;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(
    id: string,
    updates: Partial<PostType>,
  ): Promise<PostType | null> {
    try {
      const updated = await Post.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return updated as any;
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  }

  async deletePost(id: string): Promise<boolean> {
    try {
      const result = await Post.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  // Connection operations
  async getConnection(id: string): Promise<ConnectionType | null> {
    try {
      const connection = await Connection.findById(id)
        .populate("requester", "firstName lastName username profile.avatar")
        .populate("recipient", "firstName lastName username profile.avatar")
        .lean();
      return connection as any;
    } catch (error) {
      console.error("Error getting connection:", error);
      return null;
    }
  }

  async getUserConnections(userId: string): Promise<ConnectionType[]> {
    try {
      const connections = await Connection.find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: "accepted",
      })
        .populate("requester", "firstName lastName username profile.avatar")
        .populate("recipient", "firstName lastName username profile.avatar")
        .lean();
      return connections as any;
    } catch (error) {
      console.error("Error getting user connections:", error);
      return [];
    }
  }

  async createConnection(
    connection: InsertConnection,
  ): Promise<ConnectionType> {
    try {
      const newConnection = new Connection(connection);
      const savedConnection = await newConnection.save();
      return savedConnection.toObject() as any;
    } catch (error) {
      console.error("Error creating connection:", error);
      throw error;
    }
  }

  async updateConnection(
    id: string,
    updates: Partial<ConnectionType>,
  ): Promise<ConnectionType | null> {
    try {
      const updated = await Connection.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      return updated as any;
    } catch (error) {
      console.error("Error updating connection:", error);
      return null;
    }
  }

  // Analytics
  async getNetworkStats(): Promise<any> {
    try {
      const [totalUsers, totalColleges, totalEvents, totalDonations] =
        await Promise.all([
          User.countDocuments(),
          College.countDocuments({ isActive: true }),
          Event.countDocuments({ status: "published" }),
          Donation.countDocuments({ status: "completed" }),
        ]);

      const activeUsers = await User.countDocuments({
        updatedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      });

      const totalDonationAmount = await Donation.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      return {
        totalUsers,
        totalColleges,
        totalEvents,
        totalDonations,
        activeUsers,
        totalDonationAmount: totalDonationAmount[0]?.total || 0,
      };
    } catch (error) {
      console.error("Error getting network stats:", error);
      return {};
    }
  }

  async getDashboardData(userId: string): Promise<any> {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      const [connections, chats, posts, events] = await Promise.all([
        this.getUserConnections(userId),
        this.getUserChats(userId),
        this.getPosts({ author: userId, limit: 10 }),
        this.getEvents({ college: user.education.college }),
      ]);

      const recentActivity = await Post.find({
        $or: [
          { author: userId },
          { "engagement.likes": userId },
          { "engagement.comments.author": userId },
        ],
      })
        .populate("author", "firstName lastName username")
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      return {
        user,
        connections: connections.length,
        chats: chats.length,
        posts: posts.length,
        upcomingEvents: events.filter((e) => new Date(e.startDate) > new Date())
          .length,
        recentActivity,
      };
    } catch (error) {
      console.error("Error getting dashboard data:", error);
      return null;
    }
  }
}

export const storage = MongoStorage.getInstance();
