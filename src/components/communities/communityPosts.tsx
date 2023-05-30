import React from "react";
import ReplyInput from "./replies/replyInput";
import ReplyCard from "./replies/replyCard";
import { useRouter } from "next/router";
import useSinglePost from "../../../hooks/useSinglePost";
import PostsContainer from "../homepage/posts/postsContainer";
import {base64decode} from "nodejs-base64"

function CommunityPost() {
  const { query } = useRouter();
  const { data } = useSinglePost(+base64decode(String(query.id))/1000000);

  return (
    <>
      {/* <div
        className="rounded-[24px] bg-white p-8 flex flex-col gap-6"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        <CommunityPostCreatorProfile />
        <PostText postId={data?.post?.id} text={data?.post?.text} />
        <PostImage image={data?.post?.photo } />
         <PostManyImages />
        <CommunityPostTooltip
          totalComments={data?.post?.total_comments}
          totalLikes={data?.post?.total_likes}
          totalReposts={data?.post?.total_reposts}
          iLikeThisPost={data?.post?.i_like_this_post}
        />
      </div> */}
      <PostsContainer post={data?.post} />
      {/* Reply section */}
      <div className="flex gap-[36px] pl-[90px] flex-col">
        <ReplyInput />
        {data?.comments?.length ? (
          data?.comments?.map((comment, idx) => <ReplyCard key={idx} comment={comment} />).reverse()
        ) : (
          <p className="text-center">No posts here yet</p>
        )}
        {/* <p
          role="button"
          className="py-3 ml-[67px] rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
        >
          Show more
        </p> */}
      </div>
    </>
  );
}

export default CommunityPost;
