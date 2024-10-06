import React, { useEffect, useState } from "react";
import MessageHeader from "../../components/MessageHeader/MessageHeader";
import MessageInputArea from "../../components/MessageInputArea/MessageInputArea";
import "./Message.css"; // Import your CSS file for custom styles
import { useLocation, useParams } from "react-router-dom";
import { getMessagesByUserId } from "../../api/messageAPI";
import toast from "react-hot-toast";
import { formatTime } from "../../hooks/formatTime";

const Message = () => {
  const { userId } = useParams();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await getMessagesByUserId(userId);
      console.log(response);
      setMessages(response.messages);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Internal server error");
    }
  };
  useEffect(() => {
    const usernameParam = location.state?.username;

    if (usernameParam) {
      setUsername(usernameParam); // Set the username state if it exists
    }
    fetchMessages();
  }, [userId, location.state]);

  return (
    <div className="flex flex-col h-screen bg-message-theme">
      {" "}
      {/* Use the theme class here */}
      <MessageHeader username={username} />
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg flex items-end ${
              message.senderId === parseInt(userId)
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
      <MessageInputArea />
    </div>
  );
};

export default Message;
