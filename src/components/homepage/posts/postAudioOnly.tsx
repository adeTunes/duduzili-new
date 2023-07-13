import React from "react";
import PostHeader from "./postHeader";
import PostFooter from "./postFooter";
import PostText from "./text";
import { Post } from "../../../../api/request.types";

const PostAudio = dynamic(() => import("./postAudio"), {ssr: false})
import dynamic from "next/dynamic";

function PostWithAudio({ post }: { post: Post }) {
  return (
    <div
      className="rounded-[24px] max-[500px]:p-[10px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader post={post} />
      <PostText text={post.text} postId={post.id} />
      <PostAudio
        audioUrl={post?.media?.audio}
        photoUrl="/community-default.png"
      />
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

export default PostWithAudio;
