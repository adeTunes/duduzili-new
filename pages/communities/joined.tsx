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
import Back from "@/components/back";
import MainContainer from "@/components/main-container";

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
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[450px]:min-w-[250px] max-[790px]:flex-1 min-w-[400px] max-w-[718px] flex flex-col gap-[27px]"
          >
            <Back text="My Communities" />
            <div className="flex flex-col gap-[50px] pb-[50px]">
              {data?.results?.map((item, index) => (
                <DiscoverCommunitiesCard key={index} community={item} />
              ))}
              {!isLoading && !data?.results?.length ? <p className="text-center">No communities in this category</p> : null}
              {data?.count > 20 && <ShowMoreButton onClick={() => setLimit(v => v + 20)} />}
            </div>
          </section>
          <Aside />
          <FixedMessagesButton />
        </MainContainer>
      </div>
      <Loading loading={isLoading} />
    </div>
  );
};
Communities.Layout = fixedSidebarLayout;
export default Communities;
