import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useAtomValue } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent";
import Head from "next/head";

const FriendProfilePost: NextPageX = () => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
        />
        <meta
          property="og:title"
          content="Duduzili - Uniting People and Empowering Authentic Expression"
        />
        <meta
          property="og:description"
          content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`}
        />
      </Head>
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
