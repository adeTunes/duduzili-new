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
import { createCommunity } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { useDebouncedValue } from "@mantine/hooks";
import UseUserBySearch from "../../../hooks/useUserBySearch";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";

function CreateCommunityModal({ opened, close }) {
  const [loading, setLoading] = useState(false);
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
    // {
    //   label: "Private & Hidden",
    //   value: "private-hidden",
    //   description:
    //     "Not visible to the general public. Only members can find it",
    //   icon: (
    //     <Icon
    //       icon="ic:outline-lock-person"
    //       height={24}
    //       width={24}
    //       color="#292D32"
    //     />
    //   ),
    // },
  ];

  const categories = [
    {
      name: "Business",
      value: "business",
      icon: <Icon icon="material-symbols:business-center-outline-sharp" />,
    },

    {
      name: "Fashion",
      value: "fashion",
      icon: <Icon icon="icon-park-outline:clothes-sweater" />,
    },
    {
      name: "Culture",
      value: "culture",
      icon: <Icon icon="icon-park-outline:traditional-chinese-medicine" />,
    },
    {
      name: "Job",
      value: "job",
      icon: <Icon icon="bx:hard-hat" />,
    },
    {
      name: "Politics",
      value: "politics",
      icon: <Icon icon="ri:government-line" />,
    },
    {
      name: "Others",
      value: "others",
      icon: <Icon icon="material-symbols:more-horiz" />,
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
      <div className="flex items-center gap-[18px]" ref={ref} {...others}>
        {icon}
        <div className="flex flex-col">
          <p>{label}</p>
          <p className="">{description}</p>
        </div>
      </div>
    )
  );
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState(null);

  const { data } = useCommunityCategoryList();
  const form = useForm<{
    name: string;
    description: string;
    privacy: "private" | "" | "public";
    member: string;
  }>({
    initialValues: {
      name: "",
      description: "",
      privacy: "",
      member: "",
    },
  });
  const [membersList, setMembersList] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebouncedValue(search, 400);
  const { data: friends, isLoading: searchLoading } =
    UseUserBySearch(searchValue);
    const {push} = useRouter()

  useEffect(() => {
    if (friends) {
      console.log(friends);
      setMembersList(
        friends?.reduce((acc, item, idx) => {
          acc.push({
            label: `${item.first_name} ${item.last_name}`,
            value: JSON.stringify({
              fullName: `${item.first_name} ${item.last_name}`,
              id: item.id,
            }),
          });
          return acc;
        }, [])
      );
    }
  }, [friends]);

  useEffect(() => {
    if (form.values.member) {
      if (!members.includes(form.values.member)) {
        setMembers([...members, form.values.member]);
      }
      form.setFieldValue("member", "");
    }
  }, [form.values.member]);

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
      title="Create Community"
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
        <div className="flex flex-col gap-6">
          <p className="text-[#2A2A2A] font-medium leading-6">
            Invite Friends <span className="text-[#757575]">(Optional)</span>
          </p>
          <Select
            classNames={{
              input:
                "h-[8vh] placeholder:text-[#757575] border border-[#C8C8C8] rounded-[8px] text-[15px] leading-6",
            }}
            rightSection={
              searchLoading ? (
                <Loader size="sm" />
              ) : (
                <Icon
                  icon="gridicons:dropdown"
                  color="#92929d"
                  width="24"
                  height="24"
                  hFlip={true}
                />
              )
            }
            searchable
            maxDropdownHeight={400}
            nothingFound="No friend found"
            rightSectionWidth={30}
            placeholder="Search Friends"
            searchValue={search}
            onSearchChange={setSearch}
            data={membersList}
            {...form.getInputProps("member")}
          />
          <div className="flex gap-4 flex-wrap">
            {members.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 p-2 bg-[#f4f4f4] border border-solid border-[#C8C8C8] rounded-lg"
              >
                <p className=" text-xs font-medium text-[#757575]">
                  {JSON.parse(item).fullName}
                </p>
                <Icon
                  icon="ph:x-bold"
                  color="#C1C2C6"
                  className="cursor-pointer"
                  width={12}
                  height={12}
                  onClick={() =>
                    setMembers(
                      members.filter(
                        (el) => JSON.parse(el).id !== JSON.parse(item).id
                      )
                    )
                  }
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <PrimaryButton
        className="w-full"
        text="Create"
        onClick={() => {
          if (!selected.length)
            return showNotification({
              message: "Please select at least one category",
              color: "red",
            });
            setLoading(true)
          const data = new FormData();
          data.append("name", form.values.name);
          data.append("description", form.values.description);
          if (image) {
            data.append("logo", image);
          }
          selected.forEach((item) => {
            data.append("category_id", item);
          });
          if (form.values.privacy === "private") {
            data.append("is_private", "True");
          } else data.append("is_private", "False");
          if (members.length) {
            members.map((item) => {
              data.append("members", JSON.parse(item).id);
            });
          }
          createCommunity(data)
            .then(({ data }) => {
              setLoading(false)
              showNotification({
                message: data?.message || data?.error || "Success",
                color: "green",
              });
              close()
              push("/communities/discover")
            })
            .catch((e) => {
              setLoading(false)
              errorMessageHandler(e);
            });
        }}
      />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default CreateCommunityModal;
