import React from "react";

function MessageSent({text, time}) {
  return (
    <div className="flex flex-col gap-1">
      <p style={{wordBreak: "break-word"}} dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} className=" bg-duduzili-violet self-end rounded-l-2xl rounded-tr-2xl w-fit max-[580px]:max-w-[80%] max-w-[60%] py-2 text-[#fff] px-4">
      </p>
      <small className="text-[#757575] self-end text-[12px] leading-[15px]">
        {time ? new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
      </small>
    </div>
  );
}

export default MessageSent;
