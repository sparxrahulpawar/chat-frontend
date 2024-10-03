import React from "react";
import IconButton from "./IconButton";
import { FaFileAlt, FaPhotoVideo } from "react-icons/fa";

const OptionsMenu = ({ showOptions }) => {
  return (
    showOptions && (
      <div className="absolute bottom-16 left-0 flex flex-col space-y-2 p-2 bg-white border shadow-md rounded-lg">
        <IconButton Icon={FaFileAlt} />
        <IconButton Icon={FaPhotoVideo} />
      </div>
    )
  );
};

export default OptionsMenu;
