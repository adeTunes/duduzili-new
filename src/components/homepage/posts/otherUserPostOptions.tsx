import {
  blockUserAction,
  followUserAction,
  muteUserAction,
  savePostAction,
} from "@/actions/postOptionActions";
import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Flag, MicrophoneSlash, TicketStar, UserAdd } from "iconsax-react";
import React from "react";

function OtherUserPostOptions({ setLoading, open, post }) {
  const fullName = `${post?.user?.first_name} ${post?.user?.last_name}`;
  const queryClient = useQueryClient();
  const personalPostOptions = [
    {
      name: `${post?.user?.is_following ? "Unfollow" : "Follow"} ${fullName}`,
      icon: <UserAdd size="24" color="#2A2A2A" />,
      action: () =>
        followUserAction(setLoading, post?.user?.id, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
    {
      name: `Save post`,
      icon: (
        <Icon
          color="#2A2A2A"
          icon="circum:bookmark-minus"
          height={24}
          width={24}
        />
      ),
      action: () =>
        savePostAction(setLoading, post?.id, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
    {
      name: `Award ${fullName} a sticker`,
      icon: <TicketStar size="24" color="#2A2A2A" />,
      action: () => {},
    },
    {
      name: `Mute ${fullName}`,
      icon: <MicrophoneSlash size="24" color="#2A2A2A" />,
      action: () =>
        muteUserAction(setLoading, post?.user?.id, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
    {
      name: `Block ${fullName}`,
      icon: <Icon color="#D40000" icon="fe:disabled" height={24} width={24} />,
      action: () =>
        blockUserAction(setLoading, post?.user?.id, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
    {
      name: `Report Post`,
      icon: <Flag size="24" color="#2A2A2A" />,
      action: open,
    },
  ];
  return (
    <div className="flex flex-col">
      {personalPostOptions.map((item, idx, arr) => (
        <div
          key={idx}
          onClick={item.action}
          className={clsx(
            idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
            item.name.toLocaleLowerCase().includes("block") ||
              item.name.toLocaleLowerCase().includes("unblock")
              ? "text-[#D40000]"
              : "text-[#2A2A2A]",
            "flex items-center py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
          )}
          style={{
            paddingInline: "clamp(2px, 0.5vw, 20px)"
          }}
        >
          {item.icon}
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default OtherUserPostOptions;
