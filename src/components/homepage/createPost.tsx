import { Icon } from "@iconify/react";
import React from "react";
import CreatePostModal from "../modals/createPostModal";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { AudioSquare } from "iconsax-react";

function CreatePost() {
  const [opened, { open, close }] = useDisclosure(false);
  const user: any = useAtomValue(userDetails)

  return (
    <div className="grid gap-4 grid-cols-[auto_1fr]">
      <img
        src={user?.  user?.photo_url?.substring(62) || "/profile-pic-default.png" }
        className="w-[56px] h-[56px] rounded-full object-cover"
        alt=""
      />
      <div
        className="bg-white pl-6 pr-5 cursor-pointer py-4 rounded-[32px] grid grid-cols-[1fr_auto] items-center"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        onClick={open}
      >
        <p className="text-[#757575]">Create a post</p>
        <div className="flex items-center max-[400px]:hidden gap-3 ">
          <Icon icon="ic:outline-image" height={24} width={24} />
          <Icon icon="ic:outline-videocam" height={24} width={24} />
          <AudioSquare size="24" variant="Outline"/>
        </div>
      </div>
      <CreatePostModal opened={opened} close={close} />
    </div>
  );
}

export default CreatePost;
