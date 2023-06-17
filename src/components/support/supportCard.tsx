import { Icon } from "@iconify/react";
import React from "react";

function SupportCard(props) {
  const { text, subText, icon } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-[#F6F5FB] h-10 min-w-[40px] min-h-[40px]  flex items-center justify-center w-10 rounded-full">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#2A2A2A] text-[12px] font-semibold leading-4">
            {text}
          </p>
          <p className="text-[#BDBDBD] text-[11px] leading-4">{subText}</p>
        </div>
      </div>
    </div>
  );
}

export default SupportCard;
