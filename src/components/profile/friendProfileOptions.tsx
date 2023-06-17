import React from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { Flag, MessageText, MicrophoneSlash } from "iconsax-react";
import {
  blockUserAction,
  muteUserAction,
  reportPostAction,
} from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import ReportUserModal from "../modals/reportUserModal";
import { useDisclosure } from "@mantine/hooks";

function FriendProfileOptions({ post, setLoading }) {
  const fullName = `${post?.user?.first_name} ${post?.user?.last_name}`;
  const queryClient = useQueryClient();
  const [opened, {open, close}] = useDisclosure(false)
  const personalPostOptions = [
    {
      name: `Message ${fullName}`,
      icon: <MessageText size="24" color="#2A2A2A" />,
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
      name: `Report ${fullName}`,
      icon: <Flag size="24" color="#2A2A2A" />,
      action: open
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
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-6  !rounded-[24px] !w-[auto] !min-w-[20vw]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          paddingInline: "clamp(5px, 1vw, 24px) !important"
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
          className="px-6 py-4 max-[500px]:px-3 max-[500px]:py-2 flex items-center gap-2 rounded-[32px] font-medium bg-[#EDF0FB]"
        >
          <Icon
            icon="solar:menu-dots-bold"
            className="max-[400px]:h-4 h-6 w-6 max-[400px]:w-4"
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
                  item.name.includes("Message") && "hidden max-[385px]:flex",
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
      <ReportUserModal id={post?.user?.id} close={close} opened={opened} />
    </Menu>
  );
}

export default FriendProfileOptions;
