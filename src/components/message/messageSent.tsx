import React from "react";

function MessageSent() {
  return (
    <div className="flex flex-col gap-1">
      <div className=" bg-duduzili-violet self-end rounded-l-2xl rounded-br-2xl w-[60%] py-2 text-[#fff] px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </div>
      <small className="text-[#757575] self-end text-[12px] leading-[15px]">
        10:00PM
      </small>
    </div>
  );
}

export default MessageSent;
