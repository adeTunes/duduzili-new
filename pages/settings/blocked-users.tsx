import { unblockUserAction } from "@/actions/postOptionActions";
import useBlockedUsers from "../../hooks/useBlockedUsers";
import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import { LoadingOverlay } from "@mantine/core";
import { useState } from "react";

const BlockedUsers: NextPageX = () => {
  const { data, refetch } = useBlockedUsers();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex overflow-auto flex-1 flex-col">
      {data?.blocked?.length ? (
        <div className="flex flex-col">
          {data?.blocked?.map((item, idx) => (
            <div
              key={idx}
              className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
            >
              <div className="flex gap-3 items-center">
                <div className="w-[36px] h-[36px]">
                  <img
                    src={item?.photo_url?.substring(62)}
                    className="w-full h-full rounded-full object-cover"
                    alt="profile picture of suggested friend"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-semibold leading-6 text-[#2A2A2A]">
                    {item?.first_name} {item?.last_name}
                  </p>
                  <p className="text-[#505050] leading-[19px]">
                    @{item?.username}
                  </p>
                </div>
              </div>
              <p
                onClick={() => unblockUserAction(setLoading, item?.id, refetch)}
                className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
              >
                Unblock
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-10">
            <div className="w-[330px] h-[300px]">
              <img
                src="/settings/empty-blocked-users.png"
                className="h-full w-full object-cover"
                alt="empty blocked users picture"
              />
            </div>
            <p className="font-medium text-[#2A2A2A] text-[24px] leading-6">
              You don't have any blocked user.
            </p>
          </div>
        </div>
      )}
      <LoadingOverlay visible={loading} />
    </div>
  );
};
BlockedUsers.Layout = SettingsLayout;
BlockedUsers.LayoutProps = { tabName: "Blocked Users" };
export default BlockedUsers;
