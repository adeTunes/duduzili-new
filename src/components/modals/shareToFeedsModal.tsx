import { LoadingOverlay, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import RepostsContainer from "../homepage/repostsContainer";
import PrimaryButtonOutline from "../button/primaryButtonOutline";
import PrimaryButton from "../button/primaryButton";
import useUserPost from "../../../hooks/useUserPost";

function ShareToFeedsModal({ opened, close, post }) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      size="61.483vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 max-w-[580px] rounded-[24px] flex flex-col overflow-auto",
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
        <PrimaryButton text="Share" onClick={() => {}} />
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default ShareToFeedsModal;
