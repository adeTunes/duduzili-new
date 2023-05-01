import { Icon } from "@iconify/react";
import React from "react";

function TrendingCard() {
  return (
    <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-[18px] leading-[22px] text-[#2A2A2A]">
          Great wall of Benin
        </p>
        <p className="text-[#505050] leading-[19px]">3132 comments</p>
      </div>
      <Icon
        height={24}
        className="cursor-pointer"
        width={24}
        icon="carbon:overflow-menu-vertical"
      />
    </div>
  );
}

export default TrendingCard;
