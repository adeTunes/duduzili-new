import fixedSidebarLayout from "@/layout/fixedSidebar";
import { NextPageX } from "../../types/next";
import { TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import MessageCard from "@/components/message/messageCard";
import { useSetAtom } from "jotai";
import { selectedMessage } from "@/store";
import MessageLayout from "@/layout/messageLayout";
import MessagesChatBox from "@/components/message/messagesChatBox";

const Messages: NextPageX = () => {
  const setSelectedMessage = useSetAtom(selectedMessage);
  const messages = [
    {
      name: "Frank Muller",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 10",
      unreadMessage: "2",
      profilePicture: "/message/friend-avatar.png",
    },
    {
      name: "Jane Doe",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 10",
      unreadMessage: "",
      profilePicture: "/message/friend-avatar-2.png",
    },
    {
      name: "Aretha Christiana",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: "/message/friend-avatar-3.png",
    },
    {
      name: "Frank Muller",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: "/message/friend-avatar.png",
    },
    {
      name: "Mike Holland",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: "/message/friend-avatar-4.png",
    },
    {
      name: "Fred Frank",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "",
      profilePicture: "/message/friend-avatar-5.png",
    },
    {
      name: "Cat Woman",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "",
      profilePicture: "/message/friend-avatar-6.png",
    },
    {
      name: "Jane Doe",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 10",
      unreadMessage: "",
      profilePicture: "/message/friend-avatar-2.png",
    },
    {
      name: "Aretha Christiana",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: "/message/friend-avatar-3.png",
    },
    {
      name: "Frank Muller",
      lastMessage:
        "Loren ipsum dolor sit amet, con Loren ipsum dolor sit amet, con",
      lastMessageDate: "Mar 12",
      unreadMessage: "1",
      profilePicture: "/message/friend-avatar.png",
    },
  ];
  return (
    <div className="flex flex-1 overflow-auto flex-col gap-6">
      <TextInput
        classNames={{
          input:
            "h-[47px] !pl-[48px] placeholder:text-[#757575] rounded-[24px] border-0",
        }}
        className="rounded-[24px] pl-8"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        placeholder="Search Chat"
        icon={<Icon height={24} width={24} icon="ri:search-line" />}
      />
      <div
        id="conversations-container"
        className="flex flex-1 overflow-auto flex-col py-2 bg-white rounded-2xl"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        {messages.map(
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
            <MessageCard
              onClick={() => setSelectedMessage(idx)}
              id={idx}
              image={profilePicture}
              text={lastMessage}
              date={lastMessageDate}
              name={name}
              unread={unreadMessage}
              key={idx}
            />
          )
        )}
      </div>
    </div>
  );
};
Messages.Layout = MessageLayout;
Messages.LayoutProps = { boxType: <MessagesChatBox /> };
export default Messages;
