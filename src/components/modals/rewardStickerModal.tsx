import { LoadingOverlay, Modal } from "@mantine/core";
import React, { useState } from "react";
import SelectStickerViewModal from "./selectStickerViewModal";

function RewardStickersModal({ opened, postId, openSuccess, close }) {
  return (
    <Modal
      size="95%"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] max-[390px]:px-3 flex flex-col overflow-auto max-w-[400px] min-w-[270px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-[#222222] leading-6",
        body: "overflow-auto max-[390px]:px-0 grid grid-rows-[1fr_auto] !p-0 !pt-6 flex-1",
      }}
      closeOnClickOutside={false}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Select a Sticker"
      centered
    >
      <SelectStickerViewModal postId={postId} close={close} openSuccess={openSuccess} />
    </Modal>
  );
}

export default RewardStickersModal;
