import { LoadingOverlay, Modal, Textarea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import RepostsContainer from "../homepage/repostsContainer";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import useUserPost from "../../../hooks/useUserPost";
import { repostPostAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { postLimit } from "@/store";
import { useForm } from "@mantine/form";

function ShareToFeedsModal({ opened, close, post }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const limit = useAtomValue(postLimit);
  const form = useForm({
    initialValues: {
      text: ""
    }
  })

  return (
    <Modal
      size="61.483vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 min-[400px]:min-w-[360px] max-[400px]:min-w-[90vw] max-[400px]:py-2 min-w-[260px] max-[550px]:px-2 max-w-[580px] rounded-[24px] flex flex-col overflow-auto",
        header:
          "!px-0 !pt-0 !pb-6 max-[400px]:!pb-2 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto grid grid-rows-[1fr_auto] max-[400px]:!pt-1 !p-0 !pt-6",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Share to Feeds"
      centered
    >
      <Textarea
        placeholder="Enter some text"
        classNames={{
          input:
            "!border-none text-[20px] leading-7 max-[400px]:!py-1 max-[390px]:placeholder:text-[16px] text-black !px-0 placeholder:text-[#A4A4A4] placeholder:text-[20px] placeholder:leading-7",
        }}
        h="auto"
        autosize
        minRows={1}
        maxRows={4}
        {...form.getInputProps("text")}
      />
      <RepostsContainer post={post} />
      <div className="flex gap-3 max-[400px]:mt-5 mt-[50px] justify-end">
        <PrimaryButtonOutline onClick={close} text="Cancel" />
        <PrimaryButton
          text="Share"
          onClick={() => {
            const data = new FormData();
            if(form.values.text) data.append("text", form.values.text);
            data.append("post_id", post?.id);
            repostPostAction(data, setLoading, () => {
              queryClient.invalidateQueries(["all-posts", limit]);
              close();
            });
          }}
        />
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default ShareToFeedsModal;
