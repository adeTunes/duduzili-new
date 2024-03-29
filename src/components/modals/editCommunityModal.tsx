import React, { ReactNode, useEffect, forwardRef, useState } from "react";
import {
  Modal,
  Textarea,
  Select,
  TextInput,
  LoadingOverlay,
  Checkbox,
  Loader,
} from "@mantine/core";
import DropPictureZone from "./dropZone";
import { Icon } from "@iconify/react";
import { Lock1 } from "iconsax-react";
import PrimaryButton from "../button/primaryButton";
import useCommunityCategoryList from "../../../hooks/useCommunityCategoryList";
import { useForm } from "@mantine/form";
import { editCommunity, uploadCommunityCoverImage } from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import useCommunityDetails from "../../../hooks/useCommunityDetails";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "../../../utils/notification-handler";

function EditCommunityModal({ opened, close, code }) {
  const [loading, setLoading] = useState(false);
  const { data: details, isLoading } = useCommunityDetails(code);

  const list = [
    {
      label: "Private",
      value: "private",
      description: "Anyone can view and join this community.",
      icon: <Icon height={24} width={24} icon="mdi:world" color="#292D32" />,
    },
    {
      label: "Public",
      value: "public",
      description: "Requires permission to join the community",
      icon: <Lock1 size="24" color="#292D32" />,
    },
  ];

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string;
    value: string;
    description: string;
    icon: ReactNode;
  }
  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLImageElement, ItemProps>(
    ({ label, description, icon, value, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <div className="flex items-center gap-[18px]">
          {icon}
          <div className="flex flex-col">
            <p>{label}</p>
            <p className="">{description}</p>
          </div>
        </div>
      </div>
    )
  );
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState(null);

  const { data } = useCommunityCategoryList();

  useEffect(() => {
    if (data && details) {
      form.setValues({
        name: details?.data?.name,
        description: details?.data?.description,
        privacy: details?.data?.is_private ? "private" : "public",
      });
      setImage(details?.data?.get_logo_url);
      setSelected(
        details?.data?.category?.reduce((acc, item) => {
          acc.push(`${item.id}`);
          return acc;
        }, [])
      );
    }
  }, [data, details]);
  const form = useForm<{
    name: string;
    description: string;
    privacy: "private" | "" | "public";
  }>({
    initialValues: {
      name: "",
      description: "",
      privacy: "",
    },
  });
  const queryClient = useQueryClient();

  return (
    <Modal
      size="50vw"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content: "py-6 px-8 rounded-[24px] flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-[2vh] border-b-[#EDF0FB] border-b",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto !p-0 flex flex-col gap-8",
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Edit Community"
      centered
    >
      <div className="flex pb-3 flex-col flex-1 overflow-auto gap-8">
        <div className="flex flex-col pt-[3vh] gap-2 items-start">
          <p className="text-[#2A2A2A] font-medium leading-6">
            Cover Image <span className="text-[#757575]">(Optional)</span>
          </p>
          <DropPictureZone image={image} setImage={setImage} />
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
          {...form.getInputProps("name")}
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
          {...form.getInputProps("description")}
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
          {...form.getInputProps("privacy")}
        />
        <div className="flex flex-col gap-6">
          <p className="text-[#2A2A2A] font-medium leading-6">
            Category{" "}
            <span className="text-[#757575]">
              (Select one or more categories that describes your community)
            </span>
          </p>
          <div className="grid items-center gap-10 grid-cols-3">
            {data?.map(({ name, id }, index) => (
              <div key={index} className="flex items-center justify-between">
                {/* <span className="flex items-center gap-3">
                  {icon}
                  {name}
                </span> */}
                {/* <span>{name}</span> */}
                <Checkbox.Group
                  withAsterisk
                  value={selected}
                  onChange={setSelected}
                >
                  <Checkbox
                    value={String(id)}
                    classNames={{ input: "cursor-pointer" }}
                    label={name}
                  />
                </Checkbox.Group>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PrimaryButton
        className="w-full"
        text="Save Changes"
        onClick={() => {
          if (!selected.length)
            return notify({
              message: "Please select at least one category",
              color: "red",
            });
          setLoading(true);
          const data = new FormData();
          data.append("name", form.values.name);
          data.append("description", form.values.description);
          data.append("code", code);
          if (image) {
            data.append("logo", image);
          }
          selected.forEach((item) => {
            data.append("category_id", item);
          });
          if (form.values.privacy === "private") {
            data.append("is_private", "True");
          } else data.append("is_private", "False");
          editCommunity(data)
            .then(({ data }) => {
              if (image && typeof image === "object") {
                const formData = new FormData();
                formData.append("community_code", data?.data?.code);
                formData.append("logo", image, image.name);
                uploadCommunityCoverImage(formData).then(({ data }) => {
                  notify({
                    message: data?.data,
                  });
                });
              }
              notify({
                message: data?.message || data?.error || "Success",
                color: "green",
              });
              queryClient.invalidateQueries(["community-details", code]);
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
}

export default EditCommunityModal;
