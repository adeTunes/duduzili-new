import { NextPageX } from "../types/next";
import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import CommunityPreview from "@/components/homepage/communityPreview";
import CreatePost from "@/components/homepage/createPost";
import PostSection from "@/components/homepage/postSection";
import Aside from "@/components/homepage/sidebar";
import { useAtomValue } from "jotai";
import { toggleCommunityPreview, userDetails } from "@/store";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";

const HomePage: NextPageX = () => {
  const showCommunityPreview = useAtomValue(toggleCommunityPreview);
  const user: any = useAtomValue(userDetails);
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        {user?.post ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] mx-w-[1200px] justify-between mt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[70%] max-w-[700px] flex flex-col gap-12">
            {showCommunityPreview && <CommunityPreview />}
            <CreatePost />
            <PostSection />
          </section>
          <Aside />
        </main>
      </div>
    </div>
  );
};
HomePage.Layout = fixedSidebarLayout;
export default HomePage;
