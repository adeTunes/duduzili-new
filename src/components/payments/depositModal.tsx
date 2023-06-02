import { Loader, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import PrimaryButton from "../button/primaryButton";
import { useSetAtom } from "jotai";
import { depositAmount } from "@/store";
import { showNotification } from "@mantine/notifications";
import { initializeDeposit } from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function DepositModal({ opened, close }) {
  const form = useForm({
    initialValues: {
      amount: "",
    },
  });
  const setAmount = useSetAtom(depositAmount);
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      size="55vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[280px] gap-3 max-w-[580px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-0",
        title: "font-bold text-[24px] text-[#2A2A2A] leading-[29px]",
        body: "overflow-auto grid !gap-[40px] !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      closeOnClickOutside={false}
      onClose={close}
      title="Deposit Fund"
      centered
    >
      <p className="text-[#757575] font-medium leading-6">
        Select deposit account
      </p>
      <TextInput
        label="Amount to withdraw"
        placeholder="Enter amount"
        classNames={{
          label: "text-[#2a2a2a] font-medium leading-6",
          root: "flex flex-col gap-2",
          input:
            "h-[48px] border border-[#C8C8C8] rounded-[8px] placeholder:text-[#757575] leading-6 text-[15px]",
        }}
        {...form.getInputProps("amount")}
      />
      <PrimaryButton
        className="mt-[40px]"
        onClick={() => {
          if (!form.values.amount)
            return showNotification({
              message: "Please enter amount",
              color: "red",
            });
          setLoading(true);
          setAmount(form.values.amount);
          sessionStorage.setItem("deposit-amount", form.values.amount)
          const data = new FormData();
          data.append("amount", form.values.amount);
          initializeDeposit(data)
            .then(({ data }) => {
              setLoading(false);
              location.href = data.url;
            })
            .catch((e) => {
              setLoading(false);
              errorMessageHandler(e);
            });
          form.reset();
          close();
        }}
        text={
          loading ? (
            <p className="flex justify-center">
              <Loader size="sm" />
            </p>
          ) : (
            <p className="flex items-center justify-center gap-1">
              <span>Continue with</span>
              <img
                src="/payments/paystack.png"
                className="w-[15px] h-[15px] object-cover"
                alt=""
              />
              <span>paystack</span>
            </p>
          )
        }
      />
    </Modal>
  );
}

export default DepositModal;
