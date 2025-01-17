// frontend/src/services/socketService.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

class SocketService {
  socket = null;

  connect() {
    this.socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onTaskAdded(callback) {
    if (this.socket) {
      this.socket.on("taskAdded", (data) => {
        console.log("Task added event received:", data);
        callback(data);
      });
    }
  }

  onTaskUpdated(callback) {
    if (this.socket) {
      this.socket.on("taskUpdated", (data) => {
        console.log("Task updated event received:", data);
        callback(data);
      });
    }
  }

  onTaskDeleted(callback) {
    if (this.socket) {
      this.socket.on("taskDeleted", (data) => {
        console.log("Task deleted event received:", data);
        callback(data);
      });
    }
  }
}

export default new SocketService();
