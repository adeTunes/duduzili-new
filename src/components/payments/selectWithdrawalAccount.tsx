import { Radio, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useState } from "react";
interface Prop {
    form: UseFormReturnType<{
        amount: string;
    }, (values: {
        amount: string;
    }) => {
        amount: string;
    }>
    bank: string;
    setBank: React.Dispatch<React.SetStateAction<string>>
}

function SelectWithdrawalAccount({form, bank, setBank}: Prop) {
  return (
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
          <Radio.Group
            value={bank}
            onChange={setBank}
            name="favoriteFramework"
          >
            <div className="flex flex-col gap-[25px]">
              <Radio
                classNames={{
                  body: "justify-between items-center",
                }}
                labelPosition="left"
                value="wema-bank"
                label={
                  <div className="flex items-center gap-4">
                    <img
                      src="/payments/wema-bank.png"
                      className="h-[60px] w-[60px] object-cover"
                      alt=""
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#2a2a2a] font-semibold leading-6">
                        Wema Bank
                      </p>
                      <p className="text-[#757575] text-[15px] leading-6">
                        0243913808
                      </p>
                    </div>
                  </div>
                }
              />
              <Radio
                classNames={{
                  body: "justify-between items-center",
                }}
                labelPosition="left"
                value="fidelity-bank"
                label={
                  <div className="flex items-center gap-4">
                    <img
                      src="/payments/wema-bank.png"
                      className="h-[60px] w-[60px] object-cover"
                      alt=""
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#2a2a2a] font-semibold leading-6">
                        Wema Bank
                      </p>
                      <p className="text-[#757575] text-[15px] leading-6">
                        0243913808
                      </p>
                    </div>
                  </div>
                }
              />
              <Radio
                classNames={{
                  body: "justify-between items-center",
                }}
                labelPosition="left"
                value="fcmb"
                label={
                  <div className="flex items-center gap-4">
                    <img
                      src="/payments/wema-bank.png"
                      className="h-[60px] w-[60px] object-cover"
                      alt=""
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#2a2a2a] font-semibold leading-6">
                        Wema Bank
                      </p>
                      <p className="text-[#757575] text-[15px] leading-6">
                        0243913808
                      </p>
                    </div>
                  </div>
                }
              />
              <Radio
                classNames={{
                  body: "justify-between items-center",
                }}
                labelPosition="left"
                value="keystone"
                label={
                  <div className="flex items-center gap-4">
                    <img
                      src="/payments/wema-bank.png"
                      className="h-[60px] w-[60px] object-cover"
                      alt=""
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#2a2a2a] font-semibold leading-6">
                        Wema Bank
                      </p>
                      <p className="text-[#757575] text-[15px] leading-6">
                        0243913808
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}

export default SelectWithdrawalAccount;
