import React, { useState } from "react";
import GroupChatCard from "../message/groupChatCard";
import GroupChatListCard from "./GroupChatListCard";

function GroupChatList() {
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
  const [selected, setSelected] = useState(0);

  return (
    <div
      id="conversations-container"
      className="flex flex-1 overflow-auto flex-col"
    >
      {messages.map(
        (
          { profilePicture, lastMessage, lastMessageDate, name, unreadMessage },
          idx
        ) => (
          <GroupChatListCard
            selected={selected}
            //   onClick={() => setSelectedMessage(idx)}
            onClick={() => {}}
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
  );
}

export default GroupChatList;
