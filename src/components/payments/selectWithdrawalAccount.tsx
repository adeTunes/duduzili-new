import { LoadingOverlay, Radio, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useState } from "react";
import UseWithdrawalAccounts from "../../../hooks/useWithdrawalAccounts";
import PrimaryButton from "../button/primaryButton";
import { showNotification } from "@mantine/notifications";
interface Prop {
  form: UseFormReturnType<
    {
      amount: string;
      account_id: any;
    },
    (values: { amount: string; account_id: any }) => {
      amount: string;
      account_id: any;
    }
  >;
  bank: string;
  setBank: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void
}

function SelectWithdrawalAccount({nextStep, form, bank, setBank }: Prop) {
  const { data, isLoading } = UseWithdrawalAccounts();

  return (
    <>
    <div className="grid grid-rows-[auto_1fr] overflow-auto gap-6">
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
      <div className="flex flex-col gap-4 overflow-auto">
        <p className="text-[#757575] leading-6 text-[15px]">
          Select a withdrawal account to continue
        </p>
        <div
          className="rounded-[8px] max-h-[300px] py-6 px-4 flex-1 overflow-auto"
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        >
          <Radio.Group value={bank} onChange={setBank} name="favoriteFramework">
            <div className="flex flex-col gap-[25px]">
              {data?.data?.map((item, idx) => (
                <Radio
                  key={idx}
                  classNames={{
                    body: "justify-between items-center",
                  }}
                  labelPosition="left"
                  value={JSON.stringify(item)}
                  label={
                    <div className="flex items-center gap-4">
                      <img
                        src="/payments/default-bank-logo.png"
                        className="h-[60px] max-[400px]:w-[30px] max-[400px]:h-[30px] w-[60px] object-cover"
                        alt=""
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-[#2a2a2a] max-[400px]:text-sm font-semibold leading-6">
                          {item?.account_name}
                        </p>
                        <p className="text-[#757575] max-[400px]:text-xs text-[15px] leading-6">
                          {item?.account_number}
                        </p>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </Radio.Group>
        </div>
      </div>
      <LoadingOverlay visible={isLoading} />
    </div>
    <PrimaryButton
        text="Proceed"
        onClick={() => {
          if (!bank)
            return showNotification({
              message: "Please select a withdrawal account to proceed",
              color: "red",
            });
          if (!form.values.amount)
            return showNotification({
              message: "Please enter withdrawal amount",
              color: "red",
            });
          sessionStorage.setItem("withdraw-amount", form.values.amount);
          nextStep();
        }}
      />
    </>
  );
}

export default SelectWithdrawalAccount;
