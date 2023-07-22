import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useAtomValue } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent";
import Head from "next/head";
import { base64decode } from "nodejs-base64";

const FriendProfilePost = ({ data }) => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const details = data?.user;

  return (
    <>
      <Head>
        <title>
          {`Duduzili | ${details?.first_name} ${details?.last_name}`}
        </title>
        <meta
          property="og:title"
          content={`${details?.first_name} ${details?.last_name}`}
        />
        <meta property="og:description" content={details?.bio} />
        <meta name="description" content={details?.bio} />
        <meta
          property="og:image"
          content={
            details?.photo_url ||
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`
          }
        />
      </Head>
      <FriendProfileLayout>
        {/* {!friendDetails?.user?.is_following &&
        friendDetails?.user?.is_private ? (
          <EmptyComponent
            className="max-w-[275px]"
            text="This is a private account. You will see their content when they accept your follow request"
          />
        ) : ( */}
          <div className="flex flex-col gap-10 pb-[50px]">
            {friendDetails?.posts?.map((item, idx) => (
              <PostsContainer key={idx} post={item} />
            ))}
          </div>
        { /* )} */}
        {!friendDetails?.user && !friendDetails?.posts?.length && (
          <EmptyComponent
            className="max-w-[275px]"
            text="Your posts will appear here"
          />
        )}
      </FriendProfileLayout>

      {/* {!data?.user?.is_following && data?.user?.is_private  ? null : <ShowMoreButton />} */}
    </>
  );
};

export default FriendProfilePost;

export async function getServerSideProps({ query }) {
  const axios = require("axios");
  const user = base64decode(query.id);

  try {
    const { data } = await axios({
      baseURL: "https://duduzili-staging-server.com.ng",
      url: `/api/v1/rest-auth/offline_user/${user}/`,
    });
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
