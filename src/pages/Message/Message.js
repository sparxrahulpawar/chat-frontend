import React from "react";
import MessageHeader from "../../components/MessageHeader/MessageHeader";
import MessageInputArea from "../../components/MessageInputArea/MessageInputArea";

const Message = ({ userId }) => {
  const messages = [
    { id: 1, sender: "User 1", text: "Hello!" },
    { id: 2, sender: "User 2", text: "Hi, how are you?" },
    { id: 3, sender: "User 1", text: "I'm good, thanks! And you?" },
    // Add more messages as needed
  ];

  return (
    <div className="flex flex-col h-screen">
      <MessageHeader userId={userId} />
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.sender === "User 1" ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <MessageInputArea />
    </div>
  );
};

export default Message;
