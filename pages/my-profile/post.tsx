import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue } from "jotai";
import {
  currentUserDetails,
} from "@/store";
import PostsContainer from "../../src/components/homepage/posts/postsContainer";
import EmptyComponent from "@/components/emptyComponent";

const MyProfilePost: NextPageX = () => {
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
