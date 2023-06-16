import { Icon } from "@iconify/react";
import {
  Heart,
  MessageText,
} from "iconsax-react";
import React, { ReactNode, useState } from "react";
import { Post } from "../../../../../api/request.types";
import { likeOrUnlikePost } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, clsx } from "@mantine/core";
import { useRouter } from "next/router";
import ShareOptions from "../../posts/shareOptions";

function TrendingPostsContainer({
  children,
  post,
  footerColor,
  textLength
}: {
  children: ReactNode;
  post: Post;
  footerColor?: string;
  textLength?: string
}) {
  const {
    date: dayPast,
    total_likes,
    i_like_this_post: iLikeThisPost,
    date_added: date,
    text,
    user,
  } = post;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <div className="flex flex-col items-start pb-4 gap-4 border-b border-b-[#DFDFDF]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 max-[400px]:items-start">
          <div className="h-[40px] w-[40px]">
            <img
              src={user?.photo_url?.substring(62)  || "/profile-pic-default.png"}
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex max-[400px]:flex-col max-[400px]:items-start items-center gap-2">
              <span className="text-[#2A2A2A] font-semibold text-[12px]">
                {user?.first_name} {user?.last_name}
              </span>
              <span className=" text-duduzili-blue text-[12px]">@{post?.user?.username}</span>
            </p>
            <span className="flex items-center gap-[10px]">
              <small className="text-[10px] leading-3 text-[#757575]">
                {new Date(date)
                  ?.toLocaleDateString("us-EN", {
                    month: "long",
                    day: "numeric",
                  })
                  ?.split(" ")
                  ?.reverse()
                  ?.join(" ")}
              </small>
              <span className="bg-[#2A2A2A] text-[8px] leading-[10px] text-white px-2 rounded-2xl py-1">
              {dayPast.includes("now")
              ? dayPast
              : dayPast.includes("day") ||
                dayPast.includes("min") ||
                dayPast.includes("sec") ||
                dayPast.includes("hr")
              ? `${dayPast} ago`
              : dayPast}
              </span>
            </span>
          </div>
        </div>
        {/* <Icon
          height={24}
          className="cursor-pointer"
          width={24}
          icon="carbon:overflow-menu-vertical"
        /> */}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-[5px]">{children}</div>
        <p className="text-[#2A2A2A] text-xs leading-[14px]">
          {(textLength ? text : text.length > 50 ? text.slice(0, 50) + "..." : text)}
        </p>
      </div>
      <div className={clsx(footerColor ? footerColor : "bg-[#DFE5FA]", "flex items-center py-2 px-3 gap-10 rounded-[40px]")}>
        <div
          onClick={() => {
            likeOrUnlikePost(post?.id, setLoading, () => {
              queryClient.invalidateQueries(["trending-posts"]);
              queryClient.invalidateQueries(["all-posts"]);
            });
          }}
          className="flex items-center gap-[5px]"
        >
          {loading ? (
            <Loader size="sm" />
          ) : (
            <>
              <Heart
                className="cursor-pointer"
                size="16"
                color={iLikeThisPost ? "#F5597F" : "#000000"}
                variant={iLikeThisPost ? "Bold" : "Outline"}
              />
              <p className=" text-[12px] text-[#2A2A2A] leading-[15px]">
                {total_likes}
              </p>
            </>
          )}
        </div>
        <div onClick={() => {
          router.push(`/posts/${post?.id}`)
        }} className="cursor-ponter flex items-center gap-[5px]">
          <MessageText
            className="cursor-pointer"
            size="16"
            color="#2A2A2A"
            variant="Outline"
          />
          <p className=" text-[12px] text-[#2A2A2A] leading-[15px]">{post?.total_comments}</p>
        </div>
        <ShareOptions size={16} post={post} totalReposts={post?.total_reposts} />
      </div>
    </div>
  );
}

export default TrendingPostsContainer;
