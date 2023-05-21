import { postComment } from "@/actions/commentActions";
import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

function ReplyInput() {
  const user: any = useAtomValue(userDetails);
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();
  const post_id = query.id;
  const form = useForm({
    initialValues: {
      text: "",
      post_id,
    },
  });
  const queryClient = useQueryClient();
  return (
    <div className="grid gap-4 grid-cols-[auto_1fr]">
      <img
        src={user?.user?.photo_url.substring(62)}
        className="w-[56px] h-[56px] rounded-full object-cover"
        alt=""
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData();
          data.append("text", form.values.text);
          data.append("post_id", form.values.post_id as string);
          postComment(data, setLoading, () => {
            queryClient.invalidateQueries(["single-posts", +post_id]);
            form.reset()
          });
        }}
        className="bg-white pl-6 pr-2 py-2 rounded-[32px] grid grid-cols-[1fr_auto] items-center"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        <TextInput
          placeholder="Reply this thread"
          className="bg-none"
          classNames={{ input: "h-full border-none" }}
          {...form.getInputProps("text")}
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="flex items-center gap-3">
            <Icon icon="ic:outline-image" height={24} width={24} />
            <Icon icon="ic:outline-videocam" height={24} width={24} />
            <Icon
              icon="streamline:computer-voice-mail-mic-audio-mike-music-microphone"
              height={24}
              width={24}
            />
          </div>
        )}
        <button type="submit" hidden></button>
      </form>
    </div>
  );
}

export default ReplyInput;
