import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import { clsx } from "@mantine/core";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import { useState } from "react";
import DiscoverCommunitiesCard from "@/components/communities/discoverCommunitiesCard";
import Aside from "@/components/homepage/sidebar";
import ShowMoreButton from "@/components/showMoreButton";

const Communities: NextPageX = () => {
  const [selected, setSelected] = useState(0);
  const tags = [
    "Popular",
    "All",
    "Entertainment",
    "Culture",
    "Sports",
    "Travel",
    "School",
    "Politics",
    "Science",
    "Religion",
    "Fashion",
  ];
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto relative max-w-[1121px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[718px] flex flex-col gap-[27px]"
          >
            <div className="flex items-center gap-10">
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Discover Communities
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {tags.map((item, idx) => (
                <p
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={clsx(
                    selected === idx
                      ? " bg-duduzili-violet text-white"
                      : "text-[#787878] bg-[#EDF0FB]",
                    "py-3 px-6 rounded-[32px] cursor-pointer"
                  )}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-[50px] pb-[50px]">
              <DiscoverCommunitiesCard joined={false} />
              <DiscoverCommunitiesCard joined={true} />
              <DiscoverCommunitiesCard joined={false} />
              <ShowMoreButton />
            </div>
          </section>
          <Aside />
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
Communities.Layout = fixedSidebarLayout;
export default Communities;
