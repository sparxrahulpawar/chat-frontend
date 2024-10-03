import React from "react";

const ContactList = ({ users }) => {
  return (
    <ul className="p-3 space-y-2">
      {users.map((user, index) => (
        <li
          key={index}
          className="py-3 px-4 bg-white rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {user.name}
            </span>
            {user.isTyping && (
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
