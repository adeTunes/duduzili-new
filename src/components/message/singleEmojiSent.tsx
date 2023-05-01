import { Icon } from "@iconify/react";
import React from "react";

function SingleEmojiSent() {
  return (
    <div className="flex flex-col gap-1">
      <div className=" bg-duduzili-violet leading-[30px] flex items-center gap-[13px] self-end rounded-l-2xl rounded-br-2xl w-fit py-[30.5px] text-[48px] px-[36.5px]">
        😁
      </div>
      <small className="text-[#757575] self-end text-[12px] leading-[15px]">
        10:00PM
      </small>
    </div>
  );
}

export default SingleEmojiSent;
