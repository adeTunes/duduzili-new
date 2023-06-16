import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue, useSetAtom } from "jotai";
import { userDetails, userFollowers, userFollowings } from "@/store";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import ShowMoreButton from "@/components/showMoreButton";
import { useEffect } from "react";
import useUserActivities from "../../hooks/useUserDrafts";
import EmptyComponent from "@/components/emptyComponent";

const Draft: NextPageX = () => {
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
        {data?.drafts?.map((item, idx) => (
          <PostsContainer key={idx} post={item} />
        ))}
      </div>
      {!data?.drafts?.length && <EmptyComponent
          className="max-w-[275px]"
          text="You have no post in draft"
        />}
      {/* <ShowMoreButton /> */}
    </>
  );
};

Draft.Layout = ProfileActivitiesLayout;
export default Draft;
