import React from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import PersonalPostOptions from "./personalPostOptions";
import OtherUserPostOptions from "./otherUserPostOptions";
import { Copy, Share } from "iconsax-react";
import ShareToFeedsModal from "@/components/modals/shareToFeedsModal";
import { useDisclosure } from "@mantine/hooks";

function ShareOptions({ post, setLoading, totalReposts }) {
  const user: any = useAtomValue(userDetails);
  const [opened, { open, close }] = useDisclosure(false);
  const options = [
    {
      name: "Copy link",
      icon: <Copy size="24" color="#2A2A2A" />,
      action: () => {},
    },
    {
      name: "Share to Feeds",
      icon: (
        <Icon
          color="#2A2A2A"
          icon="material-symbols:edit-square-outline"
          height={24}
          width={24}
        />
      ),
      action: open,
    },
    {
      name: "Pin post",
      icon: <Share size="24" color="#2A2A2A" />,
      action: () => {},
    },
  ];

  return (
    <Menu
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-6 !px-8 !rounded-[24px] !w-[auto] !min-w-[26vw]",
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
        <div className="flex items-center gap-2">
          <Icon
            className="cursor-pointer"
            icon="material-symbols:google-plus-reshare"
            height={24}
            width={24}
            color="#2a2a2a"
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
            {totalReposts}
          </p>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <div className="flex flex-col">
            {options.map((item, idx, arr) => (
              <div
                key={idx}
                onClick={item.action}
                className={clsx(
                  idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
                  item.name.toLocaleLowerCase().includes("delete")
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
      <ShareToFeedsModal opened={opened} close={close} post={post} />
    </Menu>
  );
}

export default ShareOptions;
