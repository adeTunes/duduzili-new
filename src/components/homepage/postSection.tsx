import React, { useState } from "react";
import PostSectionTags from "./postSectionTags";
import { useAtomValue } from "jotai";
import { allPosts, userDetails } from "@/store";
import PostsContainer from "./posts/postsContainer";
import ShowMoreButton from "../showMoreButton";

function PostSection() {
  const posts = useAtomValue(allPosts);
  const user: any = useAtomValue(userDetails);
  return (
    <div className="flex flex-col gap-4">
      {user?.token && <PostSectionTags />}
      <div className="flex flex-col gap-8">
        {posts?.map((post, idx) => (
          <PostsContainer key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostSection;
