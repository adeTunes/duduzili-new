import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue, useSetAtom } from "jotai";
import {
  currentUserDetails,
  userDetails,
  userFollowers,
  userFollowings,
} from "@/store";
import PostsContainer from "../../src/components/homepage/posts/postsContainer";
import ShowMoreButton from "@/components/showMoreButton";
import { useEffect } from "react";
import useUserActivities from "../../hooks/useUserDrafts";
import EmptyComponent from "@/components/emptyComponent";
import SinglePostSkeleton from "@/components/skeletons/singlePostSkeleton";

const MyProfilePost: NextPageX = () => {
  const user: any = useAtomValue(userDetails);
  const userOnlineActivities: any = useAtomValue(currentUserDetails);

  return (
    <>
      <div className="flex flex-col gap-10 pb-[50px]">
        {userOnlineActivities?.posts?.map((item, idx) => (
          <PostsContainer key={idx} post={item} />
        ))}
      </div>
      {!userOnlineActivities?.posts?.length && (
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
