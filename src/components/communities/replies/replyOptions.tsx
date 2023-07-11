import { Icon } from "@iconify/react";
import { Loader, Menu, Popover, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import EditIcon from "./editIcon";
import EditCommentModal from "@/components/homepage/posts/editCommentModal";
import { modals } from "@mantine/modals";
import { deleteParticularComment } from "@/actions/postOptionActions";

function ReplyOptions({ id, refetch }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const openModal = () =>
    modals.openConfirmModal({
      title: "Delete comment",
      classNames: { inner: "z-[203]", overlay: "z-[202]" },
      centered: true,
      closeOnConfirm: true,
      children: (
        <Text size="sm">Are you sure you want to delete this comment?</Text>
      ),
      labels: { confirm: loading ? <Loader size="sm" /> : "Yes", cancel: "No" },
      confirmProps: {
        className: "bg-duduzili-violet hover:bg-duduzili-violet",
      },
      onCancel: () => {},
      onConfirm: () => deleteParticularComment(id, setLoading, () => {
        refetch()
      }),
    });
  return (
    <Menu
      closeOnItemClick
      classNames={{
        dropdown: "px-6 py-8 rounded-[24px]",
        item: "p-0",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px 0px rgba(0, 0, 0, 0.25)",
        },
        item: {
          "&[data-hovered]": {
            background: "white",
          },
        },
      }}
    >
      <Menu.Target>
        <Icon
          icon="solar:menu-dots-bold"
          rotate={1}
          className="cursor-pointer w-6 h-6 max-[350px]:w-[18px] max-[350px]:h-[18px]"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <div className="flex flex-col">
            <span
              onClick={open}
              className="py-5 flex cursor-pointer hover:bg-[#f5f5f5] items-center text-[#2A2A2A] font-normal leading-normal gap-4"
            >
              <EditIcon />
              Edit Comment
            </span>
            <span onClick={openModal} className="py-5 flex items-center cursor-pointer hover:bg-[#f5f5f5] text-[#D40000] font-normal leading-normal gap-4">
              <Icon
                icon="material-symbols:delete-outline"
                color="#D40000"
                height={24}
                width={24}
              />
              Delete Comment
            </span>
          </div>
        </Menu.Item>
      </Menu.Dropdown>
      {opened && (
        <EditCommentModal
          refetch={refetch}
          opened={opened}
          close={close}
          id={id}
        />
      )}
    </Menu>
  );
}

export default ReplyOptions;
