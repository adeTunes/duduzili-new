import React, { useState } from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import PersonalPostOptions from "./personalPostOptions";
import OtherUserPostOptions from "./otherUserPostOptions";
import EditPostModal from "@/components/modals/editPostModal";
import { useDisclosure } from "@mantine/hooks";
import ReportPostModal from "@/components/modals/reportPostModal";

function PostOptions({ post, setLoading }) {
  const user: any = useAtomValue(userDetails);
  const [opened, setOpened] = useState(false);
  const [editOpened, { open, close }] = useDisclosure(false);
  const [reportPostOpened, { open: openReportPost, close: closeReportPost }] =
    useDisclosure(false);

  return (
    <Menu
      opened={opened}
      onChange={() => {
        setOpened(!opened);
      }}
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-0 !rounded-[24px] !w-[auto] !min-w-[20vw]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          paddingInline: "clamp(5px, 1vw, 24px) !important"
        },
        item: {
          "&[data-hovered]": {
            background: "none",
            cursor: "default",
          },
        },
      }}
    >
      <Menu.Target>
        <Icon
          icon="solar:menu-dots-bold"
          height={24}
          width={24}
          rotate={1}
          className="cursor-pointer"
        />
      </Menu.Target>

      <Menu.Dropdown>
        {post?.user?.id === user?.user?.id ? (
          <Menu.Item>
            <PersonalPostOptions
              open={open}
              setLoading={setLoading}
              post={post}
            />
          </Menu.Item>
        ) : (
          <Menu.Item>
            <OtherUserPostOptions
              open={openReportPost}
              setLoading={setLoading}
              post={post}
            />
          </Menu.Item>
        )}
      </Menu.Dropdown>
      <ReportPostModal id={post?.id} opened={reportPostOpened} close={closeReportPost} />
      {editOpened ? (
        <EditPostModal id={post?.id} opened={editOpened} close={close} />
      ) : null}
    </Menu>
  );
}

export default PostOptions;
