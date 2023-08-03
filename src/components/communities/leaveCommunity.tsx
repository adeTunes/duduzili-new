import { Icon } from "@iconify/react";
import { Menu, clsx } from "@mantine/core";
import React, { useState } from "react";
import { Loading } from "../loading";
import {
  deleteCommunity,
  editCommunity,
  joinCommunity,
} from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { Edit2, ProfileAdd, Trash } from "iconsax-react";
import AddCommunityMemberModal from "../modals/addCommunityMemberModal";
import { useDisclosure } from "@mantine/hooks";
import EditCommunityModal from "../modals/editCommunityModal";
import { notify } from "../../../utils/notification-handler";

function LeaveCommunity({ code, name, isOwner }) {
  const [loading, setLoading] = useState(false);
  const user: any = useAtomValue(userDetails);
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const { push } = useRouter();
  const LeaveCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", code);
    data.append("action", "Reject");
    joinCommunity(data)
      .then(({ data }) => {
        notify({
          message: data?.message || data?.error,
        });
        push("/communities/joined");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  const deleteCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", code);
    deleteCommunity(data)
      .then(({ data }) => {
        notify({
          message: data?.data || data?.message || data?.error,
        });
        push("/communities/joined");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  const editCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("code", code);
    data.append("name", name);
    editCommunity(data)
      .then(({ data }) => {
        notify({
          message: data?.data || data?.message || data?.error,
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  const options = isOwner
    ? [
        {
          icon: <Icon icon="bx:volume-mute" color="#2A2A2A" />,
          name: "Mute Community",
          action: () => {},
        },
        {
          icon: <ProfileAdd size="16" color="#2A2A2A" />,
          name: "Add Member",
          action: () => push(`/invite-friends?community=${code}`),
        },
        {
          icon: <Edit2 size="16" color="#2A2A2A" />,
          name: "Edit Community",
          action: openEdit,
        },
        {
          icon: <Icon icon="ic:round-exit-to-app" color="#D40000" />,
          name: "Leave Community",
          action: LeaveCommunityAction,
          color: "#D40000",
        },
        {
          icon: <Trash color="#D40000" size={16} />,
          name: "Delete Community",
          action: deleteCommunityAction,
          color: "#D40000",
        },
      ]
    : [
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
        dropdown: "!py-6 !rounded-[24px] !w-[auto] !min-w-[20vw]",
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
        <p style={{paddingInline: "clamp(6px, 1.5vw, 32px)", height: "clamp(40px, 3.6vw, 56px)"}} className=" bg-duduzili-orange flex items-center rounded-[32px] cursor-pointer">
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
                  onClick={item?.action}
                  className={clsx(
                    idx !== arr.length - 1 && "border-b border-b-[#DFE5FA]",
                    item.color ? "text-[#D40000]" : "text-[#2A2A2A]",
                    "flex items-center whitespace-nowrap px-5 py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
                  )}
                >
                  {item?.icon}
                  {item?.name}
                </div>
              ))}
            </div>
          }
        </Menu.Item>
      </Menu.Dropdown>
      <Loading loading={loading} />
      <AddCommunityMemberModal opened={opened} close={close} />
      <EditCommunityModal opened={editOpened} close={closeEdit} code={code} />
    </Menu>
  );
}

export default LeaveCommunity;
