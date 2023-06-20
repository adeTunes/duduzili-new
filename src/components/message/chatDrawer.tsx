import { Icon } from "@iconify/react";
import { Drawer, TextInput, clsx } from "@mantine/core";
import React from "react";
import MessageCard from "./messageCard";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedMessage, userDetails } from "@/store";
import { useRouter } from "next/router";
import Link from "next/link";
import GroupChatCard from "./groupChatCard";
import useConversations from "../../../hooks/use-conversations";

function ChatDrawer({ opened, close }) {
  const setSelectedMessage = useSetAtom(selectedMessage);
  const { data } = useConversations();
  const user: any = useAtomValue(userDetails)
  const groupMessages = [
    {
      name: "You, Jane Doe and Frank...",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: [
        "/message/friend-avatar.png",
        "/message/friend-avatar-3.png",
        "/message/friend-avatar-2.png",
      ],
    },
    {
      name: "You and 5 others",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: [
        "/message/friend-avatar-2.png",
        "/message/friend-avatar-4.png",
        "/message/friend-avatar.png",
      ],
    },
    {
      name: "You and 30 others",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "",
      profilePicture: [
        "/message/friend-avatar-4.png",
        "/message/friend-avatar.png",
        "/message/friend-avatar-2.png",
      ],
    },
  ];
  const { pathname } = useRouter();
  const tabs = [
    {
      text: "Friends",
      href: "/messages/friends",
    },
    {
      text: "Others",
      href: "/messages/others",
    },
    {
      text: "Group Chat",
      href: "/messages/group-chats",
    },
  ];
  return (
    <Drawer
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 !px-2 flex flex-col overflow-auto",
      }}
      opened={opened}
      onClose={close}
    >
      <div className="flex flex-1 cursor-pointer overflow-auto flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="justify-between flex">
            {tabs.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <p
                  role="button"
                  className={clsx(
                    pathname.includes(item.href)
                      ? "bg-duduzili-violet text-white font-semibold"
                      : "bg-[#EDF0FB] text-[#2A2A2A]",
                    "px-[4vw] max-[400px]:text-[14px] whitespace-nowrap py-2 rounded-[40px] leading-6"
                  )}
                  style={{ paddingInline: "clamp(12px, 3vw, 50px)" }}
                >
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
          <div>
            <TextInput
              classNames={{
                root: "bg-white",
                input:
                  "h-[47px] !pl-[48px] placeholder:text-[#757575] rounded-[24px] border-0",
              }}
              className="rounded-[24px] pl-8"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
              placeholder="Search Chat"
              icon={<Icon height={24} width={24} icon="ri:search-line" />}
            />
          </div>
        </div>
        {pathname === "/messages/friends" ? (
          <div
            id="conversations-container"
            className="flex flex-1 overflow-auto flex-col py-2 bg-white rounded-2xl"
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
          >
            {/* {chatList?.map((item, idx) => (
          <MessageCard
            onClick={() => {
              setSelectedMessage(JSON.stringify(item));
            }}
            id={JSON.stringify(item)}
            image={item?.photo_url?.substring(62) || "/profile-pic-default.png"}
            text={" "}
            date={" "}
            name={`${item?.first_name} ${item?.last_name}`}
            unread={0}
            key={idx}
          />
        ))} */}
            {data?.map((item, idx) => {
          const friend =
            item?.user_one?.id === user?.user?.id
              ? item?.user_two
              : item?.user_one;
          return (
            <MessageCard
              onClick={() => {
                setSelectedMessage(JSON.stringify(friend));
                close()
              }}
              id={JSON.stringify(friend)}
              image={
                friend?.photo_url?.substring(62) || "/profile-pic-default.png"
              }
              text={item?.get_messages?.[item?.get_messages?.length - 1]?.text}
              date={
                item?.get_messages?.length
                  ? new Date(
                    item?.get_messages?.[item?.get_messages?.length - 1]?.date_added
                    ).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })
                  : ""
              }
              name={`${friend?.first_name} ${friend?.last_name}`}
              unread={0}
              key={idx}
            />
          );
        })}
          </div>
        ) : (
          <div
            id="conversations-container"
            className="flex flex-1 overflow-auto flex-col py-2 bg-white rounded-2xl"
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
          >
            {groupMessages.map(
              (
                {
                  profilePicture,
                  lastMessage,
                  lastMessageDate,
                  name,
                  unreadMessage,
                },
                idx
              ) => (
                <GroupChatCard
                  onClick={() => setSelectedMessage("")}
                  id={""}
                  image={profilePicture}
                  text={lastMessage}
                  date={lastMessageDate}
                  name={name}
                  unread={unreadMessage}
                  key={idx}
                  usage="drawer"
                />
              )
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default ChatDrawer;
