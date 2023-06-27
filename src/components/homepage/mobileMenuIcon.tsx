import React from "react";

function MobileMenuIcon({className}: {className: string}) {
  return (
    <svg
    className={className}
      viewBox="0 0 21 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 11.5H19.75M1 6.5H19.75M1 1.5H13.5"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MobileMenuIcon;
