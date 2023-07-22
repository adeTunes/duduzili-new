import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue, useSetAtom } from "jotai";
import { userDetails, userFollowers, userFollowings } from "@/store";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useEffect } from "react";
import useUserActivities from "../../hooks/useUserDrafts";
import EmptyComponent from "@/components/emptyComponent";
import { base64decode } from "nodejs-base64";
import Head from "next/head";

const Draft: NextPageX = ({ data: fetchedData }: any) => {
  const details = fetchedData?.user;
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
      <Head>
        <title>
          {`Duduzili | ${details?.first_name} ${details?.last_name}`}
        </title>
        <meta
          property="og:title"
          content={`${details?.first_name} ${details?.last_name}`}
        />
        <meta property="og:description" content={details?.bio || "Hi there! I use Duduzili platform to chat with friends and family, send medias and receive updates!"} />
        <meta name="description" content={details?.bio || "Hi there! I use Duduzili platform to chat with friends and family, send medias and receive updates!"} />
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
          {data?.drafts?.map((item, idx) => (
            <PostsContainer key={idx} post={item} />
          ))}
        </div>
        {!data?.drafts?.length && (
          <EmptyComponent
            className="max-w-[275px]"
            text="You have no post in draft"
          />
        )}
      </ProfileActivitiesLayout>
    </>
  );
};

export default Draft;

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
