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
import { useRouter } from "next/router";
import { postComment } from "@/actions/commentActions";
import useSinglePost from "../../../hooks/useSinglePost";
import { editParticularPost } from "@/actions/postOptionActions";

function EditPostModal({ opened, close, id }) {
  const { data } = useSinglePost(id);

  const post_id = id;
  const form = useForm({
    initialValues: {
      text: "",
      post_id,
    },
  });
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const user: any = useAtomValue(userDetails);
  const { pathname } = useRouter();

  useEffect(() => {
    if (data) {
      if (data?.post?.text) form.setFieldValue("text", data?.post?.text);
      if (data?.post?.media?.audio) {
        setSelected((prev) => {
          const filtered = prev.filter(
            (item) => item.value !== data?.post?.media?.audio
          );
          return [
            ...filtered,
            { type: "audio", value: data?.post?.media?.audio },
          ];
        });
      }
      if (data?.post?.media?.video) {
        setSelected((prev) => {
          const filtered = prev.filter(
            (item) => item.value !== data?.post?.media?.video
          );
          return [
            ...filtered,
            { type: "video", value: data?.post?.media?.video },
          ];
        });
      }
      if (data?.post?.media?.photo) {
        data?.post?.media?.photo?.forEach((el) => {
          setSelected((prev) => {
            const filtered = prev.filter((item) => item.value !== el);
            return [...filtered, { type: "image", value: el }];
          });
        });
      }
    }
  }, [data]);

  return (
    <Modal
      size="lg"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 flex flex-col overflow-auto rounded-[24px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto",
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
      title="Edit Post"
      centered
    >
      <div className="grid h-full overflow-auto grid-rows-[auto_1fr_auto] gap-5 mt-6">
        <UserAvatarWithName
          image={user?.user?.photo_url?.substring(62)}
          fullName={`${user?.user?.first_name} ${user?.user?.last_name}`}
          username={user?.user?.username}
        />
        <div className="flex flex-col gap-8 flex-1 overflow-auto pb-[86px]">
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
          <DisplayMedia selected={selected} setSelected={setSelected} />
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
                multiple
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
                multiple
                onChange={(value) => {
                  value.forEach((item) => {
                    setSelected((prev) => [
                      ...prev,
                      { type: "image", value: item },
                    ]);
                  });
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
              var formData = new FormData();
              formData.append("text", form.values.text);
              formData.append("post_id", form.values.post_id as string);
              formData.append("is_article", "yes");
              formData.append("publish", "save");
              selected.length &&
                selected.forEach((item) => {
                  if (item.type === "image") {
                    if (typeof item.value === "string") {
                      formData.append("photo", item.value);
                    } else
                      formData.append("photo", item.value, item.value.name);
                  } else if (item.type === "video") {
                    if (typeof item.value === "string") {
                      formData.append("video", item.value);
                    } else
                      formData.append("video", item.value, item.value.name);
                  }
                });
              editParticularPost(id, formData, setLoading, () => {
                if (pathname.includes("home"))
                  queryClient.invalidateQueries(["all-posts"]);
                else if (pathname.includes("my-profile")) {
                  queryClient.invalidateQueries([
                    "user-activities",
                    user?.user?.id,
                  ]);
                } else queryClient.invalidateQueries(["single-posts", id]);
                queryClient.invalidateQueries(["trending-posts"]);
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

export default EditPostModal;
