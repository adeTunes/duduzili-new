import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import useUserActivities from "../../../hooks/useUserDrafts";
import { useRouter } from "next/router";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { friendPersonalDetails } from "@/store";
import ShowMoreButton from "@/components/showMoreButton";
import EmptyComponent from "@/components/emptyComponent";

const FriendProfilePost: NextPageX = () => {
  const { query } = useRouter();
  const { data } = useUserActivities(query.id);
  const setFriendDetails = useSetAtom(friendPersonalDetails);

  useEffect(() => {
    if (data) {
      setFriendDetails(data);
    }
  }, [data]);
  return (
    <>
      {!data?.user?.is_following && data?.user?.is_private ? (
        <EmptyComponent
          className="max-w-[275px]"
          text="This is a private account. You will see their content when they accept your follow request"
        />
      ) : (
        <div className="flex flex-col gap-10 pb-[50px]">
          {data?.posts?.map((item, idx) => (
            <PostsContainer key={idx} post={item} />
          ))}
        </div>
      )}
      {!data?.posts?.length && <p className="text-center">No Posts yet</p>}
      {/* {!data?.user?.is_following && data?.user?.is_private  ? null : <ShowMoreButton />} */}
    </>
  );
};

FriendProfilePost.Layout = FriendProfileLayout;
export default FriendProfilePost;
