import { NextPageX } from "../types/next";
import Header from "@/components/homepage/header";
import CreatePost from "@/components/homepage/createPost";
import PostSection from "@/components/homepage/postSection";
import Aside from "@/components/homepage/sidebar";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { allPosts, postLimit, userDetails } from "@/store";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import useAllPosts from "../hooks/useAllPosts";
import { useEffect } from "react";
import PostSkeleton from "@/components/skeletons/postHeaderSkeleton";
import { Loader } from "@mantine/core";
import MainContainer from "@/components/main-container";
import Head from "next/head";

const HomePage: NextPageX = () => {
  const [limit, setLimit] = useAtom(postLimit);
  const user: any = useAtomValue(userDetails);
  const { data, isError, isLoading, isFetching } = useAllPosts(limit);
  const setAllPosts = useSetAtom(allPosts);

  useEffect(() => {
    if (data && !isError) {
      setAllPosts(data.results);
    }
  }, [data]);
  return (
    <div className="flex flex-col overflow-auto h-screen">
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
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`} />
        <title>Duduzili | Home</title>
      </Head>
      <div className="bg-white">
        {user?.token ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] flex-1 overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] flex flex-col gap-12"
          >
            <div className="flex overflow-auto flex-col gap-6">
              {user?.token && <CreatePost />}
              <div id="no-scroll" className="flex pb-[50px] flex-col overflow-auto gap-10">
                {isLoading ? <PostSkeleton /> : <PostSection />}
                {data?.next && (
                  <p
                    onClick={() => setLimit((prev) => prev + 10)}
                    role="button"
                    className="py-3 rounded-[32px] z-10 border-duduzili-violet flex justify-center border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
                  >
                    {isFetching ? <Loader size="sm" /> : "Show more"}
                  </p>
                )}
              </div>
            </div>
          </section>
          <Aside />
          {user?.token ? <FixedMessagesButton /> : null}
        </MainContainer>
      </div>
    </div>
  );
};
export default HomePage;
