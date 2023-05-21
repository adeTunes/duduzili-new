import React from "react";
import PostHeader from "./postHeader";
import PostText from "./text";
import PostFooter from "./postFooter";
import { Post } from "../../../../api/request.types";

function PostTextOnly({ post }: { post: Post }) {
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader post={post} />
      <PostText text={post?.text} postId={post?.id} />
      <PostFooter
        post={post}
        totalComments={post?.total_comments}
        totalLikes={post?.total_likes}
        totalReposts={post?.total_reposts}
        iLikeThisPost={post?.i_like_this_post}
      />
    </div>
  );
}

export default PostTextOnly;
