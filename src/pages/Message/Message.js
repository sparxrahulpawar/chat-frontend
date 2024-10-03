import React from "react";
import MessageHeader from "../../components/MessageHeader/MessageHeader";
import MessageInputArea from "../../components/MessageInputArea/MessageInputArea";
import "./Message.css"; // Import your CSS file for custom styles

const Message = ({ userId }) => {
  const messages = [
    { id: 1, sender: "User 1", text: "Hello!", time: "10:00 AM" },
    { id: 2, sender: "User 2", text: "Hi, how are you?", time: "10:01 AM" },
    {
      id: 3,
      sender: "User 1",
      text: "I'm good, thanks! And you?",
      time: "10:02 AM",
    },
    // Add more messages as needed
  ];

  return (
    <div className="flex flex-col h-screen bg-message-theme">
      {" "}
      {/* Use the theme class here */}
      <MessageHeader userId={userId} />
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg flex items-end ${
              message.sender === "User 1"
                ? "bg-blue-200 ml-auto"
                : "bg-gray-200 mr-auto"
            }`}
            style={{
              maxWidth: "40%",
              width: "fit-content",
              wordWrap: "break-word",
            }} // Set max width to 40% and adjust width
          >
            <div className="flex-1">
              {message.text} {/* Only display message text */}
            </div>
            <span className="text-sm text-gray-500 ml-2">{message.time}</span>
          </div>
        ))}
      </div>
      <MessageInputArea />
    </div>
  );
};

export default Message;
