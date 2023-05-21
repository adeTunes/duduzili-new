import PostText from "@/components/homepage/posts/text";
import React from "react";
import CommunityPostTooltip from "../communityPostTooltip";
import Image from "next/image";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import CommentAudio from "@/components/homepage/posts/commentAudio";
import CommentVideo from "@/components/homepage/posts/commentVideo";

function ReplyCard({ comment }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex self-start gap-[19px] items-center">
        <img
          src={comment?.user?.photo_url?.substring(62)}
          className="w-[48px] h-[48px] rounded-full object-cover"
          alt=""
        />
        <p className=" font-semibold text-[18px] leading-6 text-[#2A2A2A]">
          {comment?.user?.first_name} {comment?.user?.last_name}
        </p>
      </div>
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="ml-[67px] rounded-2xl p-6 flex flex-col gap-2 bg-white"
      >
        {
          !comment?.audio &&
          !comment?.youtube_url &&
          !comment?.video &&
          !comment?.photo &&
          comment?.content ? (
            <p className="text-[14px] leading-[38px]">{comment?.content}</p>
        ) : comment?.audio && comment?.text ? (
          <CommentAudio comment={comment} />
        ) : comment?.video_url && comment?.text ? (
          <CommentVideo comment={comment} />
        ) : comment?.youtube_url && comment?.text ? (
          <CommentVideo comment={comment} />
        ) : null
          }
        <CommunityPostTooltip comment={comment} />
      </div>
    </div>
  );
}

export default ReplyCard;
