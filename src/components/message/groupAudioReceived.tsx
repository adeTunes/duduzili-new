import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

function GroupAudioReceived() {
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
        <div className="bg-[#EDF0FB] flex items-center gap-[13px] rounded-r-2xl rounded-bl-2xl w-fit py-4 text-[#2A2A2A] px-6">
          <div className="flex items-center justify-center border-[2px] cursor-pointer rounded-full border-solid border-duduzili-violet h-[37px] w-[37px]">
            <Icon
              height={18}
              width={18}
              icon="material-symbols:play-arrow"
              color="#4534B8"
            />
          </div>
          <small className="text-[16px] font-medium leading-6 text-black">
            0:05
          </small>
        </div>
      </div>
      <small className="text-[#757575] ml-7 text-[12px] leading-[15px]">
        10:00PM
      </small>
    </div>
  );
}

export default GroupAudioReceived;
