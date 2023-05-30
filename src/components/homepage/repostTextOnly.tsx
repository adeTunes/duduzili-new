import React from "react";
import PostHeader from "./posts/postHeader";
import PostText from "./posts/text";
import PostFooter from "./posts/postFooter";
import { Icon } from "@iconify/react";
import Image from "next/image";
import RepostHeader from "./reposts/repostHeader";

function RepostTextOnly({ post }) {
  return (
    <div className="bg-white flex flex-col gap-6">
      {/* <PostHeader post={post} />
      <hr className="w-full bg-[#EDF0FB]" /> */}
      <RepostHeader  post={post}/>
      <PostText text={post?.text} postId={post?.id} />
    </div>
  );
}

export default RepostTextOnly;
