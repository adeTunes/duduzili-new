import React from "react";
import PostText from "./text";
import { Icon } from "@iconify/react";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import PostImage from "./postImage";

function PostBody() {
  return (
    <div
      className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <PostHeader />
      <PostText />
      <PostImage />
      <PostFooter />
    </div>
  );
}

export default PostBody;
