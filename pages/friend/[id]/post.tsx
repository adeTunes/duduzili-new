import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import useUserActivities from "../../../hooks/useUserDrafts";
import { useRouter } from "next/router";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { friendPersonalDetails } from "@/store";
import {base64decode} from "nodejs-base64"

const FriendProfilePost: NextPageX = () => {
  const { query } = useRouter();
  const { data } = useUserActivities(+base64decode(String(query.id))/1000000);
  const setFriendDetails = useSetAtom(friendPersonalDetails);

  useEffect(() => {
    if (data) {
      setFriendDetails(data);
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col gap-10 pb-[50px]">
        {data?.posts?.map((item, idx) => (
          <PostsContainer key={idx} post={item} />
        ))}
      </div>
      {!data?.posts?.length && <p className="text-center">No Posts yet</p>}
      {/* <ShowMoreButton /> */}
    </>
  );
};

FriendProfilePost.Layout = FriendProfileLayout;
export default FriendProfilePost;
