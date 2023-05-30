import React from "react";
import PostText from "./text";
import { Icon } from "@iconify/react";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import PostImage from "./postImage";
import { Post } from "../../../../api/request.types";

function PostBody({ post }: { post: Post }) {
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader post={post} />
      <PostText text={post.text} postId={post.id} />
      <PostImage image={post?.media?.photo?.[0]  } />
      <PostFooter />
    </div>
  );
}

export default PostBody;
