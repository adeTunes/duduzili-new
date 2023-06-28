import { goOffline, goOnline } from "@/actions/userStatusActions";
import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Avatar, Indicator, Loader, Menu, Switch, clsx } from "@mantine/core";
import {
  Copy,
  LogoutCurve,
  Notification,
  Profile,
  Setting,
  Share,
} from "iconsax-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DefaultProfilePicture from "../profile/defaultProfilePicture";

function UserProfileImageActions({ children, unread, setLoading }) {
  const router = useRouter();
  const [statusLoading, setStatusLoading] = useState(false);
  const options = [
    {
      name: "View Profile",
      icon: <Profile size="24" color="#2A2A2A" />,
      action: () => router.push("/my-profile/post"),
    },
    {
      name: "Notifications",
      icon: (
        <Indicator
          classNames={{ common: "!top-[3px] !right-[5px]" }}
          color="#E59055"
          disabled={!!unread}
        >
          <Notification size="24" color="#2A2A2A" />
        </Indicator>
      ),
      action: () => router.push("/notifications"),
    },
    {
      name: "Settings",
      icon: <Setting color="#2a2a2a" />,
      action: () => router.push("/settings/account"),
    },
    {
      name: "Logout",
      color: "#D40000",
      icon: <LogoutCurve className="rotate-180" color="#D40000" />,
      action: () => {
        localStorage.removeItem("duduzili-user");
        router.push("/login");
      },
    },
  ];
  const user: any = useAtomValue(userDetails);
  const setUser = useSetAtom(userDetails);
  return (
    <Menu
      closeOnItemClick={false}
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-6 !px-8 !rounded-[24px] !w-[auto] !min-w-[25vw]",
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
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <div className="flex flex-col">
            <div className="flex items-center border-b border-b-[#DFE5FA] pb-5 justify-between">
              <div className="flex items-center gap-[15px]">
                {user?.user?.photo_url ? (
                  <Avatar
                    size={45}
                    radius="xl"
                    src={user?.user?.photo_url?.substring(62)}
                  />
                ) : (
                  <DefaultProfilePicture
                    text="text-[120%]"
                    className="!h-[45px] !w-[45px]"
                    firstName={user?.user?.first_name}
                    lastName={user?.user?.last_name}
                  />
                )}
                <p className="flex flex-col gap-2">
                  <span>@{user?.user?.username}</span>
                  {user?.user?.is_online ? (
                    <span className="flex items-center gap-1">
                      Online
                      <Icon
                        icon="radix-icons:dot-filled"
                        color="#44BC66"
                        width={20}
                        height={20}
                      />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Offline
                      <Icon
                        icon="radix-icons:dot-filled"
                        color="red"
                        width={20}
                        height={20}
                      />
                    </span>
                  )}
                </p>
              </div>
              {statusLoading ? (
                <Loader size="sm" />
              ) : (
                <Switch
                  classNames={{ track: "cursor-pointer" }}
                  checked={user?.user?.is_online}
                  onClick={() => {
                    user?.user?.is_online
                      ? goOffline(setStatusLoading, () =>
                          setUser({
                            ...user,
                            user: { ...user.user, is_online: false },
                          })
                        )
                      : goOnline(setStatusLoading, () =>
                          setUser({
                            ...user,
                            user: { ...user.user, is_online: true },
                          })
                        );
                  }}
                />
              )}
            </div>
            {options.map((item, idx, arr) => (
              <div
                key={idx}
                onClick={item.action}
                style={{ color: item.color ?? "#D40000]" }}
                className={clsx(
                  idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
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
    </Menu>
  );
}

export default UserProfileImageActions;
