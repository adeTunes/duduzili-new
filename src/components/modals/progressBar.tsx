import React from "react";

function ProgressBar({ isBlue, id, height }) {
  const barColor = isBlue ? "#2A2A2A" : "#BDBDBD";
  return (
    <div
      style={{
        backgroundColor: barColor,
        width: "2px",
        height: `${height}px`,
        margin: "0 1px",
      }}
    />
  );
}

export default ProgressBar;
