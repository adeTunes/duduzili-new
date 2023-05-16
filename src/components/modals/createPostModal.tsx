import { LoadingOverlay, Modal, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Icon } from "@iconify/react";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import { createPost } from "@/actions/createPost";
import { useForm } from "@mantine/form";
import { Loading } from "../loading";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

function CreatePostModal({ opened, close }) {
  const form = useForm({
    initialValues: {
      text: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
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
      onClose={close}
      title="Create New"
      centered
    >
      <div className="flex flex-col gap-5 mt-6">
        <UserAvatarWithName fullName="Babatunde Adekunle" username="adeTunes" />
        <div className="flex flex-col gap-8 mb-[86px]">
          <Textarea
            placeholder="Create a post. Share a moment. Tell people what's on your mind"
            classNames={{
              input:
                "!border-none text-[20px] leading-7 text-black !px-0 placeholder:text-[#A4A4A4] placeholder:text-[20px] placeholder:leading-5",
            }}
            h="auto"
            autosize
            minRows={2}
            maxRows={8}
            {...form.getInputProps("text")}
          />
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
            <div className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]">
              <Icon
                icon="ic:outline-image"
                color="#2A2A2A"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]">
              <Icon
                icon="mdi:video-outline"
                color="#2A2A2A"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="px-4 py-2 rounded-[34px] bg-[#EDF0FB]">
              <Icon
                icon="ant-design:audio-outlined"
                color="#2A2A2A"
                width={24}
                height={24}
                className="cursor-pointer"
              />
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
              data.append("is_article", "yes");
              data.append("publish", "save");
              createPost(data, setLoading, () => {
                queryClient.invalidateQueries(["all-posts"]);
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
