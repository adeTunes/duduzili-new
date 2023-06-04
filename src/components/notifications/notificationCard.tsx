"use client";
import { Profile, TicketStar } from "iconsax-react";
import React from "react";
import CommentIcon from "../settings/commentIcon";
import { Text, clsx } from "@mantine/core";

function NotificationCard({
  title,
  day,
  action,
  unread,
}: {
  title: string;
  day: string;
  action: "like" | "sticker-reward" | "post-comment" | "friend-request";
  unread: boolean;
}) {
  const icons = {
    like: <Profile size="25" color="#4534B8" variant="TwoTone" />,
    "friend-request": <Profile size="25" color="#4534B8" variant="TwoTone" />,
    "sticker-reward": <TicketStar size="25" color="#4534B8" />,
    "post-comment": <CommentIcon height="25" width="25" />,
  };
  return (
    <div className="flex items-center justify-between py-4 border-b border-b-[#DFDFDF]">
      <div className="flex items-center gap-4">
        <div className="bg-[#F6F5FB] h-[50px]  flex items-center justify-center w-[50px] rounded-full">
          {icons[action]}
        </div>
        <div className="flex flex-col gap-2">
            <Text className={clsx(
              unread
                ? "text-[#2A2A2A] font-semibold"
                : "text-[#757575] font-medium",
              "leading-4"
            )} lineClamp={1}>{title}</Text>
            <span className=" leading-[19px] text-[#505050]">
              {day}
            </span>
        </div>
      </div>
      {action === "friend-request" && (
        <div className="flex items-center gap-4">
          <p className="cursor-pointer text-white font-medium leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
            Accept
          </p>
          <p className="cursor-pointer text-duduzili-violet font-medium leading-[15px] text-[12px] px-4 py-2 bg-[#EDF0FB] rounded-[32px]">
            Reject
          </p>
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
