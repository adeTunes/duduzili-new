import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import { NextPageX } from "../../types/next";
import { useAtomValue, useSetAtom } from "jotai";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { userDetails, userFollowers, userFollowings } from "@/store";
import ShowMoreButton from "@/components/showMoreButton";
import useUserActivities from "../../hooks/useUserDrafts";
import { useEffect } from "react";
import EmptyComponent from "@/components/emptyComponent";
import { base64decode } from "nodejs-base64";
import Head from "next/head";

const Saved: NextPageX = ({ data: fetchedData }: any) => {
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
      </ProfileActivitiesLayout>
    </>
  );
};
export default Saved;
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
