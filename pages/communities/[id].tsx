import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import Aside from "@/components/homepage/sidebar";
import CommunityView from "@/components/communities/communityView";
import { Slider } from "@/components/carousel";

const Community: NextPageX = () => {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] pb-[50px] relative max-w-[1200px] justify-between mt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[70%] max-w-[700px] flex flex-col gap-[56px]">
            <div className="flex flex-col gap-[27px]">
              <div className="flex items-center gap-10">
                <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
                <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                  Socio-economic issues in Africa
                </p>
              </div>
              <div className="flex flex-col gap-[36px]">
                <CommunityView />
              </div>
            </div>
            <div className=" flex flex-col gap-6">
              <p className="text-[24px] leading-[29px] font-semibold">
                Discover Communities
              </p>
              <div
                className="bg-[#EDF0FB] p-6 pb-[90px] flex flex-col gap-6 rounded-2xl"
                style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[18px] leading-[22px] font-semibold">
                    Communities
                  </p>
                  <p className=" font-semibold self-end text-duduzili-violet">
                    View All
                  </p>
                </div>
                <Slider />
              </div>
            </div>
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
Community.Layout = fixedSidebarLayout;
export default Community;
