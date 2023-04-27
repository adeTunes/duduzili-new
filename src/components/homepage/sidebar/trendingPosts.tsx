import React from "react";
import PostsList from "./postsList";

function TrendingPosts() {
  return (
    <div className="p-6 bg-[#EDF0FB] rounded-2xl flex flex-col gap-[39px]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 pb-[12px] border-b border-b-[#DFDFDF]">
          <p className="text-[#2A2A2A] leading-[22px] text-[18px] font-bold">
            Trending
          </p>
          <p className="text-[#505050] leading-[19px]">Trending Posts</p>
        </div>
        <PostsList />
      </div>
      <p className="text-[#367EE8] font-semibold leading-[19px] cursor-pointer">
        Show more
      </p>
    </div>
  );
}

export default TrendingPosts;
