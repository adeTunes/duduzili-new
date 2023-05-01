import { Icon } from "@iconify/react";
import React from "react";

function PostHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-[56px] w-[56px]">
          <img
            src="/homePage/user-image.png"
            className="w-full h-full object-cover rounded-full"
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2">
            <span className="text-[#2A2A2A] font-semibold text-[18px]">
              John Doe
            </span>
            <span className=" text-duduzili-blue">@Johnnyboy</span>
          </p>
          <span className="flex items-center gap-1">
            <small>Dec 4</small>
            <span className="bg-[#2A2A2A] text-white px-2 rounded-2xl py-1">
              2d ago
            </span>
          </span>
        </div>
      </div>
      <Icon
        icon="solar:menu-dots-bold"
        height={24}
        width={24}
        rotate={1}
        className="cursor-pointer"
      />
    </div>
  );
}

export default PostHeader;
