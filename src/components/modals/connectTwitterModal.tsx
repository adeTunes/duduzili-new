import { Modal, Button, TextInput, LoadingOverlay } from "@mantine/core";
import PrimaryButton from "../button/primaryButton";
import { addAccount } from "@/actions/settingsActions";
import { useForm } from "@mantine/form";
import {useState} from "react"

export const ConnectTwitterModal = ({ opened, close }) => {
  const form = useForm({
    initialValues: {
        link: ""
    }
  });
  const [loading, setLoading] = useState(false)
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
      title="Add Twitter Account"
      centered
    >
      <p className="pb-6 border-b text-[#BDBDBD] font-medium leading-6 border-b-[#EDF0FB]">
        Link your Twitter account. This will prevent future loss of account and
        easy accessibility
      </p>
      <div className="mt-6">
        <TextInput
          label="Account URL"
          placeholder="Enter your twitter account link"
          classNames={{
            input: "placeholder:text-[#757575] text-[15px] leading-6 h-12 border border-[#C8C8C8] rounded-[8px]",
            label: "text-[#2A2A2A] font-medium leading-6",
            root: "flex flex-col gap-2"
          }}
          {...form.getInputProps("link")}
        />
      </div>
      <PrimaryButton text="Connect" className="mt-[4vh]" onClick={() => {
        const data = new FormData()
        data.append('type', 'twitter');
        data.append('link', form.values.link)
        addAccount(setLoading, data, () => {
            close()
            form.reset()
        })
        }} />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
};
// onConfirm: () => location.pathname = "/login"
