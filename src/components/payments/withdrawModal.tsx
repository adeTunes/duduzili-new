import {
  Group,
  LoadingOverlay,
  Modal,
  PinInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ModalStepper from "./modalStepper";
import PrimaryButton from "../button/primaryButton";
import SelectWithdrawalAccount from "./selectWithdrawalAccount";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import ConfirmWithdrawalAccount from "./confirmWithdrawalAccount";
import {
  generateTokenForWithdrawal,
  makeWithdrawal,
  verifyTokenForWithdrawal,
} from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export default function WithdrawModal({ opened, close, openSuccess }) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState("");
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const form = useForm({
    initialValues: {
      amount: "",
      account_id: null,
    },
  });

  const [otp, setOTP] = useState("");

  const handleWithdrawal = () => {
    const data = new FormData();
    data.append("amount", form.values.amount);
    data.append("account_id", JSON.parse(bank)?.id);
    makeWithdrawal(data)
      .then(({ data }) => {
        setLoading(false);
        if (!data?.message?.includes("successful")) {
          return showNotification({
            message: data?.data?.non_field_errors || data?.data,
          });
        }
        showNotification({
          message: data?.data,
        });
        close();
        openSuccess();
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };

  const handleVerifyCode = () => {
    if (!otp)
      return showNotification({
        message: "Please enter code",
        color: "red",
      });
    setLoading(true);
    const data = new FormData();
    data.append("code", otp);
    verifyTokenForWithdrawal(data)
      .then(({ data }) => {
        if (!data?.message?.includes("successful")) {
          return showNotification({
            message: data?.data,
          });
        }
        showNotification({
          message: data?.data,
        });
        handleWithdrawal();
        setActive((v) => v + 1);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };

  useEffect(() => {
    if (active === 2) {
      setLoading(true);
      generateTokenForWithdrawal()
        .then(({ data }) => {
          setLoading(false);
          showNotification({
            message: data?.data || data?.error || data?.message,
          });
        })
        .catch((e) => {
          setLoading(false);
          errorMessageHandler(e);
        });
    }
  }, [active]);

  return (
    <Modal
      size="55vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[280px] gap-3 max-w-[580px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-0",
        title: "font-bold text-[24px] text-[#2A2A2A] leading-[29px]",
        body: "overflow-auto grid grid-rows-[auto_auto_1fr_auto] !gap-[40px] !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      closeOnClickOutside={false}
      onClose={() => {
        setActive(0);
        close();
      }}
      title="Withdraw Fund"
      centered
    >
      <p className="text-[#757575] font-medium leading-6">
        {active === 0 ? (
          "Select withdrawal account"
        ) : active === 1 ? (
          "Confirm withdrawal account"
        ) : (
          <span className="flex flex-col">
            <small>Verify account.</small>
            <small>
              Please enter the OTP (One-Time Password) that was sent to your
              email
            </small>
          </span>
        )}
      </p>
      <ModalStepper active={active} setActive={setActive} />
      {active === 0 ? (
        <SelectWithdrawalAccount
          nextStep={nextStep}
          form={form}
          bank={bank}
          setBank={setBank}
        />
      ) : active === 1 ? (
        <ConfirmWithdrawalAccount
          nextStep={nextStep}
          bank={JSON.parse(bank)}
          amount={form.values.amount}
        />
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault()
          handleVerifyCode()
        }} className="flex flex-col !gap-[40px]">
          <div>
          <TextInput
              placeholder="Enter OTP"
              classNames={{
                label: "text-[#2a2a2a] font-medium leading-6",
                root: "flex flex-col gap-2",
                input:
                  "h-[48px] border border-[#C8C8C8] rounded-[8px] placeholder:text-[#757575] leading-6 text-[15px]",
              }}
              value={otp}
              onChange={e => setOTP(e.target.value)}
            />
          </div>
          <PrimaryButton className="flex-1 h-full" text="Verify OTP" />
        </form>
      )}
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}
