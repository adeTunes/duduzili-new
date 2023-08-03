import { Menu } from "@mantine/core";
import React from "react";
import PrimaryButton from "../button/primaryButton";
import { createPost } from "@/actions/createPost";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "../../../utils/notification-handler";

function CreatePostMenu({
  opened,
  closeModal,
  setLoading,
  audio,
  recordedAudio,
  selected,
  form,
  setOpened,
}) {
  const queryClient = useQueryClient();

  const savePostOrDraft = (publish: "True" | "False") => {
    if (selected.filter((item) => item.type === "image").length > 5)
      return notify({
        title: "Error",
        message: "You cannot create post with more than 5 photos",
        color: "red",
      });
    var data = new FormData();
    data.append("text", form.values.text);
    if (audio) {
      data.append("audio", audio, audio.name);
    } else if (recordedAudio) {
      data.append("audio", recordedAudio?.blob);
    }
    selected.length &&
      selected.forEach((item) => {
        if (item.type === "image") {
          if (typeof item.value === "string") {
            data.append("photo", item.value);
          } else data.append("photo", item.value, item.value.name);
        } else if (item.type === "video") {
          if (typeof item.value === "string") {
            data.append("video", item.value);
          } else data.append("video", item.value, item.value.name);
        }
      });
    data.append("is_article", "yes");
    data.append("publish", publish);
    createPost(data, publish, setLoading, () => {
      queryClient.invalidateQueries(["all-posts"]);
      closeModal();
    });
  };

  return (
    <Menu
      opened={opened}
      onChange={() => {
        setOpened(!opened);
      }}
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-0 !rounded-[24px] !w-[auto] !min-w-fit",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          paddingInline: "clamp(5px, 1vw, 24px) !important",
        },
        item: {
          "&[data-hovered]": {
            background: "none",
            cursor: "default",
          },
        },
      }}
    >
      <Menu.Target>
        <div className="relative">
          <PrimaryButton text="Share" onClick={() => {}} />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <p
            onClick={() => {
              if (!form.values.text)
                return notify({
                  title: "Error",
                  message: "Please enter post text",
                  color: "red",
                });
              savePostOrDraft("True");
            }}
            className="px-4 py-5 max-[390px]:px-2 flex gap-3 items-center cursor-pointer"
          >
            Share post
          </p>
        </Menu.Item>
        <Menu.Item>
          <p
            onClick={() => {
              if (!form.values.text)
                return notify({
                  title: "Error",
                  message: "Please enter post text",
                  color: "red",
                });
              savePostOrDraft("False");
            }}
            className="px-4 pb-5 max-[390px]:px-2 flex gap-3 items-center cursor-pointer"
          >
            Save to draft
          </p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default CreatePostMenu;
