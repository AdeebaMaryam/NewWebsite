import dotenv from "dotenv";
dotenv.config();
import { useState, useEffect, useRef, useCallback } from "react";

interface SocketMessage {
  type: string;
  data: any;
  chatId?: string;
  userId?: string;
}

interface UseSocketOptions {
  token?: string;
  onMessage?: (message: SocketMessage) => void;
}

export const useSocket = ({ token, onMessage }: UseSocketOptions = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (!token) return;

    setConnectionStatus("connecting");

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${process.env.NEXT_PUBLIC_WS_HOST || window.location.host}/ws?token=${token}`;

    try {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setConnectionStatus("connected");
        reconnectAttempts.current = 0;
      };

      socket.onmessage = (event) => {
        try {
          const message: SocketMessage = JSON.parse(event.data);
          onMessage?.(message);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason);
        setIsConnected(false);
        setConnectionStatus("disconnected");
        socketRef.current = null;

        // Attempt to reconnect if not intentionally closed
        if (
          event.code !== 1000 &&
          reconnectAttempts.current < maxReconnectAttempts
        ) {
          const delay = Math.pow(2, reconnectAttempts.current) * 1000; // Exponential backoff
          reconnectAttempts.current++;

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`);
            connect();
          }, delay);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnectionStatus("disconnected");
      };

      socketRef.current = socket;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setConnectionStatus("disconnected");
    }
  }, [token, onMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close(1000, "User disconnected");
      socketRef.current = null;
    }

    setIsConnected(false);
    setConnectionStatus("disconnected");
  }, []);

  const sendMessage = useCallback((message: SocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      return true;
    }
    console.warn("WebSocket is not connected. Message not sent:", message);
    return false;
  }, []);

  // Chat-specific methods
  const joinChat = useCallback(
    (chatId: string) => {
      return sendMessage({
        type: "join_chat",
        data: { chatId },
      });
    },
    [sendMessage],
  );

  const leaveChat = useCallback(
    (chatId: string) => {
      return sendMessage({
        type: "leave_chat",
        data: { chatId },
      });
    },
    [sendMessage],
  );

  const sendChatMessage = useCallback(
    (chatId: string, content: string, type: string = "text") => {
      return sendMessage({
        type: "chat_message",
        data: { chatId, content, type },
      });
    },
    [sendMessage],
  );

  const sendTyping = useCallback(
    (chatId: string, isTyping: boolean) => {
      return sendMessage({
        type: "typing",
        data: { chatId, isTyping },
      });
    },
    [sendMessage],
  );

  useEffect(() => {
    if (token) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [token, connect, disconnect]);

  return {
    isConnected,
    connectionStatus,
    sendMessage,
    joinChat,
    leaveChat,
    sendChatMessage,
    sendTyping,
    connect,
    disconnect,
  };
};
