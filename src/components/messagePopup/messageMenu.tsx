import { popupFriendList, popupTotalUnread, userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import FriendList from "./friendList";
import AddGroupMembers from "./addGroupMembers";
import GroupChatView from "./groupChatView";
import useConversations from "../../../hooks/use-conversations";

function MessageMenu() {
  const user: any = useAtomValue(userDetails);
  const [action, setAction] = useState("friend-list");
  const [tab, setTab] = useState(0);
  const setFriendList: any = useSetAtom(popupFriendList);
  const { data, isLoading, refetch } = useConversations();
  const [totalUnread, setTotalUnread] = useAtom(popupTotalUnread);

  useEffect(() => {
    if (data) {
      setFriendList({ isLoading, data });
      setTotalUnread(
        data?.reduce((acc, item) => {
          const eachTotal = item?.get_messages?.filter(
            (item) => item?.receiver?.id === user?.user?.id && !item?.read
          )?.length;
          acc += eachTotal;
          return acc;
        }, 0)
      );
    }
  }, [data]);
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
          "!pt-6 !rounded-[24px] message-container !max-w-[400px] !left-[unset] !right-0 !w-[auto] max-[430px]:min-w-fit min-w-[400px]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          height: "min(80vh, 500px)",
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
          className=" bg-[#4534B8] z-[200] relative rounded-[32px] px-6 py-3 max-[500px]:py-[6px] max-[500px]:px-3 flex items-center gap-2"
        >
          <Icon
            icon="ci:chat-conversation"
            className="w-[36px] h-[36px] max-[500px]:w-[20px] max-[500px]:h-[20px]"
            color="white"
          />
          <p className="py-1 px-3 max-[500px]:py-[2px] max-[500px]:px-[8px] rounded-full bg-[#E59055] text-[15px] text-white">
            {totalUnread}
          </p>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          {action === "friend-list" ? (
            <FriendList
              tab={tab}
              setTab={setTab}
              setAction={setAction}
              user={user}
            />
          ) : action === "add-group-members" ? (
            <AddGroupMembers setAction={setAction} />
          ) : action === "begin chat" ? (
            <GroupChatView setAction={setAction} setTab={setTab} />
          ) : null}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MessageMenu;
