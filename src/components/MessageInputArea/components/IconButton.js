import React from "react";

const IconButton = ({ onClick, Icon, additionalClasses = "" }) => {
  return (
    <button
      className={`p-2 text-gray-500 hover:text-blue-500 ${additionalClasses}`}
      onClick={onClick}
    >
      <Icon size={20} />
    </button>
  );
};

export default IconButton;
