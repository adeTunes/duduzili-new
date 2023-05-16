import React, { useState } from "react";
import PostSectionTags from "./postSectionTags";
import { useAtomValue } from "jotai";
import { allPosts, userDetails } from "@/store";
import PostsContainer from "./posts/postsContainer";

function PostSection() {
  const posts = useAtomValue(allPosts);
  const user: any = useAtomValue(userDetails);
  return (
    <div className="flex flex-col gap-4">
      {user?.post && <PostSectionTags />}
      <div className="flex flex-col gap-8">
        {posts?.map((post, idx) => (
          <PostsContainer key={idx} post={post} />
        ))}
        {/* <PostBody />
        <PostwithRepost />
        <PostWithVideo />
        <PostTextOnly />
        <PostWithAudio /> */}
      </div>
    </div>
  );
}

export default PostSection;
