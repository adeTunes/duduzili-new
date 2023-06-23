import { Skeleton } from "@mantine/core";
import React from "react";

function FollowSkeleton() {
  return (
    <div className="py-4 flex gap-3 items-center justify-between border-b border-b-[#EDF0FB]">
      <Skeleton height={40} width={40} circle />
      <div className="flex flex-1 flex-col gap-3">
        <Skeleton width="80%" height={12} />
        <Skeleton width="50%" height={12} />
      </div>
      <Skeleton height={30} width={70} radius="xl" />
    </div>
  );
}

export default FollowSkeleton;
