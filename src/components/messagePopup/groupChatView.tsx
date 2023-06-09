import { Icon } from "@iconify/react";
import React from "react";
import GroupMessageReceived from "../message/groupMessageReceived";
import MessageSent from "../message/messageSent";
import GroupAudioReceived from "../message/groupAudioReceived";
import GroupSingleEmojiReceived from "../message/groupSingleEmojiReceived";
import AudioSent from "../message/audioSent";
import SendMessage from "../message/sendMessage";
import { Textarea } from "@mantine/core";

function GroupChatView({ setAction,setTab }) {
  return (
    <div className="flex mx-4 overflow-auto h-full flex-col gap-3">
      <div className="flex pb-4 border-b border-b-[#C0D0E8] items-center justify-between">
        <Icon
          onClick={() => {
            setTab(2)
            setAction("friend-list");
          }}
          className="cursor-pointer"
          icon="mdi:arrow-left"
          height={25}
          width={25}
        />
        <div className="flex  items-center gap-[19px]">
          <div className="flex">
            <img
              src="/profile-pic-default.png"
              className="w-6 h-6 object-cover"
              alt=""
            />
            <img
              src="/profile-pic-default.png"
              className="w-6 h-6 object-cover ml-[-12px]"
              alt=""
            />
            <img
              src="/profile-pic-default.png"
              className="w-6 h-6 object-cover ml-[-12px]"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[#222222] font-semibold leading-6">
              You, Jane Doe and Frank..
            </p>
            <p className="text-[#2a2a2a] text-xs leading-[15px]">
              @frank_muller, @jamesbruce, @jane...
            </p>
          </div>
        </div>
        <Icon
          icon="material-symbols:keyboard-arrow-down"
          className="cursor-pointer"
          width={28}
          height={28}
        />
      </div>
      <div className="overflow-auto flex flex-col flex-1">
        <div id="messages" className="flex flex-1 overflow-auto flex-col gap-5">
          <p className="text-xs text-center text-[#757575] leading-[15px]">
            24/04/2023
          </p>
          <GroupMessageReceived />
          <MessageSent />
          <GroupAudioReceived />
          <GroupSingleEmojiReceived />
          <AudioSent />
        </div>
        <div className="flex flex-col bg-white gap-2">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <Icon
                icon="ph:smiley-bold"
                color="#4534b8"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </span>
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <Icon
                icon="ic:outline-image"
                color="#4534b8"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </span>
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <Icon
                icon="mdi:video-outline"
                color="#4534b8"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </span>
            <span className="w-10 h-10 flex items-center justify-center bg-[#EDF0FB] rounded-[34px]">
              <Icon
                icon="ant-design:audio-outlined"
                color="#4534b8"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </span>
          </div>
          <div className="justify-between flex items-center">
            <Textarea
              classNames={{
                input:
                  "h-[54px] bg-[#EDF0FB] w-[95%] rounded-[40px] placeholder:text-base placeholder:leading-[30px] placeholder:text-[#686868] !pl-6 !pt-[10px] border-0",
                root: "flex-1",
              }}
              placeholder="Enter your message"
            />
            <Icon icon="carbon:send" color="#4534B8" height={32} width={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChatView;
