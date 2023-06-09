import React, { useState } from "react";
import FriendListCard from "./friendListCard";

function FriendChatList() {
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
          <FriendListCard
            //   onClick={() => setSelectedMessage(idx)}
            onClick={() => {}}
            selected={selected}
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

export default FriendChatList;
