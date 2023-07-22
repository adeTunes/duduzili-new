import { Drawer, Skeleton } from "@mantine/core";
import React from "react";
import useCommunityMembers from "../../../hooks/use-community-members";
import { useRouter } from "next/router";
import DefaultProfilePicture from "../profile/defaultProfilePicture";
import { base64encode } from "nodejs-base64";

function MembersDrawer({ opened, close, code }) {
  const { data, isLoading } = useCommunityMembers(code);
  const { push } = useRouter();
  return (
    <Drawer
      position="right"
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 !px-2 gap-6 flex flex-col overflow-auto",
        inner: "z-[201]",
        title: "text-[#2A2A2A] leading-[29px] font-bold",
      }}
      styles={{
        title: {
          fontSize: "clamp(15px, 1.3vw, 24px)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Community Members"
    >
      <div className="flex flex-col">
        {isLoading
          ? Array(5)
              .fill(0)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 flex gap-3 items-center justify-between border-b border-b-[#EDF0FB]"
                >
                  <Skeleton height={40} width={40} circle />
                  <div className="flex flex-1 flex-col gap-3">
                    <Skeleton width="80%" height={12} />
                    <Skeleton width="50%" height={12} />
                  </div>
                </div>
              ))
          : data?.map(({ member }, idx) => (
              <div
                onClick={() => location.assign(`/profile/post?user=${base64encode(String(member?.id))}`)}
                key={idx}
                className="px-2 py-4 hover:bg-[#f5f5f5] cursor-pointer flex items-center justify-between border-b border-b-[#EDF0FB]"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-[36px] h-[36px]">
                    {member?.photo_url ? (
                      <img
                        src={member?.photo_url }
                        className="w-full h-full rounded-full object-cover"
                        alt="profile picture of suggested friend"
                      />
                    ) : (
                      <DefaultProfilePicture
                      text="text-[100%]"
                        firstName={member?.first_name}
                        lastName={member?.last_name}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="max-[420px]:text-[13px] font-bold leading-[19px] text-[#2A2A2A]">
                      {member?.first_name} {member?.last_name}
                    </p>
                    <p className="max-[420px]:text-[13px] text-[#505050] leading-[19px]">
                      @{member?.username}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </Drawer>
  );
}

export default MembersDrawer;
