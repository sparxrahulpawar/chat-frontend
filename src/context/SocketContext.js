import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getUsernameFromToken } from "../hooks/jwtDecode";
import { getMessagesByUserId } from "../api/messageAPI";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // Manage both saved and real-time messages

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io(process.env.REACT_APP_SOCKET_IO_BACKEND_BASE_URL);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      const token = getUsernameFromToken();
      const userId = token.id; // Get the user ID from your authentication context or local storage
      newSocket.emit("register_user", userId); // Register user after connecting
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Listen for real-time messages and add to the state
    newSocket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch saved messages from the server for the selected user
  const fetchSavedMessages = async (userId) => {
    try {
      const response = await getMessagesByUserId(userId); // Fetch messages by userId
      setMessages(response.messages); // Set saved messages in state
    } catch (error) {
      console.error("Error fetching saved messages:", error);
    }
  };

  // Function to send a message
  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("send_message", messageData); // Send message via socket
      setMessages((prevMessages) => [...prevMessages, messageData]); // Add sent message to state
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, messages, sendMessage, fetchSavedMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Hook to use the SocketContext
export const useSocket = () => {
  return useContext(SocketContext);
};
