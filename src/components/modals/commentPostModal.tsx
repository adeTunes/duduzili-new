import { LoadingOverlay, Modal, Textarea, FileInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Icon } from "@iconify/react";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { AudioSquare } from "iconsax-react";
import { useRouter } from "next/router";
import { postComment } from "@/actions/commentActions";
import ReturnMedia from "./returnMedia";
import DisplayMedia from "./displayMedia";
import AudioPlayer from "./audioPlayer";
import EmojiContainer from "../message/emojiContainer";
import { base64decode } from "nodejs-base64";

function CommentPostModal({ opened, close, refetch }) {
  const { query } = useRouter();
  const post_id = query.id;
  const form = useForm({
    initialValues: {
      text: "",
      post_id,
    },
  });

  const mediaForm = useForm({
    initialValues: {
      image: null,
      video: null,
      audio: null,
    },
  });

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const user: any = useAtomValue(userDetails);
  const [audio, setAudio] = useState(null);
  return (
    <Modal
      size="lg"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 flex max-[396px]:px-3 flex-col overflow-auto rounded-[24px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto max-[396px]:px-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={() => {
        setSelected([]);
        setAudio(null);
        form.reset();
        close();
      }}
      title="Reply Thread"
      centered
    >
      <div className="grid h-full overflow-auto grid-rows-[auto_1fr_auto] gap-5 mt-6">
        <UserAvatarWithName
          image={
            user?.user?.photo_url?.substring(62)
          }
          fullName={`${user?.user?.first_name} ${user?.user?.last_name}`}
          username={user?.user?.username}
        />
        <div className="flex flex-col gap-8 flex-1 overflow-auto pb-[86px] max-[396px]:pb-[15px]">
          <Textarea
            placeholder="Create a post. Share a moment. Tell people what's on your mind"
            classNames={{
              input:
                "!border-none text-[20px] leading-7 max-[396px]:placeholder:text-[16px] max-[396px]:text-[16px] text-black !px-0 placeholder:text-[#A4A4A4] placeholder:text-[20px] placeholder:leading-7",
            }}
            h="auto"
            autosize
            minRows={2}
            maxRows={8}
            {...form.getInputProps("text")}
          />
          <DisplayMedia selected={selected} setSelected={setSelected} />
          {audio ? <AudioPlayer audio={audio} setAudio={setAudio} /> : null}
          <div className="flex items-center gap-3">
            <label
              htmlFor="image-file"
              className="px-4 py-2 max-[396px]:px-2 max-[396px]:py-1 rounded-[34px] bg-[#EDF0FB]"
            >
              <Icon
                icon="ic:outline-image"
                color="#4534b8"
                className="cursor-pointer w-6 h-6 max-[396px]:w-4 max-[396px]:h-4"
              />
              <FileInput
                hidden
                id="image-file"
                multiple
                accept="image/png,image/jpeg"
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
            <label
              htmlFor="video-file"
              className="px-4 py-2 max-[396px]:px-2 max-[396px]:py-1 rounded-[34px] bg-[#EDF0FB]"
            >
              <Icon
                icon="mdi:video-outline"
                color="#4534b8"
                className="cursor-pointer w-6 h-6 max-[396px]:w-4 max-[396px]:h-4"
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
            <label htmlFor="audio-file" className="px-4 py-2 max-[396px]:px-2 max-[396px]:py-1 cursor-pointer rounded-[34px] bg-[#EDF0FB]">
              <AudioSquare className="w-6 h-6 max-[396px]:w-4 max-[396px]:h-4" color="#4534b8" variant="Outline" />
              <FileInput
                hidden
                id="audio-file"
                accept="audio/mp3,audio/wav,audio/ogg,audio/aac,audio/m4a"
                onChange={(value) => {
                  setAudio(value)
                }}
              />
            </label>
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
                  message: "Please enter some text",
                  color: "red",
                });
              var data = new FormData();
              data.append("text", form.values.text);
              data.append("post_id", String(+(base64decode(post_id as string)) / 1000000));
              if (audio) {
                data.append("audio", audio, audio.name);
              }
              selected.length &&
                selected.forEach((item) => {
                  if (item.type === "image") {
                    if (typeof item.value === "string") {
                      data.append("photo", item.value);
                    } else
                      data.append("photo", item.value, item.value.name);
                  } else if (item.type === "video") {
                    if (typeof item.value === "string") {
                      data.append("video", item.value);
                    } else
                      data.append("video", item.value, item.value.name);
                  }
                });
              postComment(data, setLoading, () => {
                refetch(String(+(base64decode(post_id as string)) / 1000000))
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

export default CommentPostModal;
