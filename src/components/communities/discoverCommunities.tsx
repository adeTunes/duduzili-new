import { Icon } from "@iconify/react";
import { Profile2User } from "iconsax-react";
import React from "react";
import { Slider } from "../carousel";
import { useAtomValue, useSetAtom } from "jotai";
import { toggleCommunityPreview, userDetails } from "@/store";
import Link from "next/link";
import useCommunityList from "../../../hooks/useCommunityList";

function DiscoverCommunities() {
  const { data, isLoading } = useCommunityList("");
  return (
    <div
      className="bg-[#EDF0FB] p-6 pb-[90px] flex flex-col gap-6 rounded-2xl"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[20px] leading-[36px] font-bold">
          Discover Communities
        </p>
        <Link href="/communities/discover">
          <p className=" font-semibold whitespace-nowrap leading-[36px] self-end text-duduzili-violet">
            View All
          </p>
        </Link>
      </div>
      <Slider community={data?.results} color="bg-[#EDF0FB]" />
    </div>
  );
}

export default DiscoverCommunities;
