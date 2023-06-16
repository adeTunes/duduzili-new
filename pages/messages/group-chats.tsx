import { NextPageX } from "../../types/next";
import { TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useSetAtom } from "jotai";
import { selectedMessage } from "@/store";
import MessageLayout from "@/layout/messageLayout";
import GroupChatCard from "@/components/message/groupChatCard";
import GroupChatBox from "@/components/message/groupChatBox";

const GroupChat: NextPageX = () => {
  const setSelectedMessage = useSetAtom(selectedMessage);
  const messages = [
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

  return (
    <div className="flex flex-1 overflow-auto flex-col gap-6">
      <TextInput
        classNames={{
          input:
            "h-[47px] !pl-[48px] placeholder:text-[#757575] rounded-[24px] border-0",
          root: "bg-white",
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
            <GroupChatCard
              onClick={() => setSelectedMessage("")}
              id={""}
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
GroupChat.Layout = MessageLayout;
GroupChat.LayoutProps = { boxType: <GroupChatBox /> };
export default GroupChat;
