import PostWithComments from "@/components/communities/postWithComments";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import Aside from "@/components/homepage/sidebar";
import React from "react";
import Back from "@/components/back";
import MainContainer from "@/components/main-container";
import Head from "next/head";
import { base64decode } from "nodejs-base64";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";

function ViewPost({ post }) {
  const user: any = useAtomValue(userDetails);
  const details = post?.is_repost ? post?.reposter : post?.user;
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
        <title>
          {`Duduzili | ${details?.first_name} ${details?.last_name}`}
        </title>
        <meta
          property="og:title"
          content={`${details?.first_name} ${details?.last_name}`}
        />
        <meta
          property="og:description"
          content={post?.repost_text || post?.text}
        />
        <meta name="description" content={post?.text} />
        <meta
          property="og:image"
          content={
            details?.photo_url ||
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`
          }
        />
      </Head>
      <div className="bg-white">
        {!user?.token ? <HeaderUnauthenticated /> : <Header />}
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[690px] overflow-auto flex flex-col gap-[3vh]"
          >
            {!user?.token ? null : <Back text="View Post" />}
            <div className="flex flex-col gap-[36px]">
              <PostWithComments />
            </div>
          </section>
          <Aside />
          {!user?.token ? null : <FixedMessagesButton />}
        </MainContainer>
      </div>
    </div>
  );
}

export default ViewPost;

export async function getServerSideProps({ query }) {
  const axios = require("axios");
  const id = base64decode(query.id);
  try {
    const { data } = await axios({
      baseURL: "https://duduzili-staging-server.com.ng",
      url: `/api/v1/rest-auth/posts/${id}/`,
    });
    return {
      props: {
        post: data?.post,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
