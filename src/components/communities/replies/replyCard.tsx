import PostText from "@/components/homepage/posts/text";
import React from "react";
import CommunityPostTooltip from "../communityPostTooltip";

function ReplyCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex self-start gap-[19px] items-center">
        <img
          src="/homePage/profile-picture.png"
          className="w-[48px] h-[48px] rounded-full object-cover"
          alt=""
        />
        <p className=" font-semibold text-[18px] leading-6 text-[#2A2A2A]">
          Matthew James
        </p>
      </div>
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="ml-[67px] rounded-2xl p-6 flex flex-col gap-2 bg-white"
      >
        <PostText />
        <CommunityPostTooltip />
      </div>
    </div>
  );
}

export default ReplyCard;
