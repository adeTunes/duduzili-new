import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import { clsx } from "@mantine/core";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import { useState, useEffect } from "react";
import DiscoverCommunitiesCard from "@/components/communities/discoverCommunitiesCard";
import Aside from "@/components/homepage/sidebar";
import ShowMoreButton from "@/components/showMoreButton";
import { Loading } from "@/components/loading";
import useCommunityCategoryList from "../../hooks/useCommunityCategoryList";
import useCommunityList from "../../hooks/useCommunityList";
import { useRouter } from "next/router";

const Communities: NextPageX = () => {
  const [selected, setSelected] = useState(0);
  const { data: tags, isLoading: tagsLoading } = useCommunityCategoryList();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading } = useCommunityList(selectedCategory);
  const [allTags, setAllTags] = useState([]);
  const { back } = useRouter();
  useEffect(() => {
    if (tags) setAllTags([{ name: "All", description: "" }, ...tags]);
  }, [tags]);
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
            <div
              onClick={back}
              className="flex items-center cursor-pointer gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Discover Communities
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {allTags?.map((item, idx) => (
                <p
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(item.name === "All" ? "" : item.name);
                    setSelected(idx);
                  }}
                  className={clsx(
                    selected === idx
                      ? " bg-duduzili-violet text-white"
                      : "text-[#787878] bg-[#EDF0FB]",
                    "py-3 px-6 rounded-[32px] cursor-pointer"
                  )}
                >
                  {item.name}
                </p>
              ))}
            </div>
            {data?.results?.length ? (
              <div className="flex flex-col gap-[50px] pb-[50px]">
                {data?.results?.map((item, index) => (
                <DiscoverCommunitiesCard selectedCategory={selectedCategory} key={index} community={item} />
              ))}
                {/* <DiscoverCommunitiesCard joined={true} />
              <DiscoverCommunitiesCard joined={false} /> */}
                {data?.count > 20 && <ShowMoreButton />}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <img
                    className="w-[380px]"
                    src="/empty-states/community.png"
                    alt="community list empty"
                  />
                  <p className="text-[#2a2a2a] text-[20px] leading-7 font-bold">
                    Community list is empty
                  </p>
                </div>
              </div>
            )}
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
      <Loading loading={isLoading || tagsLoading} />
    </div>
  );
};
Communities.Layout = fixedSidebarLayout;
export default Communities;
