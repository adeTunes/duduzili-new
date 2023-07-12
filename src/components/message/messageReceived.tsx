import React from "react";

function MessageReceived({time, text}) {
  return (
    <div className="flex flex-col gap-1">
      <p style={{wordBreak: "break-word"}} dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} className="bg-[#EDF0FB] rounded-r-2xl rounded-tl-2xl max-[580px]:max-w-[80%] !max-w-[60%] !w-fit py-2 text-[#2A2A2A] px-4">

      </p>
      <small className="text-[#757575] text-[12px] leading-[15px]">
      {time ? new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
      </small>
    </div>
  );
}

export default MessageReceived;
