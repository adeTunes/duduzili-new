import React, { useState } from "react";

function CommunityDescription({ text }) {
  const [truncate, setTruncate] = useState(true);
  return text?.length < 250 ? (
    <p>{text}</p>
  ) : (
    <p
      style={{ height: "max-content", transition: "height 2s" }}
      className=" text-[14px] leading-[38px]"
    >
      {truncate ? (
        <span>
          {text?.slice(0, 250)}
          ...
          <span
            className="ml-[5px] font-semibold text-[#4534B8] cursor-pointer"
            onClick={() => {
              setTruncate(false);
            }}
          >
            Read more
          </span>
        </span>
      ) : (
        <span>
          {text}
          <span
            className="ml-[5px] text-[#4534B8] font-semibold cursor-pointer"
            onClick={() => {
              setTruncate(true);
            }}
          >
            Read less
          </span>
        </span>
      )}
    </p>
  );
}

export default CommunityDescription;
