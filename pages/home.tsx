import { NextPageX } from "../types/next";
import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import CommunityPreview from "@/components/homepage/communityPreview";
import CreatePost from "@/components/homepage/createPost";
import PostSection from "@/components/homepage/postSection";
import Aside from "@/components/homepage/sidebar";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { allPosts, postLimit, toggleCommunityPreview, userDetails } from "@/store";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import useAllPosts from "../hooks/useAllPosts";
import { useEffect } from "react";
import PostSkeleton from "@/components/skeletons/postHeaderSkeleton";
import ShowMoreButton from "@/components/showMoreButton";
import { Loader } from "@mantine/core";

const HomePage: NextPageX = () => {
  const showCommunityPreview = useAtomValue(toggleCommunityPreview);
  const [limit, setLimit] = useAtom(postLimit)
  const user: any = useAtomValue(userDetails);
  const { data, isError, isLoading } = useAllPosts(limit);
  const setAllPosts = useSetAtom(allPosts);

  useEffect(() => {
    if (data && !isError) {
      setAllPosts(data.results);
    }
  }, [data]);
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        {user?.token ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] max-w-[1121px] justify-between h-full overflow-auto pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] pb-[50px] overflow-auto max-w-[718px] flex flex-col gap-12"
          >
            {user?.token && showCommunityPreview && <CommunityPreview />}
            {user?.token && <CreatePost />}
            {isLoading ? <PostSkeleton /> : <PostSection />}
            {data?.next && (isLoading ? <Loader /> : <ShowMoreButton onClick={() => setLimit(prev => prev + 10)} />)}
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
HomePage.Layout = fixedSidebarLayout;
export default HomePage;
