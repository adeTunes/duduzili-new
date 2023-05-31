import { Icon } from "@iconify/react";
import { Menu, clsx } from "@mantine/core";
import React, { useState } from "react";
import { Loading } from "../loading";
import { joinCommunity } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";

function LeaveCommunity({ code }) {
  const [loading, setLoading] = useState(false);
  const {push} = useRouter()
  const LeaveCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", code);
    data.append("action", "Reject");
    joinCommunity(data)
      .then(({ data }) => {
        showNotification({
          message: data?.message || data?.error,
        });
        push("/communities/joined")
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  const options = [
    {
      icon: <Icon icon="bx:volume-mute" color="#2A2A2A" />,
      name: "Mute Community",
      action: () => {},
    },
    {
      icon: <Icon icon="ic:round-exit-to-app" color="#D40000" />,
      name: "Leave Community",
      action: LeaveCommunityAction,
      color: "#D40000",
    },
  ];
  return (
    <Menu
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
        <p className=" bg-duduzili-orange h-[56px] pl-8 pr-6 flex items-center rounded-[32px] cursor-pointer">
          <span className="border-r border-r-[#fff] text-white font-medium pr-[7px] py-4">
            Leave
          </span>
          <span className="pl-[7px]">
            <Icon
              color="#ffffff"
              className=""
              icon="ic:outline-keyboard-arrow-down"
            />
          </span>
        </p>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          {
            <div className="flex flex-col">
              {options.map((item, idx, arr) => (
                <div
                  key={idx}
                  onClick={item.action}
                  className={clsx(
                    idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
                    item.color ? "text-[#D40000]" : "text-[#2A2A2A]",
                    "flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
                  )}
                >
                  {item.icon}
                  {item.name}
                </div>
              ))}
            </div>
          }
        </Menu.Item>
      </Menu.Dropdown>
      <Loading loading={loading} />
    </Menu>
  );
}

export default LeaveCommunity;
