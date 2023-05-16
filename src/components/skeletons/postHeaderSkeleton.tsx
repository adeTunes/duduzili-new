import { Skeleton } from "@mantine/core";
import React from "react";

function PostSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton height={48} width={77} radius="32px" />
        <Skeleton height={48} width={77} radius="32px" />
        <Skeleton height={48} width={77} radius="32px" />
      </div>
      <div className="flex flex-col gap-8">
        <div
          className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton height={56} circle />
              <div className="flex flex-col gap-2">
                <Skeleton height={10} width={120} />
                <span className="flex items-center gap-[10px]">
                  <Skeleton height={10} width={35} />
                  <Skeleton height={30} width={60} radius={20} />
                </span>
              </div>
            </div>
          </div>
          <Skeleton height={10} mb={6} />
          <Skeleton height={10} mb={6} />
          <Skeleton height={10} mb={6} />
          <Skeleton height={10} mb={6} />
          <div className="flex items-center justify-between">
            <Skeleton height={48} width={234} radius="40px" />
            <Skeleton height={40} width={84} radius="40px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;

// <Skeleton height={10} />
