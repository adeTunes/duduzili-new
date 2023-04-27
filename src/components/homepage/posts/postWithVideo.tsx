import React from "react";
import PostHeader from "./postHeader";
import PostText from "./text";
import PostFooter from "./postFooter";
import PostVideo from "./postVideo";

function PostWithVideo() {
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader />
      <PostText />
      <PostVideo />
      <PostFooter />
    </div>
  );
}

export default PostWithVideo;
