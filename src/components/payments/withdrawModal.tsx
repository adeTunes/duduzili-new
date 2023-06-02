import { Group, LoadingOverlay, Modal, PinInput, Radio, TextInput } from "@mantine/core";
import { useState } from "react";
import ModalStepper from "./modalStepper";
import PrimaryButton from "../button/primaryButton";
import SelectWithdrawalAccount from "./selectWithdrawalAccount";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import ConfirmWithdrawalAccount from "./confirmWithdrawalAccount";
import { sendOTP } from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export default function WithdrawModal({ opened, close, openSuccess }) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("");
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      amount: "",
    },
  });

  const [otp, setOTP] = useState("")
  const resendOTP = () => {
    setLoading(true);
    const data = new FormData();
    // data.append("email", email);
    sendOTP(data)
      .then(({ data }) => {
        showNotification({
          message: data?.error ?? data?.message,
          color: "green",
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };

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
        setActive(0)
        close()
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
          form={form}
          bank={course}
          setBank={setCourse}
        />
      ) : active === 1 ? (
        <ConfirmWithdrawalAccount />
      ) : (
        <div>
          <Group position="center">
            <PinInput
              length={4}
              classNames={{
                input:
                  "w-[100px] text-[18px] h-[10vh] !border-0 !bg-[#F4F4F4] rounded-[8px]",
              }}
              value={otp}
              onChange={setOTP}
            />
            <div className="flex items-center w-full justify-between">
              {/* <p className="text-[#757575] leading-6 font-medium">0:05</p> */}
              <p
                className="text-[#3B81E5] leading-6 font-medium ml-auto cursor-pointer"
                onClick={resendOTP}
              >
                Resend code
              </p>
            </div>
          </Group>
        </div>
      )}
      <PrimaryButton
        text={active === 0 ? "Proceed" : active === 1 ? "Confirm Account" : "Verify OTP"}
        onClick={() => {
          if (active === 0) {
            if (!course)
              return showNotification({
                message: "Please select a withdrawal account to proceed",
                color: "red",
              });
            if (!form.values.amount)
              return showNotification({
                message: "Please enter withdrawal amount",
                color: "red",
              });
            nextStep();
          }
          else if(active === 1) nextStep()
          else {
            close()
            openSuccess()
          }
        }}
      />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}
