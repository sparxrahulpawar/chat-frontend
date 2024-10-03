import React from "react";

const Tooltip = ({ text, children, position = "top" }) => {
  const tooltipPosition = {
    top: "bottom-full mb-2",
    right: "left-full ml-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
  };

  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div
        className={`absolute ${tooltipPosition[position]} w-auto p-1 text-white bg-gray-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
