import { Icon } from "@iconify/react";
import React from "react";

function AudioSent() {
  return (
    <div className="flex flex-col gap-1">
      <div className=" bg-duduzili-violet leading-[30px] flex items-center gap-[13px] self-end rounded-l-2xl rounded-br-2xl w-fit py-4 text-[48px] px-6">
        <div className="flex items-center justify-center border-[2px] cursor-pointer rounded-full border-solid border-white h-[37px] w-[37px]">
          <Icon
            height={18}
            width={18}
            icon="material-symbols:play-arrow"
            color="white"
          />
        </div>
        <small className="text-[16px] text-white font-medium leading-6">
          0:05
        </small>
      </div>
      <small className="text-[#757575] self-end text-[12px] leading-[15px]">
        10:00PM
      </small>
    </div>
  );
}

export default AudioSent;
