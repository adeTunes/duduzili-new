import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import Aside from "@/components/homepage/sidebar";
import CommunityView from "@/components/communities/communityView";
import { Slider } from "@/components/carousel";
import { useRouter } from "next/router";
import useCommunityDetails from "../../hooks/useCommunityDetails";
import { Loading } from "@/components/loading";
import useCommunityList from "../../hooks/useCommunityList";

const Community: NextPageX = () => {
  const { query, back } = useRouter();
  const { data, isLoading } = useCommunityDetails(query.id);
  const {data: communities} = useCommunityList("")

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[50px] relative max-w-[1131px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] max-w-[690px] overflow-auto flex flex-col gap-[56px]"
          >
            <div className="flex flex-col gap-[27px]">
              <div onClick={back} className="flex cursor-pointer items-center gap-10">
                <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
                <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                  {data?.data?.name}
                </p>
              </div>
              <div className="flex flex-col gap-[36px]">
                <CommunityView community={data} />
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
                <Slider community={communities?.results} color="#EDF0FB" />
              </div>
            </div>
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
      <Loading loading={isLoading} />
    </div>
  );
};
Community.Layout = fixedSidebarLayout;
export default Community;
