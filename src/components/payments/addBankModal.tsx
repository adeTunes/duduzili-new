import {
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  PinInput,
  clsx,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../button/primaryButton";
import {
  addWithdrawalAccount,
  fetchAccountName,
  generateTokenForAddWithdrawalAcc,
  verifyTokenForAddWithdrawalAcc,
} from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import AddBankDetails from "./addBankDetails";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { notify } from "../../../utils/notification-handler";

function AddBankModal({ opened, close, openSuccess }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      bank: "",
      account_number: "",
      name: "",
    },
  });

  const [addLoading, setAddLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  useEffect(() => {
    if (form.values.bank && form.values.account_number?.length === 10) {
      setLoading(true);
      const formData = new FormData();
      formData.append("account_number", form.values.account_number);
      formData.append("bank_code", form.values.bank);
      fetchAccountName(formData)
        .then(({ data }) => {
          form.setFieldValue("name", data?.data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          errorMessageHandler(e);
        });
    }
  }, [form.values.bank, form.values.account_number]);
  const [active, setActive] = useState(1);
  const [otp, setOTP] = useState("");
  const user: any = useAtomValue(userDetails);

  const handleAddBank = () => {
    setAddLoading(true);
    const formData = new FormData();
    formData.append("full_name", form.values.name);
    formData.append("account_number", form.values.account_number);
    formData.append("bank_code", form.values.bank);
    addWithdrawalAccount(formData)
      .then(({ data }) => {
        setAddLoading(false);
        if (data?.error) {
          notify({
            message: data?.error,
            color: "red",
          });
          return;
        }
        close();
        openSuccess();
        form.reset();
      })
      .catch((e) => {
        setAddLoading(false);
        errorMessageHandler(e);
      });
  };

  const handleVerifyCode = () => {
    if (!otp)
      return notify({
        message: "Please enter code",
        color: "red",
      });
    setAddLoading(true);
    const data = new FormData();
    data.append("code", otp);
    verifyTokenForAddWithdrawalAcc(data)
      .then(({ data }) => {
        if (!data?.message?.includes("successful")) {
          return notify({
            message: data?.data,
          });
        }
        notify({
          message: data?.data,
        });
        setAddLoading(false);
        setActive((v) => v + 1);
      })
      .catch((e) => {
        setAddLoading(false);
        errorMessageHandler(e);
      });
  };

  useEffect(() => {
    if (opened && !codeLoading) {
      setCodeLoading(true);
      generateTokenForAddWithdrawalAcc()
        .then(({ data }) => {
          setCodeLoading(false);
          notify({
            message: data?.data || data?.error || data?.message,
          });
        })
        .catch((e) => {
          setCodeLoading(false);
          errorMessageHandler(e);
        });
    }
  }, [opened]);

  return (
    <Modal
      size="55vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] gap-3 max-w-[580px] max-[460px]:px-3 max-[460px]:py-3 max-[460px]:min-w-[90vw] min-w-[430px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-0",
        title: "font-bold text-[24px] max-[460px]:text-base text-[#2A2A2A] leading-[29px]",
        body: "overflow-auto grid !gap-[40px] !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      closeOnClickOutside={false}
      onClose={() => {
        setActive(1);
        form.reset();
        close();
      }}
      title="Add Withdrawal Account"
      centered
    >
      {active === 1 ? (
        <>
          <p className="pb-6 border-b max-[460px]:text-sm text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
            Please enter the verification code that was sent to your new email
          </p>
          <Group position="center">
            <PinInput
              length={5}
              classNames={{
                input:
                  "w-[59px] h-[10vh] max-[460px]:w-[35px] max-[460px]:h-[50px] !border-0 !bg-[#F4F4F4] rounded-[8px]",
              }}
              value={otp}
              onChange={setOTP}
            />
            <div className="flex items-center w-full justify-between">
              <p
                onClick={() => {
                  generateTokenForAddWithdrawalAcc()
                    .then(({ data }) => {
                      setCodeLoading(false);
                      notify({
                        message: data?.data || data?.error || data?.message,
                      });
                    })
                    .catch((e) => {
                      setCodeLoading(false);
                      errorMessageHandler(e);
                    });
                }}
                className="text-[#3B81E5] leading-6 font-medium ml-auto cursor-pointer"
                // onClick={resendOTP}
              >
                Resend code
              </p>
            </div>
          </Group>
        </>
      ) : (
        <AddBankDetails form={form} loading={loading} />
      )}
      <PrimaryButton
        className={clsx(
          active === 2 &&
            !form.values.name &&
            "!pointer-events-none !opacity-30"
        )}
        onClick={active === 1 ? handleVerifyCode : handleAddBank}
        text={
          addLoading ? (
            <p className="flex justify-center">
              <Loader size="sm" />
            </p>
          ) : active === 1 ? (
            "Verify OTP"
          ) : (
            "Confirm"
          )
        }
      />
      <LoadingOverlay visible={codeLoading} />
    </Modal>
  );
}

export default AddBankModal;
