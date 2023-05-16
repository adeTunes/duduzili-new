import React from "react";
import PostHeader from "./posts/postHeader";
import PostText from "./posts/text";
import PostFooter from "./posts/postFooter";
import { Icon } from "@iconify/react";
import PostVideo from "./posts/postVideo";

function RepostTextWithVideo({ post }) {
  return (
    <div className="bg-white flex flex-col gap-6">
      {/* <PostHeader post={post} />
      <hr className="w-full bg-[#EDF0FB]" /> */}
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
              src={post?.user?.photo_url.substring(62)}
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
                {post?.date} ago
              </span>
            </span>
          </div>
        </div>
      </div>
      <PostText text={post?.text} postId={post?.id} />
      <PostVideo
        photoUrl={post.photo_url?.substring(62)}
        videoUrl={post.video_url?.substring(62)}
      />
    </div>
  );
}

export default RepostTextWithVideo;
