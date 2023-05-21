import { Icon } from "@iconify/react";
import React from "react";
import CreatePostModal from "../modals/createPostModal";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";

function CreatePost() {
  const [opened, { open, close }] = useDisclosure(false);
  const user: any = useAtomValue(userDetails)

  return (
    <div className="grid gap-4 grid-cols-[auto_1fr]">
      <img
        src={user?.user?.photo_url.substring(62)}
        className="w-[56px] h-[56px] rounded-full object-cover"
        alt=""
      />
      <div
        className="bg-white pl-6 pr-2 cursor-pointer py-4 rounded-[32px] grid grid-cols-[1fr_auto] items-center"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        onClick={open}
      >
        <p className="text-[#757575]">Create a post</p>
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
      <CreatePostModal opened={opened} close={close} />
    </div>
  );
}

export default CreatePost;
