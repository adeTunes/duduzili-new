import React from "react";

function MessageSent({text, time}) {
  return (
    <div className="flex flex-col gap-1">
      <div className=" bg-duduzili-violet self-end rounded-l-2xl rounded-br-2xl w-[60%] py-2 text-[#fff] px-4">
        {text}
      </div>
      <small className="text-[#757575] self-end text-[12px] leading-[15px]">
        {time ? new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
      </small>
    </div>
  );
}

export default MessageSent;
