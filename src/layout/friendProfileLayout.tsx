import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import FriendProfileActivities from "@/components/profile/friendProfileActivities";
import FriendProfileInformation from "@/components/profile/friendProfileInformation";
import ShowMoreButton from "@/components/showMoreButton";
import { friendPersonalDetails } from "@/store";
import { ArrowLeft } from "iconsax-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

function FriendProfileLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] max-[790px]:w-full h-full overflow-auto relative max-w-[1139px] justify-between pt-[3vh] gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[726px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-[2.5vw]"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p style={{
                fontSize: "clamp(15px, 1.3vw, 24px)"
              }} className="text-[#2A2A2A] leading-[29px] font-bold">
                {friendDetails?.user?.first_name}{" "}
                {friendDetails?.user?.last_name}
              </p>
            </div>
            <div className="p-2 flex flex-col gap-8">
              <FriendProfileInformation friendDetails={friendDetails} />
              <div className="flex flex-col gap-6">
                <FriendProfileActivities />
                <div className="flex flex-col gap-10 pb-[50px]">
                  {children}
                  {/* <ShowMoreButton /> */}
                </div>
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] min-w-[300px] max-w-[400px] max-[790px]:hidden overflow-auto flex flex-col gap-6"
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

export default FriendProfileLayout;
