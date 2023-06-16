import { Icon } from "@iconify/react";
import React from "react";
import MessageSent from "./messageSent";
import SendMessage from "./sendMessage";
import GroupMessageReceived from "./groupMessageReceived";
import { Text, Textarea, clsx } from "@mantine/core";
import GroupAudioReceived from "./groupAudioReceived";
import GroupSingleEmojiReceived from "./groupSingleEmojiReceived";
import AudioSent from "./audioSent";
import Image from "next/image";
import AttachMedia from "./attach-media";
import { useForm } from "@mantine/form";

function GroupChatBox() {
  const images = [
    "/message/friend-avatar.png",
    "/message/friend-avatar-3.png",
    "/message/friend-avatar-2.png",
  ];

  const form = useForm({
    initialValues: {
      text: "",
    },
  });

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
                  <img
                    src={item}
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[2px]">
              <Text lineClamp={1} className="text-[18px] font-semibold text-[#222222] leading-[22px]">
                You, Jane Doe and Frank Muller
              </Text>
              <Text lineClamp={1} className="text-[14px] leading-[17px] text-[#2A2A2A]">
                @frank_dmuller, @janedoe, @jamesbruce
              </Text>
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
          <MessageSent text="gjuguy yfy yfujf" time="" />
          <GroupAudioReceived />
          <GroupSingleEmojiReceived />
          <AudioSent />
        </div>
        <form
        onSubmit={(e) => {
          e.preventDefault();
          form.reset();
          // handleSendMessage();
        }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex pl-6 items-center gap-4 flex-1 bg-[#EDF0FB] rounded-[40px]">
          <div className="flex items-center max-[590px]:hidden gap-3">
            <Icon
              icon="ph:smiley-bold"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Icon
              icon="ic:outline-image"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Icon
              icon="mdi:video-outline"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Icon
              icon="ant-design:audio-outlined"
              color="#4534b8"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div className="max-[590px]:flex items-center hidden gap-2">
            <Icon
              icon="ph:smiley-bold"
              color="#4534b8"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <AttachMedia />
          </div>
          <Textarea
          id="no-scroll"
            classNames={{
              input: "h-[64px] placeholder:text-[12px] !pt-[20px] bg-transparent border-0",
              root: "flex-1",
            }}
            placeholder="Enter your message"
            {...form.getInputProps("text")}
          />
        </div>
        <button type="submit">
          <Icon
            className="cursor-pointer"
            icon="carbon:send"
            color="#4534B8"
            height={32}
            width={32}
          />
        </button>
      </form>
      </div>
    </>
  );
}

export default GroupChatBox;
