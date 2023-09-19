import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue } from "jotai";
import { currentUserDetails } from "@/store";
import PostsContainer from "../../src/components/homepage/posts/postsContainer";
import EmptyComponent from "@/components/emptyComponent";
import Head from "next/head";
import { base64decode } from "nodejs-base64";

const MyProfilePost = ({ data }: any) => {
  const userOnlineActivities: any = useAtomValue(currentUserDetails);
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
        <meta property="og:description" content={details?.bio || "Hi there! I use Duduzili platform to chat with friends and family, send media and receive updates!"} />
        <meta name="description" content={details?.bio || "Hi there! I use Duduzili platform to chat with friends and family, send media and receive updates!"} />
        <meta
          property="og:image"
          content={
            details?.photo_url ||
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`
          }
        />
      </Head>
      <ProfileActivitiesLayout>
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
      </ProfileActivitiesLayout>
    </>
  );
};

export default MyProfilePost;

export async function getServerSideProps({ query }) {
  const axios = require("axios");
  const user = base64decode(query.user);

  try {
    const { data } = await axios({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
