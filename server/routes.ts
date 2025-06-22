import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import bcrypt from 'bcryptjs';
import { storage } from "./storage";
import { authenticateToken, generateToken, requireRole } from "./middleware/auth";
import { WebSocketService } from "./services/websocket";
import { insertUserSchema, insertEventSchema, insertPostSchema, insertConnectionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Initialize WebSocket service
  const wsService = new WebSocketService(httpServer);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const user = await storage.createUser(userData);
      const token = generateToken(user._id!);

      res.status(201).json({
        message: "User created successfully",
        user: { ...user, password: undefined },
        token
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user._id!);

      res.json({
        message: "Login successful",
        user: { ...user, password: undefined },
        token
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // User routes
  app.get("/api/users/search", authenticateToken, async (req: any, res) => {
    try {
      const { q, college, department, graduationYear, collegeType } = req.query;
      
      const filters: any = {};
      if (college) filters.college = college;
      if (department) filters.department = department;
      if (graduationYear) filters.graduationYear = parseInt(graduationYear);
      if (collegeType) filters.collegeType = collegeType;

      const users = await storage.searchUsers(q || "", filters);
      const sanitizedUsers = users.map(user => ({ ...user, password: undefined }));
      
      res.json({ users: sanitizedUsers });
    } catch (error) {
      console.error("Search users error:", error);
      res.status(500).json({ message: "Search failed" });
    }
  });

  app.get("/api/users/:id", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.put("/api/users/:id", authenticateToken, async (req: any, res) => {
    try {
      if (req.user._id !== req.params.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized to update this user" });
      }

      const updates = req.body;
      delete updates.password; // Don't allow password updates through this route
      delete updates._id;

      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // College routes
  app.get("/api/colleges", async (req, res) => {
    try {
      const { type } = req.query;
      const filters: any = {};
      if (type) filters.type = type;

      const colleges = await storage.getColleges(filters);
      res.json({ colleges });
    } catch (error) {
      console.error("Get colleges error:", error);
      res.status(500).json({ message: "Failed to get colleges" });
    }
  });

  app.get("/api/colleges/:id", async (req, res) => {
    try {
      const college = await storage.getCollege(req.params.id);
      if (!college) {
        return res.status(404).json({ message: "College not found" });
      }

      res.json({ college });
    } catch (error) {
      console.error("Get college error:", error);
      res.status(500).json({ message: "Failed to get college" });
    }
  });

  // Event routes
  app.get("/api/events", authenticateToken, async (req, res) => {
    try {
      const { type, college, startDate } = req.query;
      const filters: any = {};
      if (type) filters.type = type;
      if (college) filters.college = college;
      if (startDate) filters.startDate = startDate;

      const events = await storage.getEvents(filters);
      res.json({ events });
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ message: "Failed to get events" });
    }
  });

  app.post("/api/events", authenticateToken, async (req: any, res) => {
    try {
      const eventData = insertEventSchema.parse({
        ...req.body,
        organizer: req.user._id
      });

      const event = await storage.createEvent(eventData);
      res.status(201).json({ event });
    } catch (error: any) {
      console.error("Create event error:", error);
      res.status(400).json({ message: error.message || "Failed to create event" });
    }
  });

  app.get("/api/events/:id", authenticateToken, async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json({ event });
    } catch (error) {
      console.error("Get event error:", error);
      res.status(500).json({ message: "Failed to get event" });
    }
  });

  app.put("/api/events/:id", authenticateToken, async (req: any, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.organizer.toString() !== req.user._id && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized to update this event" });
      }

      const updates = req.body;
      delete updates._id;

      const updatedEvent = await storage.updateEvent(req.params.id, updates);
      res.json({ event: updatedEvent });
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  // Post routes
  app.get("/api/posts", authenticateToken, async (req, res) => {
    try {
      const { author, college, type, visibility, limit } = req.query;
      const filters: any = {};
      if (author) filters.author = author;
      if (college) filters.college = college;
      if (type) filters.type = type;
      if (visibility) filters.visibility = visibility;
      if (limit) filters.limit = parseInt(limit as string);

      const posts = await storage.getPosts(filters);
      res.json({ posts });
    } catch (error) {
      console.error("Get posts error:", error);
      res.status(500).json({ message: "Failed to get posts" });
    }
  });

  app.post("/api/posts", authenticateToken, async (req: any, res) => {
    try {
      const postData = insertPostSchema.parse({
        ...req.body,
        author: req.user._id
      });

      const post = await storage.createPost(postData);
      res.status(201).json({ post });
    } catch (error: any) {
      console.error("Create post error:", error);
      res.status(400).json({ message: error.message || "Failed to create post" });
    }
  });

  app.put("/api/posts/:id/like", authenticateToken, async (req: any, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const likes = post.engagement?.likes || [];
      const userIndex = likes.indexOf(req.user._id);
      
      if (userIndex > -1) {
        likes.splice(userIndex, 1);
      } else {
        likes.push(req.user._id);
      }

      const updatedPost = await storage.updatePost(req.params.id, {
        engagement: {
          likes: [],
          comments: [],
          shares: []
        }
      });

      res.json({ post: updatedPost });
    } catch (error) {
      console.error("Like post error:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  // Connection routes
  app.get("/api/connections", authenticateToken, async (req: any, res) => {
    try {
      const connections = await storage.getUserConnections(req.user._id);
      res.json({ connections });
    } catch (error) {
      console.error("Get connections error:", error);
      res.status(500).json({ message: "Failed to get connections" });
    }
  });

  app.post("/api/connections", authenticateToken, async (req: any, res) => {
    try {
      const connectionData = insertConnectionSchema.parse({
        ...req.body,
        requester: req.user._id
      });

      const connection = await storage.createConnection(connectionData);
      res.status(201).json({ connection });
    } catch (error: any) {
      console.error("Create connection error:", error);
      res.status(400).json({ message: error.message || "Failed to create connection" });
    }
  });

  app.put("/api/connections/:id", authenticateToken, async (req: any, res) => {
    try {
      const connection = await storage.getConnection(req.params.id);
      if (!connection) {
        return res.status(404).json({ message: "Connection not found" });
      }

      if (connection.recipient.toString() !== req.user._id) {
        return res.status(403).json({ message: "Unauthorized to update this connection" });
      }

      const updates = req.body;
      delete updates._id;

      const updatedConnection = await storage.updateConnection(req.params.id, updates);
      res.json({ connection: updatedConnection });
    } catch (error) {
      console.error("Update connection error:", error);
      res.status(500).json({ message: "Failed to update connection" });
    }
  });

  // Chat routes
  app.get("/api/chats", authenticateToken, async (req: any, res) => {
    try {
      const chats = await storage.getUserChats(req.user._id);
      res.json({ chats });
    } catch (error) {
      console.error("Get chats error:", error);
      res.status(500).json({ message: "Failed to get chats" });
    }
  });

  app.get("/api/chats/:id", authenticateToken, async (req: any, res) => {
    try {
      const chat = await storage.getChat(req.params.id);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      // Check if user is participant
      const isParticipant = chat.participants.some((p: any) => p._id.toString() === req.user._id);
      if (!isParticipant) {
        return res.status(403).json({ message: "Unauthorized to access this chat" });
      }

      res.json({ chat });
    } catch (error) {
      console.error("Get chat error:", error);
      res.status(500).json({ message: "Failed to get chat" });
    }
  });

  // Dashboard routes
  app.get("/api/dashboard", authenticateToken, async (req: any, res) => {
    try {
      const dashboardData = await storage.getDashboardData(req.user._id);
      res.json(dashboardData);
    } catch (error) {
      console.error("Get dashboard error:", error);
      res.status(500).json({ message: "Failed to get dashboard data" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getNetworkStats();
      res.json(stats);
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ message: "Failed to get network stats" });
    }
  });

  // Donation routes
  app.get("/api/donations", authenticateToken, async (req, res) => {
    try {
      const { status, category, donor } = req.query;
      const filters: any = {};
      if (status) filters.status = status;
      if (category) filters.category = category;
      if (donor) filters.donor = donor;

      const donations = await storage.getDonations(filters);
      res.json({ donations });
    } catch (error) {
      console.error("Get donations error:", error);
      res.status(500).json({ message: "Failed to get donations" });
    }
  });

  return httpServer;
}
