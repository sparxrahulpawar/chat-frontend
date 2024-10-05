import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const SidebarMainMenu = () => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const navigate = useNavigate();

  // Toggle the settings menu visibility
  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  // Handle Logout
  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {/* Top Menu Items */}
      <div className="flex-grow flex flex-col justify-start">
        <div className="flex items-center mb-4">
          <MdChat
            className="text-2xl text-blue-500 cursor-pointer focus:outline-none"
            data-tooltip-id="chatTooltip"
            data-tooltip-content="Chat"
          />
          <Tooltip id="chatTooltip" place="top-end" effect="solid" />
        </div>
        {/* Add more top menu items here */}
      </div>

      {/* Bottom Menu Items */}
      <div className="flex flex-col mb-2 relative">
        <div className="flex items-center mb-4">
          <FaUser
            className="text-2xl text-blue-500 cursor-pointer focus:outline-none"
            data-tooltip-id="userProfileTooltip"
            data-tooltip-content="Profile"
          />
          <Tooltip id="userProfileTooltip" place="top" effect="solid" />
        </div>

        {/* Settings Icon */}
        <div className="flex items-center relative">
          <FaCog
            className="text-2xl text-blue-500 cursor-pointer focus:outline-none"
            onClick={toggleSettingsMenu} // Handle click to toggle menu
            data-tooltip-id="settingsTooltip"
            data-tooltip-content="Settings"
          />
          <Tooltip id="settingsTooltip" place="top" effect="solid" />

          {/* Settings Dropdown */}
          {showSettingsMenu && (
            <div className="absolute bottom-10 left-0 bg-white shadow-lg rounded-lg p-2">
              <div
                onClick={HandleLogout}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaSignOutAlt className="text-xl text-red-500 mr-2" />
                <space>logout</space>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarMainMenu;
