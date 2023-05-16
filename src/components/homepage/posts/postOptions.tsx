import React from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import PersonalPostOptions from "./personalPostOptions";
import OtherUserPostOptions from "./otherUserPostOptions";

function PostOptions({ post, setLoading }) {
  const user: any = useAtomValue(userDetails);

  return (
    <Menu
      closeOnItemClick={false}
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
        {post?.user?.id === user?.user?.id ? (
          <Menu.Item>
            <PersonalPostOptions setLoading={setLoading} post={post} />
          </Menu.Item>
        ) : (
          <Menu.Item>
            <OtherUserPostOptions setLoading={setLoading} post={post} />
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export default PostOptions;
