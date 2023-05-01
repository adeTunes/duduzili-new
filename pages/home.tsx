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
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";

const HomePage: NextPageX = () => {
  const showCommunityPreview = useAtomValue(toggleCommunityPreview);
  const user: any = useAtomValue(userDetails);
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        {user?.post ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] max-w-[1121px] justify-between h-full overflow-auto pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[718px] flex flex-col gap-12"
          >
            {showCommunityPreview && <CommunityPreview />}
            <CreatePost />
            <PostSection />
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
