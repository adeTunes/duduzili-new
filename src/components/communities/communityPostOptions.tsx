import React, { useState } from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import EditPostModal from "@/components/modals/editPostModal";
import { useDisclosure } from "@mantine/hooks";
import ReportPostModal from "@/components/modals/reportPostModal";
import {
    LeaveCommunityAction,
  blockUserAction,
  followUserAction,
  muteUserAction,
  savePostAction,
} from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import { Flag, MicrophoneSlash, TicketStar, UserAdd } from "iconsax-react";
import ReportUserModal from "../modals/reportUserModal";

function CommunityPostOptions({ post, community, setLoading }) {
  const user: any = useAtomValue(userDetails);
  const [opened, setOpened] = useState(false);
  const [editOpened, { open, close }] = useDisclosure(false);
  const [reportPostOpened, { open: openReportPost, close: closeReportPost }] =
    useDisclosure(false);
  const [reportUserOpened, { open: openReportUser, close: closeReportUser }] =
    useDisclosure(false);
  const fullName = `${post?.user?.first_name} ${post?.user?.last_name}`;
  const queryClient = useQueryClient();
  const personalPostOptions = [
    {
      name: `${post?.user?.is_following ? "Unfollow" : "Follow"} ${fullName}`,
      icon: <UserAdd size="24" color="#2A2A2A" />,
      action: () =>
        followUserAction(setLoading, post?.user?.id, () =>
          queryClient.invalidateQueries(["random-communities-posts"])
        ),
    },
    {
      name: `Save post`,
      icon: (
        <Icon
          color="#2A2A2A"
          icon="circum:bookmark-minus"
          height={24}
          width={24}
        />
      ),
      action: () =>
        savePostAction(setLoading, post?.id, () =>
          queryClient.invalidateQueries(["random-communities-posts"])
        ),
    },
    {
        name: `Report ${fullName}`,
        icon: <Flag size="24" color="#2A2A2A" />,
        action: openReportUser
      },
    {
      name: `Report Post`,
      icon: <Flag size="24" color="#2A2A2A" />,
      action: openReportPost,
    },
    {
      name: `Leave Community`,
      icon: <Icon color="#D40000" icon="fe:disabled" height={24} width={24} />,
      action: () =>
        LeaveCommunityAction(community?.code, setLoading, () =>
          queryClient.invalidateQueries(["all-posts"])
        ),
    },
  ];
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
        dropdown: "!py-6 !px-8 !rounded-[24px] !w-[auto] !min-w-[20vw]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
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
        <Menu.Item>
          <div className="flex flex-col">
            {personalPostOptions.map((item, idx, arr) => (
              <div
                key={idx}
                onClick={item.action}
                className={clsx(
                  idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
                  item.name.toLocaleLowerCase().includes("leave")
                    ? "text-[#D40000]"
                    : "text-[#2A2A2A]",
                  "flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
                )}
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
        </Menu.Item>
      </Menu.Dropdown>
      <ReportPostModal
        id={post?.id}
        opened={reportPostOpened}
        close={closeReportPost}
      />
      {editOpened ? (
        <EditPostModal id={post?.id} opened={editOpened} close={close} />
      ) : null}
      <ReportUserModal id={post?.user?.id} close={closeReportUser} opened={reportUserOpened} />
    </Menu>
  );
}

export default CommunityPostOptions;
