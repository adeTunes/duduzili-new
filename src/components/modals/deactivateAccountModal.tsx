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
      title="Deactivate Account"
      centered
    >
      <p className="pb-6 border-b text-[#757575] font-medium leading-6 border-b-[#EDF0FB]">
        Deactivating an account is temporary. Your Duduzili account will be
        disabled and your name and photos will be removed from most things
        you&apos;ve shared.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="w-[36vh] h-[36vh]">
          <img
            src="/settings/deactivate-account.png"
            className="w-full h-full"
            alt="Deactivate account logo"
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
          text="Yes, Deactivate"
          className="mt-[4vh]"
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
