import React, { ReactNode, forwardRef, useState } from "react";
import {
  Modal,
  Textarea,
  Select,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import DropPictureZone from "./dropZone";
import { Icon } from "@iconify/react";
import { Lock1 } from "iconsax-react";

function CreateCommunityModal({ opened, close }) {
  const [loading, setLoading] = useState(false);
  const list = [
    {
      label: "Private",
      value: "private",
      description: "Anyone can view and join this community.",
      icon: <Icon height={24} width={24} icon="mdi:world" color="#292D32" />
    },
    {
      label: "Public",
      value: "public",
      description: "Requires permission to join the community",
      icon: <Lock1 size="24" color="#292D32"/>
    },
    {
      label: "Private & Hidden",
      value: "private-hidden",
      description: "Not visible to the general public. Only members can find it",
      icon: <Icon icon="ic:outline-lock-person" height={24} width={24} color="#292D32" />
    },
  ];
  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string;
    value: string;
    description: string;
    icon: ReactNode
  }
  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLImageElement, ItemProps>(
    ({ label, description, icon, value, ...others }: ItemProps, ref) => (
      <div className="flex items-center gap-[18px]" ref={ref} {...others}>
        {icon}
        <div className="flex flex-col">
            <p>{label}</p>
            <p className="">{description}</p>
        </div>
      </div>
    )
  );
  return (
    <Modal
      size="50vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 rounded-[24px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-[2vh] border-b-[#EDF0FB] border-b",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto !p-0",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Create Community"
      centered
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col pt-[3vh] gap-2 items-start">
          <p className="text-[#2A2A2A] font-medium leading-6">
            Cover Image <span className="text-[#757575]">(Optional)</span>
          </p>
          <DropPictureZone />
          <p className="text-[12px] leading-5 font-medium text-[#BDBDBD] tracking-[0.02em]">
            You can upload files in the following format in .jpg, .png, .jpeg,
            .hiec (Size limit 5mb)
          </p>
        </div>
        <TextInput
          label="Name"
          placeholder="Name your community"
          classNames={{
            label: "text-[#2A2A2A] leading-6 font-medium",
            input:
              "h-[8vh] placeholder:text-[#757575] border border-[#C8C8C8] rounded-[8px] text-[15px] leading-6",
            root: "flex flex-col gap-2",
          }}
        />
        <Textarea
          label="Description"
          placeholder="Describe your community"
          classNames={{
            label: "text-[#2A2A2A] leading-6 font-medium",
            input:
              "h-[8vh] placeholder:text-[#757575] border border-[#C8C8C8] rounded-[8px] text-[15px] leading-6",
            root: "flex flex-col gap-2",
          }}
          h="auto"
          autosize
          minRows={5}
          maxRows={7}
        />
        <Select
          classNames={{
            label: "text-[#2A2A2A] leading-6 font-medium",
            input:
              "h-[8vh] placeholder:text-[#757575] border border-[#C8C8C8] rounded-[8px] text-[15px] leading-6",
            root: "flex flex-col gap-2",
          }}
          itemComponent={SelectItem}
          label="Privacy"
          data={list}
        />
      </div>
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default CreateCommunityModal;
