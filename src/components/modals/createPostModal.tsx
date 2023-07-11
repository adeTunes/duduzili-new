import {
  LoadingOverlay,
  Modal,
  Textarea,
  FileInput,
  Text,
  Loader,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Icon } from "@iconify/react";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import { createPost } from "@/actions/createPost";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import DisplayMedia from "./displayMedia";
import AudioPlayer from "./audioPlayer";
import AudioOptions from "./audioOption";
import dynamic from "next/dynamic";
import { modals } from "@mantine/modals";
import CreatePostMenu from "./createPostMenu";
import axios from "axios";
import { Link21 } from "iconsax-react";

const AudioRecorder = dynamic(() => import("../audio/audioRecorder"), {
  ssr: false,
});

function CreatePostModal({ opened, close }) {
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
  useEffect(() => {
    selected.filter((item) => item.type === "image").length > 5
      ? setErr("You cannot create post with more than 5 photos")
      : setErr("");
  }, [selected]);
  const [audio, setAudio] = useState(null);

  const closeModal = () => {
    setSelected([]);
    setAudio(null);
    setRecordedAudio(null);
    form.reset();
    close();
  };

  const [audioMenuOpened, setAudioMenuOpened] = useState(false);
  const [start, setStart] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);

  const [menuOpened, setMenuOpened] = useState(false);

  const savePostOrDraft = (publish: "True" | "False") => {
    if (selected.filter((item) => item.type === "image").length > 5)
      return showNotification({
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

  const openModal = () =>
    modals.openConfirmModal({
      title: "Save to draft?",
      classNames: { inner: "z-[203]", overlay: "z-[202]" },
      centered: true,
      closeOnConfirm: true,
      children: <Text size="sm">Do you want to save this post to draft?</Text>,
      labels: { confirm: loading ? <Loader size="sm" /> : "Yes", cancel: "No" },
      confirmProps: {
        className: "bg-duduzili-violet hover:bg-duduzili-violet",
      },
      onCancel: () => {
        closeModal();
      },
      onConfirm: () => savePostOrDraft("False"),
    });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    var urlPattern = /\b(https?:\/\/\S+)/gi;
    var urls = form.values.text.match(urlPattern);
    if (urls?.[0])
      axios
        .post("https://getlinkpreview.onrender.com/", { url: urls[0] })
        .then(({ data }) => {
          setPreview({ ...data, ogUrl: data?.ogUrl || urls?.[0] });
        })
        .catch((e) => {
          console.log(e);
        });
  }, [form.values.text]);

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
        if (form.values.text || audio || recordedAudio || selected.length)
          openModal();
        else closeModal();
      }}
      closeOnClickOutside={false}
      title="Create New"
      centered
    >
      <div className="flex flex-col gap-5 mt-6">
        <UserAvatarWithName
          image={user?.user?.photo_url}
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
              maxRows={12}
              {...form.getInputProps("text")}
            />
            <p className="text-[14px] text-red-600 font-semibold">{err}</p>
          </div>
          {preview ? (
            <div className="flex w-full">
              <a
                href={preview?.ogUrl}
                className="grid w-full min-h-[100px] grid-cols-[100px,1fr] h-max rounded-lg items-center gap-3 bg-[#EDF0FB]"
                target="_blank"
              >
                {preview?.image ? (
                  <img
                    className="h-full object-cover rounded-l-lg"
                    src={preview?.image}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Link21 size="24" variant="Bold" />
                  </div>
                )}
                <div className="p-2 flex flex-col gap-1">
                  <div className="font-semibold text-base">
                    {preview?.title}
                  </div>
                  <Text lineClamp={2} className=" font-normal text-sm">
                    {preview?.description}
                  </Text>
                  <div className=" font-normal text-xs">{preview?.domain}</div>
                </div>
              </a>
            </div>
          ) : null}
          <DisplayMedia setSelected={setSelected} selected={selected} />
          {audio ? <AudioPlayer audio={audio} setAudio={setAudio} /> : null}
          <AudioRecorder
            setStart={setStart}
            start={start}
            audio={recordedAudio}
            setAudio={setRecordedAudio}
          />
          <div className="flex items-center gap-3">
            {/* <div className="px-4 py-2 max-[390px]:px-2 max-[390px]:py-1 rounded-[34px] bg-[#EDF0FB]">
            <EmojiContainer height={300} form={form} />
            </div> */}
            <label
              htmlFor="image-file"
              className="px-4 py-2 max-[390px]:px-2 max-[390px]:py-1 rounded-[34px] bg-[#EDF0FB]"
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
              className="px-4 py-2 max-[390px]:px-2 max-[390px]:py-1 rounded-[34px] bg-[#EDF0FB]"
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
          <CreatePostMenu
            opened={menuOpened}
            setOpened={setMenuOpened}
            closeModal={closeModal}
            setLoading={setLoading}
            audio={audio}
            recordedAudio={recordedAudio}
            selected={selected}
            form={form}
          />
        </div>
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default CreatePostModal;
