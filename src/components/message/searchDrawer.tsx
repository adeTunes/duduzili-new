import { Icon } from "@iconify/react";
import { Drawer, Loader, TextInput, clsx } from "@mantine/core";
import React, { useState } from "react";
import useFollowersSearch from "../../../hooks/use-followers-search";
import { useDebouncedValue } from "@mantine/hooks";
import SearchList from "./searchList";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { chatFriendOptions, selectedFriendToChat, userDetails } from "@/store";
import useOthersSearch from "../../../hooks/use-others-search";
import { notify } from "../../../utils/notification-handler";

function SearchDrawer({ opened, close, data: chatListData }) {
  const user: any = useAtomValue(userDetails);
  const tabs = ["Followers", "Others"];
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebouncedValue(search, 400);
  const { data, isFetching } = useFollowersSearch(searchValue);
  const { data: othersData, isFetching: isFetchingOther } =
    useOthersSearch(searchValue);
  const [chatList, setChatList] = useAtom(selectedFriendToChat);
  const setChatFriendOptions = useSetAtom(chatFriendOptions);
  return (
    <Drawer
      opened={opened}
      onClose={() => {
        close()
        setSearch("")
      }}
    >
      <div className="flex flex-col gap-6">
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
          rightSection={
            isFetching || isFetchingOther ? <Loader size="sm" /> : ""
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="px-[30px] grid grid-cols-2">
          {tabs?.map((item, idx) => (
            <p
              onClick={() => setTab(idx)}
              key={idx}
              className={clsx(
                tab === idx
                  ? "border-b-[3px] border-b-duduzili-violet text-duduzili-violet"
                  : "border-b border-b-[#C0D0E8] text-[#828282]",
                "pb-2 cursor-pointer  flex justify-center font-semibold leading-6"
              )}
            >
              {item}
            </p>
          ))}
        </div>
        {
          (tab === 0
            ? data?.map((item, idx) => (
                <SearchList
                  onClick={() => {
                    const newFriend = chatListData?.find((el) => {
                      const friendData =
                        el?.user_one?.id === user?.user?.id
                          ? el?.user_two
                          : el?.user_one;
                      return friendData?.username === item?.username;
                    });
                    if (newFriend) {
                      setSearch("");
                      return notify({
                        message:
                          "You are already in a conversation with this user",
                          color: "red"
                      });
                    }
                    setChatList([item]);
                    close();
                    setSearch("");
                    setChatFriendOptions("selected friend");
                  }}
                  key={idx}
                  image={item?.photo_url }
                  username={item?.username}
                  name={`${item?.first_name} ${item?.last_name}`}
                />
              ))
            : othersData?.map((item, idx) => (
                <SearchList
                  onClick={() => {
                    const newFriend = chatListData?.find((el) => {
                      const friendData =
                        el?.user_one?.id === user?.user?.id
                          ? el?.user_two
                          : el?.user_one;
                      return friendData?.username === item?.username;
                    });
                    if (newFriend) {
                      setSearch("");
                      return notify({
                        message:
                          "You are already in a conversation with this user",
                          color: "red"
                      });
                    }
                    close();
                    setSearch("");
                    setChatList([item]);
                    setChatFriendOptions("selected friend");
                  }}
                  key={idx}
                  image={item?.photo_url }
                  username={item?.username}
                  name={`${item?.first_name} ${item?.last_name}`}
                />
              )))}
      </div>
    </Drawer>
  );
}

export default SearchDrawer;
