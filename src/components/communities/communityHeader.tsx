import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

function CommunityHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[9px]">
        <p className="font-bold text-[18px] leading-[24px] text-[#2A2A2A]">
          Socio-economic issues in Africa
        </p>
        <div className="flex items-center gap-[19px]">
          <div className="flex">
            <img
              src="/homePage/ellipse-1.png"
              className="w-[33px] h-[33px] object-cover rounded-full"
              alt=""
            />
            <img
              src="/homePage/ellipse-2.png"
              className="w-[33px] h-[33px] object-cover rounded-full ml-[-20px]"
              alt=""
            />
            <img
              src="/homePage/ellipse-3.png"
              className="w-[33px] h-[33px] object-cover rounded-full ml-[-20px]"
              alt=""
            />
          </div>
          <p className="leading-[24px] text-[#2A2A2A]">43 members</p>
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

export default CommunityHeader;
