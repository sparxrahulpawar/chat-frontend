import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import { getUsernameFromToken } from "../hooks/jwtDecode";
import { getMessagesByUserId } from "../api/messageAPI";
import debounce from "lodash.debounce";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState({});
  const [typingStatus, setTypingStatus] = useState({});

  const token = getUsernameFromToken();
  const userId = token?.id;

  useEffect(() => {
    if (userId) {
      const newSocket = io(process.env.REACT_APP_SOCKET_IO_BACKEND_BASE_URL, {
        reconnection: true, // Enables auto-reconnection if the connection drops
        timeout: 5000, // Timeout for socket connection
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        newSocket.emit("register_user", userId);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      newSocket.on("user_status", ({ userId, status, lastOnline }) => {
        setUserStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: { status, lastOnline },
        }));
      });

      newSocket.on("user_typing", ({ senderId }) => {
        setTypingStatus((prevStatus) => ({ ...prevStatus, [senderId]: true }));
      });

      newSocket.on("user_stop_typing", ({ senderId }) => {
        setTypingStatus((prevStatus) => ({ ...prevStatus, [senderId]: false }));
      });

      newSocket.on("receive_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      setSocket(newSocket);

      return () => {
        newSocket.off("connect");
        newSocket.off("disconnect");
        newSocket.off("user_status");
        newSocket.off("user_typing");
        newSocket.off("user_stop_typing");
        newSocket.off("receive_message");
        newSocket.off("connect_error");
        newSocket.disconnect();
      };
    }
  }, [userId]);

  const fetchSavedMessages = useCallback(async (userId) => {
    try {
      const response = await getMessagesByUserId(userId);
      setMessages(response.messages);
    } catch (error) {
      console.error("Error fetching saved messages:", error);
    }
  }, []);

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("send_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    }
  };

  const handleTyping = debounce((receiverId) => {
    if (socket) {
      socket.emit("typing", { senderId: userId, receiverId });
    }
  }, 500); // Debouncing typing events to avoid rapid emissions

  const handleStopTyping = (receiverId) => {
    if (socket) {
      socket.emit("stop_typing", {
        senderId: userId,
        receiverId,
      });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        sendMessage,
        fetchSavedMessages,
        userStatus,
        typingStatus,
        handleTyping,
        handleStopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
