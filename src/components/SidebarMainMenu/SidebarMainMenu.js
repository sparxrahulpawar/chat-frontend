import React from "react";
import { FaUser, FaCog, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons
import Tooltip from "../Tooltip/Tooltip";
import { MdChat } from "react-icons/md";

const SidebarMainMenu = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {" "}
      {/* Ensure the background matches the sidebar */}
      {/* Top Menu Items */}
      <div className="flex-grow flex flex-col justify-start">
        <div className="flex items-center mb-4">
          <Tooltip text="message" position="right">
            <MdChat className="text-2xl text-blue-500 cursor-pointer" />
          </Tooltip>
        </div>
        {/* Add more top menu items here */}
      </div>
      {/* Bottom Menu Items */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center mb-4">
          <Tooltip text="profile" position="right">
            <FaUser className="text-2xl text-blue-500 cursor-pointer" />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <Tooltip text="settins" position="right">
            <FaCog className="text-2xl text-blue-500 cursor-pointer" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SidebarMainMenu;
