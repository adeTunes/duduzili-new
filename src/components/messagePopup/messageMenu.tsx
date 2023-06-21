import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import FriendList from "./friendList";
import AddGroupMembers from "./addGroupMembers";
import GroupChatView from "./groupChatView";

function MessageMenu() {
  const user: any = useAtomValue(userDetails);
  const [action, setAction] = useState("friend-list");
  const [tab, setTab] = useState(0)
  return (
    <Menu
      shadow="md"
      width="auto"
      closeOnItemClick={false}
      onClose={() => {
        setAction("friend-list");
      }}
      transitionProps={{ transition: "slide-up", duration: 150 }}
      classNames={{
        item: "!p-0 !h-full",
        itemLabel: "!h-full",
        dropdown:
          "!pt-6 !rounded-[24px] message-container !h-[623px] !max-w-[400px] !left-[unset] !right-0 !w-[auto] max-[430px]:min-w-fit min-w-[400px]",
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
          className=" bg-[#4534B8] z-[400] relative rounded-[32px] px-6 py-3 max-[500px]:py-[6px] max-[500px]:px-3 flex items-center gap-2"
        >
          <Icon
            icon="ci:chat-conversation"
            className="w-[36px] h-[36px] max-[500px]:w-[20px] max-[500px]:h-[20px]"
            color="white"
          />
          <p className="py-1 px-3 max-[500px]:py-[2px] max-[500px]:px-[8px] rounded-full bg-[#E59055] text-[15px] text-white">
            {user?.number_of_messages}
          </p>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          {action === "friend-list" ? (
            <FriendList tab={tab} setTab={setTab} setAction={setAction} user={user} />
          ) : action === "add-group-members" ? (
            <AddGroupMembers setAction={setAction} />
          ) : action === "group-chat-view" ? (
            <GroupChatView setTab={setTab} setAction={setAction} />
          ) : null}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MessageMenu;
