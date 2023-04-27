import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { Add } from "iconsax-react";
import CommunityList from "@/components/communities/communityList";
import DiscoverCommunities from "@/components/communities/discoverCommunities";
import { TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";

const Communities: NextPageX = () => {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] relative max-w-[1200px] justify-between mt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[70%] max-w-[700px] flex flex-col gap-[27px]">
            <div className="flex items-center justify-between">
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Communities
              </p>
              <p
                role="button"
                className="py-4 bg-duduzili-violet rounded-[32px] px-6 flex items-center gap-1"
              >
                <Add size="24" color="#FFFFFF" variant="Outline" />
                <span className="font-medium leading-[19px] text-white">
                  Create Community
                </span>
              </p>
            </div>
            <CommunityList />
          </section>
          <aside className="w-[30%] flex flex-col gap-8">
            <TextInput
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
              classNames={{
                input: " border-none rounded-[32px] h-[47px]",
                root: "rounded-[32px] pl-[32px] bg-white",
              }}
              placeholder="Search Communities"
              icon={
                <Icon
                  icon="ri:search-line"
                  height={20}
                  width={20}
                  color="#969696"
                />
              }
            />
            <DiscoverCommunities />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
Communities.Layout = fixedSidebarLayout;
export default Communities;
