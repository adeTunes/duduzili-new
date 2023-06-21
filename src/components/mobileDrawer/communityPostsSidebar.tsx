import { Icon } from "@iconify/react";
import { TextInput } from "@mantine/core";
import React from "react";
import DiscoverCommunities from "../communities/discoverCommunities";
import MyCommunitiesSlider from "../communities/myCommunitiesSlider";
import { useAtomValue } from "jotai";
import { joinedCommunities } from "@/store";

function CommunityPostsSidebar() {
    const joined: any = useAtomValue(joinedCommunities)
  return (
    <aside
      id="no-scroll"
      className="w-full pb-[80px] overflow-auto flex flex-col gap-8"
    >
      <TextInput
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        classNames={{
          input: " border-none rounded-[32px] h-[47px]",
          root: "rounded-[32px] pl-[32px] bg-white",
        }}
        placeholder="Search Communities"
        icon={
          <Icon icon="ri:search-line" height={20} width={20} color="#969696" />
        }
      />
      <DiscoverCommunities />
      {joined?.results?.length ? <MyCommunitiesSlider joined={joined} /> : null}
    </aside>
  );
}

export default CommunityPostsSidebar;
