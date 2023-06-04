import React from "react";
import PostText from "./text";
import PostImage from "./postImage";

function CommentImageAndText({ post }) {
  return (
    <>
      <PostText text={post.text} postId={post.id} />
      <PostImage image={post?.media?.photo?.[0]} />
    </>
  );
}

export default CommentImageAndText;
