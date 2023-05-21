import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

function GroupSingleEmojiReceived() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <div className="h-[24px] w-[24px] self-end">
          <img
            src="/message/friend-avatar.png"
            className="w-full h-full object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="bg-[#EDF0FB] leading-[30px] flex items-center gap-[13px] rounded-r-2xl rounded-bl-2xl w-fit py-[30.5px] text-[48px] px-[36.5px]">
          😁
        </div>
      </div>
      <small className="text-[#757575] ml-7 text-[12px] leading-[15px]">
        10:00PM
      </small>
    </div>
  );
}

export default GroupSingleEmojiReceived;
