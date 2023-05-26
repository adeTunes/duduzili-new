import { Icon } from "@iconify/react";
import {
  AudioSquare,
  Gallery,
  Heart,
  MessageText,
  VideoSquare,
} from "iconsax-react";
import React from "react";

function TrendingPostAllMedia() {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inc sed do eiusmod tempor incsed do eiusmod tempor inc`;
  return (
    <div className="flex flex-col pb-4 gap-4 border-b border-b-[#DFDFDF]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-[40px] w-[40px]">
            <img
              src="/homePage/user-image.png"
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <span className="text-[#2A2A2A] font-semibold text-[12px]">
                John Doe
              </span>
              <span className=" text-duduzili-blue text-[12px]">@john_doe</span>
            </p>
            <span className="flex items-center gap-[10px]">
              <small className="text-[10px] leading-3 text-[#757575]">
                Dec 4
              </small>
              <span className="bg-[#2A2A2A] text-[8px] leading-[10px] text-white px-2 rounded-2xl py-1">
                2 days ago
              </span>
            </span>
          </div>
        </div>
        <Icon
          height={24}
          className="cursor-pointer"
          width={24}
          icon="carbon:overflow-menu-vertical"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-[5px]">
          <Gallery size="16" color="#757575" variant="Outline" />
          <VideoSquare size="16" color="#757575" variant="Outline" />
          <AudioSquare size="16" color="#757575" variant="Outline" />
        </div>
        <p className="text-[#2A2A2A] text-xs leading-[14px]">{text.length > 50 ? text.slice(0, 50) + "..." : text}</p>
      </div>
      <div className="flex w-full items-center py-2 px-3 gap-10 bg-[#DFE5FA] rounded-[40px]">
        <div className="flex items-center gap-[5px]">
          <Heart
            className="cursor-pointer"
            size="16"
            color="#F5597F"
            variant="Bold"
          />
          <p className=" text-[12px] text-[#2A2A2A] leading-[15px]">21k</p>
        </div>
        <div className="cursor-ponter flex items-center gap-[5px]">
          <MessageText
            className="cursor-pointer"
            size="16"
            color="#2A2A2A"
            variant="Outline"
          />
          <p className=" text-[12px] text-[#2A2A2A] leading-[15px]">30k</p>
        </div>
        <div className="flex items-center gap-[5px]">
          <Icon
            className="cursor-pointer"
            icon="material-symbols:google-plus-reshare"
            height={16}
            width={16}
            color="#2a2a2a"
          />
          <p className=" text-[12px] text-[#2A2A2A] leading-[15px]">50</p>
        </div>
      </div>
    </div>
  );
}

export default TrendingPostAllMedia;
