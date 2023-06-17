import { Modal, Button, TextInput, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { addAccount } from "@/actions/settingsActions";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { changeEmail } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export const ChangePasswordWithEmailModal = ({
  email,
  opened,
  openChangePassword,
  close,
}) => {
  const form = useForm({
    initialValues: {
      new_email: "",
    },
  });
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
      title="Change Email"
      centered
    >
      <p style={{
        fontSize: "clamp(12px, 1.4vw, 16px)",
        paddingBottom: "clamp(5px, 1.5vw, 24px)"
      }} className="border-b text-[#BDBDBD] font-medium leading-6 border-b-[#EDF0FB]">
        Enter your new email address to receive further instruction
      </p>
      <div className="mt-6">
        <TextInput
          label="Your Email"
          placeholder="yourname@email.com"
          classNames={{
            input:
              "placeholder:text-[#757575] text-[15px] leading-6 h-12 border border-[#C8C8C8] rounded-[8px]",
            label: "text-[#2A2A2A] font-medium leading-6",
            root: "flex flex-col gap-2",
          }}
          {...form.getInputProps("new_email")}
        />
      </div>
      <PrimaryButton
        text="Send"
        style={{
          marginTop: "clamp(5px, 3vw, 40px)"
        }}
        onClick={() => {
          changeEmail({ old_email: email, new_email: form.values.new_email })
            .then(({ data }) => {
              showNotification({
                message: data?.message,
                color: "green",
              });
              setLoading(false);
              openChangePassword();
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
