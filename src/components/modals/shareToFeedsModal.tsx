import { LoadingOverlay, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import RepostsContainer from "../homepage/repostsContainer";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import useUserPost from "../../../hooks/useUserPost";
import { repostPostAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { postLimit } from "@/store";

function ShareToFeedsModal({ opened, close, post }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()
  const limit = useAtomValue(postLimit)

  return (
    <Modal
      size="61.483vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 min-w-[260px] max-[550px]:px-2 max-w-[580px] rounded-[24px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto grid grid-rows-[1fr_auto] !p-0 !pt-6",
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
      <RepostsContainer post={post} />
      <div className="flex gap-3 mt-[50px] justify-end">
        <PrimaryButtonOutline onClick={close} text="Cancel" />
        <PrimaryButton text="Share" onClick={() => {
          const data = new FormData()
          data.append("post_id", post?.id)
          repostPostAction(data, setLoading, () => {
            queryClient.invalidateQueries(["all-posts", limit])
            close()
          })
        }} />
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default ShareToFeedsModal;
