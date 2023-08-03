import { LoadingOverlay, Modal, Textarea, FileInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { useRouter } from "next/router";
import { editParticularComment, editParticularPost } from "@/actions/postOptionActions";
import dynamic from "next/dynamic";
import UserAvatarWithName from "@/components/profile/userAvatarWithName";
import DisplayMedia from "@/components/modals/displayMedia";
import AudioPlayer from "@/components/modals/audioPlayer";
import AudioOptions from "@/components/modals/audioOption";
import PrimaryButtonOutline from "@/components/button/primaryButtonOutline";
import PrimaryButton from "@/components/button/primaryButton";
import useSinglePost from "../../../../hooks/useSinglePost";
import useSingleComment from "../../../../hooks/useSingleComment";
import { base64decode } from "nodejs-base64";
import { notify } from "../../../../utils/notification-handler";

const AudioRecorder = dynamic(() => import("@/components/audio/audioRecorder"), {
  ssr: false,
});

function EditCommentModal({ opened, close, refetch, id }) {
  const { data, isLoading } = useSingleComment(id);

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
  const [audio, setAudio] = useState(null);

  const [audioMenuOpened, setAudioMenuOpened] = useState(false);
  const [start, setStart] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);

  useEffect(() => {
    if (data) {
      if (data?.content) form.setFieldValue("text", data?.content);
      if (data?.media?.audio) {
        setAudio(data?.media?.audio);
      }
      if (data?.media?.video) {
        setSelected((prev) => {
          const filtered = prev.filter(
            (item) => item.value !== data?.media?.video
          );
          return [
            ...filtered,
            { type: "video", value: data?.media?.video },
          ];
        });
      }
      if (data?.media?.photo) {
        data?.media?.photo?.forEach((el) => {
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
        content:
          "py-6 px-8 flex max-[390px]:px-3 flex-col overflow-auto rounded-[24px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto max-[390px]:px-0",
        inner: "z-[201]"
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={() => {
        setSelected([]);
        setAudio(null)
        form.reset();
        setRecordedAudio(null)
        close();
      }}
      title="Edit Post"
      centered
    >
      <div className="grid h-full overflow-auto grid-rows-[auto_1fr_auto] gap-5 mt-6">
        <UserAvatarWithName
          image={user?.user?.photo_url }
          fullName={`${user?.user?.first_name} ${user?.user?.last_name}`}
          username={user?.user?.username}
        />
        <div className="flex flex-col gap-8 flex-1 overflow-auto pb-[86px] max-[390px]:pb-[40px]">
          <Textarea
            placeholder="Create a post. Share a moment. Tell people what's on your mind"
            classNames={{
              input:
                "!border-none text-[20px] leading-7 text-black max-[390px]:placeholder:text-[16px] !px-0 placeholder:text-[#A4A4A4] placeholder:text-[20px] placeholder:leading-7",
            }}
            h="auto"
            autosize
            minRows={2}
            maxRows={8}
            {...form.getInputProps("text")}
          />
          <DisplayMedia selected={selected} setSelected={setSelected} />
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
          <PrimaryButton
            text="Share"
            onClick={() => {
              if (!form.values.text)
                return notify({
                  title: "Error",
                  message: "Please enter post text",
                  color: "red",
                });
              var formData = new FormData();
              if (audio) {
                formData.append("audio", audio, audio.name);
              } else if (recordedAudio) {
                formData.append("audio", recordedAudio?.blob);
              }
              formData.append("text", form.values.text);
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
              editParticularComment(id, formData, setLoading, () => {
                refetch()
                setSelected([]);
                setAudio(null)
                setRecordedAudio(null)
                form.reset();
                close();
              });
            }}
          />
        </div>
      </div>
      <LoadingOverlay visible={loading || isLoading} />
    </Modal>
  );
}

export default EditCommentModal;
