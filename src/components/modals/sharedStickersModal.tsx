import { LoadingOverlay, Modal } from "@mantine/core";
import React, { useState } from "react";
import PrimaryButton from "../button/primaryButton";
import { ArrowLeft, TicketStar } from "iconsax-react";
import SharedStickersModalView from "./sharedStickersModalView";
import SelectStickerViewModal from "./selectStickerViewModal";

function SharedStickersModal({ opened, stickerUsers, sticker, close }) {
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(1);
  return (
    <Modal
      size="95%"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 max-[395px]:px-2 rounded-[24px] flex flex-col overflow-auto min-h-[330px] min-w-[270px]",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-[#222222] leading-6",
        body: "overflow-auto grid grid-rows-[1fr_auto] !p-0 !pt-6 flex-1",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title={
        active === 1 ? (
          "Available Stickers"
        ) : (
          <p className="flex items-center gap-4">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => setActive((v) => v - 1)}
              size="28"
              color="#333333"
            />
            Select a Sticker
          </p>
        )
      }
      centered
    >
      {active === 1 ? (
        <SharedStickersModalView stickerUsers={stickerUsers} sticker={sticker} setActive={setActive} />
      ) : (
        <SelectStickerViewModal />
      )}
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default SharedStickersModal;
