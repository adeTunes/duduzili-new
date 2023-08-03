import { LoadingOverlay, Modal, Textarea, FileInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Icon } from "@iconify/react";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import { createCommunityPost, createPost } from "@/actions/createPost";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import DisplayMedia from "./displayMedia";
import { AudioSquare } from "iconsax-react";
import { useRouter } from "next/router";
import AudioPlayer from "./audioPlayer";
import dynamic from "next/dynamic";
import AudioOptions from "./audioOption";
import { notify } from "../../../utils/notification-handler";

const AudioRecorder = dynamic(() => import("../audio/audioRecorder"), {
  ssr: false,
});

function CreateCommunityPostModal({ limit, opened, close }) {
  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const [selected, setSelected] = useState([]);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const user: any = useAtomValue(userDetails);
  const { query } = useRouter();
  useEffect(() => {
    selected.filter((item) => item.type === "image").length > 5
      ? setErr("You cannot create post with more than 5 photos")
      : setErr("");
  }, [selected]);
  const [audio, setAudio] = useState(null);

  const [audioMenuOpened, setAudioMenuOpened] = useState(false);
  const [start, setStart] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  return (
    <Modal
      size="lg"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 max-[390px]:px-3 rounded-[24px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "max-[390px]:px-0",
        inner: "z-[201]",
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
        setAudio(null);
        setRecordedAudio(null);
        close();
      }}
      title="Create New"
      centered
    >
      <div className="flex flex-col gap-5 mt-6">
        <UserAvatarWithName
          image={user?.user?.photo_url }
          fullName={`${user?.user?.first_name} ${user?.user?.last_name}`}
          username={user?.user?.username}
        />
        <div className="flex flex-col gap-8 mb-[40px] max-[390px]:mb-[15px]">
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Create a post. Share a moment. Tell people what's on your mind"
              classNames={{
                input:
                  "!border-none text-[20px] leading-7 max-[390px]:placeholder:text-[16px] text-black !px-0 placeholder:text-[#A4A4A4] placeholder:text-[20px] placeholder:leading-7",
              }}
              h="auto"
              autosize
              minRows={2}
              maxRows={8}
              {...form.getInputProps("text")}
            />
            <p className="text-[14px] text-red-600 font-semibold">{err}</p>
          </div>
          <DisplayMedia setSelected={setSelected} selected={selected} />
          {audio ? <AudioPlayer audio={audio} setAudio={setAudio} /> : null}
          <AudioRecorder
            setStart={setStart}
            start={start}
            audio={recordedAudio}
            setAudio={setRecordedAudio}
          />
          <div className="flex items-center gap-3">
            <label
              htmlFor="image-file"
              className="px-4 py-2 rounded-[34px] max-[390px]:px-2 max-[390px]:py-1 bg-[#EDF0FB]"
            >
              <Icon
                icon="ic:outline-image"
                color="#4534b8"
                className="cursor-pointer w-6 h-6 max-[390px]:w-4 max-[390px]:h-4"
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
              className="px-4 py-2 rounded-[34px] max-[390px]:px-2 max-[390px]:py-1 bg-[#EDF0FB]"
            >
              <Icon
                icon="mdi:video-outline"
                color="#4534b8"
                className="cursor-pointer w-6 h-6 max-[390px]:w-4 max-[390px]:h-4"
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
            <AudioOptions
              setStart={setStart}
              setRecordedAudio={setRecordedAudio}
              setAudio={setAudio}
              setOpened={setAudioMenuOpened}
              opened={audioMenuOpened}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <PrimaryButtonOutline onClick={close} text="Cancel" />
          <PrimaryButton
            text="Share"
            onClick={() => {
              if (!form.values.text)
                return notify({
                  title: "Error",
                  message: "Please enter post text",
                  color: "red",
                });
              if (selected.filter((item) => item.type === "image").length > 5)
                return notify({
                  title: "Error",
                  message: "You cannot create post with more than 5 photos",
                  color: "red",
                });
              var data = new FormData();
              data.append("text", form.values.text);
              data.append("code", String(query.id));
              if (audio) {
                data.append("audio", audio, audio.name);
              }
              else if (recordedAudio) {
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
              data.append("publish", "True");
              data.append("is_community", "True");
              createCommunityPost(data, setLoading, () => {
                queryClient.invalidateQueries([
                  "community-posts",
                  limit,
                  query.id,
                ]);
                setAudio(null);
                setRecordedAudio(null);
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

export default CreateCommunityPostModal;
