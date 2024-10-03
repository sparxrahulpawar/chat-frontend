import React from "react";
import { FaSearch } from "react-icons/fa";

const SidebarSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="p-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full p-2 pl-10 pr-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <span className="absolute left-3 top-3 text-gray-400">
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SidebarSearch;
