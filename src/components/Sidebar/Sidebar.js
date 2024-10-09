import React, { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa"; // Import the necessary icons
import { Tooltip } from "react-tooltip";
import ContactList from "../ContactList/ContactList";
import SidebarSearch from "../SidebarSearch/SidebarSearch";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getUsers } from "../../api/userApi";
import { getUsernameFromToken } from "../../hooks/jwtDecode";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [username, setUsername] = useState("");
  // const usersData = [
  //   {
  //     name: "Alice",
  //     lastMessage: "Hey, how are you?",
  //     lastMessageTime: "10:30 AM",
  //     isTyping: false,
  //   },
  //   {
  //     name: "Bob",
  //     lastMessage: "Let's meet tomorrow.",
  //     lastMessageTime: "9:15 AM",
  //     isTyping: false,
  //   },
  //   {
  //     name: "Charlie",
  //     lastMessage: "",
  //     lastMessageTime: "",
  //     isTyping: true,
  //   },
  // ];

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsersData(response.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Call the API when the component mounts
  useEffect(() => {
    const getUsername = getUsernameFromToken();
    if (getUsername) {
      setUsername(getUsername.username);
    }

    fetchUsers();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle refresh button click
  const handleRefreshClick = () => {
    fetchUsers();
  };
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 border-r shadow-lg h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-5 bg-white shadow-sm">
        {/* Profile Picture */}
        <div className="flex items-center">
          {/* Replace the icon with an image */}
          <img
            src={
              "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer transform transition duration-500 hover:scale-125 hover:flex justify-center items-center" // Adjust the size and shape as needed
          />
          <span className="ml-2 font-semibold text-gray-700 text-sm">
            {username}
          </span>
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-3">
          <FaSyncAlt
            onClick={handleRefreshClick}
            data-tooltip-id="refreshTooltip"
            data-tooltip-content="Refresh"
            className="text-sm text-gray-500 cursor-pointer hover:text-blue-500 focus:outline-none"
          />
          <Tooltip id="refreshTooltip" place="top" effect="light" />
          <BsThreeDotsVertical className="text-sm text-gray-500 cursor-pointer hover:text-blue-500" />
        </div>
      </div>
      {/* Use SearchBar component */}
      <SidebarSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Use ContactList component */}
      <ContactList users={usersData} />
    </aside>
  );
};

export default Sidebar;
