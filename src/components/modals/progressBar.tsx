import React from "react";

function ProgressBar({ isBlue, id }) {
  const barColor = isBlue ? "#2A2A2A" : "#BDBDBD";
  return (
    <div
      style={{
        backgroundColor: barColor,
        width: "2px",
        height: id % 2 === 0 ? "15px" : "6px",
        margin: "0 1px",
      }}
    />
  );
}

export default ProgressBar;
