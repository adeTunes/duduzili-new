import { NextPageX } from "../../types/next";
import { Skeleton, TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import MessageCard from "@/components/message/messageCard";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  chatFriendOptions,
  openChatDrawer,
  selectedMessage,
  userDetails,
} from "@/store";
import MessageLayout from "@/layout/messageLayout";
import MessagesChatBox from "@/components/message/messagesChatBox";
import useConversations from "../../hooks/use-conversations";
import SearchDrawer from "@/components/message/searchDrawer";
import { useDisclosure } from "@mantine/hooks";
import { selectedFriendToChat } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { base64decode } from "nodejs-base64";

const Messages: NextPageX = () => {
  const setSelectedMessage = useSetAtom(selectedMessage);
  const { data, isLoading, refetch } = useConversations();
  // const {data, isLoading} = useSocketConversations()
  const [chatList, setChatList] = useAtom(selectedFriendToChat);
  const user: any = useAtomValue(userDetails);
  const [opened, { open, close }] = useDisclosure(false);
  const [chatOptions, setChatOptions] = useAtom(chatFriendOptions);
  const { query, push } = useRouter();

  useEffect(() => {
    if (chatOptions === "chat initiated") {
      const friend = data?.find((item) => {
        const newUser =
          item?.user_one?.id === user?.user?.id
            ? item?.user_two
            : item?.user_one;
        return newUser?.username === chatList[0]?.username;
      });
      const newFriend =
        friend?.user_one?.id === user?.user?.id
          ? friend?.user_two
          : friend?.user_one;
      setSelectedMessage(JSON.stringify(newFriend));
      setChatList([]);
      setChatOptions("");
    }
  }, [chatOptions, data]);

  useEffect(() => {
    if (query.chat && data) {
      const friend = base64decode(query.chat as string);
      const match = data?.find((item) => {
        const friendData =
          item?.user_one?.id === user?.user?.id
            ? item?.user_two
            : item?.user_one;
        return JSON.parse(friend)?.username === friendData?.username;
      });
      if (match) {
        const newFriend =
          match?.user_one?.id === user?.user?.id
            ? match?.user_two
            : match?.user_one;
        setSelectedMessage(JSON.stringify(newFriend));
      } else {
        setChatList([JSON.parse(friend)]);
        setSelectedMessage(friend);
        setChatOptions("selected friend");
      }
      push("/messages/friends", undefined, { shallow: true });
    }
  }, [query.chat, data]);
  const setChatDrawer = useSetAtom(openChatDrawer);

  return (
    <div className="flex flex-1 overflow-auto flex-col gap-6">
      <div onClick={open}>
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
      <div
        id="conversations-container"
        className="flex flex-1 overflow-auto flex-col py-2 bg-white rounded-2xl"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        {chatList?.map((item, idx) => (
          <MessageCard
            onClick={() => {
              setSelectedMessage(JSON.stringify(item));
              if (window.innerWidth <= 800) {
                setChatDrawer(true);
              }
            }}
            id={JSON.stringify(item)}
            image={item?.photo_url?.substring(62)}
            text={" "}
            date={" "}
            name={`${item?.first_name} ${item?.last_name}`}
            unread={0}
            key={idx}
          />
        ))}
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="py-2 px-6 max-[400px]:px-3 gap-4 flex justify-between">
                  <Skeleton height={40} width={40} circle />
                  <div className="flex flex-1 flex-col gap-3">
                    <Skeleton width="50%" height={12} />
                    <Skeleton width="80%" height={12} />
                  </div>
                </div>
              ))
          : data?.map((item, idx) => {
              const friend =
                item?.user_one?.id === user?.user?.id
                  ? item?.user_two
                  : item?.user_one;
              return (
                <MessageCard
                  onClick={() => {
                    setSelectedMessage(JSON.stringify(friend));
                    refetch();
                    if (window.innerWidth <= 800) {
                      setChatDrawer(true);
                    }
                  }}
                  id={JSON.stringify(friend)}
                  image={friend?.photo_url?.substring(62)}
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
              );
            })}
        {/* {messages.map(
          (
            item,
            idx
          ) => (
            <MessageCard
              onClick={() => setSelectedMessage(JSON.stringify(item))}
              id={JSON.stringify(item)}
              image={item.profilePicture}
              text={item.lastMessage}
              date={item.lastMessageDate}
              name={item.name}
              unread={item.unreadMessage}
              key={idx}
            />
          )
        )} */}
      </div>
      <SearchDrawer data={data} opened={opened} close={close} />
    </div>
  );
};
Messages.Layout = MessageLayout;
Messages.LayoutProps = { boxType: <MessagesChatBox /> };
export default Messages;
