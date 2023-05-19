import Image from "next/image";
import React from "react";

function GroupMessageReceived() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <div className="h-[24px] w-[24px] self-end">
          <Image
            src="/message/friend-avatar.png"
            className="w-full h-full object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="bg-[#EDF0FB] rounded-r-2xl rounded-bl-2xl w-[60%] py-2 text-[#2A2A2A] px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </div>
      </div>
      <small className="text-[#757575] ml-7 text-[12px] leading-[15px]">
        10:00PM
      </small>
    </div>
  );
}

export default GroupMessageReceived;
