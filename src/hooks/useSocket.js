// src/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL; // Replace with your server URL
console.log("SOCKET", SOCKET_SERVER_URL);

const useSocket = () => {
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the Socket.IO server
    socketRef.current = io(SOCKET_SERVER_URL);

    // Handle connection and disconnection
    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return socketRef.current; // Return the socket instance
};

export default useSocket;
