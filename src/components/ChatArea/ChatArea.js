import React from "react";

const ChatArea = () => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {/* Example chat messages */}
      <div className="mb-4">
        <div className="bg-blue-200 p-2 rounded-lg">Hello!</div>
      </div>
      <div className="mb-4">
        <div className="bg-gray-200 p-2 rounded-lg">Hi there!</div>
      </div>
    </div>
  );
};

export default ChatArea;
