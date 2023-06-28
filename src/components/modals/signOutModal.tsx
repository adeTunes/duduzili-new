import { Modal, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { useState } from "react";
import { signOutOnAllBrowsers } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";

export const SignOutModal = ({ opened, close }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Modal
      size="55vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 max-[500px]:px-3 max-[500px]:py-2 rounded-[24px] min-w-[250px] gap-3 max-w-[580px] flex flex-col overflow-auto",
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
      title="Sign Out"
      centered
    >
      <p style={{
        fontSize: "clamp(12px, 1.4vw, 16px)",
        paddingBottom: "clamp(5px, 1.5vw, 24px)"
      }} className="pb-6 border-b text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
        By signing out on all platforms, your account will be logged out from
        every device you have previously logged in with
      </p>
      <div style={{
            marginTop: "clamp(5px, 2vw, 24px)"
          }} className="flex flex-col items-center justify-center">
        <div className="w-[290px] max-[655px]:w-full">
          <img
            src="/sign-out.png"
            className="w-full h-full"
            alt="sign out logo"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 max-[655px]:grid-cols-1 w-full gap-3">
        <PrimaryButton
          text="Cancel"
          style={{
            marginTop: "clamp(5px, 3vw, 40px)"
          }}
          className="!text-duduzili-violet !bg-[#EDF0FB]"
          onClick={close}
        />
        <PrimaryButton
          text="Yes, Sign out"
          style={{
            marginTop: "clamp(5px, 3vw, 40px)"
          }}
          onClick={() => {
            setLoading(true);
            signOutOnAllBrowsers()
              .then(({ data }) => {
                showNotification({
                  message: data?.message ?? data?.error,
                  color: "green",
                });
                setLoading(false);
                close();
                localStorage.removeItem("duduzili-user");
                router.push("/login");
              })
              .catch((e) => {
                setLoading(false);
                errorMessageHandler(e);
              });
          }}
        />
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
};
// onConfirm: () => location.pathname = "/login"
