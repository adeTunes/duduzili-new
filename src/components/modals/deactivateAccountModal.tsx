import { Modal, Button, TextInput, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { useState } from "react";
import { deactivateAccount } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export const DeactivateAccountModal = ({ opened, close }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      size="55vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 rounded-[24px] min-w-[250px] gap-3 max-w-[580px] flex flex-col overflow-auto",
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
      title="Deactivate Account"
      centered
    >
      <p style={{
        fontSize: "clamp(12px, 1.4vw, 16px)",
        paddingBottom: "clamp(5px, 1.5vw, 24px)"
      }} className="pb-6 border-b text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
        Deactivating an account is temporary. Your Duduzili account will be
        disabled and your name and photos will be removed from most things
        you&apos;ve shared.
      </p>
      <div style={{
            marginTop: "clamp(5px, 2vw, 24px)"
          }} className="flex flex-col items-center justify-center">
        <div className="w-full max-[655px]:w-full">
          <img
            src="/settings/deactivate-account.png"
            className="w-full h-full"
            alt="Deactivate account logo"
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
          text="Yes, Deactivate"
          style={{
            marginTop: "clamp(5px, 3vw, 40px)"
          }}
          onClick={() => {
            setLoading(true);
            deactivateAccount()
              .then(({ data }) => {
                showNotification({
                  message:
                    data?.message || data?.error || "Account deactivated",
                  color: "green",
                });
                setLoading(false);
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
