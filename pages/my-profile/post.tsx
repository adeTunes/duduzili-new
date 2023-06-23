import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue, useSetAtom } from "jotai";
import { userDetails, userFollowers, userFollowings } from "@/store";
import PostsContainer from "../../src/components/homepage/posts/postsContainer";
import ShowMoreButton from "@/components/showMoreButton";
import { useEffect } from "react";
import useUserActivities from "../../hooks/useUserDrafts";
import EmptyComponent from "@/components/emptyComponent";
import SinglePostSkeleton from "@/components/skeletons/singlePostSkeleton";

const MyProfilePost: NextPageX = () => {
  const user: any = useAtomValue(userDetails);
  const { data, isLoading } = useUserActivities(user?.user?.id);
  const setFollowings = useSetAtom(userFollowings);
  const setFollowers = useSetAtom(userFollowers);

  useEffect(() => {
    if (data) {
      setFollowers(data?.followers);
      setFollowings(data?.followings);
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col gap-10 pb-[50px]">
        {isLoading ? (
          <>
            <SinglePostSkeleton />
            <SinglePostSkeleton />
            <SinglePostSkeleton />
          </>
        ) : (
          data?.posts?.map((item, idx) => (
            <PostsContainer key={idx} post={item} />
          ))
        )}
      </div>
      {!isLoading && !data?.posts?.length && (
        <EmptyComponent
          className="max-w-[275px]"
          text="Your posts will appear here"
        />
      )}
      {/* <ShowMoreButton /> */}
    </>
  );
};

MyProfilePost.Layout = ProfileActivitiesLayout;
export default MyProfilePost;
