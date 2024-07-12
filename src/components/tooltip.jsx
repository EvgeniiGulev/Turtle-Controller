import React from "react";

const Tooltip = ({ text, position }) => {
  const tooltipStyle = {
    position: "absolute",
    top: position.y,
    left: position.x,
    padding: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: "5px",
    color: "#fff",
    zIndex: 1000,
  };

  return <div style={tooltipStyle}>{text}</div>;
};

export default Tooltip;
