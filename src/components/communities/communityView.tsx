import React, { useState } from "react";
import CommunityViewCard from "./communityViewCard";
import useCommunityPosts from "../../../hooks/useCommunityPosts";
import { useRouter } from "next/router";
import PostsContainer from "../homepage/posts/postsContainer";
import ReplyInput from "./replies/replyInput";
import ReplyCard from "./replies/replyCard";

function CommunityView({ community }) {
  const [limit, setLimit] = useState(20);
  const { query } = useRouter();
  const { data } = useCommunityPosts(limit, query.id);
  return (
    <>
      <CommunityViewCard community={community} />
      {/* <CommunityPost community={community} /> */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[36px]">
          {data?.results?.map((item, idx) => (
            <>
              <PostsContainer post={item?.post} />
              {/* Reply section */}
              {item?.total_comments ? (
                <div className="flex gap-[36px] pl-[90px] flex-col">
                  <ReplyInput />
                  {item?.post?.comments?.length ? (
                    item?.post?.comments
                      ?.map((comment, idx) => (
                        <ReplyCard key={idx} comment={comment} />
                      ))
                      .reverse()
                  ) : (
                    <p className="text-center">No comments here yet</p>
                  )}
                </div>
              ) : null}
            </>
          ))}
          {!data?.results?.length && <p className="text-center">No posts here yet</p>}
          {/* <p
      role="button"
      className="py-3 ml-[67px] rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
    >
      Show more
    </p> */}
        </div>
        {/* {posts?.map((post, idx) => (
          <PostsContainer key={idx} post={post} />
        ))} */}
      </div>
    </>
  );
}

export default CommunityView;
