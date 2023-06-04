import { Modal } from "@mantine/core";
import React from "react";
import PrimaryButton from "../button/primaryButton";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { postLimit, stickerAwardee } from "@/store";

function RewardStickerSuccess({ opened, close }) {
  const queryClient = useQueryClient();
  const awardee: any = useAtomValue(stickerAwardee);
  const limit = useAtomValue(postLimit)
  return (
    <Modal
      size="25vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[280px] gap-[32px] max-w-[580px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-0",
        title: "font-semibold w-full text-[#181D27] leading-6 text-center",
        body: "overflow-auto grid grid-rows-[auto_1fr] !gap-[32px] !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      closeOnClickOutside={false}
      title="Successfull!"
      centered
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src="/payments/add-account-success.png"
          alt="withrawal successful"
          className="h-[109px] object-cover"
        />
        <p className="text-[#2a2a2a] text-center leading-6 font-medium">
          You have successfully awarded {awardee?.first_name}{" "}
          {awardee?.last_name}
        </p>
      </div>
      <PrimaryButton
        text="Done"
        onClick={() => {
            queryClient.invalidateQueries(["all-posts", limit]);
          close();
        }}
      />
    </Modal>
  );
}

export default RewardStickerSuccess;
