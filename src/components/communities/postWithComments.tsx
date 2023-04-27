import React from "react";
import PostBody from "../homepage/posts/postBody";
import { Icon } from "@iconify/react";
import PostText from "../homepage/posts/text";
import PostImage from "../homepage/posts/postImage";
import { Heart, MessageText } from "iconsax-react";
import CommunityPostTooltip from "./communityPostTooltip";
import ReplyInput from "./replies/replyInput";
import ReplyCard from "./replies/replyCard";
import CommunityPostCreatorProfile from "./CommunityPostCreatorProfile";

function PostWithComments() {
  return (
    <>
      <div
        className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        <CommunityPostCreatorProfile />
        <PostText />
        <PostImage />
        <CommunityPostTooltip />
      </div>
      {/* Reply section */}
      <div className="flex gap-[36px] pl-[90px] flex-col">
        <ReplyInput />
        <ReplyCard />
        <p
          role="button"
          className="py-3 ml-[67px] rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
        >
          Show more
        </p>
      </div>
    </>
  );
}

export default PostWithComments;
