import { LoadingOverlay, Modal, Textarea, FileInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Icon } from "@iconify/react";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import { createPost } from "@/actions/createPost";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import DisplayMedia from "./displayMedia";
import { AudioSquare } from "iconsax-react";

function CreatePostModal({ opened, close }) {
  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const user: any = useAtomValue(userDetails);
  return (
    <Modal
      size="lg"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 rounded-[24px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={() => {
        setSelected([]);
        form.reset();
        close();
      }}
      title="Create New"
      centered
    >
      <div className="flex flex-col gap-5 mt-6">
        <UserAvatarWithName
          image={user?.user?.photo_url.substring(62)}
          fullName={`${user?.user?.first_name} ${user?.user?.last_name}`}
          username={user?.user?.username}
        />
        <div className="flex flex-col gap-8 mb-[86px]">
          <Textarea
            placeholder="Create a post. Share a moment. Tell people what's on your mind"
            classNames={{
              input:
                "!border-none text-[20px] leading-7 text-black !px-0 placeholder:text-[#A4A4A4] placeholder:text-[20px] placeholder:leading-7",
            }}
            h="auto"
            autosize
            minRows={2}
            maxRows={8}
            {...form.getInputProps("text")}
          />
          <DisplayMedia setSelected={setSelected} selected={selected} />
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]">
              <Icon
                icon="ph:smiley-bold"
                color="#2A2A2A"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <label
              htmlFor="image-file"
              className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]"
            >
              <Icon
                icon="ic:outline-image"
                color="#2A2A2A"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <FileInput
                hidden
                id="image-file"
                accept="image/png,image/jpeg"
                onChange={(value) => {
                  setSelected([...selected, { type: "image", value }]);
                }}
              />
            </label>
            <label
              htmlFor="video-file"
              className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]"
            >
              <Icon
                icon="mdi:video-outline"
                color="#2A2A2A"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <FileInput
                hidden
                id="video-file"
                accept="video/mp4"
                onChange={(value) => {
                  setSelected([...selected, { type: "video", value }]);
                }}
              />
            </label>
            <div className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]">
              <AudioSquare size="24" color="#2A2A2A" variant="Outline" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <PrimaryButtonOutline onClick={close} text="Cancel" />
          <PrimaryButton
            text="Share"
            onClick={() => {
              if (!form.values.text)
                return showNotification({
                  title: "Error",
                  message: "Please enter post text",
                  color: "red",
                });
              var data = new FormData();
              data.append("text", form.values.text);
              selected.forEach((item) => {
                item.type === "image"
                  ? data.append("photo", item.value, item.value.name)
                  : item.type === "video"
                  ? data.append("video", item.value, item.value.name)
                  : null;
              });
              data.append("is_article", "yes");
              data.append("publish", "save");
              createPost(data, setLoading, () => {
                queryClient.invalidateQueries(["all-posts"]);
                setSelected([]);
                form.reset();
                close();
              });
            }}
          />
        </div>
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default CreatePostModal;