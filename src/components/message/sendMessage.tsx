import { Icon } from "@iconify/react";
import { Textarea } from "@mantine/core";
import React from "react";

function SendMessage({friendUsename}: {friendUsename: string}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex pl-6 items-center gap-4 flex-1 bg-[#EDF0FB] rounded-[40px]">
        <div className="flex items-center gap-3">
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
        <Textarea
          classNames={{
            input: "h-[64px] !pt-[20px] bg-transparent border-0",
            root: "flex-1",
          }}
          placeholder="Enter your message"
        />
      </div>
      <Icon icon="carbon:send" color="#4534B8" height={32} width={32} />
    </div>
  );
}

export default SendMessage;
