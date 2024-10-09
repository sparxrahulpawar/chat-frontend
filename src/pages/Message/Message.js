import React, { useEffect, useState } from "react";
import MessageHeader from "../../components/MessageHeader/MessageHeader";
import MessageInputArea from "../../components/MessageInputArea/MessageInputArea";
import "./Message.css";
import { useLocation, useParams } from "react-router-dom";
import { formatTime } from "../../hooks/formatTime";
import { getUsernameFromToken } from "../../hooks/jwtDecode";
import { useSocket } from "../../context/SocketContext";

const Message = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { messages, sendMessage, fetchSavedMessages } = useSocket(); // Get messages, sendMessage, and fetchSavedMessages from the context

  const [username, setUsername] = useState("");
  const [senderId, setSenderId] = useState("");

  useEffect(() => {
    const senderData = getUsernameFromToken();
    if (senderData) {
      setSenderId(senderData.id);
    }

    const usernameParam = location.state?.username;
    if (usernameParam) {
      setUsername(usernameParam);
    }

    // Fetch saved messages when component mounts
    fetchSavedMessages(userId);
    // eslint-disable-next-line
  }, [userId, location.state]);

  return (
    <div className="flex flex-col h-screen bg-message-theme">
      <MessageHeader username={username} />
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg flex items-end ${
              message.senderId === parseInt(senderId)
                ? "bg-blue-200 ml-auto"
                : "bg-gray-200 mr-auto"
            }`}
            style={{
              maxWidth: "40%",
              width: "fit-content",
              wordWrap: "break-word",
            }}
          >
            <div className="flex-1">{message.text}</div>
            <span className="text-sm text-gray-500 ml-2">
              {formatTime(message.createdAt)}
            </span>
          </div>
        ))}
      </div>
      <MessageInputArea onSendMessage={sendMessage} senderId={senderId} />
    </div>
  );
};

export default Message;
