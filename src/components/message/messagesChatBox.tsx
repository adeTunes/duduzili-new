import { Icon } from "@iconify/react";
import { TextInput, Textarea, clsx } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import MessageReceived from "./messageReceived";
import MessageSent from "./messageSent";
import SendMessage from "./sendMessage";
import SingleEmojiSent from "./singleEmojiSent";

function MessagesChatBox() {
  return (
    <div className="flex overflow-auto flex-1 flex-col gap-6">
      <div className="flex pb-4 border-b border-b-[#EDF0FB] items-center justify-between">
        <div className="flex items-center gap-[19px]">
          <div className="h-[52px] w-[52px]">
            <img
              src="/message/friend-avatar.png"
              className="h-full w-full object-cover rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[18px] font-semibold text-[#222222] leading-[22px]">
              Frank Muller
            </p>
            <p className="text-[14px] leading-[17px] text-[#2A2A2A]">
              @frank_dmuller
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
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <SingleEmojiSent />
      </div>
      <SendMessage />
    </div>
  );
}

export default MessagesChatBox;
