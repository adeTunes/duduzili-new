import React, { useState } from "react";
import FriendListCard from "./friendListCard";
import useConversations from "../../../hooks/use-conversations";
import { Skeleton } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { popupFriend, popupFriendList, userDetails } from "@/store";

function FriendChatList({ setAction, form }) {
  const user: any = useAtomValue(userDetails);
  const [selected, setSelected] = useAtom(popupFriend);
  const friendList: any = useAtomValue(popupFriendList);

  return (
    <div
      id="conversations-container"
      className="flex flex-1 w-full overflow-auto flex-col"
    >
      {friendList?.isLoading
        ? Array(10)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="py-2 px-6 max-[400px]:px-3 gap-4 flex justify-between"
              >
                <Skeleton height={40} width={40} circle />
                <div className="flex flex-1 flex-col gap-3">
                  <Skeleton width="50%" height={12} />
                  <Skeleton width="80%" height={12} />
                </div>
              </div>
            ))
        : friendList?.data?.map((item, idx) => {
            const friend =
              item?.user_one?.id === user?.user?.id
                ? item?.user_two
                : item?.user_one;
            return friend?.first_name?.includes(form.values.search) ||
              friend?.last_name?.includes(form.values.search) ? (
              <FriendListCard
                onClick={() => {
                  setSelected(JSON.stringify(friend));
                  setAction("begin chat");
                }}
                selected={selected}
                id={JSON.stringify(friend)}
                image={friend?.photo_url}
                text={
                  item?.get_messages?.[item?.get_messages?.length - 1]?.text
                }
                date={
                  item?.get_messages?.length
                    ? new Date(
                        item?.get_messages?.[
                          item?.get_messages?.length - 1
                        ]?.date_added
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                      })
                    : ""
                }
                name={`${friend?.first_name} ${friend?.last_name}`}
                unread={
                  item?.get_messages?.filter(
                    (item) =>
                      item?.receiver?.id === user?.user?.id && !item?.read
                  )?.length
                }
                key={idx}
              />
            ) : null;
          })}
      {/* messages.map(
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
      )} */}
    </div>
  );
}

export default FriendChatList;
