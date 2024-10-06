import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai"; // Importing the three-dot icon from react-icons

const MessageHeader = ({ username }) => {
  return (
    <header className="flex items-center justify-around p-4 bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        {/* Replace the span with an image */}
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          {/* Use an image here */}
          <img
            src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk`} // Example image URL; replace with your image source
            // src={`https://api.adorable.io/avatars/285/${username}.png`} // Example image URL; replace with your image source
            alt={`${username} avatar`}
            className="h-full w-full rounded-full"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            {username || "Unknown User"}
          </h1>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>

      {/* Add a search bar in the middle */}
      <div className="flex-1 mx-12">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Replace the button with a three-dot icon */}
      <div className="flex items-center">
        <AiOutlineEllipsis className="text-2xl cursor-pointer hover:text-blue-600" />
      </div>
    </header>
  );
};

export default MessageHeader;
