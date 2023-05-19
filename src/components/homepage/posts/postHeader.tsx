import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import PostOptions from "./postOptions";
import { Loading } from "@/components/loading";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import Image from "next/image";

/**
 * {
  date: Date;
  day: string;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    photo_url: string;
  };
 */

function PostHeader({ post }) {
  // user={post.user} day={post.date} date={post.date_added}
  const { date: day, date_added: date, user } = post;
  const loggedInUser: any = useAtomValue(userDetails);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          onClick={() =>
            post?.user?.id !== loggedInUser?.user?.id &&
            push(`/friend/${post?.user?.id}/post`)
          }
          className={clsx(
            post?.user?.id !== loggedInUser?.user?.id && "cursor-pointer",
            "h-[56px] w-[56px]"
          )}
        >
          <Image
            src={user?.photo_url?.substring(62)}
            className="w-full h-full object-cover rounded-full"
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2">
            <span className="text-[#2A2A2A] font-semibold text-[18px]">
              {`${user?.first_name} ${user?.last_name}`}
            </span>
            <span className=" text-duduzili-blue">@{user?.username}</span>
          </p>
          <span className="flex items-center gap-[10px]">
            <small>
              {new Date(date)
                ?.toLocaleDateString("us-EN", { month: "long", day: "numeric" })
                ?.split(" ")
                ?.reverse()
                ?.join(" ")}
            </small>
            <span className="bg-[#2A2A2A] text-[14px] text-white px-2 rounded-2xl py-1">
              {day} ago
            </span>
          </span>
        </div>
      </div>
      {loggedInUser?.token && (
        <PostOptions setLoading={setLoading} post={post} />
      )}
      <Loading loading={loading} />
    </div>
  );
}

export default PostHeader;
