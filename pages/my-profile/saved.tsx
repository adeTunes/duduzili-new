import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue, useSetAtom } from "jotai";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { userDetails, userFollowers, userFollowings } from "@/store";
import ShowMoreButton from "@/components/showMoreButton";
import useUserActivities from "../../hooks/useUserDrafts";
import { useEffect } from "react";
import EmptyComponent from "@/components/emptyComponent";

const Saved: NextPageX = () => {
  const user: any = useAtomValue(userDetails);
  const { data } = useUserActivities(user?.user?.id);
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
        {data?.saveds?.map((item, idx) => (
          <PostsContainer key={idx} post={item} />
        ))}
      </div>
      {!data?.saveds?.length && (
        <EmptyComponent
        className="max-w-[275px]"
        text="Your saved posts will appear here"
      />
      )}
      {/* <ShowMoreButton /> */}
    </>
  );
};

Saved.Layout = ProfileActivitiesLayout;
export default Saved;
