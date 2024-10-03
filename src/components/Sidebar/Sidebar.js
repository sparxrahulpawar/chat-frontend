import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 border-r shadow-lg h-screen overflow-y-auto">
      <div className="p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-700">Contacts</h2>
      </div>
      <ul className="p-4 space-y-2">
        {["User 1", "User 2", "User 3"].map((user, index) => (
          <li
            key={index}
            className="py-3 px-4 bg-white rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <span className="font-medium text-gray-700">{user}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
