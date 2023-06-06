import { Icon } from "@iconify/react";
import { TextInput } from "@mantine/core";
import React from "react";
import EmptyComponent from "../emptyComponent";

function FriendList({ setAction, user }) {
  const tabs = ["Friends", "Others", "Group Chat"];

  return (
    <div className="grid h-full grid-rows-[auto_auto_auto_1fr] gap-4">
      <div className="flex justify-between px-7">
        <p className="flex items-center gap-4">
          <span className="text-[#2a2a2a] font-bold text-[18px] leading-[22px]">
            Messages
          </span>
          <span className="py-1 px-3 rounded-full bg-[#E59055] text-[15px] text-white">
            {user?.number_of_messages}
          </span>
        </p>
        <div className="flex items-center gap-[20px]">
          <div
            onClick={() => setAction("add-group-members")}
            className="bg-[#4534B8] cursor-pointer h-12 w-12 rounded-full flex items-center justify-center"
          >
            <Icon
              height={20}
              width={20}
              color="white"
              icon="material-symbols:edit-outline-rounded"
            />
          </div>
          <Icon icon="material-symbols:keyboard-arrow-down" className="cursor-pointer" width={28} height={28} />
        </div>
      </div>
      <div className="px-[30px] grid grid-cols-3">
        {tabs?.map((item, idx) => (
          <p
            key={idx}
            className="pb-2 border-b flex justify-center border-b-[#C0D0E8] text-[#828282] font-semibold leading-6"
          >
            {item}
          </p>
        ))}
      </div>
      <TextInput
        classNames={{
          input:
            "h-[47px] !pl-[48px] placeholder:text-[#757575] bg-[#F4F4F4] rounded-[24px] border-0",
        }}
        className="rounded-[24px] pl-8 bg-[#F4F4F4] mx-[30px]"
        placeholder="Search Friend"
        icon={<Icon height={24} width={24} icon="ri:search-line" />}
      />
      <EmptyComponent
        classNames={{ root: "h-full flex items-center justify-center" }}
        text="You have no messages"
      />
    </div>
  );
}

export default FriendList;
