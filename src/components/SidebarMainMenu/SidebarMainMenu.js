import React from "react";
import { FaUser, FaCog } from "react-icons/fa"; // Import icons from react-icons
import { MdChat } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const SidebarMainMenu = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {" "}
      {/* Ensure the background matches the sidebar */}
      {/* Top Menu Items */}
      <div className="flex-grow flex flex-col justify-start">
        <div className="flex items-center mb-4">
          <MdChat
            className="text-2xl text-blue-500 cursor-pointer"
            data-tooltip-id="chatTooltip"
            data-tooltip-content="Chat"
          />
          <Tooltip id="chatTooltip" place="top-end" effect="solid" />
        </div>
        {/* Add more top menu items here */}
      </div>
      {/* Bottom Menu Items */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center mb-4">
          <FaUser
            className="text-2xl text-blue-500 cursor-pointer"
            data-tooltip-id="userProfileTooltip"
            data-tooltip-content="profile"
          />
          <Tooltip id="userProfileTooltip" place="top" effect="solid" />
        </div>
        <div className="flex items-center">
          <FaCog
            className="text-2xl text-blue-500 cursor-pointer"
            data-tooltip-id="settingsTooltip"
            data-tooltip-content="Settings"
          />
          <Tooltip id="settingsTooltip" place="top" effect="solid" />
        </div>
      </div>
    </div>
  );
};

export default SidebarMainMenu;
