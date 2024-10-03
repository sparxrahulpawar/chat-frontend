import React from "react";

const MessageHeader = ({ userId }) => {
  const userInitial = userId ? userId.charAt(0) : "?"; // Fallback if userId is undefined

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-lg font-bold">{userInitial}</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold">{userId || "Unknown User"}</h1> {/* Fallback if userId is undefined */}
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Add Friend
      </button>
    </header>
  );
};

export default MessageHeader;
