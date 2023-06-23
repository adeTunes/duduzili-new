import { Skeleton } from "@mantine/core";
import React from "react";

function FollowSkeleton() {
  return (
    <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
      <div className="flex gap-3 items-center">
        <div className="w-[36px] cursor-pointer h-[36px]">
          <Skeleton height="100%" width="100%" radius="100%" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="max-[420px]:text-[13px] flex font-bold leading-[19px] text-[#2A2A2A]">
            <Skeleton width={60} height={12} />
            <Skeleton width={60} height={12} />
          </p>
          <p className="max-[420px]:text-[13px] text-[#505050] leading-[19px]">
            <Skeleton width="30%" height={12} />
          </p>
        </div>
      </div>
      <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 rounded-[32px]">
        <Skeleton height={30} width={60} radius="xl" />
      </p>
    </div>
  );
}

export default FollowSkeleton;
