import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import { useState } from "react";
import DiscoverCommunitiesCard from "@/components/communities/discoverCommunitiesCard";
import Aside from "@/components/homepage/sidebar";
import ShowMoreButton from "@/components/showMoreButton";
import { Loading } from "@/components/loading";
import useCommunityJoined from "../../hooks/useCommunitiesJoined";
import { useRouter } from "next/router";

const Communities: NextPageX = () => {
  const [limit, setLimit] = useState(20)
  const { data, isLoading } = useCommunityJoined(limit);

const {back} = useRouter()
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] h-full overflow-auto relative max-w-[1121px] justify-between pt-[3vh] gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[450px]:min-w-[250px] max-[790px]:flex-1 min-w-[400px] max-w-[718px] flex flex-col gap-[27px]"
          >
            <div onClick={back} className="flex cursor-pointer items-center gap-10">
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                My Communities
              </p>
            </div>
            <div className="flex flex-col gap-[50px] pb-[50px]">
              {data?.results?.map((item, index) => (
                <DiscoverCommunitiesCard key={index} community={item} />
              ))}
              {!data?.results?.length && <p className="text-center">No communities in this category</p>}
              {/* <DiscoverCommunitiesCard joined={true} />
              <DiscoverCommunitiesCard joined={false} /> */}
              {data?.count > 20 && <ShowMoreButton onClick={() => setLimit(v => v + 20)} />}
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
Communities.Layout = fixedSidebarLayout;
export default Communities;
