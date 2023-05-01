import React, { useState } from "react";
import PostSectionTags from "./postSectionTags";
import PostBody from "./posts/postBody";
import PostWithVideo from "./posts/postWithVideo";
import PostTextOnly from "./posts/postTextOnly";
import PostWithAudio from "./posts/postAudioOnly";
import PostwithRepost from "./postwithRepost";

function PostSection() {
  return (
    <div className="flex flex-col gap-4">
      <PostSectionTags />
      <div className="flex flex-col gap-8">
        <PostBody />
        <PostwithRepost />
        <PostWithVideo />
        <PostTextOnly />
        <PostWithAudio />
      </div>
    </div>
  );
}

export default PostSection;
