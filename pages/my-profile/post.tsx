import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentUserDetails, userFollowers, userFollowings,
} from "@/store";
import PostsContainer from "../../src/components/homepage/posts/postsContainer";
import EmptyComponent from "@/components/emptyComponent";
import { useEffect } from "react";
import { base64decode } from "nodejs-base64";

const MyProfilePost: NextPageX = ({data}: any) => {
  const [userOnlineActivities, setUserOnlineActivities]: any = useAtom(currentUserDetails);
  const setFollowings = useSetAtom(userFollowings);
  const setFollowers = useSetAtom(userFollowers);

  useEffect(() => {
    if (data) {
      setFollowers(data?.followers);
      setFollowings(data?.followings);
      setUserOnlineActivities(data);
    }
  }, [data]);

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

export async function getServerSideProps(context) {
  const { query, req } = context;
  const querystring = require("node:querystring");

  const obj = querystring.parse(req.headers.cookie);
  try {
    const config = {
      headers: {
        authorization: `Token ${obj["duduzili-user"]}`,
      },
    }
    const url = `https://duduzili-staging-server.com.ng/api/v1/rest-auth/user/${+base64decode(query.user)/1000000}/`
    const respose = await fetch(url, config);
    const data = await respose.json();
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.log("Something went wrong");
    return {
      props: {
        error: JSON.stringify(e),
      },
    };
  }
}
