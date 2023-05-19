import { Icon } from "@iconify/react";
import React from "react";
import MessageSent from "./messageSent";
import SendMessage from "./sendMessage";
import GroupMessageReceived from "./groupMessageReceived";
import { clsx } from "@mantine/core";
import GroupAudioReceived from "./groupAudioReceived";
import GroupSingleEmojiReceived from "./groupSingleEmojiReceived";
import AudioSent from "./audioSent";
import Image from "next/image";

function GroupChatBox() {
  const images = [
    "/message/friend-avatar.png",
    "/message/friend-avatar-3.png",
    "/message/friend-avatar-2.png",
  ];
  return (
    <>
      <div className="flex overflow-auto flex-1 flex-col gap-6">
        <div className="flex pb-4 border-b border-b-[#EDF0FB] items-center justify-between">
          <div className="flex items-center gap-[19px]">
            <div className="flex">
              {images.map((item, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    idx !== 0 && "ml-[-10px]",
                    "w-[24px] h-[24px]"
                  )}
                >
                  <Image
                    src={item}
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[18px] font-semibold text-[#222222] leading-[22px]">
                You, Jane Doe and Frank Muller
              </p>
              <p className="text-[14px] leading-[17px] text-[#2A2A2A]">
                @frank_dmuller, @janedoe, @jamesbruce
              </p>
            </div>
          </div>
          <Icon
            height={24}
            className="cursor-pointer"
            width={24}
            icon="carbon:overflow-menu-vertical"
          />
        </div>
        <div id="messages" className="flex flex-1 overflow-auto flex-col gap-5">
          <GroupMessageReceived />
          <MessageSent />
          <GroupAudioReceived />
          <GroupSingleEmojiReceived />
          <AudioSent />
        </div>
        <SendMessage />
      </div>
    </>
  );
}

export default GroupChatBox;
