import { Icon } from "@iconify/react";
import { Heart, MessageText, TicketStar } from "iconsax-react";
import React from "react";

function PostFooter() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center py-3 px-4 gap-10 bg-[#F4F4F4] rounded-[40px]">
        <div className="flex items-center gap-2">
          <Heart size="24" color="#F5597F" variant="Bold" />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">21K</p>
        </div>
        <div className="flex items-center gap-2">
          <MessageText size="24" color="#2A2A2A" variant="Outline" />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">203</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon
            icon="material-symbols:google-plus-reshare"
            height={24}
            width={24}
            color="#2a2a2a"
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">107</p>
        </div>
      </div>
      <div className="bg-[#367EE8] cursor-pointer rounded-[40px] py-2 px-4 flex items-center gap-2">
        <TicketStar size="24" color="white" />
        <p className="text-white">23</p>
      </div>
    </div>
  );
}

export default PostFooter;
