import React from "react";
import { useNavigate } from "react-router-dom";

const ContactList = ({ users }) => {
  const navigate = useNavigate();

  // Handle navigation when a user is clicked, passing username via state
  const handleUserClick = (userId, username) =>
    navigate(`/chat/${userId}`, { state: { username } });

  return (
    <ul className="p-3 space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          onClick={() => handleUserClick(user.id, user.username)}
          className="py-3 px-4 bg-white rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {user.username}
            </span>
            {user?.isTyping && (
              <span className="text-xs text-green-600 italic">typing...</span>
            )}
          </div>
          {!user.isTyping && (
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{user.lastMessage || "No messages yet"}</span>
              <span>{user.lastMessageTime}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
