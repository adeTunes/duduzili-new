import React from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { Flag, MicrophoneSlash } from "iconsax-react";
import {
  blockUserAction,
  muteUserAction,
  reportPostAction,
} from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";

function FriendProfileOptions({ post, setLoading }) {
  const fullName = `${post?.user?.first_name} ${post?.user?.last_name}`;
  const queryClient = useQueryClient();
  const personalPostOptions = [
    {
      name: `Mute ${fullName}`,
      icon: <MicrophoneSlash size="24" color="#2A2A2A" />,
      action: () =>
        muteUserAction(setLoading, post?.user?.id, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
    {
      name: `Report Post`,
      icon: <Flag size="24" color="#2A2A2A" />,
      action: () =>
        reportPostAction({ id: post?.id }, setLoading, () =>
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
  ];
  return (
    <Menu
      closeOnItemClick={false}
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-6 !px-8 !rounded-[24px] !w-[auto] !min-w-[20vw]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
        item: {
          "&[data-hovered]": {
            background: "none",
            cursor: "default",
          },
        },
      }}
    >
      <Menu.Target>
        <p
          role="button"
          className="px-6 py-4 flex items-center gap-2 rounded-[32px] font-medium bg-[#EDF0FB]"
        >
          <Icon
            icon="solar:menu-dots-bold"
            width={24}
            height={24}
            color="#4534B8"
          />
        </p>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
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
                  "flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
                )}
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default FriendProfileOptions;
