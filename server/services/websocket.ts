import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import Chat from '../models/Chat';

interface WSClient extends WebSocket {
  userId?: string;
  user?: any;
  isAlive?: boolean;
}

interface WSMessage {
  type: 'chat_message' | 'typing' | 'join_chat' | 'leave_chat' | 'connection_update' | 'notification';
  data: any;
  chatId?: string;
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export class WebSocketService {
  private wss: WebSocketServer;
  private clients = new Map<string, WSClient>();
  private chatRooms = new Map<string, Set<string>>();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ 
      server, 
      path: '/ws',
      verifyClient: this.verifyClient.bind(this)
    });

    this.wss.on('connection', this.handleConnection.bind(this));
    this.setupHeartbeat();
  }

  private async verifyClient(info: any): Promise<boolean> {
    try {
      const url = new URL(info.req.url, `http://${info.req.headers.host}`);
      const token = url.searchParams.get('token');
      
      if (!token) return false;

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId);
      
      return !!user;
    } catch (error) {
      return false;
    }
  }

  private async handleConnection(ws: WSClient, req: any) {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const token = url.searchParams.get('token');
      
      if (!token) {
        ws.close(1008, 'No token provided');
        return;
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        ws.close(1008, 'Invalid user');
        return;
      }

      ws.userId = user._id.toString();
      ws.user = user;
      ws.isAlive = true;
      
      this.clients.set(ws.userId, ws);

      ws.on('message', (data) => this.handleMessage(ws, data));
      ws.on('close', () => this.handleDisconnection(ws));
      ws.on('pong', () => { ws.isAlive = true; });

      // Send connection success
      this.sendToClient(ws.userId, {
        type: 'connection_update',
        data: { status: 'connected', userId: ws.userId }
      });

      console.log(`User ${user.username} connected to WebSocket`);
    } catch (error) {
      console.error('WebSocket connection error:', error);
      ws.close(1008, 'Authentication failed');
    }
  }

  private async handleMessage(ws: WSClient, data: Buffer) {
    try {
      const message: WSMessage = JSON.parse(data.toString());
      
      switch (message.type) {
        case 'join_chat':
          await this.handleJoinChat(ws, message.data.chatId);
          break;
          
        case 'leave_chat':
          this.handleLeaveChat(ws, message.data.chatId);
          break;
          
        case 'chat_message':
          await this.handleChatMessage(ws, message);
          break;
          
        case 'typing':
          this.handleTyping(ws, message);
          break;
          
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }

  private async handleJoinChat(ws: WSClient, chatId: string) {
    try {
      // Verify user is part of the chat
      const chat = await Chat.findById(chatId);
      if (!chat || !chat.participants.includes(new mongoose.Types.ObjectId(ws.userId!))) {
        return;
      }

      if (!this.chatRooms.has(chatId)) {
        this.chatRooms.set(chatId, new Set());
      }
      
      this.chatRooms.get(chatId)!.add(ws.userId!);
      
      this.sendToClient(ws.userId!, {
        type: 'join_chat',
        data: { chatId, status: 'joined' }
      });
    } catch (error) {
      console.error('Error joining chat:', error);
    }
  }

  private handleLeaveChat(ws: WSClient, chatId: string) {
    const room = this.chatRooms.get(chatId);
    if (room) {
      room.delete(ws.userId!);
      if (room.size === 0) {
        this.chatRooms.delete(chatId);
      }
    }
  }

  private async handleChatMessage(ws: WSClient, message: WSMessage) {
    try {
      const { chatId, content, type = 'text' } = message.data;
      
      // Verify user is part of the chat
      const chat = await Chat.findById(chatId);
      if (!chat || !chat.participants.includes(new mongoose.Types.ObjectId(ws.userId!))) {
        return;
      }

      // Create message document (you'll need a Message model)
      const messageDoc = {
        chat: chatId,
        sender: ws.userId,
        content,
        type,
        timestamp: new Date()
      };

      // Update last message in chat
      await Chat.findByIdAndUpdate(chatId, {
        lastMessage: {
          content,
          sender: ws.userId,
          timestamp: new Date(),
          type
        }
      });

      // Broadcast to chat room
      this.broadcastToChat(chatId, {
        type: 'chat_message',
        data: messageDoc
      });

    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  }

  private handleTyping(ws: WSClient, message: WSMessage) {
    const { chatId, isTyping } = message.data;
    
    this.broadcastToChat(chatId, {
      type: 'typing',
      data: {
        userId: ws.userId,
        username: ws.user?.username,
        isTyping,
        chatId
      }
    }, ws.userId);
  }

  private handleDisconnection(ws: WSClient) {
    if (ws.userId) {
      this.clients.delete(ws.userId);
      
      // Remove from all chat rooms
      for (const [chatId, users] of this.chatRooms.entries()) {
        users.delete(ws.userId);
        if (users.size === 0) {
          this.chatRooms.delete(chatId);
        }
      }
      
      console.log(`User ${ws.userId} disconnected from WebSocket`);
    }
  }

  private setupHeartbeat() {
    setInterval(() => {
      this.wss.clients.forEach((ws: WSClient) => {
        if (ws.isAlive === false) {
          return ws.terminate();
        }
        
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  }

  public sendToClient(userId: string, message: WSMessage) {
    const client = this.clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }

  public broadcastToChat(chatId: string, message: WSMessage, excludeUserId?: string) {
    const room = this.chatRooms.get(chatId);
    if (room) {
      room.forEach(userId => {
        if (userId !== excludeUserId) {
          this.sendToClient(userId, message);
        }
      });
    }
  }

  public broadcastToAll(message: WSMessage) {
    this.clients.forEach((client, userId) => {
      this.sendToClient(userId, message);
    });
  }

  public getConnectedUsers(): string[] {
    return Array.from(this.clients.keys());
  }

  public isUserOnline(userId: string): boolean {
    return this.clients.has(userId);
  }
}
