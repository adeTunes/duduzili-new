import { Icon } from "@iconify/react";
import { Loader, Modal, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import UseUserBySearch from "../../../hooks/useUserBySearch";
import { useForm } from "@mantine/form";

function AddCommunityMemberModal({ opened, close }) {
  const [membersList, setMembersList] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebouncedValue(search, 400);
  const { data: friends, isFetching: searchLoading } =
    UseUserBySearch(searchValue);
    const form = useForm({
        initialValues: {
            member: ""
        }
    })
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
      title="Add Members"
      centered
    >
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
    </Modal>
  );
}

export default AddCommunityMemberModal;
