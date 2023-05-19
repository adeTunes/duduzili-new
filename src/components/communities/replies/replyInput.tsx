import { Icon } from "@iconify/react";
import { TextInput } from "@mantine/core";
import Image from "next/image";
import React from "react";

function ReplyInput() {
  return (
    <div className="grid gap-4 grid-cols-[auto_1fr]">
      <Image
        src="/homePage/profile-picture.png"
        className="w-[56px] h-[56px] rounded-full object-cover"
        alt=""
      />
      <div
        className="bg-white pl-6 pr-2 py-2 rounded-[32px] grid grid-cols-[1fr_auto] items-center"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        <TextInput
          placeholder="Reply this thread"
          className="bg-none"
          classNames={{ input: "h-full border-none" }}
        />
        <div className="flex items-center gap-3">
          <Icon icon="ic:outline-image" height={24} width={24} />
          <Icon icon="ic:outline-videocam" height={24} width={24} />
          <Icon
            icon="streamline:computer-voice-mail-mic-audio-mike-music-microphone"
            height={24}
            width={24}
          />
        </div>
      </div>
    </div>
  );
}

export default ReplyInput;
