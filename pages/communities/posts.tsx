import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { Add } from "iconsax-react";
import CommunityList from "@/components/communities/communityList";
import DiscoverCommunities from "@/components/communities/discoverCommunities";
import { TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import MyCommunitiesSlider from "@/components/communities/myCommunitiesSlider";
import useCommunityJoined from "../../hooks/useCommunitiesJoined";
import { useDisclosure } from "@mantine/hooks";
import CreateCommunityModal from "@/components/modals/createCommunityModal";
import useRandomCommunitiesPosts from "../../hooks/useRandomCommunitiesPosts";
import { useAtomValue, useSetAtom } from "jotai";
import { joinedCommunities, toggleCommunityPreview } from "@/store";
import { useEffect } from "react";
import PostSkeleton from "@/components/skeletons/postHeaderSkeleton";
import SinglePostSkeleton from "@/components/skeletons/singlePostSkeleton";
import MainContainer from "@/components/main-container";
import CommunityPreview from "@/components/homepage/communityPreview";

const Communities: NextPageX = () => {
  // const { data } = useCommunityJoined();
  const { data, isLoading: isPostsLoading } = useRandomCommunitiesPosts();
  const { data: joined, isLoading } = useCommunityJoined(4);
  const setJoined = useSetAtom(joinedCommunities);
  const showCommunityPreview = useAtomValue(toggleCommunityPreview);


  useEffect(() => {
    if (joined) {
      setJoined(joined);
    }
  }, [joined]);

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] max-[790px]:flex-1 pb-[50px] overflow-auto max-w-[689px] flex flex-col gap-[55px]"
          >
            {showCommunityPreview && <div className="hidden max-[790px]:block"><CommunityPreview /></div>}
            <div className="flex items-center justify-between">
              <p
                style={{
                  fontSize: "clamp(15px, 1.3vw, 24px)",
                }}
                className="text-[#2A2A2A] leading-[29px] font-bold"
              >
                Communities
              </p>
              <p
                role="button"
                className="py-4 bg-duduzili-violet rounded-[32px] px-6 flex items-center gap-1"
                onClick={open}
                style={{
                  paddingInline: "clamp(10px, 1.6vw, 24px)",
                  paddingBlock: "clamp(2px, 1.4vw, 16px)",
                  fontSize: "clamp(12px, 0.98vw, 16px)",
                }}
              >
                <Add size="24" color="#FFFFFF" variant="Outline" />
                <span className="font-medium max-[860px]:hidden leading-[19px] text-white">
                  Create Community
                </span>
                <span className="font-medium hidden max-[860px]:inline-block leading-[19px] text-white">
                  Create
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-[50px]">
              {isPostsLoading ? (
                <>
                  <SinglePostSkeleton />
                  <SinglePostSkeleton />
                  <SinglePostSkeleton />
                  <SinglePostSkeleton />
                </>
              ) : (
                data?.map((item, index) => (
                  <CommunityList
                    key={index}
                    post={item?.post}
                    community={item?.community}
                  />
                ))
              )}
            </div>
            {/* {data?.length ? (
              <p
                role="button"
                className="py-3 rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
              >
                Show more
              </p>
            ) : null} */}
            {!isPostsLoading && !data?.length ? (
              <p className="text-center">No posts yet</p>
            ) : null}
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto max-[790px]:hidden min-w-[300px] max-w-[400px] flex flex-col gap-8"
          >
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
            {joined?.results?.length ? (
              <MyCommunitiesSlider joined={joined} />
            ) : null}
          </aside>
          <FixedMessagesButton />
        </MainContainer>
      </div>
      <CreateCommunityModal opened={opened} close={close} />
    </div>
  );
};
Communities.Layout = fixedSidebarLayout;
export default Communities;
