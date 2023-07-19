import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useAtomValue, useSetAtom } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent"
import { useEffect } from "react";

const FriendProfilePost: NextPageX = ({data}: any) => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);

  const setFriendDetails = useSetAtom(friendPersonalDetails);

  useEffect(() => {
    if (data) {
      setFriendDetails(data);
    }
  }, [data]);

  return (
    <>
      {!friendDetails?.user?.is_following && friendDetails?.user?.is_private ? (
        <EmptyComponent
          className="max-w-[275px]"
          text="This is a private account. You will see their content when they accept your follow request"
        />
      ) : (
        <div className="flex flex-col gap-10 pb-[50px]">
          {friendDetails?.posts?.map((item, idx) => (
            <PostsContainer key={idx} post={item} />
          ))}
        </div>
      )}
      {!friendDetails?.user && !friendDetails?.posts?.length && (
        <EmptyComponent
          className="max-w-[275px]"
          text="Your posts will appear here"
        />
      )}
      {/* {!data?.user?.is_following && data?.user?.is_private  ? null : <ShowMoreButton />} */}
    </>
  );
};

FriendProfilePost.Layout = FriendProfileLayout;
export default FriendProfilePost;

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
    const url = `https://duduzili-staging-server.com.ng/api/v1/rest-auth/user/${query.id}/`
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
