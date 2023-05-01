import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import PostImage from "@/components/homepage/posts/postImage";
import Aside from "@/components/homepage/sidebar";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import PersonalInformation from "@/components/profile/personalInformation";
import ProfileActivities from "@/components/profile/profileActivities";
import ShowMoreButton from "@/components/showMoreButton";
import { ArrowLeft } from "iconsax-react";
import React, { ReactNode } from "react";

function ProfileActivitiesLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto relative max-w-[1139px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[726px] flex flex-col gap-[34px]"
          >
            <div className="flex items-center gap-10">
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Frank Muller
              </p>
            </div>
            <div className="p-2 flex flex-col gap-8">
              <PersonalInformation />
              <div className="flex flex-col gap-6">
                <ProfileActivities />
                <div className="flex flex-col gap-10 pb-[50px]">
                  {children}
                  <ShowMoreButton />
                </div>
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[50px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default ProfileActivitiesLayout;
