import { Modal, Button, TextInput, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { addAccount } from "@/actions/settingsActions";
import { useForm } from "@mantine/form";
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
      onClose={close}
      title="Sign Out"
      centered
    >
      <p className="pb-6 border-b text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
        By signing out on all platforms, your account will be logged out from
        every device you have previously logged in with
      </p>
      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="w-[290px] h-[200px]">
          <img
            src="/sign-out.png"
            className="w-full h-full"
            alt="sign out logo"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-3">
        <PrimaryButton
          text="Cancel"
          className="mt-[4vh] !text-duduzili-violet !bg-[#EDF0FB]"
          onClick={close}
        />
        <PrimaryButton
          text="Yes, Sign out"
          className="mt-[4vh]"
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
