import React from "react";
import CommunityPicture from "./communityPicture";

function CommunityViewCard() {
  return (
    <div className="flex flex-col gap-[29px]">
      <CommunityPicture />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[9px]">
          <p className="font-bold text-[18px] flex flex-col gap-1 leading-[24px] text-[#2A2A2A]">
            <span>Socio-economic issues in Africa</span>
            <span className="text-[14px] leading-6 text-[#2A2A2A] font-normal">
              Joined 18/07/2022
            </span>
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
        <p className="text-[#4534B8] bg-[#EDF0FB] py-3 px-6 rounded-[32px] cursor-pointer">
          Leave
        </p>
      </div>
    </div>
  );
}

export default CommunityViewCard;
