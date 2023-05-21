import React from "react";
import CommunityPicture from "./communityPicture";
import { Icon } from "@iconify/react";
import Image from "next/image";

function CommunityViewCard({ communityMember }: { communityMember: boolean }) {
  return (
    <div className="flex flex-col gap-[29px]">
      <CommunityPicture />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[18px] flex flex-col gap-1 leading-[24px] text-[#2A2A2A]">
            <span>Socio-economic issues in Africa</span>
            <span className="text-[14px] leading-6 text-[#2A2A2A] font-normal">
              Joined 18/07/2022
            </span>
          </p>
          {communityMember ? (
            <p className=" bg-duduzili-orange h-[56px] pl-8 pr-6 flex items-center rounded-[32px] cursor-pointer">
              <span className="border-r border-r-[#fff] text-white font-medium pr-[7px] py-4">
                Leave
              </span>
              <span className="pl-[7px]">
                <Icon
                  color="#ffffff"
                  className=""
                  icon="ic:outline-keyboard-arrow-down"
                />
              </span>
            </p>
          ) : (
            <p className=" bg-duduzili-violet text-white font-medium px-6 py-4 rounded-[32px] cursor-pointer">
              Join
            </p>
          )}
        </div>
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
    </div>
  );
}

export default CommunityViewCard;
