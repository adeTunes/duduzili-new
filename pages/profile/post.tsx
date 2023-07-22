import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue } from "jotai";
import { currentUserDetails } from "@/store";
import PostsContainer from "../../src/components/homepage/posts/postsContainer";
import EmptyComponent from "@/components/emptyComponent";
import Head from "next/head";
import { base64decode } from "nodejs-base64";
import useUserActivities from "../../hooks/useUserDrafts";
import useOfflineUser from "../../hooks/use-offline-user";
import { useRouter } from "next/router";

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
