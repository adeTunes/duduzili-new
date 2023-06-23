import { Skeleton } from "@mantine/core";
import React from "react";
import SinglePostSkeleton from "./singlePostSkeleton";

function ProfileSkeleton() {
  return (
    <div>
      <Skeleton height={240} radius="md" />
      <Skeleton
        circle
        mt="-50px"
        className="ml-8"
        height="clamp(80px, 9.8vw, 150px)"
        width="clamp(80px, 9.8vw, 150px)"
      />
      <Skeleton height={12} mt={50} />
      <Skeleton height={12} width="50%" mt={10} />
      <div className="flex gap-4 mt-8 justify-between">
        <Skeleton height={12} width="50%" mt={10} />
        <Skeleton height={12} width="50%" mt={10} />
      </div>
      <div className="flex gap-4 my-8 justify-between">
        <Skeleton height={50} radius="xl" width="50%" mt={10} />
        <Skeleton height={50} radius="xl" width="50%" mt={10} />
      </div>
      <div className="flex flex-col gap-8">
        <SinglePostSkeleton />
        <SinglePostSkeleton />
        <SinglePostSkeleton />
      </div>
    </div>
  );
}

export default ProfileSkeleton;
