import { Modal, Button, TextInput, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { PinInput, Group } from "@mantine/core";
import { sendOTP, verifyOTP } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export const NewEmailVerifyModal = ({ email, opened, close }) => {
  const [loading, setLoading] = useState(false);
  const resendOTP = () => {
    setLoading(true);
    const data = new FormData();
    data.append("email", email);
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
  const [otp, setOTP] = useState("");

  useEffect(() => {
    if(opened) {
      resendOTP()
    }
  }, [opened])
  return (
    <Modal
      size="45vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 max-[360px]:px-3 max-[360px]:py-2 rounded-[24px] min-w-[333px] max-[360px]:min-w-[270px] gap-3 max-w-[480px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-0",
        title: "font-bold text-[#2A2A2A] leading-[29px]",
        body: "overflow-auto grid !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
        title: {
          fontSize: "clamp(16px, 2.3vw, 24px)"
        },
        body: {
          gap: "clamp(6px, 3vw, 40px)"
        }
      }}
      opened={opened}
      onClose={close}
      title="Verify New Email"
      centered
    >
      <p style={{
        fontSize: "clamp(12px, 1.4vw, 16px)",
        paddingBottom: "clamp(5px, 1.5vw, 24px)"
      }} className="pb-6 border-b text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
        Please enter the verification code that was sent to your new email
      </p>
      <Group position="center">
        <PinInput
          length={6}
          classNames={{
            input: "!border-0 !bg-[#F4F4F4] rounded-[8px]",
          }}
          styles={{
            input: {
              width: "clamp(30px, 3vw, 53px)",
              height: "clamp(35px, 4vw, 48px)",
            }
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
      <PrimaryButton
        text="Verify OTP"
        style={{
          marginTop: "clamp(5px, 3vw, 40px)"
        }}
        onClick={() => {
          setLoading(true);
          const data = new FormData();
          data.append("email", email);
          data.append("otp", otp);
          verifyOTP(data)
            .then(({ data }) => {
              showNotification({
                message: data?.message ?? data?.error,
                color: "green",
              });
              setLoading(false);
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
