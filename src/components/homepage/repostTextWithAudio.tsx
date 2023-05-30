import React from "react";
import PostHeader from "./posts/postHeader";
import PostText from "./posts/text";
import PostFooter from "./posts/postFooter";
import { Icon } from "@iconify/react";
import PostAudio from "./posts/postAudio";
import Image from "next/image";
import RepostHeader from "./reposts/repostHeader";

function RepostTextWithAudio({ post }) {
  return (
    <div className="bg-white flex flex-col gap-6">
      {/* <PostHeader post={post} />
      <hr className="w-full bg-[#EDF0FB]" /> */}
      <RepostHeader  post={post}/>
      <PostText text={post?.text} postId={post?.id} />
      <PostAudio
        audioUrl={post.audio_url}
        photoUrl={post.photo_url }
      />
    </div>
  );
}

export default RepostTextWithAudio;
