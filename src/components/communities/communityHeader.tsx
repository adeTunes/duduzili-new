import { Icon } from "@iconify/react";
import { LoadingOverlay, clsx } from "@mantine/core";
import React, { useState } from "react";
import CommunityPostOptions from "./communityPostOptions";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import Link from "next/link";

function CommunityHeader({ post, community }) {
  const [loading, setLoading] = useState(false);
  const user: any = useAtomValue(userDetails);
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[9px]">
        <Link href={`/communities/${community?.code}`}>
          <p
            style={{
              fontSize: "clamp(15px, 1.3vw, 24px)",
            }}
            className="font-bold text-[18px] leading-[24px] hover:text-[#8a8c90] text-[#2A2A2A]"
          >
            {community?.name?.replace(
              community?.name?.[0],
              community?.name?.[0]?.toLocaleUpperCase()
            )}
          </p>
        </Link>
        <div className="flex max-[900px]:items-start items-center gap-[19px]">
          <div className="w-[33px] h-[33px]">
            <img
              src={
                post?.user?.photo_url?.substring(62) ||
                "/profile-pic-default.png"
              }
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>
          <span className="font-medium max-[900px]:hidden leading-6 text-[#2A2A2A]">
            {post?.user?.first_name} {post?.user?.last_name}
          </span>
          <span className="bg-[#2A2A2A] max-[480px]:text-[11px] max-[900px]:hidden text-[14px] text-white px-2 rounded-2xl py-1">
            {post?.date.includes("now")
              ? post?.date
              : post?.date.includes("day") ||
                post?.date.includes("min") ||
                post?.date.includes("sec") ||
                post?.date.includes("hr")
              ? `${post?.date} ago`
              : post?.date}
          </span>
          <div className="flex-col gap-3 items-start hidden max-[900px]:flex">
            <span className="font-medium leading-6 text-[#2A2A2A]">
              {post?.user?.first_name} {post?.user?.last_name}
            </span>
            <span className="bg-[#2A2A2A] max-[480px]:text-[11px] text-[14px] text-white px-2 rounded-2xl py-1">
              {post?.date.includes("now")
                ? post?.date
                : post?.date.includes("day") ||
                  post?.date.includes("min") ||
                  post?.date.includes("sec") ||
                  post?.date.includes("hr")
                ? `${post?.date} ago`
                : post?.date}
            </span>
          </div>
        </div>
      </div>
      <CommunityPostOptions
        community={community}
        setLoading={setLoading}
        post={post}
      />
      <LoadingOverlay visible={loading} />
    </div>
  );
}

export default CommunityHeader;
