import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import InviteFriends from "@/components/homepage/sidebar/inviteFriends";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import { useRouter } from "next/router";
import JoinRequest from "@/components/communities/joinRequest";
import { NextPageX } from "../types/next";
import TrendingCard from "@/components/trendingCard";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";

const Trending: NextPageX = () => {
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] pb-[50px] relative max-w-[1131px] justify-between mt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[70%] max-w-[717px] flex flex-col gap-[34px]">
            <div className="flex items-center gap-10">
              <ArrowLeft
                className="cursor-pointer"
                onClick={back}
                size="32"
                color="#2A2A2A"
                variant="Outline"
              />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Trending
              </p>
            </div>
            <div
              className="bg-white rounded-2xl px-[19px] py-[21px] flex flex-col gap-[18px]"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex flex-col">
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
              </div>
              <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
                Show more
              </p>
            </div>
          </section>
          <aside className="w-[30%] max-w-[325px] flex flex-col gap-6">
            <DownloadApp />
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
Trending.Layout = fixedSidebarLayout;
export default Trending;
