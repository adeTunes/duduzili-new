import React from "react";
import PostImage from "../homepage/posts/postImage";
import { Icon } from "@iconify/react";

function PersonalInformation() {
  return (
    <div className="flex flex-col gap-[25px] pb-[43px] border-b-[5px] border-b-[#F4F4F4]">
      <div className="flex flex-col">
        <PostImage
          image="/communities/community-picture.png"
          height="h-[240px]"
        />
        <div className="flex justify-between items-center pl-8">
          <div className="w-[150px] h-[150px] mt-[-70px]">
            <img
              src="/message/friend-avatar.png"
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          </div>
          <p
            role="button"
            className="px-6 py-4 flex items-center gap-2 rounded-[32px] font-medium text-white bg-duduzili-violet"
          >
            <Icon height={24} width={24} color="white" icon="uil:pen" />
            <span>Edit Profile</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className=" font-bold text-[32px] leading-6 text-[#2A2A2A]">
            Adekunle Babatunde
          </p>
          <p className="text-[#2A2A2A] text-[15px] leading-6">@adektunes</p>
        </div>
        <p className="text-[#8A8D88] text-[15px] leading-6">
          Hi there! I use Duduzili platform to chat with friends and family,
          send medias and receive updates!
        </p>
        <div className="flex items-center gap-10">
          <p className="flex items-center gap-2">
            <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
              2.3k
            </span>
            <span className="text-[12px] leading-[15px] text-[#757575]">
              Followers
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
              256
            </span>
            <span className="text-[12px] leading-[15px] text-[#757575]">
              Following
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
