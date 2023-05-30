import {
  Modal,
  Button,
  TextInput,
  LoadingOverlay,
  PasswordInput,
} from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { addAccount } from "@/actions/settingsActions";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { changePassword } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

export const NewPasswordModal = ({ opened, close }) => {
  const form = useForm({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });
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
      title="Change Password"
      centered
    >
      <p className="pb-6 border-b text-[#BDBDBD] font-medium leading-6 border-b-[#EDF0FB]">
        Enter your old password and a new password to proceed
      </p>
      <div className="flex flex-col gap-6">
        <PasswordInput
          label="Old Password"
          classNames={{
            input:
              "placeholder:text-[#757575] text-[15px] leading-6 h-12 border border-[#C8C8C8] rounded-[8px]",
            innerInput: "placeholder:text-[#757575] text-[15px] leading-6 h-12",
            label: "text-[#2A2A2A] font-medium leading-6",
            root: "flex flex-col gap-2",
          }}
          {...form.getInputProps("old_password")}
        />
        <PasswordInput
          label="New Password"
          classNames={{
            input:
              "placeholder:text-[#757575] text-[15px] leading-6 h-12 border border-[#C8C8C8] rounded-[8px]",
            innerInput: "placeholder:text-[#757575] text-[15px] leading-6 h-12",
            label: "text-[#2A2A2A] font-medium leading-6",
            root: "flex flex-col gap-2",
          }}
          {...form.getInputProps("new_password")}
        />
        <PasswordInput
          label="Confirm New Password"
          classNames={{
            input:
              "placeholder:text-[#757575] text-[15px] leading-6 h-12 border border-[#C8C8C8] rounded-[8px]",
            innerInput: "placeholder:text-[#757575] text-[15px] leading-6 h-12",
            label: "text-[#2A2A2A] font-medium leading-6",
            root: "flex flex-col gap-2",
          }}
          {...form.getInputProps("confirm_password")}
        />
      </div>
      <PrimaryButton
        text="Change Password"
        onClick={() => {
          if (form.values.new_password !== form.values.confirm_password)
            return showNotification({
              message: "Passwords don't match",
              color: "red",
            });
            setLoading(true)
          changePassword({
            old_password: form.values.old_password,
            new_password: form.values.new_password,
          })
            .then(({ data }) => {
              showNotification({
                message: data?.message,
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
