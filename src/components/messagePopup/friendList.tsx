import { Icon } from "@iconify/react";
import { TextInput } from "@mantine/core";
import React from "react";
import EmptyComponent from "../emptyComponent";
import GroupChatList from "./groupChatList";
import FriendChatList from "./friendChatList";
import { useAtomValue } from "jotai";
import { popupTotalUnread } from "@/store";
import { useForm } from "@mantine/form";

function FriendList({ tab, setTab, setAction, user }) {
  const totalUnread = useAtomValue(popupTotalUnread);
  const form = useForm({
    initialValues: {
      search: ""
    }
  })
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-4">
      <div className="flex justify-between max-[345px]:px-2 px-7">
        <p className="flex items-center gap-4">
          <span className="text-[#2a2a2a] font-bold max-[345px]:text-base text-[18px] leading-[22px]">
            Messages
          </span>
          <span className="py-1 px-3 rounded-full max-[345px]:px-[9px] max-[345px]:py-[2px] bg-[#E59055] text-[15px] text-white">
            {totalUnread}
          </span>
        </p>
        <div className="flex items-center gap-[20px]">
          <div
            onClick={() => setAction("add-group-members")}
            className="bg-[#4534B8] cursor-pointer h-12 w-12 max-[345px]:w-8 max-[345px]:h-8 rounded-full flex items-center justify-center"
          >
            <Icon
              height={20}
              width={20}
              color="white"
              icon="material-symbols:edit-outline-rounded"
            />
          </div>
        </div>
      </div>
      <TextInput
        classNames={{
          input:
            "h-[47px] !pl-[48px] placeholder:text-[#757575] bg-[#F4F4F4] rounded-[24px] border-0",
        }}
        className="rounded-[24px] pl-3 bg-[#F4F4F4] max-[345px]:mx-3 mx-[30px]"
        placeholder="Search Friend"
        icon={<Icon height={24} width={24} icon="ri:search-line" />}
        {...form.getInputProps("search")}
      />
      {tab === 0 ? (
        <FriendChatList form={form} setAction={setAction} />
      ) : tab === 2 ? (
        <GroupChatList />
      ) : (
        <EmptyComponent
          classNames={{ root: "h-full flex items-center justify-center" }}
          text="You have no messages"
        />
      )}
    </div>
  );
}

export default FriendList;
