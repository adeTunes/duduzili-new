import { Modal } from "@mantine/core";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../button/primaryButton";
import { useQueryClient } from "@tanstack/react-query";

function WithdrawSuccessModal({ opened, close }) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (opened) {
      setAmount(sessionStorage.getItem("withdraw-amount"));
    }
  }, [opened]);
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
      title="Cheers!"
      centered
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src="/payments/withdrawal-success.png"
          alt="withrawal successful"
          className="h-[150px] object-cover"
        />
        <p className="text-[#2a2a2a] text-center leading-6 font-medium">
          Your request to withdraw{" "}
          <span className="text-[#4534B8]">N{amount}</span> is currently being
          processed
        </p>
      </div>
      <PrimaryButton
        text="Done"
        onClick={() => {
          queryClient.invalidateQueries(["user-wallet"]);
          queryClient.invalidateQueries(["transaction-history"]);
          close();
        }}
      />
    </Modal>
  );
}

export default WithdrawSuccessModal;
