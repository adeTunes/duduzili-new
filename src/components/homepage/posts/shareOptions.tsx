import React, { useState } from "react";
import { Menu, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { Copy, Share } from "iconsax-react";
import ShareToFeedsModal from "@/components/modals/shareToFeedsModal";
import { useDisclosure } from "@mantine/hooks";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";
import { Post } from "../../../../api/request.types";
import copy from "copy-to-clipboard";
import { base64encode } from "nodejs-base64";
import { ShareIcon } from "./shareIcon";
import { notify } from "../../../../utils/notification-handler";

function ShareOptions({
  post,
  totalReposts,
  size,
}: {
  post: Post;
  totalReposts: any;
  size?: number;
}) {
  const user: any = useAtomValue(userDetails);
  const [opened, { open, close }] = useDisclosure(false);

  const handleCopy = () => {
    const id = String(post?.id)
    const copied = copy(`${location.host}/posts/${base64encode(id)}`);
    if (copied) {
      notify({
        message: "copied successfully",
      });
    }
  };

  const options =
    user?.user?.id === post?.user?.id || post?.is_repost
      ? [
          () => (
            <div
              onClick={handleCopy}
              className={clsx(
                "text-[#2A2A2A] flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
              )}
            >
              <>
                <Copy size="24" color="#2A2A2A" />
                Copy link
              </>
            </div>
          ),
        ]
      : [
          () => (
            <div
              onClick={handleCopy}
              className={clsx(
                "text-[#2A2A2A] border-b border-b-[#DFE5FA] flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
              )}
            >
              <>
                <Copy size="24" color="#2A2A2A" />
                Copy link
              </>
            </div>
          ),
          () => (
            <div
              onClick={open}
              className={clsx(
                "text-[#2A2A2A] flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
              )}
            >
              <Icon
                color="#2A2A2A"
                icon="material-symbols:edit-square-outline"
                height={24}
                width={24}
              />
              Share to Feeds
            </div>
          ),
        ];
  const [menuOpened, setMenuOpened] = useState(false);
  const [opennAuth, setOpenAuth] = useState(false);

  return (
    <Menu
      shadow="md"
      opened={menuOpened}
      onChange={() => {
        if (!user?.token) return setOpenAuth(true);
        setMenuOpened(!menuOpened);
      }}
      width={200}
      classNames={{
        item: "!p-0",
        dropdown:
          "!py-6 !px-8 !rounded-[24px] !w-[auto] max-[390px]:!px-2 max-[390px]:!py-1",
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
        <div className="flex cursor-pointer items-center gap-2">
          {/* <Icon
            className={clsx(
              size ? "h-4 w-4" : "h-6 w-6",
              "max:[360px]:w-4 max:[360px]:h-4"
            )}
            icon="material-symbols:google-plus-reshare"
            color="#2a2a2a"
          /> */}
          <ShareIcon
            className={clsx(
              size ? "h-4 w-4" : "h-6 w-6",
              "max-[360px]:w-4 max-[360px]:h-4"
            )}
            style={{transform: "rotateY(180deg)"}}
          />
          <p className=" text-[14px] text-[#2A2A2A] leading-[17px]">
            {totalReposts}
          </p>
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <div className="flex flex-col">
            {options.map((Item, idx, arr) => (
              <Item key={idx} />
            ))}
          </div>
        </Menu.Item>
      </Menu.Dropdown>
      <ShareToFeedsModal opened={opened} close={close} post={post} />
      <UnAuthenticaticatedUserModal
        opened={opennAuth}
        setOpened={setOpenAuth}
      />
    </Menu>
  );
}

export default ShareOptions;
