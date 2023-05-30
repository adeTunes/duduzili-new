import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import React from "react";

function CommunityHeader({post, community}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[9px]">
        <p className="font-bold text-[18px] leading-[24px] text-[#2A2A2A]">
          {community?.name}
        </p>
        <div className="flex items-center gap-[19px]">
          <div className="w-[33px] h-[33px]">
            <img
              src={post?.user?.photo_url?.substring(62)}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>
          <span className="font-medium leading-6 text-[#2A2A2A]">{post?.user?.first_name} {post?.user?.last_name}</span>
          <span className="bg-[#2A2A2A] text-[14px] text-white px-2 rounded-2xl py-1">
          {post?.date.includes("now") ? post?.date : (post?.date.includes("days") || post?.date.includes("min") || post?.date.includes("sec") || post?.date.includes("hr")) ? `${post?.date} ago` : post?.date}
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

export default CommunityHeader;
