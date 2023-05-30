import React from "react";
import PostHeader from "./posts/postHeader";
import PostText from "./posts/text";
import PostFooter from "./posts/postFooter";
import { Icon } from "@iconify/react";
import Image from "next/image";
import PostSection from "./postSection";
import PostImage from "./posts/postImage";
import PostAudio from "./posts/postAudio";
import PostVideo from "./posts/postVideo";
import PostVideoAndImage from "./posts/postVideoAndImage";
import PostVideoAndAudio from "./posts/postVideoAndAudio";
import PostManyImages from "../communities/postManyImages";
import { Post } from "../../../api/request.types";

function PostwithRepost({ post }: { post: Post }) {
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader
        post={{
          user: post?.reposter,
          date_added: post?.repost_time,
          date: post?.date,
          id: post?.id,
          is_repost: post?.is_repost
        }}
      />
      <hr className="w-full bg-[#EDF0FB]" />
      <div className="flex gap-4 items-center">
        <Icon
          icon="material-symbols:google-plus-reshare"
          height={18}
          width={18}
          color="#757575"
        />
        <div className="flex items-center gap-2">
          <div className="h-[48px] w-[48px]">
            <img
              src={post?.user?.photo_url?.substring(62)}
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-[#2A2A2A] font-medium ">
              {post?.user?.first_name} {post?.user?.last_name}
            </p>
            <span className="flex items-center gap-1">
              <small className="text-[#757575] text-[10px]">
                {new Date(post?.date_added)
                  ?.toLocaleDateString("us-EN", {
                    month: "long",
                    day: "numeric",
                  })
                  ?.split(" ")
                  ?.reverse()
                  ?.join(" ")}
              </small>
              <span className="bg-[#2A2A2A] text-white text-[10px] px-2 rounded-2xl py-1">
                {post?.date?.includes("now")
                  ? post?.date
                  : post?.date?.includes("days") ||
                    post?.date?.includes("min") ||
                    post?.date?.includes("sec") ||
                    post?.date?.includes("hr")
                  ? `${post?.date} ago`
                  : post?.date}
              </span>
            </span>
          </div>
        </div>
      </div>
      {!post?.media?.audio &&
      !post?.youtube_url &&
      !post?.media?.video &&
      !post?.media?.photo?.length &&
      post?.text ? (
        <>
          <PostText text={post?.text} postId={post?.id} />
        </>
      ) : !post?.youtube_url &&
        !post?.media?.video &&
        post?.media?.photo?.length === 1 &&
        post?.text ? (
        <>
          <PostText text={post?.text} postId={post?.id} />
          <PostImage image={post?.media?.photo?.[0]} />
        </>
      ) : post?.media?.audio &&
        post?.text &&
        !post?.media?.video &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostAudio
            audioUrl={post?.media?.audio}
            photoUrl="/cover-image.png"
          />
        </>
      ) : post?.media?.video &&
        !post?.media?.audio &&
        post?.text &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideo
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.video &&
        post?.media?.photo?.length === 1 &&
        post?.text &&
        !post?.media?.audio ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideoAndImage
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.video &&
        !post?.media?.photo?.length &&
        post?.text &&
        post?.media?.audio ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideoAndAudio
            audioUrl={post?.media?.audio}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.photo?.length > 1 ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostManyImages post={post} />
        </>
      ) : null}
      <PostFooter
        post={post}
        totalComments={post.total_comments}
        totalLikes={post.total_likes}
        totalReposts={post.total_reposts}
        iLikeThisPost={post.i_like_this_post}
      />
    </div>
  );
}

export default PostwithRepost;
