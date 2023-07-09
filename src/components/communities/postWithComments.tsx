import React from "react";
import ReplyInput from "./replies/replyInput";
import ReplyCard from "./replies/replyCard";
import { useRouter } from "next/router";
import useSinglePost from "../../../hooks/useSinglePost";
import PostsContainer from "../homepage/posts/postsContainer";
import SinglePostSkeleton from "../skeletons/singlePostSkeleton";

function PostWithComments() {
  const { query } = useRouter();
  const { data, isLoading, refetch } = useSinglePost(query.id);
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
      {isLoading ? <SinglePostSkeleton /> : <PostsContainer post={data?.post} />}
      {/* Reply section */}
      <div className="flex gap-[36px] pl-[5vw] flex-col">
        <ReplyInput refetch={refetch} />
        {data?.comments?.length ? (
          data?.comments?.map((comment, idx) => <ReplyCard refetch={refetch} key={idx} comment={comment} />)
        ) : (
          <p className="text-center">No comments here yet</p>
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

export default PostWithComments;
