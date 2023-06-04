import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import { useAtomValue } from "jotai";
import React from "react";

function MessageMenu() {
  const user: any = useAtomValue(userDetails)
  return (
    <Menu
      shadow="md"
      width="auto"
      transitionProps={{transition: "slide-up", duration: 150}}
      classNames={{
        item: "!p-0",
        dropdown: "!pt-6 !rounded-[24px] !max-w-[400px] !left-[unset] !right-0 !w-[auto] !min-w-[270px]",
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
        <div
          role="button"
          className=" bg-[#4534B8] z-[400] relative rounded-[32px] px-6 py-3 flex items-center gap-2"
        >
          <Icon
            icon="ci:chat-conversation"
            height={36}
            width={36}
            color="white"
          />
          <p className="py-1 px-3 rounded-full bg-[#E59055] text-[15px] text-white">
            {user?.number_of_messages}
          </p>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MessageMenu;
