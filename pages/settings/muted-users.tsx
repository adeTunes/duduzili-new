import { unmuteUserAction } from "@/actions/postOptionActions";
import useMutedUsers from "../../hooks/useMuterUsers";
import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loading } from "@/components/loading";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";

const MutedUsers: NextPageX = () => {
  const { data, refetch } = useMutedUsers();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  return (
    <div className="flex overflow-auto flex-1 flex-col">
      {data?.muted?.length ? (
        <div className="flex flex-col">
          {data?.muted?.map((item, idx) => (
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
                onClick={() => unmuteUserAction(setLoading, item.id, refetch)}
                className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
              >
                Unmute
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-10">
            <div className="w-[330px] h-[300px]">
              <img
                src="/settings/empty-muted-users.png"
                className="h-full w-full object-cover"
                alt="empty blocked users picture"
              />
            </div>
            <p className="font-medium text-[#2A2A2A] text-[24px] leading-6">
              You don&apos;t have any muted user.
            </p>
          </div>
        </div>
      )}
      <LoadingOverlay visible={loading} />
    </div>
  );
};
MutedUsers.Layout = SettingsLayout;
MutedUsers.LayoutProps = { tabName: "Muted Users" };
export default MutedUsers;
