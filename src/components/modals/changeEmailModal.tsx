import { Modal, Button, TextInput, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { addAccount } from "@/actions/settingsActions";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { PinInput, Group } from "@mantine/core";
import { sendOTP, verifyOTP } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export const ChangeEmailModal = ({ opened, email, close, openNewEmail }) => {
  const [loading, setLoading] = useState(false);
  const resendOTP = () => {
    setLoading(true);
    const data = new FormData();
    data.append("email", email);
    sendOTP(data)
      .then(({ data }) => {
        showNotification({
          message: data?.message,
          color: "green",
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  const [otp, setOTP] = useState("")

  useEffect(() => {
    if(opened) {
      resendOTP()
    }
  }, [opened])

  return (
    <Modal
      size="45vw"
      closeOnClickOutside={false}
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[280px] gap-3 max-w-[480px] flex flex-col overflow-auto",
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
      onClose={close}
      title="Change Email"
      centered
    >
      <p className="pb-6 border-b text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
        Please enter the verification code that was sent to your email
      </p>
      <Group position="center">
        <PinInput
          length={6}
          classNames={{
            input: "w-[59px] h-[10vh] !border-0 !bg-[#F4F4F4] rounded-[8px]",
          }}
          value={otp}
          onChange={setOTP}
        />
        <div className="flex items-center justify-between w-full">
          {/* <p className="text-[#757575] leading-6 font-medium">0:05</p> */}
          <p
            className="text-[#3B81E5] leading-6 font-medium ml-auto cursor-pointer"
            onClick={resendOTP}
          >
            Resend code
          </p>
        </div>
      </Group>
      <PrimaryButton
        text="Verify OTP"
        className="mt-[4vh]"
        onClick={() => {
          setLoading(true)
          const data = new FormData();
          data.append("email", email);
          data.append("otp", otp);
          verifyOTP(data)
            .then(({ data }) => {
              showNotification({
                message: data?.message,
                color: "green",
              });
              setLoading(false);
              openNewEmail();
              close();
            })
            .catch((e) => {
              setLoading(false);
              errorMessageHandler(e);
            });
        }}
      />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
};
// onConfirm: () => location.pathname = "/login"
